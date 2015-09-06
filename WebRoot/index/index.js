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
	initQxsjsjOp();
	//getZdqxsjList();
	$("#fullpageheight").val(document.documentElement.clientHeight);
	openThead();
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
	var percentPic_x = (perfectW-200-50-20)/3200;
	var percentPic_y = (perfectH-36-2)/3178;
	$("#map").css("height",percentPic_x * 3178);
	$("#map").css("width",percentPic_x * 3200);
	
	mapareadata(percentPic_x,percentPic_x);//首页地图map模式点域设置
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
	
	//$("#currtime").text(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate()+" "+datestr.getHours()+":"+datestr.getMinutes()+":"+datestr.getSeconds());
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
	openTheadAgain();
}

//根据导航栏一级菜单加载二级菜单,pram(str一级菜单关联的div块id名,父菜单代码)
var curr_fathercode = '';
function menulist(dividname,menucode,fathername){
	theadstop = true;
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
						menu_html += '<li class="alert-block SecondLevelMenu leftmenu " id="li_'+menuArray[i].menu_id+'"><a href="#" id="a_'+menuArray[i].menu_id+'" onclick="openWin(\''+menuArray[i].menu_url+'\',\''+menuArray[i].menu_id+'\',\''+dividname+'\')" style="margin-left:-10px;margin-right:-10px;"><i class="icon-hand-right"></i>'+menuArray[i].menu_mc+'</a></li>';
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
function oneset(num){
	$("input:checkbox").attr('checked',false);
	$("input:checkbox[value='"+num+"']").attr('checked',true);
	showZdqxsj();
}


//首页地图站点分布数据
function mapareadata(percentPic_x,percentPic_y){//参数为当前页面中图片显示与原图的大小比率 <1.0
	var xyr = ["845,968,17","1929,146,17","2104,250,17","1892,386,17","2322,354,17","2474,412,17","1884,635,17","1994,802,17","2866,838,17","2306,871,17",
	           "1103,891,17","2436,916,17","1347,925,17","1249,1000,17","1862,960,17","2164,961,17","2698,920,17","2527,1002,17","1492,1016,17","2430,1090,17",
	           "2876,1057,17","1942,1096,17","955,1100,17","1108,1132,17","1353,1100,17","1320,1171,17","2573,1157,17","2855,1195,17","737,1222,17","1595,1228,17",
	           "2278,1260,17","2054,1289,17","2865,1291,17","850,1320,17","940,1354,17","2478,1352,17","1493,1388,17","1258,1410,17","2227,1452,17","2726,1455,17",
	           "713,1483,17","963,1487,17","1676,1450,17","1828,1496,17","2530,1487,17","1430,1511,17","576,1560,17","2149,1565,17","424,1652,17","1392,1658,17",
	           "2256,1690,17","2672,1658,17","1050,1695,17","2075,1650,17","2476,1737,17","765,1718,17","1773,1710,17","1267,1850,17","434,1846,17","1071,1841,17",
	           "2612,1847,17","736,1940,17","2726,1942,17","1162,1972,17","296,2007,17","453,2109,17","959,2250,17","343,2336,17","655,2336,17","800,2475,17",
	           "291,2532,17","500,2529,17","934,2520,17","1074,2560,17","987,2794,17","765,2818,17","1100,2857,17","2280,1050,17","2670,1065,17",
	           "1110,2166,17","1242,1245,17","2443,744,17"];
	var msg = ["M3801","M7081","M7006","M7008","M7082","M3752","M2755","M7098","M7001","M7007",
	           "M7034","M7003","M5810","M7035","M7099","M7097","M7092","M5778","M5813","M7002",
	           "M7009","M7095","M7027","M7022","M7033","M7026","M7010","M5780","M7025","M7031",
	           "M7096","M7094","M7087","M5812","M7030","M3754","M7023","M7028","M7086","M3751",
	           "M7029","M7024","M7083","M7084","M7091","M5815","M7051","M7005","M7054","M7032",
	           "M7085","M7090","M3802","M5783","M7088","M5840","M5779","M7048","M3777","M7049",
	           "M7089","M7046","M3753","M5835","M7052","M5832","M7047","M7004","M5834","M7050",
	           "M7053","M5833","M3776","M5836","M5838","M5837","M5839","M5777","M7093",
	           "58345","58342","58343"];
	var msg_name = ["薛埠镇","孟河风顺","孟河镇","西夏墅镇","春江魏村","春江镇","罗溪镇","奔牛镇","郑陆镇","薛家镇",
	           "直溪镇","河海街道","金城镇","金城白塔","邹区镇","北港街道","郑陆东青","青龙街道","金城河头","红梅街道",
	           "横山桥镇","邹区卜弋","朱林镇","后阳小学","华城小学","河滨小学","雕庄街道","横林崔桥","薛埠小学","尧塘小学",
	           "湖塘镇","西湖街道","横林镇","薛埠罗村","朱林唐王","湖塘三勤","水北小学","长荡湖","南夏墅街道","洛阳镇",
	           "薛埠上阮","指前社头","湟里镇","湟里村前","礼嘉镇","儒林湖管会","竹箦镇","前黄渔管会","竹箦永和","儒林镇",
	           "前黄镇","洛阳戴溪","指前镇","前黄寨桥","前黄运村","竹箦后周","湟里东安","上黄镇","上兴镇","别桥镇",
	           "雪堰潘家","别桥前马","雪堰镇","埭头镇","上兴上沛","南渡镇","溧阳西","社渚东升","社渚周城","天目湖烈山",
	           "社渚河心","社渚镇","天目湖镇","戴埠镇","天目湖杨村","天目湖平桥","戴埠横涧","南大街街道","戚墅堰潞城",
	           "溧阳基本站","金坛一般站","常州基本站"];
	var area_html = '';
	var div_html = '';
	var div_title = '';
	var div_mouseover = '';
	var div_message = '';
	for(var i=0;i<xyr.length;i++){
		if(percentPic_x){
			var arr_xyz = xyr[i].split(",");
			xyr[i] = parseInt(parseInt(arr_xyz[0]) * percentPic_x)+","+arr_xyz[1]+","+parseInt(parseInt(arr_xyz[2]) * percentPic_x);
		}
		if(percentPic_y){
			var arr_xyz = xyr[i].split(",");
			xyr[i] = arr_xyz[0]+","+parseInt(parseInt(arr_xyz[1]) * percentPic_y)+","+arr_xyz[2];
		}
		div_html += '<div style="padding:0 0 0 0;margin:0 0 0 0;align: left;height='+(parseInt(xyr[i].split(",")[2])*2+2)+'px;position:absolute;left:'+(parseInt(xyr[i].split(",")[0])-20*percentPic_x)+'px;top:'+(parseInt(xyr[i].split(",")[1])-28*percentPic_y)+'px;"><img class="img_point" id="_'+msg[i]+'" src="red_point.png" onclick="showJgxx(\''+msg[i]+'\')" width="'+(parseInt(xyr[i].split(",")[2])*2+2)+'px";height="'+(parseInt(xyr[i].split(",")[2])*2+2)+'px;" onmouseover="showtitle(\''+msg[i]+'\')" onmouseout="hidetitle(\''+msg[i]+'\')"><span class="msg2" id="msg_'+msg[i]+'"></span></div>';
		area_html += '<area style="outline: 1px solid green;" shape="circle" coords="'+xyr[i]+'" onclick="showJgxx(\''+msg[i]+'\')" target="_blank" alt="'+msg[i]+'">';
		div_title += '<div class="div_title" id="title_'+msg_name[i]+'" style="border:0px dashed black;padding:0 0 0 0;margin:0 0 0 0;position:absolute;left:'+(parseInt(xyr[i].split(",")[0])-20*percentPic_x-20)+'px;top:'+(parseInt(xyr[i].split(",")[1])-28*percentPic_y+(parseInt(xyr[i].split(",")[2])*2+3))+'px;">'+((msg[i]=='58345' || msg[i]=='58342' || msg[i]=='58343')?('<font color="green"><b>'+msg_name[i]+'</b></font>'):('<font size="-1"><b>'+msg_name[i]+'</b></font>'))+'</div>';
		div_mouseover += '<div class="div_title2" id="title_'+msg[i]+'" style="border:1px dashed black;background-color: white;padding:0 0 0 0;margin:0 0 0 0;position:absolute;left:'+(parseInt(xyr[i].split(",")[0])-20*percentPic_x-20)+'px;top:'+(parseInt(xyr[i].split(",")[1])-28*percentPic_y+(parseInt(xyr[i].split(",")[2])*2+3))+'px;"><b>站点:'+msg[i]+'</b></div>';
	}
	
	$("#areaplace").append(area_html);
	$("#map_td").append(div_title);
	$("#map_td").append(div_html);
	
	$("#map_td").append(div_mouseover);
	$(".div_title").show();
}

function showtitle(divid){
	$("#title_"+divid).show();
}
function hidetitle(divid){
	$("#title_"+divid).hide();
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
							+'<th>站点所属区域</th>'
							+'<th width="200px">地址</th>'
							+'<th>站点状态</th>'
							+'<th>安装时间</th>'
						+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
			var jglist = data.jglist;
			for(var i=0;i<jglist.length;i++){
				tablehtml += ('<tr>'
								+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jgqymc?jglist[i].jgqymc:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jgdz?jglist[i].jgdz:'暂无数据')+'</td>'
								+'<td>'+(jglist[i].jgzt=="0"?'正常':'注销')+'</td>'
								+'<td>'+(jglist[i].lrrq?jglist[i].lrrq:'')+'</td>'
							+'</tr>');
				
				tablehtml += '<tr id="clickopen"><td colspan="6" style="text-align: left;"><a href="###" onclick="openSbxxTable(\''+jgid+'\')"><font size="+1"><b>站点设备</b></font><i class="icon-chevron-down"></i></a></td></tr>';
				tablehtml += '<tr id="sbxxtr" style="display: none;"><td colspan="6" id="sbxxtable">正在获取数据，请稍等！！！</td></tr>';
			}
			}
			$("#data_table").append(tablehtml);
		}
	});
}

