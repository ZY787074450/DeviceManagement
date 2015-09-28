/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition(41,85,35);
	$("#condition_rkrq_start").val(timeArr[0]);
	$("#condition_rkrq_end").val(timeArr[1]);
	queryuserlist();
	rkrqset();
});
function rkrqset(){
	var datestr = new Date();
	$("#addrkrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
}

FormOp = {
		sbflid : "",
		sblbmc : "",
		rkrq_start : "",
		rkrq_end : "",
	};

function initCondition(){
	FormOp.sbflid = trimspace($("#condition_sbflid").val());
	FormOp.sblbmc = trimspace($("#condition_sblbmc").val());
	FormOp.rkrq_start = trimspace($("#condition_rkrq_start").val());
	FormOp.rkrq_end = trimspace($("#condition_rkrq_end").val());
}

function queryuserlist(actionstr){
	greybackadd();
	initCondition();
	var urlparm = commask(actionstr,"rkrq,sbflid");
	$.ajax({
		url : "/DeviceManagement/sbgl/sbrk/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : FormOp,
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>设备编号</th>'
								+'<th>设备名称</th>'
								+'<th>设备型号</th>'
								+'<th>出厂编号</th>'
								+'<th>生产厂家</th>'
								+'<th>入库日期</th>'
								+'<th>详情(可编辑)</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(jglist[i].sbflid?jglist[i].sbflid:'未知编号')+'</td>'
									+'<td>'+(jglist[i].sbmc?jglist[i].sbmc:'未知')+'</td>'
									+'<td>'+(jglist[i].sbxh?jglist[i].sbxh:'未知')+'</td>'
									+'<td>'+(jglist[i].ccbh?jglist[i].ccbh:'未知')+'</td>'
									+'<td>'+(jglist[i].sccj?jglist[i].sccj:'未知')+'</td>'
									+'<td>'+(jglist[i].rkrq?jglist[i].rkrq:'未知')+'</td>'
									+'<td><a href="#" title="更多信息" onclick="updatediv(\''+(jglist[i].fsblbmc?jglist[i].fsblbmc:'未知')+'\',\''+(jglist[i].sbflid?jglist[i].sbflid:'未知编号')+'\',\''+(jglist[i].sbmc?jglist[i].sbmc:'未知')+'\',\''+(jglist[i].sbxh?jglist[i].sbxh:'未知')+'\',\''+(jglist[i].sccj?jglist[i].sccj:'未知')+'\',\''+(jglist[i].ccbh?jglist[i].ccbh:'未知')+'\',\''+(jglist[i].cgr?jglist[i].cgr:'未知')+'\',\''+(jglist[i].cgrq?jglist[i].cgrq:'未知')+'\',\''+(jglist[i].rkrq?jglist[i].rkrq:'未知')+'\',\''+(jglist[i].rksl?jglist[i].rksl:'0')+'\',\''+(jglist[i].note?jglist[i].note:'')+'\',\''+(jglist[i].rkid?jglist[i].rkid:'0')+'\')">'
									+'详细信息</a></td>'
								+'</tr>');
				}
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}

//屏幕遮罩
function greybackadd(){
	$("#greyground").show();
	$("#loading").show();
}
//屏幕遮罩移除，并移除非原始状态div
function greyback(){
	$("#greyground").hide();
	$("#loading").hide();
	$("#add").hide();
	$("#update").hide();
	$("#remove").hide();
}

//打开添加记录div
function addsbsy(){
	greybackadd();
	$("#add").show();
	
	$("#addsbflid").val("");
	$("#addsbmc").val("");
	$("#addsbxh").val("");
	$("#addsccj").val("");
	$("#addccbh").val("");
	$("#addcgr").val("");
	$("#addcgrq").val("");
	$("#addrkrq").val("");
	$("#addcgsl").val("1");
	$("#addnote").val("");
	rkrqset();
	$("input[name='sbflid_add']").each(function(){
		$(this).removeAttr("checked");
	});
}

//打开信息查看div
function updatediv(fsblbmc,sbflid,sbmc,sbxh,sccj,ccbh,cgr,cgrq,rkrq,cgsl,note,rkid){
	greybackadd();
	$("#update").show();
	
	$("#updatefsblbmc").val(fsblbmc);
	$("#updatesbflid").val(sbflid);
	$("#updatesbmc").val(sbmc);
	$("#updatesbxh").val(sbxh);
	$("#updatesccj").val(sccj);
	$("#updateccbh").val(ccbh);
	$("#updatecgr").val(cgr);
	$("#updatecgrq").val(timeFormRight(cgrq));
	$("#updaterkrq").val(timeFormRight(rkrq));
	$("#updatecgsl").val(cgsl);
	$("#updatenote").val(note);
	$("#updaterkid").val(rkid);
}
function timeFormRight(rq){//时间格式规范化
	return rq.substring(0,4)+'-'+rq.substring(5,7)+'-'+rq.substring(8,10);
}

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
	$("#add").hide();
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
			greyback();
			resetform();
			queryuserlist();
			getsbflid();
		}
	});
}
function updatesbrkxx(){
	if($("#updatesbmc").val()=='' || $("#updatesbflid").val()==''){
		alert("设备分类ID和设备名称不能为空！");
		return;
	}
	if($("#updatecgrq").val()==''){
		alert("请填写设备采购时间，否则设备使用统计将无法统计此次采购数量！");
		return;
	}
	if($("#updaterkrq").val()==''){
		alert("设备入库日期不能为空！");
		return;
	}
	$("#update").hide();
	$.ajax({
		url: "/DeviceManagement/sbgl/sbrk/update.do",
		type: "POST",
		data: "&sbflid="+$("#updatesbflid").val()+"&sbmc="+$("#updatesbmc").val()+"&sbxh="+$("#updatesbxh").val()+"&sccj="+$("#updatesccj").val()
			 +"&ccbh="+$("#updateccbh").val()+"&cgr="+$("#updatecgr").val()+"&cgrq="+$("#updatecgrq").val()+"&rkrq="+$("#updaterkrq").val()
			 +"&rksl="+$("#updatecgsl").val()+"&note="+$("#updatenote").val()+"&rkid="+$("#updaterkid").val(),
		success: function(data){
			if(data.sbmc){
				alert(data.sbmc+"设备入库信息修改成功！");
			}else{
				if(data.cannot){
					alert(data.cannot);
				}else{
					alert("数据处理异常，请联系系统管理员！");
				}
			}
			greyback();
			resetform();
			queryuserlist();
			getsbflid();
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
			sblblist2[b].state = 'closed';
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
function sbmcandxh(sblbmc,rowObj){
	if(rowObj.sbcj=='3'){
		return sblbmc+'【'+(rowObj.ccbh?rowObj.ccbh:'未知编号')+'】';
	}else{
		return sblbmc;
	}
}
function selectsbflid(sbflid,rowObj){
	if(rowObj.sbcj=='3'){
		return ('<input type="radio" name="sbflid_add" title="'+(rowObj.sbmc?rowObj.sbmc:'')+'@,@'+(rowObj.sbxh?rowObj.sbxh:'')+'@,@'+(rowObj.sccj?rowObj.sccj:'')+'@,@'+(rowObj.ccbh?rowObj.ccbh:'')+'" value="'+sbflid+'" onchange="treegrid_radio_change_add(\'addsbflid\',\''+sbflid+'\',\''+rowObj.sblbmc+'\')" />');
	}else if(rowObj.sbcj=='2'){
		return ('<input type="radio" name="sbflid_add" title="'+rowObj.sbmc+'" value="'+sbflid+'" onchange="treegrid_radio_change_add(\'addsbflid\',\''+sbflid+'\',\'\')" />');
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
	$("input[name='sbflid_add']").each(function(){
		$(this).removeAttr("checked");
	});
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
	if($("input[name='sbflid_add']:checked").val().length==4){
		$(".isfl").show();
		$('#addsbmc').attr("readonly",false);
		$('#addsbxh').attr("readonly",false);
		$('#addsccj').attr("readonly",false);
		$("#addccbh").attr("readonly",false);
		$("#addsbmc").val("");
		$("#addsbxh").val("");
		$("#addsccj").val("");
		$("#addccbh").val("");
	}else if($("input[name='sbflid_add']:checked").val().length==10){
		$(".isfl").hide();
		$("#addsbmc").val(($("input[name='sbflid_add']:checked").attr("title").split('@,@')[0]));
		$("#addsbxh").val(($("input[name='sbflid_add']:checked").attr("title").split('@,@')[1]));
		$("#addsccj").val(($("input[name='sbflid_add']:checked").attr("title").split('@,@')[2]));
		$("#addccbh").val(($("input[name='sbflid_add']:checked").attr("title").split('@,@')[3]));
		$("#addsbmc").attr("readonly","readonly");
		$("#addsbxh").attr("readonly","readonly");
		$("#addsccj").attr("readonly","readonly");
		$("#addccbh").attr("readonly","readonly");
	}else{
		$(".isfl").show();
		$("#addsbmc").val("");
		$("#addsbxh").val("");
		$("#addsccj").val("");
		$("#addccbh").val("");
		$("#addsbmc").attr("readonly","readonly");
		$("#addsbxh").attr("readonly","readonly");
		$("#addsccj").attr("readonly","readonly");
		$("#addccbh").attr("readonly","readonly");
	}
	
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


