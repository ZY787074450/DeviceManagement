/**
 * 
 */

$(document).ready(function(){
	queryuserlist();
});

function queryuserlist(){
	greybackadd()
	initCondition();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/cx.do?time="+new Date(),
		type : "POST",
		data : "&jgid="+$("#condition_jgid").val()+"&mc="+$("#condition_jgmc").val(),
		success : function(data){
			greyback();
			var tablehtml = '<tr>'
								+'<th>机构编号</th>'
								+'<th>机构名称</th>'
								+'<th>机构类型</th>'
								+'<th>机构所属区域</th>'
								+'<th>地址</th>'
								+'<th>联系人</th>'
								+'<th>联系电话</th>'
								+'<th>机构状态</th>'
								+'<th>备注</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(jglist[i].JGID?jglist[i].JGID:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].MC?jglist[i].MC:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].JGLXMC?jglist[i].JGLXMC:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].JGQYMC?jglist[i].JGQYMC:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].JGDZ?jglist[i].JGDZ:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].JGLXR?jglist[i].JGLXR:'')+'</td>'
									+'<td>'+(jglist[i].JGLXDH?jglist[i].JGLXDH:'')+'</td>'
									+'<td>'+(jglist[i].JGZT=="0"?'正常':'注销')+'</td>'
									+'<td>'+(jglist[i].NOTE?jglist[i].NOTE:'')+'</td>'
									+(jglist[i].JGZT=="0"?('<td><a href="#" title="编辑" onclick="updatejg(\''+(jglist[i].JGID?jglist[i].JGID:'none')+'\',\''+(jglist[i].MC?jglist[i].MC:'')+'\',\''+(jglist[i].JGLX?jglist[i].JGLX:'')+'\',\''+(jglist[i].JGQY?jglist[i].JGQY:'')+'\',\''+(jglist[i].JGJD?jglist[i].JGJD:'')+'\',\''+(jglist[i].JGWD?jglist[i].JGWD:'')+'\',\''+(jglist[i].JGHB?jglist[i].JGHB:'')+'\',\''+(jglist[i].JGDZ?jglist[i].JGDZ:'')+'\',\''+(jglist[i].JGLXR?jglist[i].JGLXR:'')+'\',\''+(jglist[i].JGLXDH?jglist[i].JGLXDH:'')+'\',\''+(jglist[i].NOTE?jglist[i].NOTE:'')+'\')">'
									+'<i class="icon-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="注销" onclick="removejg(\''+(jglist[i].JGID?jglist[i].JGID:'none')+'\')">'
									+'<i class="icon-trash"></i></a></td>'):('<td><i class="icon-ban-circle"></i></td>'))
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
function addmanager(){
	greybackadd();
	$("#add").show();
	$("#addmc").val("");
	$("#addjglx").val("");
	$("#addjgqy").val("");
	$("#addjgjd").val("");
	$("#addjgwd").val("");
	$("#addjghb").val("");
	$("#addjgdz").val("");
	$("#addjglxr").val("");
	$("#addjglxdh").val("");
	$("#addnote").val("");
}

function updatejg(jgid,mc,jglx,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note){//打开更新区div
	if(jgid == 'none'){
		alert("当前选中机构尚未获得机构编号，无法对其更新信息，请联系管理员维护数据！");
	}else{
		$("#update").show();
		updatejgdiv(jgid,mc,jglx,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note);
	}
}
function updatejgdiv(jgid,mc,jglx,jgqy,jgjd,jgwd,jghb,jgdz,jglxr,jglxdh,note){//区域id给予默认值
	$("#updatejgid").val(jgid);
	$("#updatemc").val(mc);
	$("#updatejglx").val(jglx);
	$("#updatejgqy").val(jgqy);
	$("#updatejgjd").val(jgjd);
	$("#updatejgwd").val(jgwd);
	$("#updatejghb").val(jghb);
	$("#updatejgdz").val(jgdz);
	$("#updatejglxr").val(jglxr);
	$("#updatejglxdh").val(jglxdh);
	$("#updatenote").val(note);
}

//请求新增机构
function addjgxx(){
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/add.do",
		type : "POST",
		data : "&mc="+$("#addmc").val()+"&jglx="+$("#addjglx").val()+"&jgjd="+$("#updatejgjd").val()
				+"&jghb="+$("#updatejghb").val()+"&jgdz="+$("#updatejgdz").val()+"&note="+$("#updatenote").val()+"&jglxr="+$("#updatejglxr").val()
				+"&jglxdh="+$("#updatejglxdh").val()+"&jgqy="+$("#updatejgqy").val()+"&jgwd="+$("#updatejgwd").val(),
		success : function(data){
			if(data.mc && data.userid){
				alert("新增机构 ["+data.mc+"] 的机构编号为 ["+data.userid+"]，请牢记！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}
function updatejgxx(){//保存更新信息
	$("#update").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/update.do",
		type : "POST",
		data : "&jgid="+$("#updatejgid").val()+"&mc="+$("#updatemc").val()+"&jglx="+$("#updatejglx").val()+"&jgjd="+$("#updatejgjd").val()
				+"&jghb="+$("#updatejghb").val()+"&jgdz="+$("#updatejgdz").val()+"&note="+$("#updatenote").val()+"&jglxr="+$("#updatejglxr").val()
				+"&jglxdh="+$("#updatejglxdh").val()+"&jgqy="+$("#updatejgqy").val()+"&jgwd="+$("#updatejgwd").val(),
		success : function(data){
			if(data.userid){
				alert("机构编号为 ["+data.jgid+"]基础信息更新成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}
function removejg(jgid){//打开注销区域div
	if(jgid == 'none'){
		alert("当前选中机构尚未获得机构编号，无法对其注销，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#remove").show();
		$("#removejgid").text(userid);
	}
}
function removejgxx(){
	$("#remove").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/qxzdjbmwh/remove.do",
		type : "POST",
		data : "&jgid="+$("#removejgid").text(),
		success : function(data){
			if(data.userid){
				alert("机构编号为 ["+data.jgid+"]的机构已被系统注销！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}

