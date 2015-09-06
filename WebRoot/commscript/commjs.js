/**
 * 通用分页排序查询查询javascript代码区
 */
var timeArr = ["2015-1-1 00:00:00","2015-1-31 23:59:59","2015-1-1","2015-1-31"];//当月月初与当月月末
$(document).ready(function(){	
	$("#currpage").val("1");
	$("#countline").val("10");
	$("#sum").text("0");
	divloadcenter();
	currpage = parseInt($("#currpage").val());
	countline = parseInt($("#countline").val());
	$("#countline").bind("keyup", function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
        	$("#countline").blur();
        }
    });
	var datestr = new Date();
	timeArr[0] = datestr.getFullYear()+"-"+((datestr.getMonth()+1)<10?("0"+(datestr.getMonth()+1)):(datestr.getMonth()+1))+"-01"+" 00:00:00";
	timeArr[1] = datestr.getFullYear()+"-"+((datestr.getMonth()+1)<10?("0"+(datestr.getMonth()+1)):(datestr.getMonth()+1))+"-"+(new Date(datestr.getFullYear(),datestr.getMonth()+1,0).getDate())+" 23:59:59";
	timeArr[2] = datestr.getFullYear()+"-"+((datestr.getMonth()+1)<10?("0"+(datestr.getMonth()+1)):(datestr.getMonth()+1))+"-01";
	timeArr[3] = datestr.getFullYear()+"-"+((datestr.getMonth()+1)<10?("0"+(datestr.getMonth()+1)):(datestr.getMonth()+1))+"-"+(new Date(datestr.getFullYear(),datestr.getMonth()+1,0).getDate());
});
var mouseclickX = 0;//鼠标点击位置X
var mouseclickY = 0;//鼠标点击位置Y
function getMousePosition(event){
	mouseclickX=event.clientX;
	mouseclickY=event.clientY;
}

var currpage = 1;
var countline = 10;
function fenye(sortname){
	disOrEnable();
	return "&ispaging=true&currpage="+currpage+"&countline="+countline+"&sortname="+sortname;
}

function pageup(sortname){//上一页
	currpage = currpage - 1;
	countline = parseInt($("#countline").val());
	$("#currpage").val(currpage);
	$("#countline").val(countline);
	return fenye(sortname);
}

function refresh(sortname){//跳转指定页
	currpage = parseInt($("#currpage").val());
	countline = parseInt($("#countline").val());
	$("#countline").val(countline);
	return fenye(sortname);
}

function pagedown(sortname){//下一页
	currpage = currpage + 1;
	countline = parseInt($("#countline").val());
	$("#currpage").val(currpage);
	$("#countline").val(countline);
	return fenye(sortname);
}
function pagefirst(sortname){//首页
	currpage = 1;
	countline = parseInt($("#countline").val());
	$("#currpage").val(currpage);
	$("#countline").val(countline);
	return fenye(sortname);
}
function pagelast(sortname){//尾页
	currpage = parseInt($("#sum_page").text());
	countline = parseInt($("#countline").val());
	$("#currpage").val(currpage);
	$("#countline").val(countline);
	return fenye(sortname);
}

//页面按钮有效/失效控制
function disOrEnable(){
	var sum_page = ((parseInt($("#sum").text())%countline)>0?(parseInt((parseInt($("#sum").text())/countline))+1):parseInt((parseInt($("#sum").text())/countline)));
	$("#sum_page").text(sum_page);
	if(parseInt($("#sum").text()) <= (currpage*countline)){
		$("#pagedown").attr("disabled",true);
	}else{
		$("#pagedown").attr("disabled",false);
	}
	if(currpage <= 1){
		$("#pageup").attr("disabled",true);
	}else{
		$("#pageup").attr("disabled",false);
	}
	if(parseInt($("#sum_page").text())!=0){
		if(parseInt($("#sum_page").text())<currpage){
			currpage = parseInt($("#sum_page").text());
			$("#currpage").val(currpage);
		}else if(1>currpage){
			currpage = 1;
			$("#currpage").val(currpage);
		}
	}
}

