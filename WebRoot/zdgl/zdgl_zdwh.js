$(document).ready(function(){
	var datestr = new Date();
	$("#addlrrq").val(datestr.getFullYear()+"-"+(datestr.getMonth()+1)+"-"+datestr.getDate());
	getdeparments();
	
	$("#seljgid").bind("keyup", function(event) {
		seljg();
    });
});
//字符串左右去空格
function trimspace(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//请求新增机构
function addjgxx(){
	if(trimspace($("#addjgid").val())=='' || $("#addwhrq").val()==''){
		alert("站点编号、维护日期不能为空！");
		return;
	}
	$.ajax({
		url : "/DeviceManagement/zdgl/zdwh/add.do",
		type : "POST",
		data : "&jgid="+trimspace($("#addjgid").val())+"&mc="+trimspace($("#addjgmc").val())+"&note="+trimspace($("#addnote").val())
				+"&whr="+trimspace($("#addwhr").val())+"&whrq="+$("#addwhrq").val(),
		success : function(data){
			if(data.mc){
				alert("维护信息已记录！");
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
	$("#addwhr").val("");
	$("#addwhrq").val("");
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
//机构快速定位方法
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