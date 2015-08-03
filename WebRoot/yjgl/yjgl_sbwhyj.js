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
		url : "/DeviceManagement/yjgl/sbwhyj/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "",
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>机构编号</th>'
								+'<th>机构名称</th>'
								+'<th>上次维护日期</th>'
								+'<th>预警值(单位：天)</th>'
								+'<th>超过预警天数</th>'
							+'</tr>';
			if(data.sbsylist != null && data.sbsylist != 'null' && data.sbsylist.length>0){
				var sbsyList = data.sbsylist;
				for(var i=0;i<sbsyList.length;i++){
					
					var yjz = (sbsyList[i].yjz?parseInt(sbsyList[i].yjz):(sbsyList[i].yjz=='0'?0:-1));//预警值

					var wxrqcz = (sbsyList[i].wxrqcz?(parseInt(sbsyList[i].wxrqcz)):(sbsyList[i].wxrqcz=='0'?0:-1));//上一次维修时间差
					
					var whrqcz = (sbsyList[i].whrqcz?(parseInt(sbsyList[i].whrqcz)):(sbsyList[i].whrqcz=='0'?0:-1));//上一次维护时间差
					
					var scwhlx = (wxrqcz==(-1)?(whrqcz==(-1)?'none':'wh'):(whrqcz==-1?'wx':(wxrqcz<whrqcz?'wx':'wh')));//上一次是维修还是维护
					
					var scwhrq = (scwhlx=='none'?'尚未维护记录':(scwhlx=='wh'?sbsyList[i].scwhrq:sbsyList[i].scwxrq));//上次维护日期
					
					var minwhrqcz = (wxrqcz==-1?(whrqcz==-1?-1:whrqcz):(whrqcz==-1?wxrqcz:(wxrqcz<whrqcz?wxrqcz:whrqcz)));//距离上一次维护时间差

					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(sbsyList[i].jgid?sbsyList[i].jgid:'未知机构编号')+'</td>'
									+'<td>'+(sbsyList[i].jgmc?sbsyList[i].jgmc:'未知机构')+'</td>'
									+'<td>'+scwhrq+'</td>'
									+'<td>'+(yjz==-1?'未设置预警值':yjz)+'</td>'
									+'<td>'+(yjz==-1?'无法计算':(minwhrqcz==-1?'无法计算':(minwhrqcz<=yjz?'未超过':('超出'+(minwhrqcz-yjz)+'天'))))+'</td>'
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