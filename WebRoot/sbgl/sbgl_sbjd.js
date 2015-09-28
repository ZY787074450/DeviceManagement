/**
 * 
 */
FormOp = {
	jgid : "",
	sbmc : "",
	sbzt : "",
	azrq_start : "",
	azrq_end : "",
	jgmc : ""
};

function initCondition(){
	FormOp.jgid = $("#condition_jgid").val();
	FormOp.sbmc = $("#condition_sbmc").val();
	FormOp.sbzt = '0';//$("input[name='condition_sbzt']:checked").val();
	FormOp.azrq_start = $("#condition_azrq_start").val();
	FormOp.azrq_end = $("#condition_azrq_end").val();
	FormOp.jgmc = $("#condition_jgmc").val();
}

$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	$("#condition_azrq_start").val(timeArr[0]);
	$("#condition_azrq_end").val(timeArr[1]);
	queryuserlist();
	getsbrkjl();
	getqxzdjbm();
	
});

function queryuserlist(actionstr){
	greybackadd();
	initCondition();
	var urlparm = commask(actionstr,"azrq,sbflid");
	$.ajax({
		url : "/DeviceManagement/sbgl/sbsy/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : FormOp,
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>设备名称(出厂编号)</th>'
								+'<th>使用站点编号</th>'
								+'<th>使用站点名称</th>'
								+'<th>设备状态</th>'
								+'<th>近期检定人</th>'
								+'<th>检定日期</th>'
								+'<th>详情</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(sbsyList[i].sbmc?(sbsyList[i].sbmc+'('+((sbsyList[i].ccbh?sbsyList[i].ccbh:'未知编号'))+')'):'暂无数据')+'</td>'
									+'<td>'+(sbsyList[i].jgid?sbsyList[i].jgid:'未知ID')+'</td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyList[i].sbzt=="0"?'使用':(sbsyList[i].sbzt=="1"?'维修':'报废'))+'</td>'
									+'<td>'+(sbsyList[i].jdr?sbsyList[i].jdr:'')+'</td>'
									+'<td>'+(sbsyList[i].jdrq?sbsyList[i].jdrq:'')+'</td>'
									+'<td><a href="#" title="更多信息" onclick="updatediv(\''+(sbsyList[i].sbmc?sbsyList[i].sbmc:'暂无数据')+'\',\''
																		  +(sbsyList[i].jgid?sbsyList[i].jgid:'未知ID')+'\',\''
																		  +(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'\',\''
																		  +(sbsyList[i].sbzt=="0"?'使用':(sbsyList[i].sbzt=="1"?'维修':'报废'))+'\',\''
																		  +(sbsyList[i].azr?sbsyList[i].azr:'暂无数据')+'\',\''
																		  +(sbsyList[i].azrq?sbsyList[i].azrq:'')+'\',\''
																		  +(sbsyList[i].wxr?sbsyList[i].wxr:'')+'\',\''
																		  +(sbsyList[i].wxrq?sbsyList[i].wxrq:'')+'\',\''
																		  +(sbsyList[i].jdr?sbsyList[i].jdr:'')+'\',\''
																		  +(sbsyList[i].jdrq?sbsyList[i].jdrq:'')+'\',\''
																		  +(sbsyList[i].bfr?sbsyList[i].bfr:'')+'\',\''
																		  +(sbsyList[i].bfrq?sbsyList[i].bfrq:'')+'\')">'
									+'详细信息</a></td>'
									+((sbsyList[i].sbzt=="0"||sbsyList[i].sbzt=="1")?('<td><a href="#" title="修改" onclick="updatesbsy(\''+(sbsyList[i].xh?sbsyList[i].xh:'none')+'\',\''+(sbsyList[i].rkid?sbsyList[i].rkid:'')+'\',\''+(sbsyList[i].sbmc?sbsyList[i].sbmc:'')+'\')">'
									+'<i class="icon-edit"></i></a> '
									/*+'&nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="删除记录" onclick="removesbsy(\''+(sbsyList[i].xh?sbsyList[i].xh:'none')+'\',\''+(sbsyList[i].sbmc?sbsyList[i].sbmc:'')+'\')">'
									+'<i class="icon-trash"></i></a>'*/
									+'</td>'):('<td><i class="icon-edit icon-white" style="background-color: rgb(215, 214, 214);"></i></td>'))
								+'</tr>');
				}
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}
//加载设备入库信息
function getsbrkjl(){
	$.ajax({
		url : "/DeviceManagement/sbgl/sbrk/cx.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>设备分类类别</th>'
								+'<th>设备名称</th>'
								+'<th>设备型号</th>'
								+'<th>出厂编号</th>'
								+'<th>选定</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>设备分类类别</th>'
								+'<th>设备名称</th>'
								+'<th>设备型号</th>'
								+'<th>出厂编号</th>'
								+'<th>选定</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr>'
									+'<td>'+(jglist[i].sblbmc?jglist[i].sblbmc:'未知')+'</td>'
									+'<td>'+(jglist[i].sbmc?jglist[i].sbmc:'未知')+'</td>'
									+'<td>'+(jglist[i].sbxh?jglist[i].sbxh:'未知')+'</td>'
									+'<td>'+(jglist[i].ccbh?jglist[i].ccbh:'未知')+'</td>'
									+'<td><input type="radio" name="rkid_add" value="'+(jglist[i].rkid?jglist[i].rkid:'')+'" onchange="treegrid_radio_change_add(\''+(jglist[i].rkid?jglist[i].rkid:'')+'\',\''+(jglist[i].sbflid?jglist[i].sbflid:'')+'\',\''+(jglist[i].sbmc?jglist[i].sbmc:'')+'\')" />'+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr>'
									+'<td>'+(jglist[i].sblbmc?jglist[i].sblbmc:'未知')+'</td>'
									+'<td>'+(jglist[i].sbmc?jglist[i].sbmc:'未知')+'</td>'
									+'<td>'+(jglist[i].sbxh?jglist[i].sbxh:'未知')+'</td>'
									+'<td>'+(jglist[i].ccbh?jglist[i].ccbh:'未知')+'</td>'
									+'<td><input type="radio" name="rkid_update" value="'+(jglist[i].rkid?jglist[i].rkid:'')+'" onchange="treegrid_radio_change_update(\''+(jglist[i].rkid?jglist[i].rkid:'')+'\',\''+(jglist[i].sbflid?jglist[i].sbflid:'')+'\',\''+(jglist[i].sbmc?jglist[i].sbmc:'')+'\')" />'+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add").html(tablehtml1);
			$("#data_table_update").html(tablehtml2);
			
		}
	});
}
//加载站点和部门信息
function getqxzdjbm(){
	$.ajax({
		url : "/DeviceManagement/sbgl/sbsy/getdeparments.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>站点编号</th>'
								+'<th>站点名称</th>'
								+'<th>选定</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'未知')+'</td>'
									+'<td>'+(jglist[i].mc?jglist[i].mc:'未知')+'</td>'
									+'<td><input type="radio" name="jgid_add" value="'+(jglist[i].jgid?jglist[i].jgid:'')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add2(\''+(jglist[i].jgid?jglist[i].jgid:'')+'\')" />'+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add2").html(tablehtml1);	
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
	$("#update_msg").hide();
}

//打开添加记录div
function addsbsy(){
	greybackadd();
	$("#add").show();
	
	$("input[name='rkid_add']:checked").attr("checked",false);
	$("input[name='jgid_add']:checked").attr("checked",false);
	
	$("#addrkid").val("");
	$("#addsbflid").val("");
	$("#addsbmc").val("");
	$("#addjgmc").val("");
	$("#addjgid").val("");
	$("#addsbsyr").val("");
	$("#addazr").val("");
	$("#addnote").val("");
}
//打开详细信息div
function updatediv(sbmc,jgid,jgmc,sbzt,azr,azrq,wxr,wxrq,jdr,jdrq,bfr,bfrq){
	greybackadd();
	$("#update_msg").show();
	
	$("#msgsbmc").val(sbmc);
	$("#msgjgid").val(jgid);
	$("#msgjgmc").val(jgmc);
	$("#msgsbzt").val(sbzt);
	$("#msgazr").val(azr);
	$("#msgazrq").val(azrq);
	$("#msgwxr").val(wxr);
	$("#msgwxrq").val(wxrq);
	$("#msgjdr").val(jdr);
	$("#msgjdrq").val(jdrq);
	$("#msgbfr").val(bfr);
	$("#msgbfrq").val(bfrq);
}
//打开修改记录div
function updatesbsy(xh,rkid,sbmc){
	greybackadd();
	$("#update").show();
	$("#updatesbmc").val(sbmc);
	$("#updatexh").val(xh);
	$("#updaterkid").val(rkid);
	$("input[name='update_sbzt'][value='1']").attr('checked','true');
	$("#tr_1").hide();
	$("#tr_2").hide();
	$("#tr_3").show();
	$("#tr_4").hide();
	$("#tr_5").hide();
}
//打开删除记录div
function removesbsy(xh,sbmc){
	greybackadd();
	$("#remove").show();
	$("#removesbmc").text(sbmc);
	$("#removexh").val(xh);
}
//打开修改界面后选择对应数据更新类型
function onchangetype(str){
	$("#tr_note").show();
	$("#tr_1").hide();
	$("#updatewxr").val("");
	$("#tr_2").hide();
	$("#updatebfr").val("");
	$("#tr_3").hide();
	$("#updatejdr").val("");
	$("#tr_4").hide();
	$("#updatewhr").val("");
	$("#tr_5").hide();
	
	$("#tr_"+$("input[name='update_sbzt']:checked").val()).show();
	if($("input[name='update_sbzt']:checked").val()=='5'){
		$("#tr_note").hide();
	}
}
//添加记录请求
function addsbsyjl(){
	if($("#addrkid").val()==''){
		alert("请选择设备！");
		return;
	}
	if($("#addjgid").val()==''){
		alert("请选择设备使用站点！");
		return;
	}
	if(trimspace($("#addazr").val())==''){
		alert("请填写设备安装人！");
		return;
	}
	$.ajax({
		url: "/DeviceManagement/sbgl/sbsy/doaction.do?czlx=0",
		type: "POST",
		data: "&rkid="+$("#addrkid").val()+"&sbflid="+$("#addsbflid").val()+"&sbmc="+$("#addsbmc").val()+"&jgid="+$("#addjgid").val()
			 +"&sbsyr="+$("#addsbsyr").val()+"&sbzt="+$("#addsbzt").val()+"&azr="+$("#addazr").val()+"&note="+$("#addnote").val(),
		success: function(data){
			if(data.sbmc){
				alert("设备【"+data.sbmc+"】使用记录词条已生成，请及时对该设备使用记录进行更新！");
			}else if(data.sbckbz){
				alert(data.sbckbz);
			}else{
				alert("数据处理异常，请联系管理员进行异常检测！");
			}
			greyback();
			queryuserlist();
		}
	});
}
//更新记录数据(修改)请求
function updatesbsyjl(){
	$.ajax({
		url: "/DeviceManagement/sbgl/sbsy/doaction.do",
		type: "POST",
		data: "&xh="+$("#updatexh").val()+"&wxr="+$("#updatewxr").val()+"&bfr="+$("#updatebfr").val()
			 +"&jdr="+$("#updatejdr").val()+"&whr="+$("#updatewhr").val()+"&note="+$("#updatenote").val()
			 +"&czlx="+$("input[name='update_sbzt']:checked").val()
			 +"&sbzt="+$("input[name='change_sbzt']:checked").val(),
		success: function(data){
			if(data.sbmc){
				alert("设备【"+data.sbmc+"】使用记录更新成功！");
			}else{
				alert("数据处理异常，请联系管理员进行异常检测！");
			}
			greyback();
			queryuserlist();
		}
	});
}
//删除使用记录请求
function removesbsyjl(){
	$.ajax({
		url: "/DeviceManagement/sbgl/sbsy/delete.do",
		type: "POST",
		data: "&xh="+$("#removexh").val(),
		success: function(data){
			if(data.sbmc){
				alert("设备【"+data.sbmc+"】记录删除成功！");
			}else if(data.msg){
				alert(data.msg);
			}else{
				alert("数据处理异常，请联系管理员进行异常检测！");
			}
			greyback();
			queryuserlist();
		}
	});
}

//打开附属div区域
function open_append(typename){
	isinputselect = true;
	$("#greyground2").show();
	$("#"+typename).show();
	if(typename=='update_alert'){
		$("input[name='rkid_update'][value='"+($("#updaterkid").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(rkid,sbflid,sbmc){
	$("#addrkid").val("");
	$("#addsbflid").val("");
	$("#addsbmc").val("");
	if($("input[name='rkid_add']:checked").val() == rkid){
		$("#addrkid").val(rkid);
		$("#addsbflid").val(sbflid);
		$("#addsbmc").val(sbmc);
	}
	powerClose();
}
function treegrid_radio_change_add2(jgid){
	$("#addjgid").val("");
	$("#addjgmc").val("");
	if($("input[name='jgid_add']:checked").val() == jgid){
		$("#addjgid").val(jgid);
		$("#addjgmc").val($("input[name='jgid_add']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_update(rkid,sbflid,sbmc){
	$("#updaterkid").val("");
	$("#updatesbflid").val("");
	$("#updatesbmc").val("");
	if($("input[name='rkid_update']:checked").val() == rkid){
		$("#updaterkid").val(rkid);
		$("#updatesbflid").val(sbflid);
		$("#updatesbmc").val(sbmc);
	}
	powerClose();
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	$("#update_alert").hide();
	$("#add_alert2").hide();
	$("#greyground2").hide();
}
function powerClose(){
	$("#add_alert").hide();
	$("#update_alert").hide();
	$("#add_alert2").hide();
	$("#greyground2").hide();
}