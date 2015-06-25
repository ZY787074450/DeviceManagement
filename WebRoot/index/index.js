/**
 * 
 */
$(document).ready(function(){
	getTime();
});

function getTime(){
	var datestr = new Date();
	var weekstr = datestr.getDay();
	var str = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var weektime = "";
	for(var i=0;i<7;i++){
		if(weekstr == i){
			weektime = str[i];
		}
	}
	$("#nowtime").text(datestr.getFullYear()+"-"+datestr.getMonth()+"-"+datestr.getDate()+" "+weektime);
}

//根据导航栏一级菜单加载二三级菜单,pram(str一级菜单关联的div块id名)
function menulist(dividname){
	$.ajax({
		url : "",
		type : "POST",
		data : "",
		success : function(data){
			$(dividname+"_menulist").html();
		}
	});
}