/**
 * 
 */

$(document).ready(function(){
	$("#currpage").val("1");
	$("#countline").val("10");
	$("#sum").text("0");
	currpage = parseInt($("#currpage").val());
	countline = parseInt($("#countline").val());
});
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

//页面按钮有效/失效控制
function disOrEnable(){
	var sum_page = ((parseInt($("#sum").text())%countline)>0?(parseInt((parseInt($("#sum").text())/countline))+1):parseInt((parseInt($("#sum").text())/countline)));
	$("#sum_page").text(sum_page);
	if(parseInt($("#sum").text()) <= (currpage*countline)){
		$("#pagedown").attr("disabled",true);
	}else{
		$("#pagedown").attr("disabled",false);
	}
	if(currpage == 1){
		$("#pageup").attr("disabled",true);
	}else{
		$("#pageup").attr("disabled",false);
	}
	//console.log();
}

function commask(actionstr,sortname){//根据请求的类型返回不同字符串,actionstr为请求的中文名(种类:"上一页","下一页","跳转指定页"),sortname为排序所需的字段名字符串(字符串格式:"XXX,XXX,XXXX")
	if(actionstr=="上一页"){
		return pageup(sortname);
	}else if(actionstr=="下一页"){
		return pagedown(sortname);
	}else if(actionstr=="跳转指定页"){
		return refresh(sortname);
	}else{
		return fenye(sortname);
	}
}
