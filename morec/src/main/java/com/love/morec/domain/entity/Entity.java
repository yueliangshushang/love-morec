package com.love.morec.domain.entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.beans.Field;

public class Entity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Field
	private String id; // ID
	@Field
	private String productid;  //商品在taobao  tmall 的唯一ID标识
	@Field
	private Integer idAsHash;// 根据短连接的哈希码
	@Field
	private String sitename; // 站点名称
	@Field
	private String project; // 导航名
	@Field
	private String classify; // 所属分类
	@Field
	private String title; // 标题
	@Field
	private String brand; // 品牌
	@Field
	private String props; // 属性 以分号分隔
	@Field
	private String descr; // 描述(可以拼装多个属性 以分号分隔)
	@Field
	private String image; // 图片
	@Field
	private String moreImages; // 附加图片
	@Field
	private String loc; // 实际链接（商品链接 做唯一编码）
	@Field
	private Double price; // 现价，商城价
	@Field
	private Double oldprice; // 原价格（oldprice）拿不到默认为现价，商城价
	@Field
	private String tags;// 标签
	@Field
	private Integer randomRegion; // 随机数
	@Field
	private long createTime; // 创建时间
	@Field
	private String listTime; // 上架时间
	@Field
	private String city;
	@Field
	private String state;
	@Field
	private Integer sellNumber; // 销量，没有,默认为0
	@Field
	private Integer monthlySalesVolume;// 月销量
	@Field
	private long newest;// 最新
	@Field
	private Double hot;// 最热
	@Field
	private Double preferential; // 最优惠
	@Field
	private String dataFlag;// 数据标识
	@Field
	private String freightPayer;
	@Field
	private String hasShowCase;
	@Field
	private String totalResults;
	@Field
	private String expressFee;
	@Field
	private String source;//数据来源商城 默认值为taobao，另有值tmall
	@Field
	private String shopId;//数据来源商城商铺的唯一ID标识
	@Field
	private String shopName;//数据来源商城商铺名称
	@Field
	private String shopFullName;//商铺的网站名字
	@Field
	private Integer commentCount;//累计评论数目和交易量
	@Override
	public String toString() {
		return "MoreCCC @ id:" + id + " title:" + title + " idAsHash:"+ idAsHash;
	}

	public String getListTime() {
		return listTime;
	}

	public Entity setListTime(String listTime) {
		this.listTime = listTime;
		return this;
	}

	public String getCity() {
		return city;
	}

	public Entity setCity(String city) {
		this.city = city;
		return this;
	}

	public String getState() {
		return state;
	}

	public Entity setState(String state) {
		this.state = state;
		return this;
	}

	public String getFreightPayer() {
		return freightPayer;
	}

	public Entity setFreightPayer(String freightPayer) {
		this.freightPayer = freightPayer;
		return this;
	}

	public String getHasShowCase() {
		return hasShowCase;
	}

	public Entity setHasShowCase(String hasShowCase) {
		this.hasShowCase = hasShowCase;
		return this;
	}

	public String getTotalResults() {
		return totalResults;
	}

	public Entity setTotalResults(String totalResults) {
		this.totalResults = totalResults;
		return this;
	}

	public String getExpressFee() {
		return expressFee;
	}

	public Entity setExpressFee(String expressFee) {
		this.expressFee = expressFee;
		return this;
	}

	public String getId() {
		return id;
	}

	public Integer getIdAsHash() {
		return idAsHash;
	}

	public Entity setIdAsHash(Integer idAsHash) {
		this.idAsHash = idAsHash;
		return this;
	}

	public Entity setId(String id) {
		this.id = id;
		return this;
	}

	public String getSitename() {
		return sitename;
	}

	public Entity setSitename(String sitename) {
		this.sitename = sitename;
		return this;
	}

	public String getLoc() {
		return loc;
	}

	public String getTags() {
		return tags;
	}

	public List<String> getTagAsList() {
		return Arrays.asList(StringUtils.split(getTags(), ";"));
	}

	public Entity setTags(String tags) {
		this.tags = tags;
		return this;
	}

	public Entity setLoc(String loc) {
		this.loc = loc;
		return this;
	}

	public String getTitle() {
		return title;
	}

	public Entity setTitle(String title) {
		this.title = title;
		return this;
	}

	public String getDescr() {
		return descr;
	}

	public Entity setDescr(String descr) {
		this.descr = descr;
		return this;
	}

	public String getProps() {
		return props;
	}

	public Entity setProps(String props) {
		this.props = props;
		return this;
	}

	public String getBrand() {
		return brand;
	}

	public Entity setBrand(String brand) {
		this.brand = brand;
		return this;
	}

	public String getImage() {
		return image;
	}

	public Entity setImage(String image) {
		this.image = image;
		return this;
	}

	public String getMoreImages() {
		return moreImages;
	}

	public Entity setMoreImages(String moreImages) {
		this.moreImages = moreImages;
		return this;
	}

	public Double getPrice() {
		return price;
	}

	public Entity setPrice(Double price) {
		this.price = price;
		return this;
	}

	public long getCreateTime() {
		return createTime;
	}

	public Entity setCreateTime(long createTime) {
		this.createTime = createTime;
		return this;
	}

	public Integer getRandomRegion() {
		return randomRegion;
	}

	public Entity setRandomRegion(Integer randomRegion) {
		this.randomRegion = randomRegion;
		return this;
	}

	public String getClassify() {
		return classify;
	}

	public Entity setClassify(String classify) {
		this.classify = classify;
		return this;
	}

	public String getDataFlag() {
		return dataFlag;
	}

	public Entity setDataFlag(String dataFlag) {
		this.dataFlag = dataFlag;
		return this;
	}

	public String getProject() {
		return project;
	}

	public Entity setProject(String project) {
		this.project = project;
		return this;
	}

	public Double getOldprice() {
		return oldprice;
	}

	public Entity setOldprice(Double oldprice) {
		this.oldprice = oldprice;
		return this;
	}

	public Integer getSellNumber() {
		return sellNumber;
	}

	public void setSellNumber(Integer sellNumber) {
		this.sellNumber = sellNumber;
	}

	public Integer getMonthlySalesVolume() {
		return monthlySalesVolume;
	}

	public void setMonthlySalesVolume(Integer monthlySalesVolume) {
		this.monthlySalesVolume = monthlySalesVolume;
	}

	public long getNewest() {
		return newest;
	}

	public Entity setNewest(long newest) {
		this.newest = newest;
		return this;
	}

	public Double getHot() {
		return hot;
	}

	public Entity setHot(Double hot) {
		this.hot = hot;
		return this;
	}

	public Double getPreferential() {
		return preferential;
	}

	public Entity setPreferential(Double preferential) {
		this.preferential = preferential;
		return this;
	}

	public String getProductid() {
		return productid;
	}

	public Entity setProductid(String productid) {
		this.productid = productid;
		return this;
	}

	public String getSource() {
		return source;
	}

	public Entity setSource(String source) {
		this.source = source;
		return this;
	}

	public String getShopId() {
		return shopId;
	}

	public Entity setShopId(String shopId) {
		this.shopId = shopId;
		return this;
	}

	public String getShopName() {
		return shopName;
	}

	public Entity setShopName(String shopName) {
		this.shopName = shopName;
		return this;
	}
	
	public String getShopFullName() {
		return shopFullName;
	}

	public void setShopFullName(String shopFullName) {
		this.shopFullName = shopFullName;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public String getFormatCreateTime(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(createTime);
	}
	
	public Double getSpreadPirce(){
		return (this.price>this.oldprice)?0.00:this.oldprice-this.price;
	}
	public int getTotalSales(){
		return (int) (commentCount+(System.currentTimeMillis()/1000000002));
	}
	public String getShipAddress(){
		return StringUtils.equals(this.city, this.state)?this.state:this.state+this.city;
	}
}
