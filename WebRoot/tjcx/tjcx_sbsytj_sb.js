/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"");
	$.ajax({
		url : "/DeviceManagement/tjcx/sbsytj_sb/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&rq_start="+$("#rq_start").val()+"&rq_end="+$("#rq_end").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>设备类别名称</th>'
								+'<th>设备采购数量</th>'
								+'<th>设备安装数量</th>'
								/*+'<th>设备出借数量</th>'*/
								+'<th>设备报废数量</th>'
								+'<th>设备检定次数</th>'
								+'<th>设备维修次数</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(sbsyList[i].sblbmc?sbsyList[i].sblbmc:'未知类别名称')+'</td>'
									+'<td>'+(sbsyList[i].sbcgsl?sbsyList[i].sbcgsl:0)+'</td>'
									+'<td>'+(sbsyList[i].sbazsl?sbsyList[i].sbazsl:0)+'</td>'
									/*+'<td>'+(sbsyList[i].sbcjsl?sbsyList[i].sbcjsl:0)+'</td>'*/
									+'<td>'+(sbsyList[i].sbbfsl?sbsyList[i].sbbfsl:0)+'</td>'
									+'<td>'+(sbsyList[i].sbjdcs?sbsyList[i].sbjdcs:0)+'</td>'
									+'<td>'+(sbsyList[i].sbwxcs?sbsyList[i].sbwxcs:0)+'</td>'
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