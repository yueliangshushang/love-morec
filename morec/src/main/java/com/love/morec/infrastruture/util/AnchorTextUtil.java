package com.love.morec.infrastruture.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.love.morec.domain.entity.Entity;

public class AnchorTextUtil {
	public static String addATag(String resource, String anchorText, String link) {
		resource = resource.replaceFirst("(<[^>]+>[^<]*)" + anchorText
				+ "(?!<a)", "$1" + "<a href=\"" + link + "\">" + anchorText
				+ "</a>");
		return resource;
	}

	public static boolean containAnchorText(String resource, String anchorText) {
		if (resource.matches(".*(<[^>]+>[^<]*)" + anchorText + "(?!<a).*")) {
			return true;
		} else {
			return false;
		}
	}

	public static List<Integer> getIndexs(List<String> anchorTexts,
			String describle) {
		List<Integer> indexs = new ArrayList<Integer>();
		for (String anchorText : anchorTexts) {
			if (containAnchorText(describle, anchorText)) {
				indexs.add(anchorTexts.indexOf(anchorText));
			}
		}
		return indexs;
	}

	public static List<Integer> chooseAnchorText(List<Integer> indexs,
			Entity entity) {
		List<Integer> choosedIndex = new ArrayList<Integer>();
		int index = entity.getIdAsHash() % indexs.size();
		for (int choosedThreeIndex = 0; choosedThreeIndex < 3; choosedThreeIndex++) {
			choosedIndex.add(indexs.get((index + choosedThreeIndex) % (indexs.size() + 1)));
		}
		return choosedIndex;
	}

	/**
	 * 根据已定的关键词链接map对文本中的关键词增加链接
	 * 
	 * @param resource
	 *            文本
	 * @param anchorTextLinkMap
	 *            关键词链接map,如map={手机=dGaFdb, iphone=fgGdhf}
	 * @return
	 */
	public static String addAnchorTextLink(String resource,
			Map<String, String> anchorTextLinkMap) {
		Map<Integer, String> anchorTextLocMap = getAnchorTextLocMap(resource,
				anchorTextLinkMap);
		StringBuffer myStr = new StringBuffer(resource);
		Iterator iterator = anchorTextLocMap.entrySet().iterator();
		int totalAddLength = 0, start = 0, end = 0;
		String str = "";
		while (iterator.hasNext()) {
			Map.Entry<Integer, String> mapEntry = (Map.Entry<Integer, String>) iterator.next();
			start = mapEntry.getKey() + totalAddLength;
			end = mapEntry.getKey() + mapEntry.getValue().length()
					+ totalAddLength;
			str = "<a href=\"" + anchorTextLinkMap.get(mapEntry.getValue())
					+ "\">" + mapEntry.getValue() + "</a>";

			myStr.replace(start, end, str);

			totalAddLength += str.length() - mapEntry.getValue().length();
		}
		return myStr.toString();
	}

	/**
	 * 找到关键词的位置
	 * 
	 * @param resource
	 *            源文本
	 * @param keyWord
	 *            关键词
	 * @param map
	 *            存储关键词位置
	 */
	public static void findStringPosition(String resource, String keyWord,
			Map<Integer, String> map) {
		int i = 0, j = 0;
		boolean isLabelInner = false, isLinkInner = false;
		while (i < resource.length() && j < keyWord.length()) {
			if ("<".equals(String.valueOf(resource.charAt(i)))) {
				isLabelInner = true;
				if ((i + 1) < resource.length()
						&& "a".equals(String.valueOf(resource.charAt(i + 1))
								.toLowerCase())) {
					isLinkInner = true;
				}
			}
			if (">".equals(String.valueOf(resource.charAt(i)))) {
				isLabelInner = false;
				if ("a".equals(String.valueOf(resource.charAt(i - 1))
						.toLowerCase())) {
					isLinkInner = false;
				}
			}

			if (resource.charAt(i) == keyWord.charAt(j) && !isLabelInner
					&& !isLinkInner) {
				if ((j + 1) == keyWord.length()) {
					map.put(i - j, keyWord);
					++i;
					j = 0;
				} else {
					++i;
					++j;
				}
			} else {
				i = i - j + 1;
				j = 0;
			}
		}
	}

