/**
 * 
 */
FormOp = {
	jgid : "",
	sbmc : "",
	sbsylx : "",
	czrq_start : "",
	czrq_end : "",
	jgmc : ""
};

function initCondition(){
	FormOp.jgid = $("#condition_jgid").val();
	FormOp.sbmc = $("#condition_sbmc").val();
	FormOp.sbsylx = $("input[name='condition_sbsylx']:checked").val();
	FormOp.czrq_start = $("#condition_czrq_start").val();
	FormOp.czrq_end = $("#condition_czrq_end").val();
	FormOp.jgmc = $("#condition_jgmc").val()
}

$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	
});

function queryuserlist(actionstr){
	greybackadd();
	initCondition();
	var urlparm = commask(actionstr,"czrq");
	$.ajax({
		url : "/DeviceManagement/sbgl/sbsyjl/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : FormOp,
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>设备名称</th>'
								+'<th>设备使用站点</th>'
								+'<th>设备使用类型</th>'
								+'<th>设备操作人</th>'
								+'<th>操作日期</th>'
							+'</tr>';
			if(data.sbsyjllist != null && data.sbsyjllist != 'null' && data.sbsyjllist.length>0){
				var sbsyjlList = data.sbsyjllist;
				for(var i=0;i<sbsyjlList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td><a href="#" title="'+(sbsyjlList[i].note?sbsyjlList[i].note:'')+'">'+(sbsyjlList[i].sbmc?sbsyjlList[i].sbmc:'暂无数据')+'</a></td>'
									+'<td>'+(sbsyjlList[i].jgmc?sbsyjlList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyjlList[i].sbsylx=="1"?'维修':(sbsyjlList[i].sbsylx=="2"?'报废':(sbsyjlList[i].sbsylx=="3"?'检定':'维护')))+'</td>'
									+'<td>'+(sbsyjlList[i].czr?sbsyjlList[i].czr:'暂无数据')+'</td>'
									+'<td>'+(sbsyjlList[i].czrq?sbsyjlList[i].czrq:'')+'</td>'
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
}