package com.love.morec.application.resource.impl;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.love.morec.application.resource.ResourceService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.ResourceRepository;
import com.loveme.core.orm.Page;
import com.loveme.util.AssertUtils;
import com.loveme.util.ExceptionUtils;
import com.loveme.util.FileUtils;
import com.loveme.util.PathUtils;

/**
 * 
 * @author loudyn
 * 
 */
@Service
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceRepository resourceRepository;
	
	// this fileFilter to filter hidden file
	private final CompoFileFilter notHiddenFileFilter = new AbstractCompoFileFilter() {

		@Override
		public boolean accept(File pathname) {
			return !pathname.isHidden() && pathname.canRead();
		}
	};

	// this fileFilter to filter the sensitive file
	private final CompoFileFilter notSensitiveFileFilter = new AbstractCompoFileFilter() {

		@Override
		public boolean accept(File pathname) {
			String filename = pathname.getName();
			return (filename.indexOf("WEB-INF") == -1) && (!filename.endsWith(".class")) && (filename.indexOf("web.xml") == -1);
		}
	};

	private final CompoFileFilter resourceFileFilter = notHiddenFileFilter.and(notSensitiveFileFilter);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.resource.ResourceService#get(com.youboy.morec.domain.Configure, java.lang.String)
	 */
	@Override
	public ResourceBean get(final Configure conf, final String pathname) {

		try {

			String resourcePath = conf.getResourcePath();
			String filename = FileUtils.joinPaths(resourcePath, pathname);

			File file = new File(filename);
			if (!file.getCanonicalPath().startsWith(resourcePath)) {
				// the pathname that user submit is malicious, alarm it.
				throw new UnsupportedOperationException("Bad pathname!");
			}

			CompoFileFilter pathnameFileFilter = new AbstractCompoFileFilter() {

				@Override
				public boolean accept(File testFile) {

					try {

						// match one at most.
						String path = PathUtils.asUnix(testFile.getCanonicalPath());
						return path.endsWith(PathUtils.asUnix(pathname));
					} catch (Exception e) {
						return false;
					}
				}
			};

			// back to parent and find
			File[] files = file.getParentFile().listFiles(resourceFileFilter.and(pathnameFileFilter));
			if (null == files || files.length == 0) {
				return null;
			}

			if (files.length > 1) {
				throw new IllegalStateException("Bad pathname!");
			}

			return createSingleResourceBean(files[0], conf);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}
	@Auditable(action="添加资源")
	private ResourceBean createSingleResourceBean(File file, Configure conf) throws IOException {

		String fileCanonicalPath = file.getCanonicalPath();
		String relativePath = StringUtils.substringAfter(fileCanonicalPath, conf.getResourcePath());

		boolean precondition = relativePath.length() < fileCanonicalPath.length();
		AssertUtils.isTrue(precondition, new RuntimeException("Can't get the ResourceBean path!"));

		return new ResourceBean(file).setPath(PathUtils.asUnix(relativePath));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.resource.ResourceService#query(com.youboy.morec.domain.Configure, java.lang.String,
	 * com.youboy.core.orm.Page)
	 */
	@Override
	public Page<ResourceBean> query(final Configure conf, final String pathname, final Page<ResourceBean> page) {
		try {

			String resourcePath = conf.getResourcePath();
			String filename = FileUtils.joinPaths(resourcePath, pathname);

			File file = new File(filename);
			if (!file.getCanonicalPath().startsWith(resourcePath)) {
				// the pathname is malicious,always return empty list,not the end of world.
				return page.setResult(Collections.<ResourceBean> emptyList());
			}

			final AtomicInteger counter = new AtomicInteger(0);
			CompoFileFilter pageFileFilter = new AbstractCompoFileFilter() {

				@Override
				public boolean accept(File pathname) {

					int count = counter.incrementAndGet();
					int first = page.getFirst();
					int end = first + page.getPageSize();
					if (count >= first && count < end) {
						return true;
					}

					return false;
				}
			};

			CompoFileFilter extensionFileFilter = new AbstractCompoFileFilter() {

				@Override
				public boolean accept(File testFile) {
					if (testFile.isDirectory()) {
						return true;
					}

					String extension = FileUtils.getSuffixWithoutDot(testFile.getName());
					return conf.isAllowedResourceTypes(extension);
				}
			};

			// Warnning: make sure the pageFileFilter is called at last
			// otherwise page.totalCount may be wrong
			File[] files = file.listFiles(resourceFileFilter.and(extensionFileFilter).and(pageFileFilter));
			return page.setTotalCount(counter.get()).setResult(createResourceBeans(files, conf));
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	/**
	 * 
	 * @param files
	 * @param conf
	 * @return
	 * @throws IOException
	 */
	@Auditable(action="添加多个资源")
	private List<ResourceBean> createResourceBeans(File[] files, Configure conf) throws IOException {
		if (null == files) {
			return Collections.emptyList();
		}

		List<ResourceBean> beans = new LinkedList<ResourceBean>();
		for (File file : files) {
			ResourceBean bean = createSingleResourceBean(file, conf);
			beans.add(bean);
		}

		return beans;
	}

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public interface CompoFileFilter extends FileFilter {
		/**
		 * 
		 * @param another
		 * @return
		 */
		public CompoFileFilter and(CompoFileFilter another);

		/**
		 * 
		 * @param another
		 * @return
		 */
		public CompoFileFilter or(CompoFileFilter another);

		/**
		 * 
		 * @param another
		 * @return
		 */
		public CompoFileFilter not(CompoFileFilter another);
	}

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public abstract class AbstractCompoFileFilter implements CompoFileFilter {

		@Override
		public final CompoFileFilter and(CompoFileFilter another) {
			return new AndCompoFileFilter(this, another);
		}

		@Override
		public final CompoFileFilter or(CompoFileFilter another) {
			return new OrCompoFileFilter(this, another);
		}

		@Override
		public final CompoFileFilter not(CompoFileFilter another) {
			return new NotCompoFileFilter(another);
		}
	}

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public class AndCompoFileFilter extends AbstractCompoFileFilter {
		private final CompoFileFilter one;
		private final CompoFileFilter another;

		public AndCompoFileFilter(CompoFileFilter one, CompoFileFilter another) {

			AssertUtils.notNull(one);
			AssertUtils.notNull(another);
			this.one = one;
			this.another = another;
		}

		@Override
		public boolean accept(File pathname) {
			// make sure one.accept() call before another.accept()
			// we also can write like this : one.accept(pathname) && another.accept(pathname)
			if (!one.accept(pathname)) {
				return false;
			}

			return another.accept(pathname);
		}
	}

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public class OrCompoFileFilter extends AbstractCompoFileFilter {
		private final CompoFileFilter one;
		private final CompoFileFilter another;

		public OrCompoFileFilter(CompoFileFilter one, CompoFileFilter another) {

			AssertUtils.notNull(one);
			AssertUtils.notNull(another);
			this.one = one;
			this.another = another;
		}

		@Override
		public boolean accept(File pathname) {
			// make sure one.accept() call before another.accept()
			// we also can write like this : one.accept(pathname) || another.accept(pathname)
			if (!one.accept(pathname)) {
				return another.accept(pathname);
			}

			return true;
		}
	}

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public class NotCompoFileFilter extends AbstractCompoFileFilter {
		private final CompoFileFilter another;

		public NotCompoFileFilter(CompoFileFilter another) {

			AssertUtils.notNull(another);
			this.another = another;
		}

		@Override
		public boolean accept(File pathname) {
			return !another.accept(pathname);
		}
	}

	@Override
	public void recycle(ResourceBean bean) {
		resourceRepository.save(bean);
	}
	@Override
	public void cutFileToRecycle(String sourcePath, String targerPath) {
		new File(sourcePath).renameTo(new File(targerPath));
	}

}
