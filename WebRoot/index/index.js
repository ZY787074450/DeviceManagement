/**
 * 
 */
var bottomheight = 0;
$(document).ready(function(){
	setLoginname();
	getTime();
	setDatatablePosition();
	fatherMenuList();
	setPicSize();
	mapareadata();
	getZdqxsjList();
});
function setPicSize(){//设置首页地图大小及位置
	var fullheight = document.documentElement.clientHeight;//屏幕高度
	var fullwidth = document.documentElement.clientWidth;//屏幕宽度
	var perfectH = fullheight-$("#titlearea").outerHeight(true)-$("#fathermenuarea").outerHeight(true);
	var perfectW = fullwidth-4;
	
	$("body").css("overflow","hidden");
	
	$("#body_div").css("height",fullheight-8);
	$("#body_div").css("overflow","hidden");
	
	$("#navtabsarea").css("height",perfectH-15);
	$("#navtabsarea").css("max-height",perfectH-10);
	$("#navtabsarea").css("overflow","hidden");
	
	$("#mapdiv").css("height",perfectH-25);
	$("#mappic").css("max-width",perfectW);
	$("#mappic").css("max-height",perfectH-22);
	
	$("#map_td").css("height",perfectH-36);
	$("#map_td").css("max-width",perfectW-200-50);
	$("#map_td").css("max-height",perfectH-34);
}
//页面总布局
function setDatatablePosition(){
	bottomheight = document.documentElement.clientHeight-$("#titlearea").outerHeight(true)-$("#fathermenuarea").outerHeight(true);
	
   var OsObject = ""; 
   $("#navtabsarea").css("height",bottomheight-5);
   if(navigator.userAgent.indexOf("MSIE")>0) { 
		$("#navtabsarea").css("height",bottomheight-5);
   } 
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){ 
		$("#navtabsarea").css("height",bottomheight-5);
   } 
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) { 
	   if(isSafari=navigator.userAgent.indexOf("Chrome")>0) {
			$("#navtabsarea").css("height",bottomheight-5);
	   }else{
			$("#navtabsarea").css("height",bottomheight-25);
	   }
   }  
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){ 
		$("#navtabsarea").css("height",bottomheight-5); 
   } 
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){ 
		$("#navtabsarea").css("height",bottomheight-5);
   } 
   
}

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
	
	$("#currtime").text(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate()+" "+datestr.getHours()+":"+datestr.getMinutes()+":"+datestr.getSeconds());
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
			var menu_html = '<li class="active" style="width: 100px;"><a href="#home" data-toggle="tab" onclick="getIndex()"><font color="black">首页</font></a></li>';
			var dealarea_html = '';
			if(data.menudatas != null && data.menudatas != 'null' && data.menudatas.length > 0){
				var menuArray = data.menudatas;
				for(var i=0;i<menuArray.length;i++){
					menu_html += ('<li style="width: 100px;"><a href="#bj_'+menuArray[i].menu_cj+'_'+menuArray[i].tjpx
								+'" data-toggle="tab" onclick="menulist(\'bj_'+menuArray[i].menu_cj+'_'+menuArray[i].tjpx
								+'\',\''+menuArray[i].menu_id+'\',\''+menuArray[i].menu_mc+'\')"><font color="black">'+menuArray[i].menu_mc+'</font></a></li>');
					dealarea_html += ('<div id="bj_'+menuArray[i].menu_cj+'_'+menuArray[i].tjpx+'" class="tab-pane fade" style="height:'+($("#navtabsarea").height()-3)+'px;">'
										 	+'<div class="container-fluid" style="padding: 0px 0px 0px 0px;padding-top: 3px;height:'+($("#navtabsarea").height()-10)+'px;">'
										 		+'<div class="row-fluid" style="height:'+($("#navtabsarea").height()-12)+'px;">'
										 			+'<div class="span2" style="height:'+($("#navtabsarea").height()-15)+'px;"><div id="bj_'+menuArray[i].menu_cj+'_'+menuArray[i].tjpx+'_menulist" class="air" style="background-color: #E0F2F7;height: '+($("#navtabsarea").height()-18)+'px;margin-left: 10px;padding-left: 0px;padding-top: 10px;padding-right: 0px;border-radius:5px;border:1px solid #BEC6CA;"></div></div>'
										 			+'<div class="span10" style="margin-left: 10px;height:'+($("#navtabsarea").height()-15)+'px;"><div id="bj_'+menuArray[i].menu_cj+'_'+menuArray[i].tjpx+'_workarea" class="air" style="background-color: #E0F2F7;height: '+($("#navtabsarea").height()-18)+'px;margin-left: 0px;padding-left: 5px;padding-top: 10px;border-radius:5px;border:1px solid #BEC6CA;"></div></div>'
									+'</div></div></div>');
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
	var firstChildStr = '';//一级菜单的第一个子菜单(二级菜单)对应链接信息
	if(curr_fathercode!=menucode){
		curr_fathercode = menucode;
		curr_menucode = '';
		$.ajax({
			url : "/DeviceManagement/user/getmemus.do?time="+new Date(),
			type : "POST",
			data : "&userid="+$("#userid").html()+"&menucode="+menucode,
			success : function(data){
				//此处拼装前台菜单元素代码
				var menu_html = '<ul class="nav nav-list" style="padding-left:10px;padding-right:10px;">'
								+'<li id="menu_li_'+dividname+'" class="active leftmenu">'
								+'<a href="#" style="margin-left:-10px;margin-right:-10px;" >'
								+'<i class="icon-list"></i>'
								+'<span class="menu-text"><b>'+fathername+'</b></span>'
								+'</a><ul class="nav nav-list" id="ul_'+dividname+'" style="padding:0px 0px 0px 0px;">';
				if(data.menudatas != null && data.menudatas != 'null' && data.menudatas.length > 0){
					var menuArray = data.menudatas;
					for(var i=0;i<menuArray.length;i++){
						menu_html += '<li class="alert-block SecondLevelMenu leftmenu" id="li_'+menuArray[i].menu_id+'"><a href="#" id="a_'+menuArray[i].menu_id+'" onclick="openWin(\''+menuArray[i].menu_url+'\',\''+menuArray[i].menu_id+'\',\''+dividname+'\')" style="margin-left:-10px;margin-right:-10px;"><i class="icon-hand-right"></i>'+menuArray[i].menu_mc+'</a></li>';
						if(i==0){
							firstChildStr = menuArray[i].menu_id;
						}
					}
				}
				menu_html += '</ul></li></ul>';
				$("#"+dividname+"_menulist").html(menu_html);
				
				if(firstChildStr != ''){
					$("#a_"+firstChildStr).click();
				}
			}
		});
		//$("#"+dividname+"_workarea").html("");
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
		if(urlstr.indexOf("undefined") >= 0){
			$("#"+dividname+"_workarea").html('<font size="+2" color="red">该功能正在开发中，敬请等待！</font>');
		}else{
			var htmlstr = '<iframe src="'+urlstr+'" width="99%" height="99%" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" scrolling="auto"></iframe>';
			$("#"+dividname+"_workarea").html(htmlstr);
		}
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

function loginout(){
	if(confirm("用户即将退出系统，请确认？")){
		$.ajax({
			url: "/DeviceManagement/user/backlogin.do",
			type: "POST",
			data: "",
			success: function(data){
				alert("用户已安全退出！");
				location.reload();
			}
		});
	}
}

function allset(){
	$("input:checkbox[name='sjyscondition']").each(function(){
		if($(this).val()!='0'){
			$(this).attr('checked',$("input:checkbox[value='0']").is(':checked'));
		}
	});
	showZdqxsj();
}
function oneset(){
	$("input:checkbox[value='0']").attr('checked',false);
	showZdqxsj();
}
//首页地图站点分布数据
function mapareadata(){
	var xyr = ["845,970,20"];
	var msg = ["M3801"];
	var area_html = '';
	for(var i=0;i<xyr.length;i++){
		area_html += '<area shape="circle" coords="'+xyr[i]+'"  onclick="showJgxx(\''+msg[i]+'\')" target="_blank" alt="'+msg[i]+'" title="">';
	}
	
	$("#areaplace").append(area_html);
}

function showJgxx(jgid){
	greybackadd();
	$("#data_table").html("");
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/cx.do?time="+new Date(),
		type : "POST",
		data : "&jgid="+jgid,
		success : function(data){
			var tablehtml = '<tr>'
							+'<th>站点编号</th>'
							+'<th>站点名称</th>'
							+'<th>站点类型</th>'
							+'<th>站点所属区域</th>'
							+'<th width="120px">地址</th>'
							+'<th>联系人</th>'
							+'<th>联系电话</th>'
							+'<th>站点状态</th>'
							+'<th>站点要素</th>'
							+'<th>站点安装人</th>'
							+'<th>安装时间</th>'
						+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
			var jglist = data.jglist;
			for(var i=0;i<jglist.length;i++){
				tablehtml += ('<tr>'
								+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
								+'<td><a href="#" title="'+(jglist[i].note?jglist[i].note:'')+'">'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</a></td>'
								+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jgqymc?jglist[i].jgqymc:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jgdz?jglist[i].jgdz:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jglxr?jglist[i].jglxr:'')+'</td>'
								+'<td>'+(jglist[i].jglxdh?jglist[i].jglxdh:'')+'</td>'
								+'<td>'+(jglist[i].jgzt=="0"?'正常':'注销')+'</td>'
								+'<td>'+(jglist[i].jgys?jglist[i].jgys:'')+'</td>'
								+'<td>'+(jglist[i].azr?jglist[i].azr:'')+'</td>'
								+'<td>'+(jglist[i].lrrq?jglist[i].lrrq:'')+'</td>'
							+'</tr>');
				
				tablehtml += '<tr id="clickopen"><td colspan="11" align="center"><a href="###" onclick="openSbxxTable(\''+jgid+'\')">点击展开站点设备信息<i class="icon-chevron-down"></i></a></td></tr>';
				tablehtml += '<tr id="sbxxtable" style="display: none;"><td colspan="11">正在获取数据，请稍等！！！</td></tr>';
			}
			}
			$("#data_table").append(tablehtml);
		}
	});
}

