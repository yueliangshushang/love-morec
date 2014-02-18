jQuery(document).ready( function($) {
	var sort_list_mouse=$("#i_sort_list>div>div");
	 sort_list_mouse.mouseover(function() {
		 $(this).addClass("item_hover");
	});
	 sort_list_mouse.mouseleave(function() {
		 $(this).removeClass("item_hover");
	 });
});