function commask(actionstr,sortname){//根据请求的类型返回不同字符串,actionstr为请求的中文名(种类:"上一页","下一页","跳转指定页"),sortname为排序所需的字段名字符串(字符串格式:"XXX,XXX,XXXX")
	if(trimspace($("#countline").val())=='' || !parseInt($("#countline").val())){
		$("#countline").val("10");
	}
	if(actionstr=="上一页"){
		return pageup(sortname);
	}else if(actionstr=="下一页"){
		return pagedown(sortname);
	}else if(actionstr=="跳转指定页"){
		return refresh(sortname);
	}else if(actionstr=="首页"){
		return pagefirst(sortname);
	}else if(actionstr=="尾页"){
		return pagelast(sortname);
	}else{
		return fenye(sortname);
	}
}

/**
 * 通用树状数据单选回值javascript代码区(注：easyui-table专用方法,使用前需为单元格指定下列方法名)
 * ------以下为示例代码，具体情况具体使用------
 */
//对每条数据进行植入radio单选按钮操作
function treeforradio(str){
	var radiostr = ('<input type="radio" class="treegrid_radio" name="treegrid_radio" onchange="treegrid_radio_change(\'name\')" value="'+str+'" checked="checked" />'+str);
	
	return radiostr;
}
//当radio单选按钮变值时，回给指定对象对应值(仅支持input输入框回值)
function treegrid_radio_change(idstr){
	$("#"+idstr).val($("input[name='treegrid_radio']:checked").val());
}
/**
 * ------以上为示例代码，具体情况具体使用------
 */


/**
 * 通用树状数据重组list  JSON数组(返回list值可供easyui直接使用，数据结构：[{a:'a',b:'b',children:{a:'A',b:'B',children:{...}}},{......}])
 * @param arrlist为服务器返回的无序List，fidname父字段名，idname子字段名
 */
//调用递归函数拼装树状列表数据(如一级对象没有父对象值，使用此方法获取重组数据列表，使用此方法的List一级对象父对象字段值必须为空)
function chi_to_undefine(arrlist,fidname,idname){//arrlist无序数据列表,fidname父字段名,idname子字段名
	var newlist = new Array();
	for(var i=0;i<arrlist.length;i++){
		if(eval("arrlist[i]."+fidname) == '' || eval("arrlist[i]."+fidname) == null || !eval("arrlist[i]."+fidname)){
			arrlist[i].children = chi_to_par(arrlist,fidname,idname,eval("arrlist[i]."+idname));
			newlist.push(arrlist[i]);
		}
	}
	return newlist;
}
//递归拼装树状列表数据(此方法必须拥有父对象的字段值，一级对象也必须拥有父字段值)
function chi_to_par(arrlist,fidname,idname,fvalue){//arrlist无序数据列表,fidname父字段名,idname子字段名,fvalue父对象字段值
	var newlist = new Array();
	for(var i=0;i<arrlist.length;i++){
		if(eval("arrlist[i]."+fidname) == fvalue){
			arrlist[i].children = chi_to_par(arrlist,fidname,idname,eval("arrlist[i]."+idname));
			newlist.push(arrlist[i]);
		}
	}
	return newlist;
}

/**
 * trim改写，左右去空格
 * @param str
 * @returns
 */
