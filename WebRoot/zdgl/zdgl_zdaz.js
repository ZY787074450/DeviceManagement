
$(document).ready(function(){
	var datestr = new Date();
	$("#addlrrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
	getjglx();
	getjgqy();
});
/**
 * trim改写，左右去空格
 * @param str
 * @returns
 */
//字符串左右去空格
function trimspace(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//请求新增机构
function addjgxx(){
	if(trimspace($("#addjgid").val())=='' || trimspace($("#addmc").val())=='' || $("#addjgqy").val()=='' || $("#addjglx").val()==''){
		alert("站点编号、站点名称、站点类型、站点所属区不能为空！");
		return;
	}
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/add.do",
		type : "POST",
		data : "&mc="+$("#addmc").val()+"&jglx="+$("#addjglx").val()+"&jgjd="+$("#addjgjd").val()
				+"&jghb="+$("#addjghb").val()+"&jgdz="+$("#addjgdz").val()+"&note="+$("#addnote").val()+"&jglxr="+$("#addjglxr").val()
				+"&jglxdh="+$("#addjglxdh").val()+"&jgqy="+$("#addjgqy").val()+"&jgwd="+$("#addjgwd").val()+"&jgid="+$("#addjgid").val()
				+"&jgys="+$("#addjgys").val()+"&azr="+$("#addazr").val()+"&lrrq="+$("#addlrrq").val(),
		success : function(data){
			if(data.mc && data.jgid){
				alert("新增站点 ["+data.mc+"] 的成功！");
				cleanTable();
			}else{
				alert(data.info);
			}
		}
	});
}
function cleanTable(){
	$("#addmc").val("");
	$("#addjglxmc").val("");
	$("#addjglx").val("");
	$("#addjgjd").val("");
	$("#addjghb").val("");
	$("#addjgdz").val("");
	$("#addnote").val("");
	$("#addjglxr").val("");
	$("#addjglxdh").val("");
	$("#addjgqymc").val("");
	$("#addjgqy").val("");
	$("#addjgwd").val("");
	$("#addjgid").val("");
	$("#addjgys").val("");
	$("#addazr").val("");
	var datestr = new Date();
	$("#addlrrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
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
									+'<td><input type="radio" name="jglx_add" value="'+(jglist[i].jglx?jglist[i].jglx:'暂无数据')+'" '+(jglist[i].jglx=="2"?'checked="checked"':'')+' title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add(\'addjglx\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
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
