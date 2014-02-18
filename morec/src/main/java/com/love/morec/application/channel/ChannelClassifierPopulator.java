package com.love.morec.application.channel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.Field.Index;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.document.Field.TermVector;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.IndexWriterConfig.OpenMode;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryParser.MultiFieldQueryParser;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.Similarity;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.Version;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.wltea.analyzer.lucene.IKAnalyzer;
import org.wltea.analyzer.lucene.IKSimilarity;

import com.love.morec.domain.channel.Channel;
import com.love.morec.infrastruture.ChannelClassifier;
import com.love.morec.infrastruture.persist.ChannelRepository;
import com.loveme.util.AssertUtils;
import com.loveme.util.ExceptionUtils;

public class ChannelClassifierPopulator implements InitializingBean {

	private transient Logger log = LoggerFactory.getLogger(ChannelClassifierPopulator.class);

	@Autowired
	private ChannelRepository channelRepository;

	private ChannelClassifier instance;

	private final Analyzer analyzer = new IKAnalyzer(true);
	private Directory directory;
	private IndexWriter iwriter;

	private ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	private final Map<String, Channel> channelCache = new HashMap<String, Channel>();

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			directory = new RAMDirectory();
			iwriter = createIndexWriter(directory, analyzer);

			indexChannels(iwriter);
			instance = new LuceneChannelClassifier();

			executor.scheduleAtFixedRate(new Runnable() {

				@Override
				public void run() {
					try {

						long startTime = System.currentTimeMillis();
						log.debug("Preparing index channels to ramDirectory");
						indexChannels(iwriter);
						long elapsed = System.currentTimeMillis() - startTime;
						log.debug("Finish index channels, elapsed time [" + elapsed + "] millisecond");
					} catch (Exception e) {
						log.error("Index channels fail!", e);
					}
				}
			}, 12, 12, TimeUnit.HOURS);

		} catch (Exception e) {
			free(directory, iwriter);
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private void free(Directory directory, IndexWriter iwriter) {
		if (null != directory) {
			try {
				directory.close();
			} catch (Exception e) {
			}
		}

		if (null != iwriter) {
			try {

				iwriter.close();
			} catch (Exception e) {
			}
		}

	}

	private void indexChannels(IndexWriter iwriter) throws Exception {

		List<Channel> channels = channelRepository.query(new Object());
		refreshCache(channels);

		List<Document> docs = new ArrayList<Document>();
		for (Channel channel : channels) {

			putOnCache(channel);

			Document doc = new Document();

			Field idField = new Field("id", channel.getId(), Store.YES, Index.NOT_ANALYZED, TermVector.WITH_POSITIONS);
			idField.setBoost(1.0f);
			doc.add(idField);

			Field tagsField = new Field("tags", channel.getTags(), Store.YES, Index.ANALYZED, TermVector.WITH_POSITIONS);
			tagsField.setBoost(5.0f);
			doc.add(tagsField);

			docs.add(doc);
		}

		iwriter.updateDocuments(new Term("id"), docs);
		iwriter.commit();
	}

	private void refreshCache(List<Channel> channels) {
		synchronized (channelCache) {

			channelCache.clear();
			for (Channel channel : channels) {
				putOnCache(channel);
			}
		}
	}

	private IndexWriter createIndexWriter(Directory directory, Analyzer analyzer) throws Exception {
		IndexWriterConfig conf = new IndexWriterConfig(Version.LUCENE_35, analyzer);
		conf.setOpenMode(OpenMode.CREATE);
		return new IndexWriter(directory, conf);
	}


	public ChannelClassifier populate() {
		AssertUtils.notNull(instance);
		return instance;
	}

	private void putOnCache(Channel channel) {
		channelCache.put(channel.getId(), channel);
	}

	private Channel getOnCache(String id) {
		return channelCache.get(id);
	}

	protected class LuceneChannelClassifier implements ChannelClassifier {
		private final QueryParser parser = new MultiFieldQueryParser(Version.LUCENE_35, new String[] { "tags" }, analyzer);
		private final Similarity similarity = new IKSimilarity();

		@Override
		public Channel classify(String query) {
			
			IndexSearcher isearcher = null;
			try {

				isearcher = createIndexSearcher();
				Query q = parser.parse(query);

				// query one is enough
				TopDocs docs = isearcher.search(q, 1);
				return extractChannel(isearcher, docs);
			} catch (Exception e) {
				return null;
			} finally {
				free(isearcher);
			}

		}


		@Override
		public Channel classify(List<String> tags) {
			return classify(StringUtils.join(tags, " OR "));
		}

		private IndexSearcher createIndexSearcher() throws Exception {
			IndexSearcher isearcher = new IndexSearcher(IndexReader.open(directory, true));
			isearcher.setSimilarity(similarity);
			return isearcher;
		}

		private Channel extractChannel(IndexSearcher isearcher, TopDocs docs) throws Exception {
			if (docs.totalHits <= 0) {
				return null;
			}

			Document doc = isearcher.doc(docs.scoreDocs[0].doc);
			return getOnCache(doc.get("id"));
		}

		private void free(IndexSearcher isearcher) {
			if (null != isearcher) {
				try {

					isearcher.close();
				} catch (Exception e) {
				}
			}
		}

	}

}