//字符串左右去空格
function trimspace(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

/**
 * 以下为附属区控件显隐赋值控制代码
 */

var ismouseondiv = false;
function focusAdd(){
	ismouseondiv=true;
}
function blurAdd(){
	ismouseondiv=false;
	isCloseDiv();
}
var isinputselect = false;
//关闭所有附属区域
function close_append(){
	isinputselect = false;
	isCloseDiv();
}

//打开附属div区域
function open_append(typename){
	isinputselect = true;
	$("#"+typename+"_alert").show();
	if(typename=='update'){
		$("input[name='deparment_update'][value='"+($("#updatejgid").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_add']:checked").val());
}
function treegrid_radio_change_update(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_update']:checked").val());
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	treegrid_radio_change_add('addjgid');
	$("#update_alert").hide();
	treegrid_radio_change_update('updatejgid');
}



/**
 * 通用页面数据区div布局适应屏幕代码区
 */
var data_height = 0;//页面数据div区高度

function setDatatablePosition(aheight,bheight,cheight){//三个参数分别为：标题高度、条件区高度(不包括"查询条件"的高度)、分页区高度
	var fullheight = (document.documentElement.clientHeight==0?parseInt((parseInt(window.parent.document.getElementById("fullpageheight").value)-150)*0.99):document.documentElement.clientHeight);
	if(document.documentElement.clientHeight==0){
		location.reload();
		return;
	}
	var dataheight = fullheight;
	if(aheight){
		dataheight = dataheight-aheight-3;
	}
	if(bheight){
		dataheight = dataheight-bheight-5;
	}
	if(cheight){
		dataheight = dataheight-cheight-3;
	}
	$("#data_div").css("height",dataheight);
	$("#data_div").css("overflow-y","scroll");
	$("#data_div").css("overflow-x","none");

	data_height = dataheight;
	
	//设定初始界面显示数据条数
	if(data_height>=26 && data_height<=405){
		$("#countline").val("5");
		countline = 5;
	}else if(data_height>405 && data_height<=610){
		$("#countline").val("10");
		countline = 10;
	}else if(data_height>610){
		$("#countline").val("15");
		countline = 15;
	}else if(0<data_height && data_height<26){
		alert("您的浏览器显示界面过小，建议隐藏浏览器上方非必要组件！");
	}
	
}

/**
 * 通用屏幕居中代码区
 */
function divloadcenter(){
	var fullheight = document.documentElement.clientHeight;
	var fullwidth = document.documentElement.clientWidth;
	
	$("#add").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#add").outerWidth(true)/2)>0?(fullwidth/2)-($("#add").outerWidth(true)/2):0))});
	$("#update").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#update").outerWidth(true)/2)>0?(fullwidth/2)-($("#update").outerWidth(true)/2):0))});
	$("#remove").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#remove").outerWidth(true)/2)>0?(fullwidth/2)-($("#remove").outerWidth(true)/2):0))});
	$("#grant").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#grant").outerWidth(true)/2)>0?(fullwidth/2)-($("#grant").outerWidth(true)/2):0))});
	$("#loadpic").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#loadpic").outerWidth(true)/2)>0?($("#loadpic").outerWidth(true)/2+150):0))});

	$("#add_alert").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#add_alert").outerWidth(true)/2)>0?(fullwidth/2)-($("#add_alert").outerWidth(true)/2):0))});
	$("#add2_alert").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#add2_alert").outerWidth(true)/2)>0?(fullwidth/2)-($("#add2_alert").outerWidth(true)/2):0))});
	$("#update_alert").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#update_alert").outerWidth(true)/2)>0?(fullwidth/2)-($("#update_alert").outerWidth(true)/2):0))});
	$("#update2_alert").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#update2_alert").outerWidth(true)/2)>0?(fullwidth/2)-($("#update2_alert").outerWidth(true)/2):0))});
	$("#add_alert2").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#add_alert2").outerWidth(true)/2)>0?(fullwidth/2)-($("#add_alert2").outerWidth(true)/2):250))});
	$("#update_alert2").css({'top':(((fullheight/2)-(500/2)>10?80:10)),'left':(((fullwidth/2)-($("#update_alert2").outerWidth(true)/2)>0?(fullwidth/2)-($("#update_alert2").outerWidth(true)/2):0))});
}

/**
 * 通用div附属数据区显示位置控制(根据主控件位置设定附属区位置)
 */
function setDivToMouseclick(dividname,idname){//参数：主控件id名、附属区id名
	$("#"+idname).css({'top':$("#"+dividname).offset().top+35,'left':$("#"+dividname).offset().left});

}
