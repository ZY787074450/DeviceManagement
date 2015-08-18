/**
 * 
 */
$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	
});

function queryuserlist(actionstr){
	greybackadd();
	//var urlparm = commask(actionstr,"jgid");
	$.ajax({
		url : "/DeviceManagement/jcxx/yjzwh/cx.do?time="+new Date(),//+urlparm
		type : "POST",
		data : "",//"&jgid="+$("#condition_jgid").val()+"&jgmc="+$("#condition_jgmc").val()+"&mc="+$("#condition_yjmc").val()+"&yjlx="+$("input[name='condition_yjlx']:checked").val(),
		success : function(data){
			greyback();
			//$("#sum").text(data.sum?data.sum:'0');
			//disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>预警类型</th>'
								+'<th>名称</th>'
								+'<th>所属站点编号</th>'
								+'<th>所属站点</th>'
								+'<th>预警值</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.yjlist != null && data.yjlist != 'null' && data.yjlist.length>0){
				var yjList = data.yjlist;
				for(var i=0;i<yjList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1)+'</td>'
									+'<td>'+yjList[i].yjid+'</td>'
									+'<td><a href="#" title="'+(yjList[i].note?yjList[i].note:'')+'">'+(yjList[i].mc?yjList[i].mc:'')+'</a></td>'
									+'<td>'+(yjList[i].jgid?(yjList[i].jgid=="0000"?'通用编号0000':yjList[i].jgid):'')+'</td>'
									+'<td>'+(yjList[i].jgid?(yjList[i].jgid=="0000"?'站点通用':yjList[i].jgmc):'暂无数据')+'</td>'
									+'<td>'+(yjList[i].yjz?yjList[i].yjz:'')+'</td>'
									+('<td><a href="#" title="修改" onclick="updateyj(\''+(yjList[i].yjid?yjList[i].yjid:'')+'\',\''+(yjList[i].mc?yjList[i].mc:'')+'\',\''+(yjList[i].jgid?(yjList[i].jgid=="0000"?'机构通用':yjList[i].jgmc):'未知机构')+'\',\''+(yjList[i].jgid?yjList[i].jgid:'')+'\',\''+(yjList[i].yjz?yjList[i].yjz:'')+'\',\''+(yjList[i].note?yjList[i].note:'')+'\',\''+(yjList[i].jgid?(yjList[i].jgid=="0000"?'设备库存预警':'站点维护预警'):'')+'\')">'
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

function updateyj(yjid,mc,jgmc,jgid,yjz,note,yjlx){
	greybackadd();
	$("#update").show();
	$("#updateyjlx").val(yjlx);
	$("#updateyjid").val(yjid);
	$("#updatemc").val(mc);
	$("#updatejgmc").val(jgmc);
	$("#updatejgid").val(jgid);
	$("#updateyjz").val(yjz);
	$("#updatenote").val(note);
}

function updateyjwh(){
	if(trimspace($("#updateyjz").val())==''){
		alert("预警值不能为空！");
		return;
	}
	if(!checknumber()){
		return;
	}
	$("#update").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/yjzwh/update.do",
		type : "POST",
		data : "&yjid="+$("#updateyjid").val()+"&mc="+$("#updatemc").val()+"&jgid="+$("#updatejgid").val()+"&yjz="+trimspace($("#updateyjz").val())+"&note="+$("#updatenote").val(),
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
//验证预警值是否为数字
function checknumber(){
	var reg = new RegExp("^(0|[1-9][0-9]*)$");//零和非零开头的数字
	if(reg.test($("#updateyjz").val()) && ($("#updateyjz").val()).length<=5){
		return true;
	}else{
		if(reg.test($("#updateyjz").val())){
			alert("请正常填写数字(零或非零开头的数字)！");
			return false;
		}else{
			alert("预警值只能填写非负整数，且输入不得超过5位数字(不得超过100年)！");
			return false;
		}
		
	}
}