//加载站点设备信息
function openSbxxTable(jgid){
	$("#sbxxtr").show();
	$.ajax({
		url : "/DeviceManagement/sbgl/sbsy/cx.do?time="+new Date(),
		type : "POST",
		data : "&jgid="+jgid+"&sbzt=0",
		success : function(data){
			var tablehtml = '<table width="100%"><tr><th>设备名称</th>'
								+'<th>设备使用站点</th>'
								+'<th>设备状态</th>'
								+'<th>设备安装人</th>'
								+'<th>安装日期</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(sbsyList[i].sbmc?sbsyList[i].sbmc:'暂无数据')+'</td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyList[i].sbzt=="0"?'使用':(sbsyList[i].sbzt=="1"?'维修':'报废'))+'</td>'
									+'<td>'+(sbsyList[i].azr?sbsyList[i].azr:'暂无数据')+'</td>'
									+'<td>'+(sbsyList[i].azrq?sbsyList[i].azrq:'')+'</td></tr>');
				}
			}
			tablehtml += '</table>';
			$("#sbxxtable").html(tablehtml);
			$("#clickopen").html('<td colspan="6" style="text-align: left;"><a href="###" onclick="closeSbxxTable(\''+jgid+'\')"><font size="+1"><b>站点设备</b></font><i class="icon-chevron-up"></i></a></td>');
		}
	});
}
function closeSbxxTable(jgid){
	$("#sbxxtable").html('正在获取数据，请稍等！！！');
	$("#sbxxtr").hide();
	$("#clickopen").html('<td colspan="6" style="text-align: left;"><a href="###" onclick="openSbxxTable(\''+jgid+'\')"><font size="+1"><b>站点设备</b></font><i class="icon-chevron-down"></i></a></td>');
}

