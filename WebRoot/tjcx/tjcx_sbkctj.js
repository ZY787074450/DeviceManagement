/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition(41,0,35);
	queryuserlist();
	
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"");
	$.ajax({
		url : "/DeviceManagement/tjcx/sbkctj/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "",
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = ('<tr>'
								+'<th>序号</th>'
								+'<th>设备类别名称</th>'
								+'<th>库存数量</th>'
							+'</tr>');
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					var sbkc = ((sbsyList[i].sbrksl?parseInt(sbsyList[i].sbrksl):0)-(sbsyList[i].sbsysl?parseInt(sbsyList[i].sbsysl):0)-(sbsyList[i].sbcjsl?parseInt(sbsyList[i].sbcjsl):0));//设备库存
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(sbsyList[i].sblbmc?sbsyList[i].sblbmc:'未知类别')+'</td>'
									+'<td>'+sbkc+'</td>'
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
		data : "&filetypecode=3",
		success : function(data){
			if(data.excelurl){
				window.open("/DeviceManagement"+data.excelurl);
			}
		}
	});
}