/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	$("#rq_start").val(timeArr[0]);
	$("#rq_end").val(timeArr[1]);
	queryuserlist();
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"jgid");
	$.ajax({
		url : "/DeviceManagement/tjcx/sbsytj_zd/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&rq_start="+$("#rq_start").val()+"&rq_end="+$("#rq_end").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>站点编号</th>'
								+'<th>站点名称</th>'
								+'<th>设备安装数量</th>'
								+'<th>设备报废数量</th>'
								+'<th>设备检定次数</th>'
								+'<th>设备维修次数</th>'
								+'<th>站点维护次数</th>'
								+'<th>站点维修次数</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(sbsyList[i].jgid?sbsyList[i].jgid:'未知站点编号')+'</td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未知机构')+'</td>'
									+'<td>'+(sbsyList[i].sbazsl?sbsyList[i].sbazsl:0)+'</td>'
									+'<td>'+(sbsyList[i].sbbfsl?sbsyList[i].sbbfsl:0)+'</td>'
									+'<td>'+(sbsyList[i].sbjdcs?sbsyList[i].sbjdcs:0)+'</td>'
									+'<td>'+(sbsyList[i].sbwxcs?sbsyList[i].sbwxcs:0)+'</td>'
									+'<td>'+(sbsyList[i].jgwhcs?sbsyList[i].jgwhcs:0)+'</td>'
									+'<td>'+(sbsyList[i].jgwxcs?sbsyList[i].jgwxcs:0)+'</td>'
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

//数据导出
function getfile(){
	$.ajax({
		url : "/DeviceManagement/tjcx/getfile/createfile.do",
		type : "POST",
		data : "&filetypecode=1"+"&rq_start="+$("#rq_start").val()
				+"&rq_end="+$("#rq_end").val(),
		success : function(data){
			if(data.excelurl){
				window.open("/DeviceManagement"+data.excelurl);
			}
		}
	});
}