//加载站点设备信息
function openSbxxTable(jgid){
	$("#sbxxtable").show();
	$.ajax({
		url : "/DeviceManagement/sbgl/sbsy/cx.do?time="+new Date(),
		type : "POST",
		data : "&jgid="+jgid,
		success : function(data){
			var tablehtml = '<th>设备名称</th>'
								+'<th>设备使用站点</th>'
								+'<th>设备状态</th>'
								+'<th>设备安装人</th>'
								+'<th celspan="8">近期检定人</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td><a href="#" title="'+(sbsyList[i].note?sbsyList[i].note:'')+'">'+(sbsyList[i].sbmc?sbsyList[i].sbmc:'暂无数据')+'</a></td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyList[i].sbzt=="0"?'使用':(sbsyList[i].sbzt=="1"?'维修':'报废'))+'</td>'
									+'<td>'+(sbsyList[i].azr?sbsyList[i].azr:'暂无数据')+'</td>'
									+'<td>'+(sbsyList[i].jdr?sbsyList[i].jdr:'')+'</td>');
				}
			}
			$("#sbxxtable").html(tablehtml);
			$("#clickopen").html('<td colspan="11" align="center"><a href="###" onclick="closeSbxxTable(\''+jgid+'\')">点击关闭站点设备信息<i class="icon-chevron-up"></i></a></td>');
		}
	});
}
function closeSbxxTable(jgid){
	$("#sbxxtable").html('<td colspan="11">正在获取数据，请稍等！！！</td>');
	$("#sbxxtable").hide();
	$("#clickopen").html('<td colspan="11" align="center"><a href="###" onclick="openSbxxTable(\''+jgid+'\')">点击展开站点设备信息<i class="icon-chevron-down"></i></a></td>');
}

