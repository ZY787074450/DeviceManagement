/**
 * 
 */
$(document).ready(function(){
	queryuserlist();
});

function queryuserlist(actionstr){
	greybackadd();
	var urlparm = commask(actionstr,"jgid");
	$.ajax({
		url : "/DeviceManagement/jcxx/yjzwh/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : "&jgid="+$("#condition_jgid").val()+"&mc="+$("#condition_yjmc").val()+"&yjid="+$("input[name='condition_yjlx']:checked").val(),
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>预警分类</th>'
								+'<th>名称</th>'
								+'<th>所属机构</th>'
								+'<th>预警值</th>'
								+'<th width="120px">备注</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.yjlist != null && data.yjlist != 'null' && data.yjlist.length>0){
				var yjList = data.yjlist;
				for(var i=0;i<yjList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(yjList[i].yjid?yjList[i].yjid:'')+'</td>'
									+'<td>'+(yjList[i].mc?yjList[i].mc:'')+'</td>'
									+'<td>'+(yjList[i].jgid?(yjList[i].jgid=="0000"?'机构通用':yjList[i].jgid):'')+'</td>'
									+'<td>'+(yjList[i].yjz?yjList[i].yjz:'')+'</td>'
									+'<td>'+(yjList[i].note?yjList[i].note:'')+'</td>'
									+('<td><a href="#" title="修改" onclick="updateyj(\''+(yjList[i].yjid?yjList[i].yjid:'')+'\',\''+(yjList[i].mc?yjList[i].mc:'')+'\',\''+(yjList[i].jgid?yjList[i].jgid:'')+'\',\''+(yjList[i].yjz?yjList[i].yjz:'')+'\',\''+(yjList[i].note?yjList[i].note:'')+'\')">'
									+'<i class="icon-edit"></i></a></td>')
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
	$("#update").hide();
}

function updateyj(yjid,mc,jgid,yjz,note){
	greybackadd();
	$("#update").show();
	$("#updateyjid").val(yjid);
	$("#updatemc").val(mc);
	$("#updatejgid").val(jgid);
	$("#updateyjz").val(yjz);
	$("#updatenote").val(note);
}

function updateyjwh(){
	$("#update").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/yjzwh/update.do",
		type : "POST",
		data : "&yjid="+$("#updateyjid").val()+"&mc="+$("#updatemc").val()+"&jgid="+$("#updatejgid").val()+"&yjz="+$("#updateyjz").val()+"&note="+$("#updatenote").val(),
		success : function(data){
			if(data.jgid){
				alert("信息更新成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}

