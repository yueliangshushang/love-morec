<#assign totalPages="${(page.totalPages gt 2000)?string('2000',page.totalPages)}" >
<div class="page_wrap">
	<div class="paginator">
	<#if totalPages?number gt 1>
		<#if (page.pageNo?number) gt 1>		
		<a class="" href="${pagingUrl }${((page.pageNo?number-1) gt 0)?string(page.pageNo?number-1,page.pageNo?number)}${pagingUrlSuffix}"><b>&lt;</b>上一页</a>
		</#if>
		<#if page.pageNo?number == 1>		
		<span class="page-start"><b>&lt;</b>上一页</span>
		<span class="page-this">1</span>
		<#else>		
		<a href="${pagingUrl }1${pagingUrlSuffix}">1</a>
		</#if>
		
		<#if totalPages?number gt 0>
			<#if page.pageNo?number lt 10>
				<#if page.pageNo?number gte 2>
				<#list 2..page.pageNo?number as i>
					<#if page.pageNo?number==i>
						<span class="page-this">${i}</span>
					<#else>
						<a href="${pagingUrl }${i}${pagingUrlSuffix}">${i}</a>
					</#if>
				</#list>
				</#if>
			<#else>
				  <span class="page-break">...</span>
				  <#list page.pageNo?number-4..page.pageNo?number as i>
					<#if page.pageNo?number==i>
						<span class="page-this">${i}</span>
					<#else>
						<a href="${pagingUrl }${i}${pagingUrlSuffix}">${i}</a>
					</#if>
				  </#list>
			</#if>
		</#if>
		<#if page.pageNo?number gte totalPages?number-4 || totalPages?number-4 lte 0>
			<#if page.pageNo?number+1 lte totalPages?number>
			<#list page.pageNo?number+1..totalPages?number as i>
				<a href="${pagingUrl }${i}${pagingUrlSuffix}">${i}</a>
				<#if page.pageNo?number == i>
					<span class="page-this">${i}</span>
				</#if>
			</#list>
			</#if>
		<#else>
			<#list page.nextPage..page.pageNo?number+4 as i>
				<#if page.pageNo?number == i>
					<span class="page-this">${i}</span>
				<#else>
					<a href="${pagingUrl }${i}${pagingUrlSuffix}">${i}</a>
				</#if>
			</#list>
			  <span class="page-break">...</span>
			  <a href="${pagingUrl }${totalPages}${pagingUrlSuffix}">${totalPages}</a>
		</#if>
		<#if page.pageNo?number lt totalPages?number>
		<a href="${pagingUrl }${((page.nextPage) lt totalPages?number)?string(page.nextPage,totalPages?number)}${pagingUrlSuffix}" class="page-next">下一页<b>&gt;</b></a>
		<#else>		
		<span class="page-end">下一页<b>&gt;</b></span>
		</#if>
		<span class="page-skip">
		共${totalPages}页，到第<input type="text" value="${page.pageNo}" maxlength="3">页
		<button value="go"
			onClick="var a=parseInt($(this).parent().find(&#39;input[type=text]&#39;).val(),10);a=(!!a&amp;&amp;a&gt;0&amp;&amp;a&lt;=29)?a:1;window.location.href=&#39;${pagingUrl }&#39;+a+&#39;${pagingUrlSuffix}#list&#39;">
			确定
		</button>
		</span>
	</#if>
	</div>
</div>