//加载气象站点气象数据list
var zdqxsjlist = [];
function getZdqxsjList(){
	$.ajax({
		url: "/DeviceManagement/zdgl/qxsjdr/cx.do?time="+new Date(),
		type: "POST",
		data: "",
		success: function(data){
			zdqxsjlist = data.jglist;
			showZdqxsj();
		}
	});
}

function showZdqxsj(){
	for(var i=0;i<zdqxsjlist.length;i++){
		$("area[alt='"+zdqxsjlist[i].jgid+"']").attr("title",strCreate(zdqxsjlist[i]));
	}
}
function strCreate(formOp){
	var str = '';
	str += ($("input:checkbox[value='3']").attr('checked'))?('风向:'+formOp.fx+';'):'';
	str += ($("input:checkbox[value='4']").attr('checked'))?('风速:'+formOp.fs+';'):'';
	str += ($("input:checkbox[value='5']").attr('checked'))?('雨量:'+formOp.yl+';'):'';
	str += ($("input:checkbox[value='6']").attr('checked'))?('温度:'+formOp.wd+';'):'';
	str += ($("input:checkbox[value='7']").attr('checked'))?('湿度:'+formOp.sd+';'):'';
	str += ($("input:checkbox[value='8']").attr('checked'))?('气压:'+formOp.qy+';'):'';
	return str;
}