//加载气象站点气象数据list
var zdqxsjlist = [];
function getZdqxsjList(){
	$.ajax({
		url: "/DeviceManagement/zdgl/qxsjdr/cx.do?time="+new Date(),
		type: "POST",
		data: "&qxsj="+($("#currtime_8 option:selected").val()?$("#currtime_8 option:selected").val():''),
		success: function(data){
			zdqxsjlist = data.jglist;
			showZdqxsj();
		}
	});
}

function showZdqxsj(){
	
	/*$(".img_point").each(function(){
		$(this).attr("title","站点"+$(this).attr("id").split("_")[1]+"暂无数据");
		$("#title_"+zdqxsjlist[i].jgid).html("站点"+$(this).attr("id").split("_")[1]+"暂无数据");
	});*/
	$(".div_title").each(function(){
		if($(this).attr("id").split("_")[1]=='溧阳基本站' || $(this).attr("id").split("_")[1]=='金坛一般站' || $(this).attr("id").split("_")[1]=='常州基本站'){
			$(this).html("<font color='green'><b>"+$(this).attr("id").split("_")[1]+"</b></font>");
		}else{
			$(this).html("<font size='-1'><b>"+$(this).attr("id").split("_")[1]+"</b></font>");
		}
		//$(this).hide();
	});
	$(".div_title2").each(function(){
		$(this).html("<b>站点:"+$(this).attr("id").split("_")[1]+"</b>");
	});
	$(".img_point").attr("src","red_point.png");
	$(".msg2").html("");
	for(var i=0;i<zdqxsjlist.length;i++){
		//$("area[alt='"+zdqxsjlist[i].jgid+"']").attr("title",strCreate(zdqxsjlist[i]));
		$("#_"+zdqxsjlist[i].jgid).attr("src","blue_point.png");
		//$("#_"+zdqxsjlist[i].jgid).attr("title",'站点:'+zdqxsjlist[i].jgid+';'+strCreate(zdqxsjlist[i]));
		if(zdqxsjlist[i].jgid=='58342' || zdqxsjlist[i].jgid=='58343' || zdqxsjlist[i].jgid=='58345'){
			$("#title_"+zdqxsjlist[i].jgmc).html('<font color="green"><b>'+zdqxsjlist[i].jgmc+'</b></font>');
		}else{
			$("#title_"+zdqxsjlist[i].jgmc).html('<font size="-1"><b>'+zdqxsjlist[i].jgmc+'</b></font>');
		}
		$("#msg_"+zdqxsjlist[i].jgid).html('<font size="-1"><b>'+strCreate(zdqxsjlist[i])+'</b></font>');
		$("#title_"+zdqxsjlist[i].jgid).html('<b>站点:'+zdqxsjlist[i].jgid+';'+strCreate2(zdqxsjlist[i])+'</b>');
	}
}
function strCreate(formOp){
	var str = '';
	str += ($("input:checkbox[value='0']").attr('checked'))?('<font color="blue">编号'+formOp.jgid+'</font>'):'';
	str += ($("input:checkbox[value='3']").attr('checked'))?('<font color="blue">风向'+formOp.fx+'</font>'):'';
	str += ($("input:checkbox[value='4']").attr('checked'))?('<font color="blue">风速'+formOp.fs+'</font>'):'';
	str += ($("input:checkbox[value='5']").attr('checked'))?('<font color="blue">雨量'+formOp.yl+'</font>'):'';
	str += ($("input:checkbox[value='6']").attr('checked'))?('<font color="blue">温度'+formOp.wd+'</font>'):'';
	str += ($("input:checkbox[value='7']").attr('checked'))?('<font color="blue">湿度'+formOp.sd+'</font>'):'';
	str += ($("input:checkbox[value='8']").attr('checked'))?('<font color="blue">气压'+formOp.qy+'</font>'):'';
	return str;
}
function strCreate2(formOp){
	var str = '';
	str += ('<br/><font color="blue">风向:'+formOp.fx+';</font>');
	str += ('<br/><font color="blue">风速:'+formOp.fs+';</font>');
	str += ('<br/><font color="blue">雨量:'+formOp.yl+';</font>');
	str += ('<br/><font color="blue">温度:'+formOp.wd+';</font>');
	str += ('<br/><font color="blue">湿度:'+formOp.sd+';</font>');
	str += ('<br/><font color="blue">气压:'+formOp.qy+';</font>');
	return str;
}

