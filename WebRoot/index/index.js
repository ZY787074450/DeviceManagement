/**
 * 
 */
$(document).ready(function(){
	setLoginname();
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
function setLoginname(){
	var loginname = "未知";
	var str = (window.location.href).split("?");
	if(str.length>1){
		var params = str[1].split("&");
		for(var i=0;i<params.length;i++){
			if((params[i].split("="))[0]=="username"){
				loginname = decodeURI((params[i].split("="))[1]);
			}
		}
	}
	$("#userid").html(loginname);
}

//根据导航栏一级菜单加载二三级菜单,pram(str一级菜单关联的div块id名)
function menulist(dividname){
	$.ajax({
		url : "/DeviceManagement/user/getmemus.do",
		type : "POST",
		data : "&userid="+$("#userid").html()+"&menucode="+dividname,
		success : function(data){
			//此处拼装前台菜单元素代码
			if(data.menudatas != null && data.menudatas != 'null'){
				var menuArray = data.menudatas;
				
			}
			$(dividname+"_menulist").html();
			
		}
	});
}