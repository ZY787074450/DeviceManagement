/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),0,$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	getsbrkjl();
	getqxzdjbm();
	
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"azrq");
	$.ajax({
		url : "/DeviceManagement/sbgl/sbcj/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "",
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>设备名称</th>'
								+'<th>设备使用站点</th>'
								+'<th>设备使用人</th>'
								+'<th>设备状态</th>'
								+'<th>设备安装人</th>'
								+'<th>设备安装日期</th>'
								+'<th>出借日期</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td><a href="#" title="出借原因:'+(sbsyList[i].note?sbsyList[i].note:'')+'">'+(sbsyList[i].sbmc?sbsyList[i].sbmc:'暂无数据')+'</a></td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyList[i].sbsyr?sbsyList[i].sbsyr:'')+'</td>'
									+'<td>'+(sbsyList[i].sbzt=="8"?'出借':(sbsyList[i].sbzt=="9"?'还入':'无效数据'))+'</td>'
									+'<td>'+(sbsyList[i].azr?sbsyList[i].azr:'')+'</td>'
									+'<td>'+(sbsyList[i].azrq?sbsyList[i].azrq:'')+'</td>'
									+'<td>'+(sbsyList[i].cjrq?sbsyList[i].cjrq:'')+'</td>'
									+((sbsyList[i].sbzt=="8")?('<td><a href="#" title="设备还入" onclick="updatesbcj(\''+(sbsyList[i].xh?sbsyList[i].xh:'none')+'\',\''+(sbsyList[i].sbmc?sbsyList[i].sbmc:'')+'\')">'
									+'<i class="icon-download-alt"></i></a></td>'):('<td><i class="icon-download-alt icon-white" style="background-color: rgb(215, 214, 214);"></i></td>'))
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
		url : "/DeviceManagement/jcxx/rywh/getdeparments.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>机构/站点编号</th>'
								+'<th>机构/站点名称</th>'
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
	$(".floatarea").hide();
}
//开启添加设备出借界面div
function addsbcj(){
	greybackadd();
	$("#add").show();
	$("#addrkid").val("");
	$("#addsbflid").val("");
	$("#addsbmc").val("");
	$("#addjgmc").val("");
	$("#addjgid").val("");
	$("#addsbsyr").val("");
	$("#addazr").val("");
	$("#addazrq").val("");
	$("#addcjrq").val("");
	$("#addnote").val("");
}
//新增设备出借请求
function addsbcjjl(){
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
	if(trimspace($("#addazrq").val())==''){
		alert("请填写设备安装日期！");
		return;
	}
	if(trimspace($("#addnote").val())==''){
		alert("请填写设备出借原因！");
		return;
	}
	$.ajax({
		url: "/DeviceManagement/sbgl/sbcj/cj.do",
		type: "POST",
		data: "&rkid="+$("#addrkid").val()+"&sbflid="+$("#addsbflid").val()+"&sbmc="+$("#addsbmc").val()+"&jgid="+$("#addjgid").val()
			+"&sbsyr="+$("#addsbsyr").val()+"&note="+$("#addnote").val()+"&azr="+$("#addazr").val()+"&azrq="+$("#addazrq").val(),
		success: function(data){
			if(data.sbmc){
				alert("【"+data.sbmc+"】 设备出借记录已登记！");
				queryuserlist();
			}else if(data.sbckbz){
				alert(data.sbckbz);
			}else{
				alert("数据处理异常，请联系管理员进行异常检测！");
			}
		}
	});
}
function updatesbcj(xh,sbmc){
	if(xh=='none'){
		alert("未检测到当前设备数据记录，请联系管理员维护数据！");
		return;
	}
	if(confirm("即将登记设备【"+sbmc+"】还入记录，请清点设备是否完整？")){
		addsbhrjl(xh,sbmc);
	}
}
//发送设备出借后还入请求
function addsbhrjl(xh,sbmc){
	$.ajax({
		url: "/DeviceManagement/sbgl/sbcj/hr.do",
		type: "POST",
		data: "&xh="+xh+"&sbmc="+sbmc,
		success: function(data){
			if(data.sbmc){
				alert("【"+data.sbmc+"】 设备还入记录已登记！");
				queryuserlist();
			}else{
				alert("数据处理异常，请联系管理员进行异常检测！");
			}
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
