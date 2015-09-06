$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	$("#rq_start").val(timeArr[0]);
	$("#rq_end").val(timeArr[1]);
	queryuserlist();
	
	var datestr = new Date();
	$("#addlrrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
	getdeparments();
	
	$("#seljgid").bind("keyup", function(event) {
		seljg();
    });
});
function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"jgid");
	$.ajax({
		url : "/DeviceManagement/zdgl/zdwx/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&jgid="+$("#condition_jgid").val()+"&jgzt=0"+"&rq_start="+$("#rq_start").val()+"&rq_end="+$("#rq_end").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
							+'<th>序号</th>'
							+'<th>站点编号</th>'
							+'<th>站点名称</th>'
							+'<th>维修人</th>'
							+'<th>维修时间</th>'
							+'<th width="250px">故障原因</th>'
							+'<th>备注</th>'
							+'<th>操作</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].wxr?jglist[i].wxr:'')+'</td>'
									+'<td>'+(jglist[i].wxrq?jglist[i].wxrq:'')+'</td>'
									+'<td>'+(jglist[i].gzyy?jglist[i].gzyy:'')+'</td>'
									+'<td>'+(jglist[i].note?jglist[i].note:'')+'</td>'
									+(jglist[i].jgzt=="0"?('<td>'
									+'<a href="#" title="维护" onclick="updatejg(\''+(jglist[i].jgid?jglist[i].jgid:'none')+'\',\''+(jglist[i].mc?jglist[i].mc:'')+'\')">'
									+'<i class="icon-edit"></i></a></td>'):('<td><i class="icon-edit icon-white" style="background-color: rgb(215, 214, 214);"></i></td>'))
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
//打开新增区域div
function addjg(){
	greybackadd();
	$("#add").show();
	$("#addjgid").val("");
	$("#addjgmc").val("");
	$("#addwxr").val("");
	$("#addwxrq").val("");
	$("#addgzyy").val("");
	$("#addnote").val("");
}
function updatejg(jgid,jgmc){//打开更新区div
	if(jgid == 'none'){
		alert("当前选中站点尚未获得站点编号，无法对其更新信息，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#update").show();
		$("#updatejgid").val("");
		$("#updatejgmc").val("");
		$("#updatewxr").val("");
		$("#updatewxrq").val("");
		$("#updategzyy").val("");
		$("#updatenote").val("");
		updatejgdiv(jgid,jgmc);
	}
}
function updatejgdiv(jgid,jgmc){//区域id给予默认值
	$("#updatejgid").val(jgid);
	$("#updatejgmc").val(jgmc);
}
//请求新增站点
function addjgxx(){
	if(trimspace($("#addjgid").val())=='' || $("#addwxrq").val()==''){
		alert("站点编号、维修日期不能为空！");
		return;
	}
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/zdgl/zdwx/add.do",
		type : "POST",
		data : "&jgid="+trimspace($("#addjgid").val())+"&mc="+trimspace($("#addjgmc").val())+"&note="+trimspace($("#addnote").val())
				+"&wxr="+trimspace($("#addwxr").val())+"&wxrq="+$("#addwxrq").val()+"&gzyy="+trimspace($("#addgzyy").val()),
		success : function(data){
			if(data.mc){
				alert("维修信息已记录！");
				cleanTable();
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}
//请求新增站点
function updatejgxx(){
	if(trimspace($("#updatejgid").val())=='' || $("#updatewxrq").val()==''){
		alert("站点编号、维修日期不能为空！");
		return;
	}
	$.ajax({
		url : "/DeviceManagement/zdgl/zdwx/add.do",
		type : "POST",
		data : "&jgid="+trimspace($("#updatejgid").val())+"&mc="+trimspace($("#updatejgmc").val())+"&note="+trimspace($("#updatenote").val())
				+"&wxr="+trimspace($("#updatewxr").val())+"&wxrq="+$("#updatewxrq").val()+"&gzyy="+trimspace($("#updategzyy").val()),
		success : function(data){
			if(data.mc){
				alert("维修信息已记录！");
				cleanTable();
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
		}
	});
}
function cleanTable(){
	$("#addjgid").val("");
	$("#addjgmc").val("");
	$("#addnote").val("");
	$("#addwxr").val("");
	$("#addwxrq").val("");
	$("#addgzyy").val("");
}
//加载站点/部门信息
function getdeparments(){
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/getdeparments.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>站点编号</th>'
								+'<th>(选定)站点名称</th>'
								+'<th>站点类型</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>站点编号</th>'
								+'<th>(选定)站点名称</th>'
								+'<th>站点类型</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr class="addJG" title="\''+jglist[i].jgid+'\'">'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><input type="radio" name="deparment_add" value="'+(jglist[i].jgid?jglist[i].jgid:'')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add(\'addjgid\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr class="updateJG" title="\''+jglist[i].jgid+'\'">'
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
//站点快速定位方法
function seljg(){
	$(".addJG").each(function(){
		if(trimspace($("#seljgid").val())==''){
			$(this).show();
		}else{
			if($(this).attr("title").indexOf($("#seljgid").val())>0){
				$(this).show();
			}else{
				$(this).hide();
			}
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
	if(ismouseondiv || isinputselect || ishide){
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


var ishide = false;
function killhide(){
	ishide = true;
}

function savehide(){
	ishide = false;
}