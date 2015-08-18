$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	getdeparments();
});
function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"qxsjsj_2");
	$.ajax({
		url : "/DeviceManagement/zdgl/qxsjdr/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&jgid="+$("#condition_jgid").val()+"&sjd_start="+$("#sjd_start").val()+"&sjd_end="+$("#sjd_end").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>站点编号</th>'
								+'<th>站点名称</th>'
								+'<th>数据时间</th>'
								+'<th>风向</th>'
								+'<th>风速</th>'
								+'<th>雨量</th>'
								+'<th>温度</th>'
								+'<th>湿度</th>'
								+'<th>气压</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jgmc?jglist[i].jgmc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].qxsjsj_2?((jglist[i].qxsjsj_2).substr(0,4)+"年"+(jglist[i].qxsjsj_2).substr(4,2)+"月"+(jglist[i].qxsjsj_2).substr(6,2)+"日 "+(jglist[i].qxsjsj_2).substr(8,2)+"时"+(jglist[i].qxsjsj_2).substr(10,2)+"分"+(jglist[i].qxsjsj_2).substr(12,2)+"秒"):'暂无数据')+'</td>'
									+'<td>'+(jglist[i].fx?jglist[i].fx:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].fs?jglist[i].fs:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].yl?jglist[i].yl:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].wd?jglist[i].wd:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].sd?jglist[i].sd:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].qy?jglist[i].qy:'暂无数据')+'</td>'
								+'</tr>');
				}
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}
//加载站点/部门信息
function getdeparments(){
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/getdeparments.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>机构编号</th>'
								+'<th>(选定)机构名称</th>'
								+'<th>机构类型</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>机构编号</th>'
								+'<th>(选定)机构名称</th>'
								+'<th>机构类型</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><input type="radio" name="deparment_add" value="'+(jglist[i].jgid?jglist[i].jgid:'')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add(\'addjgid\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><input type="radio" name="deparment_update" value="'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_update(\'updatejgid\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add").html(tablehtml1);
			$("#data_table_update").html(tablehtml2);
			
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
//打开新增人员div
function openadd(){
	greybackadd();
	$("#add").show();
	
	$("#addjgid").val("");
	$("#addjgmc").val("");
	$("#addqxsjsj_1").val("");
	$("#addfx").val("");
	$("#addfs").val("");
	$("#addyl").val("");
	$("#addwd").val("");
	$("#addsd").val("");
	$("#addqy").val("");
}

//请求新增
function addmessage(){
	if(trimspace($("#addjgid").val())==''){
		alert("机构编号不能为空");
		return;
	}
	if(trimspace($("#addqxsjsj_1").val())=='' || trimspace($("#addqxsjsj_1").val()).length!=14){
		alert("数据时间填写错误！格式：YYYYMMDDhhmmss(14位数字);‘YYYY’表示年，‘MM’表示月，‘DD’表示天，‘hh’表示时，‘mm’表示分，‘ss’表示秒！");
		return;
	}
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/zdgl/qxsjdr/add.do",
		type : "POST",
		data : "&jgid="+trimspace($("#addjgid").val())+"&jgmc="+trimspace($("#addjgmc").val())+"&qxsjsj_1="+trimspace($("#addqxsjsj_1").val())+"&fx="+trimspace($("#addfx").val())
				+"&fs="+trimspace($("#addfs").val())+"&yl="+trimspace($("#addyl").val())+"&wd="+trimspace($("#addwd").val())+"&sd="+trimspace($("#addsd").val())
				+"&qy="+trimspace($("#addqy").val()),
		success : function(data){
			if(data.jgid){
				alert("气象数据已生成！");
			}else{
				if(data.code=='203'){
					alert(data.info);
				}else{
					alert("数据处理异常，请联系系统管理员！");
				}
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
	if(typename=='update'){
		$("input[name='deparment_update'][value='"+($("#updatejgid").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_add']:checked").val());
	if(idstr=='addjgid'){
		$("#addjgmc").val($("input[name='deparment_add']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_update(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_update']:checked").val());
	if(idstr=='updatejgid'){
		$("#updatejgmc").val($("input[name='deparment_update']:checked").attr("title"));
	}
	powerClose();
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	treegrid_radio_change_add('addjgid');
	$("#update_alert").hide();
	treegrid_radio_change_update('updatejgid');
	$("#greyground2").hide();
}
function powerClose(){
	$("#add_alert").hide();
	$("#update_alert").hide();
	$("#greyground2").hide();
}
