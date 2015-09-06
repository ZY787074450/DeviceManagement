/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),0,$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"");
	$.ajax({
		url : "/DeviceManagement/yjgl/sbjdyj/cx.do?time="+new Date()+urlparm,
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
								+'<th>设备状态</th>'
								+'<th>上次检定日期</th>'
								+'<th>预警值(单位：天)</th>'
								+'<th>超过预警天数</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					
					var yjz = (sbsyList[i].yjz?parseInt(sbsyList[i].yjz):(sbsyList[i].yjz=='0'?0:-1));//预警值

					var jdrqcz = (sbsyList[i].jdrqcz?(parseInt(sbsyList[i].jdrqcz)):(sbsyList[i].jdrqcz=='0'?0:-1));//上一次检定时间差

					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td><a href="#" title="'+(sbsyList[i].note?sbsyList[i].note:'')+'">'+(sbsyList[i].sbmc?sbsyList[i].sbmc:'暂无数据')+'</a></td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未命名')+'</td>'
									+'<td>'+(sbsyList[i].sbzt=="0"?'使用':(sbsyList[i].sbzt=="1"?'维修':'报废'))+'</td>'
									+'<td>'+(sbsyList[i].jdrq?sbsyList[i].jdrq:'')+'</td>'
									+'<td>'+(yjz==-1?'未设置预警值':yjz)+'</td>'
									+'<td>'+(yjz==-1?'<font color="red">未设置预警值</font>':(jdrqcz==-1?'<font color="red">尚未检定记录</font>':(jdrqcz<=yjz?'正常':('<font color="red">超出'+(jdrqcz-yjz)+'天</font>'))))+'</td>'
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