QxsjsjOp = {
		timeArr : [],
		timeOp : "",
		timeNotesArr : []
};
function initQxsjsjOp(){
	QxsjsjOp.timeOp = $("#currtime_8");
}
function setQxsjsjOp(list){
	var str = '';
	str += '<option value="请选择时间"></option>';
	for(var i=0;i<list.length;i++){
		QxsjsjOp.timeArr[i] = list[i].timepoint;
		QxsjsjOp.timeNotesArr[i] = list[i].timenotes;
		if(i==0){
			str += '<option value="'+list[i].timepoint+'" selected="selected">'+list[i].timepoint+'</option>';
		}else{
			str += '<option value="'+list[i].timepoint+'">'+list[i].timepoint+'</option>';
		}
	}
	QxsjsjOp.timeOp.html(str);
	getZdqxsjList();
}
//气象数据最新时间(最新时间、最新数据)获取
function qxsjzxsj(){
	clearTimeout(thead);
	$.ajax({
		url: "/DeviceManagement/user/qxsjzxsj/cx.do?time="+new Date(),
		type: "POST",
		data: "&lasttime="+(QxsjsjOp.timeArr[0]?QxsjsjOp.timeArr[0]:'')+"&lasttimenotes="+(QxsjsjOp.timeNotesArr[0]?QxsjsjOp.timeNotesArr[0]:''),
		success: function(data){
			if(data.code == '200'){
				setQxsjsjOp(data.newtimelist);
			}else if(data.code == '202'){
				setQxsjsjOp(data.newtimelist);
			}
		},
		complete: function(){
			if(!theadstop){
				openThead();
			}
		}
	});
}
var theadstop = false;
//单线程函数
var thead;
function openThead(){
	thead=setTimeout("qxsjzxsj()",1000);
}

function openTheadAgain(){
	theadstop = false;
	openThead();
}

