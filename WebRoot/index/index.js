/**
 * 
 */
$(document).ready(function(){
	setLoginname();
	getTime();
	fatherMenuList();
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
//加载一级父菜单并布局操作区
function fatherMenuList(){
	$.ajax({
		url : "/DeviceManagement/user/getmemus.do",
		type : "POST",
		data : "&userid="+$("#userid").html()+"&menucode=0",
		success : function(data){
			//此处拼装前台最高级菜单列表&拼装前台最高级菜单对应操作区域
			var menu_html = '<li class="active" style="width: 100px;"><a href="#home" data-toggle="tab">首页</a></li>';
			var dealarea_html = '';
			if(data.menudatas != null && data.menudatas != 'null' && data.menudatas.length > 0){
				var menuArray = data.menudatas;
				for(var i=0;i<menuArray.length;i++){
					menu_html += ('<li style="width: 100px;"><a href="#bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX
								+'" data-toggle="tab" onclick="menulist(\'bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX
								+'\',\''+menuArray[i].MENU_ID+'\',\''+menuArray[i].MENU_MC+'\')">'+menuArray[i].MENU_MC+'</a></li>');
					dealarea_html += ('<div id="bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'" class="tab-pane fade">'
										 +'<div style="background-color: #E0F2F7;">'
										 	+'<div class="container-fluid" style="padding: 0px 0px 0px 0px;padding-top: 10px;">'
										 		+'<div class="row-fluid">'
										 			+'<div id="bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'_menulist" class="span2" style="background-color: #E0F2F7;height: 650px;margin-left: 10px;border-right: 3px solid #BCE0F5;"></div>'
										 			+'<div id="bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'_workarea" class="span10" style="background-color: #E0F2F7;height: 650px;margin-left: 18px;">'
									+'</div></div></div></div></div>');
				}
			}
			$("#fathermenus").html(menu_html);
			$("#navtabsarea").append(dealarea_html);
		}
	});
}

//根据导航栏一级菜单加载二级菜单,pram(str一级菜单关联的div块id名,父菜单代码)
function menulist(dividname,menucode,fathername){
	$.ajax({
		url : "/DeviceManagement/user/getmemus.do",
		type : "POST",
		data : "&userid="+$("#userid").html()+"&menucode="+menucode,
		success : function(data){
			//此处拼装前台菜单元素代码
			var menu_html = '<ul class="nav nav-list">'
							+'<li id="menu_li_'+dividname+'" class="active">'
							+'<a href="#" >'
							+'<i class="icon-list"></i>'
							+'<span class="menu-text">'+fathername+'</span>'
							+'</a><ul class="submenu" id="ul_'+dividname+'">';
			if(data.menudatas != null && data.menudatas != 'null' && data.menudatas.length > 0){
				var menuArray = data.menudatas;
				for(var i=0;i<menuArray.length;i++){
					menu_html += '<li id="li_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'"><a href="#" onclick="openWin(\'此处为菜单对应的URL地址\')"><i class="icon-double-angle-right"></i>'+menuArray[i].MENU_MC+'</a></li>';
				}
			}
			menu_html += '</ul></li></ul>';
			$("#"+dividname).html(menu_html);
		}
	});
}
//递归函数，装载多级菜单列表,fathercode父菜单代码,menulist菜单列表data数组(暂不使用)
function repeatLoad(fathercode,menulist){	
}

//操作区加载菜单对应功能地址页面
function openWin(urlstr){
	
}