	/**
	 * 获取关键词的位置
	 * 
	 * @param resource
	 *            源文本
	 * @param anchorTextLinkMap
	 *            关键词及其链接map
	 * @return Map<Integer,String> （其中key升序）
	 */
	public static Map<Integer, String> getAnchorTextLocMap(String resource,
			Map<String, String> anchorTextLinkMap) {
		TreeMap<Integer, String> resultMap = new TreeMap<Integer, String>();
		TreeMap<Integer, String> map = new TreeMap<Integer, String>();

		// 获取所需关键词的所有位置
		Iterator iterator = anchorTextLinkMap.entrySet().iterator();
		while (iterator.hasNext()) {
			findStringPosition(resource, ((Map.Entry<String, String>) iterator
					.next()).getKey(), map);
		}

		// 从map中获取第一个元素即得到第一个关键词位置
		Map.Entry<Integer, String> oneEntry = null;
		if (!map.isEmpty()) {
			oneEntry = map.firstEntry();
			resultMap.put(oneEntry.getKey(), oneEntry.getValue());
		} else {
			return resultMap;
		}

		TreeMap<Integer, String> tempMap = new TreeMap<Integer, String>(map);
		Iterator tempIterator = tempMap.entrySet().iterator();

		// 得到除开第一个关键词外的map
		while (tempIterator.hasNext()) {
			Map.Entry<Integer, String> mapEntry = (Map.Entry<Integer, String>) tempIterator
					.next();
			if (mapEntry.getValue().equals(oneEntry.getValue())) {
				map.remove(mapEntry.getKey());
			}
		}

		// 从map中获取最后一个元素即得到第二个关键词位置, 获取除开第一二个关键词外的map
		Map.Entry<Integer, String> twoEntry = null;
		if (!map.isEmpty()) {
			twoEntry = map.lastEntry();
			if ((oneEntry.getKey() + oneEntry.getValue().length()) >= twoEntry
					.getKey()) {
				return resultMap;
			}

			resultMap.put(twoEntry.getKey(), twoEntry.getValue());

			tempMap = new TreeMap<Integer, String>(map);
			tempIterator = tempMap.entrySet().iterator();
			while (tempIterator.hasNext()) {
				Map.Entry<Integer, String> mapEntry = (Map.Entry<Integer, String>) tempIterator
						.next();
				if (mapEntry.getValue().equals(twoEntry.getValue())) {
					map.remove(mapEntry.getKey());
				}
			}
		}
		// 从只含第三个关键词的map中获取最接近第一第二个关键词 的位置中位数的位置即得到第三个关键词的位置
		if (!map.isEmpty()) {
			int z = (oneEntry.getKey() + twoEntry.getKey()) / 2;
			int t = twoEntry.getKey(), threeEntryKey = 0;

			tempIterator = map.entrySet().iterator();
			while (tempIterator.hasNext()) {
				Map.Entry<Integer, String> mapEntry = (Map.Entry<Integer, String>) tempIterator
						.next();
				if (Math.abs(mapEntry.getKey() - z) < t) {
					t = Math.abs(mapEntry.getKey() - z);
					threeEntryKey = mapEntry.getKey();
				}
			}
			if ((oneEntry.getKey() + oneEntry.getValue().length()) >= threeEntryKey
					|| (threeEntryKey + map.get(threeEntryKey).length()) >= twoEntry
							.getKey()) {
				return resultMap;
			}
			resultMap.put(threeEntryKey, map.get(threeEntryKey));
		}
		return resultMap;
	}

}
