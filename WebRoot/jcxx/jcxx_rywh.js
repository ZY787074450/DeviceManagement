/**
 * 
 */
FormOp = {
	userid : "",
	mc : "",
	jgid : "",
	tel : "",
	userzt : "",
	lrrq_start : "",
	lrrq_end : ""
};

function initCondition(){
	FormOp.userid = $("#condition_userid").val();
	FormOp.mc = $("#condition_mc").val();
	FormOp.jgid = $("#condition_jgid").val();
	FormOp.tel = $("#condition_tel").val();
	FormOp.userzt = $("input[name='condition_userzt']:checked").val();
	/*FormOp.lrrq_start = $("#condition_lrrq_start").val();
	FormOp.lrrq_end = $("#condition_lrrq_end").val();*/
}

$(document).ready(function(){
	queryuserlist();
});

function queryuserlist(){
	greybackadd()
	initCondition();
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/cx.do?time="+new Date(),
		type : "POST",
		data : FormOp,
		success : function(data){
			greyback();
			var tablehtml = '<tr>'
								+'<th>人员编号</th>'
								+'<th>姓名</th>'
								+'<th>所属机构编号</th>'
								+'<th>联系电话</th>'
								+'<th>人员状态</th>'
								+'<th width="120px">备注</th>'
								+'<th>录入日期</th>'
								+'<th>维护操作</th>'
							+'</tr>';
			if(data.userlist != null && data.userlist != 'null' && data.userlist.length>0){
				var userList = data.userlist;
				for(var i=0;i<userList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(userList[i].USERID?userList[i].USERID:'暂无数据')+'</td>'
									+'<td>'+(userList[i].MC?userList[i].MC:'暂无数据')+'</td>'
									+'<td>'+(userList[i].JGID?userList[i].JGID:'暂无数据')+'</td>'
									+'<td>'+(userList[i].TEL?userList[i].TEL:'暂无数据')+'</td>'
									+'<td>'+(userList[i].USERZT=="0"?'正常':'注销')+'</td>'
									+'<td>'+(userList[i].NOTE?userList[i].NOTE:'')+'</td>'
									+'<td>'+(userList[i].LRRQ?userList[i].LRRQ:'时间不明')+'</td>'
									+(userList[i].USERZT=="0"?('<td><a href="#" title="编辑" onclick="updatemanager(\''+(userList[i].USERID?userList[i].USERID:'none')+'\',\''+(userList[i].MC?userList[i].MC:'')+'\',\''+(userList[i].JGID?userList[i].JGID:'')+'\',\''+(userList[i].TEL?userList[i].TEL:'')+'\',\''+(userList[i].NOTE?userList[i].NOTE:'')+'\')">'
									+'<i class="icon-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="注销" onclick="removemanager(\''+(userList[i].USERID?userList[i].USERID:'none')+'\')">'
									+'<i class="icon-trash"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="权限分配" onclick="grantmenu(\''+(userList[i].USERID?userList[i].USERID:'none')+'\')">'
									+'<i class="icon-list"></i></a></td>'):('<td><i class="icon-ban-circle"></i></td>'))
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
	$("#grant").hide();
}

//打开新增人员div
function addmanager(){
	greybackadd();
	$("#add").show();
	$("#addmc").val("");
	$("#addjgid").val("");
	$("#addtel").val("");
	$("#addnote").val("");
}
//打开修改人员信息div
function updatemanager(userid,mc,jgid,tel,note){
	if(userid == 'none'){
		alert("当前选中人员尚未获得人员编号，无法对其更新信息，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#update").show();
		$("#updateuserid").val(userid);
		$("#updatemc").val(mc);
		$("#updatejgid").val(jgid);
		$("#updatetel").val(tel);
		$("#updatenote").val(note);
	}
}
//打开注销人员div
function removemanager(userid){
	if(userid == 'none'){
		alert("当前选中人员尚未获得人员编号，无法对其注销，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#remove").show();
		$("#removeuserid").text(userid);
	}
}
//打开人员权限分配div
function grantmenu(userid){
	if(userid == 'none'){
		alert("当前选中人员尚未获得人员编号，无法对其分配权限，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#grant").show();
		$("#menuarea").html("菜单权限数据正在加载，请稍等...");
		$.ajax({
			url : "/DeviceManagement/jcxx/rywh/getusermemus.do",
			type : "POST",
			data : "&userid="+userid+"&time"+(new Date()),
			success : function(data){
				var menu_table = '<div><span>当前权限分配目标为：</span><span id="usercode">'+userid+'</span></div><div>';
				if(data.menulist && data.menulist.length > 0){
					var mlist = data.menulist;
					for(var i=0;i<mlist.length;i++){//父菜单装载
						if(mlist[i].MENU_PID=='0'){
							menu_table +='|-';
							menu_table += '<input name="menu" onclick="selectOther(\''+mlist[i].MENU_ID+'\',\'0\')" type="checkbox" value="'+mlist[i].MENU_ID+'" class="parentcode_0">'+mlist[i].MENU_MC+'<br />';
							for(var j=0;j<mlist.length;j++){//子菜单装载
								if(mlist[j].MENU_PID == mlist[i].MENU_ID){
									menu_table +='|&nbsp;&nbsp;|--'
									menu_table += '<input name="menu" onclick="selectOther(\''+mlist[j].MENU_ID+'\',\''+mlist[j].MENU_PID+'\')" type="checkbox" value="'+mlist[j].MENU_ID+'" class="parentcode_'+mlist[j].MENU_PID+'">'+mlist[j].MENU_MC+'<br />';
								}
							}
						}
					}
				}
				menu_table += '</div>';
				$("#menuarea").html(menu_table);
				
				if(data.usermenulist && data.usermenulist.length > 0){
					var usermlist = data.usermenulist;
					for(var i=0;i<usermlist.length;i++){
						$("input:checkbox[value='"+usermlist[i].MENU_ID+"']").attr('checked','true');
					}
				}
				$("#qd").attr("disabled",false);
			}
		});
		
	}
}
function selectOther(childrencode,parentcode){
	setParentSelect(childrencode,parentcode);//父菜单受影响联动
	selectChildren(childrencode);//子菜单联动
}
function selectChildren(parentcode){
	var ischecked = $("input[value='"+parentcode+"']").attr("checked");
	$("input.parentcode_"+parentcode).each(function(){//子菜单跟随父菜单变动
		$(this).attr("checked",ischecked?true:false);
		selectChildren($(this).val());
	});
}
function setParentSelect(childrencode,parentcode){
	if(childrencode=='0'){
		return;
	}
	var ischecked = $("input[value='"+childrencode+"']").attr("checked");
	if(ischecked){
		$("input[value='"+parentcode+"']").attr("checked",true);//父菜单受影响联动
		setParentSelect(parentcode,'0');
	}
}

//请求新增人员
function addmember(){
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/add.do",
		type : "POST",
		data : "&mc="+$("#addmc").val()+"&jgid="+$("#addjgid").val()+"&tel="+$("#addtel").val()+"&note="+$("#addnote").val(),
		success : function(data){
			if(data.mc && data.userid){
				alert("用户 ["+data.mc+"] 的人员编号为 ["+data.userid+"]，人员登录系统初始密码为'222222'，请牢记！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}

function updatemember(){
	$("#update").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/update.do",
		type : "POST",
		data : "&userid="+$("#updateuserid").val()+"&mc="+$("#updatemc").val()+"&jgid="+$("#updatejgid").val()+"&tel="+$("#updatetel").val()+"&note="+$("#updatenote").val(),
		success : function(data){
			if(data.userid){
				alert("人员编号为 ["+data.userid+"]基础信息更新成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}

function removemember(){
	$("#remove").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/remove.do",
		type : "POST",
		data : "&userid="+$("#removeuserid").text(),
		success : function(data){
			if(data.userid){
				alert("人员编号为 ["+data.userid+"]的用户已被系统注销！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist();
		}
	});
}

function grantmember(){
	var strmenu = $("#usercode").text();
	$("input[name='menu']:checked").each(function(){
		strmenu += (","+$(this).val());
	});
	$("#grant").hide();
	
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/setusermemus.do",
		type : "POST",
		data : "&usermlist="+strmenu,
		success : function(data){
			if(data.userid){
				alert("目标对象权限分配成功！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
		}
	});
	
	greyback();
	
}
