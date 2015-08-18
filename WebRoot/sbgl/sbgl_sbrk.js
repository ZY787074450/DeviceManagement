/**
 * 
 */
$(document).ready(function(){
	var datestr = new Date();
	$("#addrkrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
});
function addsbrkxx(){
	if($("#addsbmc").val()=='' || $("#addsbflid").val()==''){
		alert("设备分类ID和设备名称不能为空！");
		return;
	}
	if($("#addcgrq").val()==''){
		alert("请填写设备采购时间，否则设备使用统计将无法统计此次采购数量！");
		return;
	}
	if($("#addrkrq").val()==''){
		alert("设备入库日期不能为空！");
		return;
	}
	if(!checknumber()){
		return;
	}
	$.ajax({
		url: "/DeviceManagement/sbgl/sbrk/add.do",
		type: "POST",
		data: "&sbflid="+$("#addsbflid").val()+"&sbmc="+$("#addsbmc").val()+"&sbxh="+$("#addsbxh").val()+"&sccj="+$("#addsccj").val()
			 +"&ccbh="+$("#addccbh").val()+"&cgr="+$("#addcgr").val()+"&cgrq="+$("#addcgrq").val()+"&rkrq="+$("#addrkrq").val()+"&rksl="+$("#addcgsl").val()+"&note="+$("#addnote").val(),
		success: function(data){
			if(data.sbmc){
				alert(data.sbmc+"设备入库信息记录成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			resetform();
		}
	});
}
var isloadtree = false;
//加载设备分类ID可选树
function getsbflid(){
	if(isloadtree){
		resettreedata();
		return;
	}
	isloadtree = true;
	$.ajax({
		url : "/DeviceManagement/sbgl/sbrk/sbflwh_cx.do?time="+new Date(),
		type : "POST",
		dataType: "json",
		data : "",
		success : function(data){
			$("#message_tip").hide();
			if(data.sblblist != null && data.sblblist != 'null' && data.sblblist.length>0){
				var sblbList = data.sblblist;
				var newData = drawsixlevel_cz(sblbList);
				$("#data_table_add").treegrid('loadData', newData);
			}			
		}
	});
}
var sum = 0;
//js对象重组,返回重组完成后的json格式对象
function drawsixlevel_cz(sblbList){
	var sblblist1 = new Array();
	var sblblist2 = new Array();
	var sblblist3 = new Array();
	var sblblist4 = new Array();
	var sblblist5 = new Array();
	var sblblist6 = new Array();
	
	for(var i=0;i<sblbList.length;i++){
		if(sblbList[i].sbcj==1){
			sblblist1.push(sblbList[i]);
		}else if(sblbList[i].sbcj==2){
			sblblist2.push(sblbList[i]);
		}else if(sblbList[i].sbcj==3){
			sblblist3.push(sblbList[i]);
		}else if(sblbList[i].sbcj==4){
			sblblist4.push(sblbList[i]);
		}else if(sblbList[i].sbcj==5){
			sblblist5.push(sblbList[i]);
		}else if(sblbList[i].sbcj==6){
			sblblist6.push(sblbList[i]);
		}
	}
	
	var list1 = new Array();
	for(var a=0;a<sblblist1.length;a++){
		var list2 = new Array();
		for(var b=0;b<sblblist2.length;b++){
			if(sblblist2[b].fsbflid == sblblist1[a].sbflid){
			var list3 = new Array();
			for(var c=0;c<sblblist3.length;c++){
				if(sblblist3[c].fsbflid == sblblist2[b].sbflid){
				var list4 = new Array();
				for(var d=0;d<sblblist4.length;d++){
					if(sblblist4[d].fsbflid == sblblist3[c].sbflid){
					var list5 = new Array();
					for(var e=0;e<sblblist5.length;e++){
						if(sblblist5[e].fsbflid == sblblist4[d].sbflid){
						var list6 = new Array();
						for(var f=0;f<sblblist6.length;f++){
							if(sblblist6[f].fsbflid == sblblist5[e].sbflid){	
							list6.push(sblblist6[f]);
							}
						}
						sblblist5[e].children = list6;
						list5.push(sblblist5[e]);
						}
					}
					sblblist4[d].children = list5;
					list4.push(sblblist4[d]);
					}
				}
				sblblist3[c].children = list4;
				list3.push(sblblist3[c]);
				}
			}
			sblblist2[b].children = list3;
			list2.push(sblblist2[b]);
			}
		}
		sblblist1[a].children = list2;
		list1.push(sblblist1[a]);
	}
	return list1;
}
function sfzl(sfzl){
	return (sfzl=='1'?'是':'否');
}
function selectsbflid(sbflid,rowObj){
	if(rowObj.sfzl=='1'){
		return ('<input type="radio" name="sbflid_add" title="'+rowObj.sblbmc+'" value="'+sbflid+'" onchange="treegrid_radio_change_add(\'addsbflid\',\''+sbflid+'\',\''+rowObj.sblbmc+'\')" />');
	}else{
		return "";
	}
}
//重置表单
function resetform(){
	$("#addsbflid").val("");
	$("#addsbmc").val("");
	$("#addsbxh").val("");
	$("#addsccj").val("");
	$("#addccbh").val("");
	$("#addcgr").val("");
	$("#addcgrq").val("");
	$("#addcgsl").val("");
	$("#addnote").val("");
}

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
	$("#greyground2").show();
	$("#"+typename+"_alert").show();
	getsbflid();
}
function resettreedata(){
	if($("#addsbflid").val()!=''){
		$("input[name='sbflid_add'][value='"+($("#addsbflid").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(idstr,sbflid,sblbmc){
	$("#"+idstr).val("");
	$("#addsbmc").val("");
	
	$("#"+idstr).val($("input[name='sbflid_add']:checked").val());
	$("#addsbmc").val($("input[name='sbflid_add']:checked").attr("title"));
	
	powerClose();
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	$("#greyground2").hide();
	treegrid_radio_change_add('addsbflid');
}
function powerClose(){
	$("#add_alert").hide();
	$("#greyground2").hide();
}
//验证采购数量是否为数字
function checknumber(){
	var reg = new RegExp("^(0|[1-9][0-9]*)$");//零和非零开头的数字
	if(reg.test($("#addcgsl").val()) && ($("#addcgsl").val()).length<7){
		return true;
	}else{
		if(reg.test($("#addcgsl").val())){
			alert("请正常填写数字(零或非零开头的数字)！");
			return false;
		}else{
			alert("采购数量只能填写非负整数，且输入不得超过1000000(一百万)台/个！");
			return false;
		}
	}
}


