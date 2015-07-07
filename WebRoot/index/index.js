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
	$("#nowtime").text(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate()+" "+weektime);
}
function setLoginname(){
	$.ajax({
		url : "/DeviceManagement/user/getusername.do",
		type : "POST",
		data : "",
		success : function(data){
			$("#userid").html(data.name);
		}
	});
	
}
//加载一级父菜单并布局操作区
function fatherMenuList(){
	$.ajax({
		url : "/DeviceManagement/user/getmemus.do",
		type : "POST",
		data : "&userid="+$("#userid").html()+"&menucode=0",
		success : function(data){
			//此处拼装前台最高级菜单列表&拼装前台最高级菜单对应操作区域
			var menu_html = '<li class="active" style="width: 100px;"><a href="#home" data-toggle="tab" onclick="getIndex()">首页</a></li>';
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
										 			+'<div id="bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'_menulist" class="span2" style="background-color: #E0F2F7;height: 640px;margin-left: 0px;padding-left: 10px;border-right: 3px solid #BCE0F5;"></div>'
										 			+'<div id="bj_'+menuArray[i].MENU_CJ+'_'+menuArray[i].TJPX+'_workarea" class="span10" style="background-color: #E0F2F7;height: 640px;margin-left: 0px;padding-left: 18px;">'
									+'</div></div></div></div></div>');
				}
			}
			$("#fathermenus").html(menu_html);
			$("#navtabsarea").append(dealarea_html);
		}
	});
}
function getIndex(){
	curr_fathercode = '';
	curr_menucode = '';
}

//根据导航栏一级菜单加载二级菜单,pram(str一级菜单关联的div块id名,父菜单代码)
var curr_fathercode = '';
function menulist(dividname,menucode,fathername){
	if(curr_fathercode!=menucode){
		curr_fathercode = menucode;
		curr_menucode = '';
		$.ajax({
			url : "/DeviceManagement/user/getmemus.do",
			type : "POST",
			data : "&userid="+$("#userid").html()+"&menucode="+menucode,
			success : function(data){
				//此处拼装前台菜单元素代码
				var menu_html = '<ul class="nav nav-list">'
								+'<li id="menu_li_'+dividname+'" class="active leftmenu">'
								+'<a href="#" >'
								+'<i class="icon-list"></i>'
								+'<span class="menu-text"><b>'+fathername+'</b></span>'
								+'</a><ul class="nav nav-list" id="ul_'+dividname+'" style="padding:0px 0px 0px 0px;">';
				if(data.menudatas != null && data.menudatas != 'null' && data.menudatas.length > 0){
					var menuArray = data.menudatas;
					for(var i=0;i<menuArray.length;i++){
						menu_html += '<li class="alert-block SecondLevelMenu leftmenu" id="li_'+menuArray[i].MENU_ID+'"><a href="#" onclick="openWin(\''+menuArray[i].MENU_URL+'\',\''+menuArray[i].MENU_ID+'\',\''+dividname+'\')"><i class="icon-hand-right"></i>'+menuArray[i].MENU_MC+'</a></li>';
					}
				}
				menu_html += '</ul></li></ul>';
				$("#"+dividname+"_menulist").html(menu_html);
				
			}
		});
		$("#"+dividname+"_workarea").html("");
	}
}
//递归函数，装载多级菜单列表,fathercode父菜单代码,menulist菜单列表data数组(二级及以上菜单等级暂不使用)
function repeatLoad(fathercode,menulist){	
}

//点击菜单后操作区加载菜单对应功能地址页面，对应菜单样式激活，其他菜单样式冻结
var curr_menucode = '';
function openWin(urlstr,menucode,dividname){
	if(curr_menucode != menucode){
		curr_menucode = menucode;
		menuStateSet(menucode);
		
		var htmlstr = '<iframe src="'+urlstr+'" width="99%" height="99%" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" scrolling="auto"></iframe>';
		$("#"+dividname+"_workarea").html(htmlstr);
	}
}

//对应菜单样式激活，其他菜单样式冻结
function menuStateSet(menucode){
	$(".SecondLevelMenu").each(function(i){
		if($(this).hasClass("bechecked")){
			$(this).removeClass("bechecked");
		}
	});
	$("#li_"+menucode).addClass("bechecked");
}

function greybackadd(){
	$("#greyground").show();
	$("#loading").show();
	$(".floatarea").show();
}
//屏幕遮罩移除，并移除非原始状态div
function greyback(){
	$("#old_password").val("");
	$("#new_password").val("");
	$("#new_password_again").val("");
	$(".floatarea").hide();
	$("#greyground").hide();
	$("#loading").hide();
}
function updatePassword(){
	if($("#new_password").val() == "" || $("#new_password_again").val() == "" || $("#old_password").val() == ""){
		alert("密码不能为空！");
		return;
	}
	if($("#new_password").val() == $("#new_password_again").val()){
		$.ajax({
			url : "/DeviceManagement/jcxx/mmxg/updateUserPassword.do",
			type : "POST",
			data : "&oldpassword="+$("#old_password").val()+"&newpassword="+$("#new_password").val(),
			success : function(data){
				if(data.userid){
					alert(data.info);
				}else{
					alert("数据处理异常，请联系系统管理员！");
				}
				greyback();
			}
		});
	}else{
		alert("再次输入的新密码与新密码不匹配！请确认！");
	}
}

