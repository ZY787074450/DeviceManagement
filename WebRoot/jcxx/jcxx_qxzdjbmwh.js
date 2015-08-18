/**
 * 
 */

$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	getjglx();
	getjgqy();
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"jgid");
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&jgid="+$("#condition_jgid").val()+"&mc="+$("#condition_jgmc").val()+"&jglx="+$("#condition_jglx  option:selected").val()
				+"&jgqy="+$("#condition_jgqy  option:selected").val()+"&jgzt="+$("input[name='condition_jgzt']:checked").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>站点编号</th>'
								+'<th>站点名称</th>'
								+'<th>站点类型</th>'
								+'<th>站点所属区域</th>'
								+'<th width="120px">地址</th>'
								+'<th>经度</th>'
								+'<th>纬度</th>'
								+'<th>海拔</th>'
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
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><a href="#" title="'+(jglist[i].note?jglist[i].note:'')+'">'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</a></td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jgqymc?jglist[i].jgqymc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jgdz?jglist[i].jgdz:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jgjd?jglist[i].jgjd:'')+'</td>'
									+'<td>'+(jglist[i].jgwd?jglist[i].jgwd:'')+'</td>'
									+'<td>'+(jglist[i].jghb?jglist[i].jghb:'')+'</td>'
									+'<td>'+(jglist[i].jglxr?jglist[i].jglxr:'')+'</td>'
									+'<td>'+(jglist[i].jglxdh?jglist[i].jglxdh:'')+'</td>'
									+'<td>'+(jglist[i].jgzt=="0"?'正常':'注销')+'</td>'
									+'<td>'+(jglist[i].jgys?jglist[i].jgys:'')+'</td>'
									+'<td>'+(jglist[i].azr?jglist[i].azr:'')+'</td>'
									+'<td>'+(jglist[i].lrrq?jglist[i].lrrq:'')+'</td>'
									/*+(jglist[i].jgzt=="0"?('<td><a href="#" title="编辑" onclick="updatejg(\''+(jglist[i].jgid?jglist[i].jgid:'none')+'\',\''+(jglist[i].mc?jglist[i].mc:'')+'\',\''+(jglist[i].jglxmc?jglist[i].jglxmc:'未知名称')+'\',\''+(jglist[i].jglx?jglist[i].jglx:'')+'\',\''+(jglist[i].jgqymc?jglist[i].jgqymc:'未知名称')+'\',\''+(jglist[i].jgqy?jglist[i].jgqy:'')+'\',\''+(jglist[i].jgjd?jglist[i].jgjd:'')+'\',\''+(jglist[i].jgwd?jglist[i].jgwd:'')+'\',\''+(jglist[i].jghb?jglist[i].jghb:'')+'\',\''+(jglist[i].jgdz?jglist[i].jgdz:'')+'\',\''+(jglist[i].jglxr?jglist[i].jglxr:'')+'\',\''+(jglist[i].jglxdh?jglist[i].jglxdh:'')+'\',\''+(jglist[i].note?jglist[i].note:'')+'\')">'
									+'<i class="icon-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="注销" onclick="removejg(\''+(jglist[i].jgid?jglist[i].jgid:'none')+'\')">'
									+'<i class="icon-trash"></i></a></td>'):('<td><i class="icon-edit icon-white" style="background-color: rgb(215, 214, 214);"></i> &nbsp;&nbsp;&nbsp;&nbsp; <i class="icon-trash icon-white" style="background-color: rgb(215, 214, 214);"></i></td>'))*/
								+'</tr>');
				}
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}
//加载机构类型列表
function getjglx(){
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/getjglx.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>站点类型代码</th>'
								+'<th>(选定)站点类型</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>站点类型代码</th>'
								+'<th>(选定)站点类型</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr>'
									+'<td>'+(jglist[i].jglx?jglist[i].jglx:'暂无数据')+'</td>'
									+'<td><input type="radio" name="jglx_add" value="'+(jglist[i].jglx?jglist[i].jglx:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add(\'addjglx\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr>'
									+'<td>'+(jglist[i].jglx?jglist[i].jglx:'暂无数据')+'</td>'
									+'<td><input type="radio" name="jglx_update" value="'+(jglist[i].jglx?jglist[i].jglx:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_update(\'updatejglx\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add").html(tablehtml1);
			$("#data_table_update").html(tablehtml2);
			
		}
	});
}
//加载机构区域列表
function getjgqy(){
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/getjgqy.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml = '<tr>'
								+'<th>站点所属区域代码</th>'
								+'<th>(选定)区域名称</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>站点所属区域代码</th>'
								+'<th>(选定)区域名称</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(jglist[i].jgqy?jglist[i].jgqy:'暂无数据')+'</td>'
									+'<td><input type="radio" name="jgqy_add" value="'+(jglist[i].jgqy?jglist[i].jgqy:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add2(\'addjgqy\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr>'
									+'<td>'+(jglist[i].jgqy?jglist[i].jgqy:'暂无数据')+'</td>'
									+'<td><input type="radio" name="jgqy_update" value="'+(jglist[i].jgqy?jglist[i].jgqy:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_update2(\'updatejgqy\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add2").html(tablehtml);
			$("#data_table_update2").html(tablehtml2);
			
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
//打开新增区域div
function addjg(){
	greybackadd();
	$("#add").show();
	
	$("input[name='jglx_add']:checked").attr("checked",false);
	$("input[name='jgqy_add']:checked").attr("checked",false);
	
	$("#addmc").val("");
	$("#addjglxmc").val("");
	$("#addjglx").val("");
	$("#addjgqymc").val("");
	$("#addjgqy").val("");
	$("#addjgjd").val("");
	$("#addjgwd").val("");
	$("#addjghb").val("");
	$("#addjgdz").val("");
	$("#addjglxr").val("");
	$("#addjglxdh").val("");
	$("#addnote").val("");
}

function updatejg(jgid,mc,jglxmc,jglx,jgqymc,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note){//打开更新区div
	if(jgid == 'none'){
		alert("当前选中站点尚未获得站点编号，无法对其更新信息，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#update").show();
		updatejgdiv(jgid,mc,jglxmc,jglx,jgqymc,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note);
	}
}
function updatejgdiv(jgid,mc,jglxmc,jglx,jgqymc,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note){//区域id给予默认值
	$("#updatejgid").val(jgid);
	$("#updatemc").val(mc);
	$("#updatejglxmc").val(jglxmc);
	$("#updatejglx").val(jglx);
	$("#updatejgqymc").val(jgqymc);
	$("#updatejgqy").val(jgqy);
	$("#updatejgjd").val(jgjd);
	$("#updatejgwd").val(jgwd);
	$("#updatejghb").val(jghb);
	$("#updatejgdz").val(jgdz);
	$("#updatejglxr").val(jglxr);
	$("#updatejglxdh").val(jglxdh);
	$("#updatenote").val(note);
}

//请求新增机构
function addjgxx(){
	if(trimspace($("#addmc").val())=='' || $("#addjgqy").val()=='' || $("#addjglx").val()==''){
		alert("站点名称、站点类型、站点所属区不能为空！");
		return;
	}
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/add.do",
		type : "POST",
		data : "&mc="+$("#addmc").val()+"&jglx="+$("#addjglx").val()+"&jgjd="+$("#addjgjd").val()
				+"&jghb="+$("#addjghb").val()+"&jgdz="+$("#addjgdz").val()+"&note="+$("#addnote").val()+"&jglxr="+$("#addjglxr").val()
				+"&jglxdh="+$("#addjglxdh").val()+"&jgqy="+$("#addjgqy").val()+"&jgwd="+$("#addjgwd").val(),
		success : function(data){
			if(data.mc && data.jgid){
				alert("新增站点 ["+data.mc+"] 的站点编号为 ["+data.jgid+"]，请牢记！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}
function updatejgxx(){//保存更新信息
	if(trimspace($("#updatemc").val())=='' || $("#updatejgqy").val()=='' || $("#updatejglx").val()==''){
		alert("站点名称、站点类型、站点所属区不能为空！");
		return;
	}
	$("#update").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/update.do",
		type : "POST",
		data : "&jgid="+$("#updatejgid").val()+"&mc="+$("#updatemc").val()+"&jglx="+$("#updatejglx").val()+"&jgjd="+$("#updatejgjd").val()
				+"&jghb="+$("#updatejghb").val()+"&jgdz="+$("#updatejgdz").val()+"&note="+$("#updatenote").val()+"&jglxr="+$("#updatejglxr").val()
				+"&jglxdh="+$("#updatejglxdh").val()+"&jgqy="+$("#updatejgqy").val()+"&jgwd="+$("#updatejgwd").val(),
		success : function(data){
			if(data.jgid){
				alert("站点编号为 ["+data.jgid+"]基础信息更新成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}
function removejg(jgid){//打开注销区域div
	if(jgid == 'none'){
		alert("当前选中站点尚未获得站点编号，无法对其注销，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#remove").show();
		$("#removejgid").text(jgid);
	}
}
function removejgxx(){
	$("#remove").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/remove.do",
		type : "POST",
		data : "&jgid="+$("#removejgid").text(),
		success : function(data){
			if(data.jgid){
				alert("站点编号为 ["+data.jgid+"]的站点已被系统注销！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
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
	if(typename=='update2'){
		$("input[name='jglx_update'][value='"+($("#updatejglx").val())+"']").attr("checked","checked");
		$("input[name='jgqy_update'][value='"+($("#updatejgqy").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='jglx_add']:checked").val());
	if(idstr=='addjglx'){
		$("#addjglxmc").val($("input[name='jglx_add']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_add2(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='jgqy_add']:checked").val());
	if(idstr=='addjgqy'){
		$("#addjgqymc").val($("input[name='jgqy_add']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_update(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='jglx_update']:checked").val());
	if(idstr=='updatejglx'){
		$("#updatejglxmc").val($("input[name='jglx_update']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_update2(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='jgqy_update']:checked").val());
	if(idstr=='updatejgqy'){
		$("#updatejgqymc").val($("input[name='jgqy_update']:checked").attr("title"));
	}
	powerClose();
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	treegrid_radio_change_add('addjglx');
	$("#add2_alert").hide();
	treegrid_radio_change_add2('addjgqy');
	$("#update_alert").hide();
	treegrid_radio_change_update('updatejglx');
	$("#update2_alert").hide();
	treegrid_radio_change_update2('updatejgqy');
	$("#greyground2").hide();
}
function powerClose(){
	$("#add_alert").hide();
	$("#add2_alert").hide();
	$("#update_alert").hide();
	$("#update2_alert").hide();
	$("#greyground2").hide();
}

