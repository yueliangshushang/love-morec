package com.love.morec.interfaces.cms;

import java.io.File;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.love.morec.application.resource.ResourceService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.interfaces.util.ConfigureOnWeb;
import com.love.morec.interfaces.util.JsonMessage;
import com.loveme.core.orm.Page;
import com.loveme.core.web.WebUtils;
import com.loveme.core.web.WebUtils.ContentType;
import com.loveme.core.web.controller.ControllerSupport;
import com.loveme.util.AssertUtils;
import com.loveme.util.ExceptionUtils;
import com.loveme.util.FileUtils;
import com.loveme.util.filecommand.FileCommand;
import com.loveme.util.filecommand.FileCommandInvoker;
import com.loveme.util.filecommand.impl.DeleteFileCommand;
import com.loveme.util.filecommand.impl.MakeFileCommand;
import com.loveme.util.filecommand.impl.WriteBytesToFileCommand;
import com.loveme.util.filecommand.impl.WriteFileToCommand;
import com.loveme.util.filecommand.impl.ZipCompressFileCommand;

/**
 * 
 * @author Linxiaosheng
 */
@Controller
@RequestMapping(value = "/resource")
public class ResourceController extends ControllerSupport {

	@Autowired
	private ResourceService resourceService;
	@Autowired
	private ConfigureOnWeb confOnWeb;

	private static final String REDIRECT_LIST = "redirect:/resource/list";

	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String resource() {
		return "resource/centre";
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "/left")
	public String left() {
		return "resource/left";
	}

	/**
	 * 
	 * @param page
	 * @param pathname
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Page<ResourceBean> page, @RequestParam(value = "pathname", required = false) String pathname, Model model) {
		Configure conf = confOnWeb.wrap(Configure.get());

		page = resourceService.query(conf, createDefalutDirectoryIfNeccessary(pathname), page);
		model.addAttribute("page", page);
		return "resource/list";
	}

	private String createDefalutDirectoryIfNeccessary(String pathname) {
		return StringUtils.isBlank(pathname) ? "/" : pathname;
	}

	/**
	 * 
	 * @param file
	 * @param pathname
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public void upload(@RequestParam("file") MultipartFile file, @RequestParam(value = "pathname", required = false) String pathname,
						HttpServletResponse response) {

		try {
			
			response.setContentType("text/html");
			Configure conf = confOnWeb.wrap(Configure.get());
			if (isUnacceptableFile(file, conf)) {
				throw new UnsupportedOperationException("The file is unacceptable!");
			}

			ResourceBean bean = resourceService.get(conf, createDefalutDirectoryIfNeccessary(pathname));
			ResourceBean root = createRootResourceBeanIfNeccessary(bean, pathname);

			if (null != root) {
				bean = root;
			}
			if (null == bean || !bean.isDirectory()) {
				throw new UnsupportedOperationException("Bad pathname!");
			}

			doUpload(bean, file, conf);
			
			jsonStringEnclosingWith(response, "<textarea>%s</textarea>", JsonMessage.me().success().message("Upload ok!"));
		} catch (Exception e) {
			jsonStringEnclosingWith(response, "<textarea>%s</textarea>", JsonMessage.me().error().message(e.getMessage()));
		}
	}

	private ResourceBean createRootResourceBeanIfNeccessary(ResourceBean bean, String pathname) {

		if (null == bean && StringUtils.isBlank(pathname)) {
			return new ResourceBean().setDirectory(true).setPath("/");
		}

		return null;
	}

	private boolean isUnacceptableFile(MultipartFile file, Configure conf) {

		AssertUtils.notNull(file);
		if (file.isEmpty() && conf.isOverflowResourceSize(file.getSize())) {
			return true;
		}

		String fileSuffix = FileUtils.getSuffixWithoutDot(file.getOriginalFilename());
		if (!conf.isAllowedResourceTypes(fileSuffix)) {
			return true;
		}

		return false;
	}

	private void doUpload(ResourceBean bean, MultipartFile file, Configure conf) throws IOException {
		String targetFilePath = FileUtils.joinPaths(conf.getResourcePath(), bean.getPath(), file.getOriginalFilename());

		new FileCommandInvoker().command(new MakeFileCommand(targetFilePath))
								.command(new WriteBytesToFileCommand(targetFilePath, file.getBytes()))
								.invoke();
	}

	/**
	 * 
	 * @param pathname
	 * @param out
	 */
	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public void download(@RequestParam(value = "pathname", required = false) String pathname, HttpServletResponse response) {

		Configure conf = confOnWeb.wrap(Configure.get());
		ResourceBean bean = resourceService.get(conf, createDefalutDirectoryIfNeccessary(pathname));

		if (null == bean || !bean.isReadable()) {
			throw new UnsupportedOperationException();
		}

		String targetFilePath = FileUtils.joinPaths(conf.getResourcePath(), bean.getPath());
		try {

			if (bean.isDirectory()) {

				WebUtils.prepareDownload(response, String.format("%s.zip", bean.getName()), ContentType.OCTET);
				File temp = File.createTempFile("temp", ".zip");
				FileCommand zipCompress = new ZipCompressFileCommand(new File(targetFilePath), temp, "utf-8");
				FileCommand writeResponse = new WriteFileToCommand(temp, response.getOutputStream());
				FileCommand release = new DeleteFileCommand(temp);
				new FileCommandInvoker().command(zipCompress).command(writeResponse).command(release).invoke();
				return;
			}

			WebUtils.prepareDownload(response, bean.getName(), ContentType.OCTET);
			new WriteFileToCommand(new File(targetFilePath), response.getOutputStream()).execute();
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}

	}

	/**
	 * 
	 * @param pathname
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public String delete(@RequestParam(value = "pathname", required = true) String pathname,
						 @RequestParam(value = "name", required = true )String name) {
		try {

			Configure conf = confOnWeb.wrap(Configure.get());
			ResourceBean bean = resourceService.get(conf, pathname);
			if (null == bean || bean.isDirectory()) {
				throw new UnsupportedOperationException("Bad pathname !");
			}
			
			String sourcePath = FileUtils.joinPaths(conf.getResourcePath(), pathname);
			String targerPath = FileUtils.joinPaths(conf.getRecyclePath(), getUniquenessName(name,bean));
			
			resourceService.cutFileToRecycle(sourcePath,targerPath);
			resourceService.recycle(bean);
			
			return REDIRECT_LIST;
			
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}
	
	private String getUniquenessName(String name,ResourceBean bean){
		return name + "." + bean.getLastModified();
	}
}
