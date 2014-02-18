
youboy = {};

youboy.select = function() {

	var selectItems = [];

	$(':checkbox[name="items"][checked]').each(function() {
		selectItems.push($(this).val());
	});

	return selectItems;
};

youboy.selectAll = function() {
	$(':checkbox[name="items"]').attr('checked', true);
};

youboy.unselectAll = function() {
	$(':checkbox[name="items"]').attr('checked', false);
};

youboy.search = function() {
	$('#myForm').attr("method", "get").submit();
};

youboy.jumpPage = function(pageNo){
	$("#pageNo").val(pageNo);
	$("#myForm").attr("method", "get");
	$("#myForm").submit();
};



$(function() {
	$("#select_all").click(function() {
		youboy.selectAll();
	});
	
	$("#unselect_all").click(function() {
		youboy.unselectAll();
	});
	
	$("#search").click(function() {
		youboy.search();
	});
});