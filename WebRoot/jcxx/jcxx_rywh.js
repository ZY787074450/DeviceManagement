/**
 * 
 */
FormOp = {
	userid : "",
	mc : "",
	jgid : "",
	jgmc : "",
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
	FormOp.jgmc = $("#condition_jgmc").val();
	/*FormOp.lrrq_start = $("#condition_lrrq_start").val();
	FormOp.lrrq_end = $("#condition_lrrq_end").val();*/
}

$(document).ready(function(){
	setDatatablePosition($("#top_title").outerHeight(true),$("#conditionarea").outerHeight(true),$("#bottom_pagging").outerHeight(true));
	queryuserlist();
	getdeparments();
});

function queryuserlist(actionstr){
	greybackadd();
	initCondition();
	var urlparm = commask(actionstr,"lrrq@desc");
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/cx.do?time="+new Date()+urlparm,
		type : "POST",
		data : FormOp,
		success : function(data){
			greyback();
			$("#sum").text(data.sum?data.sum:'0');
			disOrEnable();
			var tablehtml = '<tr>'
								+'<th>序号</th>'
								+'<th>人员编号</th>'
								+'<th>姓名</th>'
								+'<th>所属机构</th>'
								+'<th>联系电话</th>'
								+'<th>人员状态</th>'
								+'<th>录入日期</th>'
								+'<th>维护操作</th>'
							+'</tr>';
			if(data.userlist != null && data.userlist != 'null' && data.userlist.length>0){
				var userList = data.userlist;
				for(var i=0;i<userList.length;i++){
					tablehtml += ('<tr>'
									+'<td>'+(i + 1 + (parseInt($("#currpage").val())-1) * (parseInt($("#countline").val())))+'</td>'
									+'<td>'+(userList[i].userid?userList[i].userid:'暂无数据')+'</td>'
									+'<td><a href="#" title="'+(userList[i].note?userList[i].note:'')+'">'+(userList[i].mc?userList[i].mc:'暂无数据')+'</a></td>'
									+'<td>'+(userList[i].jgmc?userList[i].jgmc:'暂无数据')+'</td>'
									+'<td>'+(userList[i].tel?userList[i].tel:'暂无数据')+'</td>'
									+'<td>'+(userList[i].userzt=="0"?'正常':'注销')+'</td>'
									+'<td>'+(userList[i].lrrq?userList[i].lrrq:'时间不明')+'</td>'
									+(userList[i].userzt=="0"?('<td><a href="#" title="编辑" onclick="updatemanager(\''+(userList[i].userid?userList[i].userid:'none')+'\',\''+(userList[i].mc?userList[i].mc:'')+'\',\''+(userList[i].jgmc?userList[i].jgmc:'未知名称')+'\',\''+(userList[i].jgid?userList[i].jgid:'')+'\',\''+(userList[i].tel?userList[i].tel:'')+'\',\''+(userList[i].note?userList[i].note:'')+'\')">'
									+'<i class="icon-edit"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="注销" onclick="removemanager(\''+(userList[i].userid?userList[i].userid:'none')+'\')">'
									+'<i class="icon-trash"></i></a> &nbsp;&nbsp;&nbsp;&nbsp; '
									+'<a href="#" title="权限分配" onclick="grantmenu(\''+(userList[i].userid?userList[i].userid:'none')+'\')">'
									+'<i class="icon-list"></i></a></td>'):('<td><i class="icon-edit icon-white" style="background-color: rgb(215, 214, 214);"></i> &nbsp;&nbsp;&nbsp;&nbsp; <i class="icon-trash icon-white" style="background-color: rgb(215, 214, 214);"></i> &nbsp;&nbsp;&nbsp;&nbsp; <i class="icon-list icon-white" style="background-color: rgb(215, 214, 214);"></i></td>'))
								+'</tr>');
				}
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}
//加载站点/部门信息
function getdeparments(){
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/getdeparments.do",
		type : "POST",
		data : "",
		success : function(data){
			var tablehtml1 = '<tr>'
								+'<th>机构编号</th>'
								+'<th>(选定)机构名称</th>'
								+'<th>机构类型</th>'
							+'</tr>';
			var tablehtml2 = '<tr>'
								+'<th>机构编号</th>'
								+'<th>(选定)机构名称</th>'
								+'<th>机构类型</th>'
							+'</tr>';
			if(data.jglist != null && data.jglist != 'null' && data.jglist.length>0){
				var jglist = data.jglist;
				for(var i=0;i<jglist.length;i++){
					tablehtml1 += ('<tr>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><input type="radio" name="deparment_add" value="'+(jglist[i].jgid?jglist[i].jgid:'')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_add(\'addjgid\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'</tr>');
					tablehtml2 += ('<tr>'
									+'<td>'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'</td>'
									+'<td><input type="radio" name="deparment_update" value="'+(jglist[i].jgid?jglist[i].jgid:'暂无数据')+'" title="'+(jglist[i].mc?jglist[i].mc:'未知名称')+'" onchange="treegrid_radio_change_update(\'updatejgid\')" />'+(jglist[i].mc?jglist[i].mc:'暂无数据')+'</td>'
									+'<td>'+(jglist[i].jglxmc?jglist[i].jglxmc:'暂无数据')+'</td>'
								+'</tr>');
				}
			}
			$("#data_table_add").html(tablehtml1);
			$("#data_table_update").html(tablehtml2);
			
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
	$("#addjgmc").val("");
	$("#addjgid").val("");
	$("#addtel").val("");
	$("#addnote").val("");
}
//打开修改人员信息div
function updatemanager(userid,mc,jgmc,jgid,tel,note){
	if(userid == 'none'){
		alert("当前选中人员尚未获得人员编号，无法对其更新信息，请联系管理员维护数据！");
	}else{
		greybackadd();
		$("#update").show();
		$("#updateuserid").val(userid);
		$("#updatemc").val(mc);
		$("#updatejgmc").val(jgmc);
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
						if(mlist[i].menu_pid=='0'){
							menu_table +='|-';
							menu_table += '<input name="menu" onclick="selectOther(\''+mlist[i].menu_id+'\',\'0\')" type="checkbox" value="'+mlist[i].menu_id+'" class="parentcode_0">'+mlist[i].menu_mc+'<br />';
							for(var j=0;j<mlist.length;j++){//子菜单装载
								if(mlist[j].menu_pid == mlist[i].menu_id){
									menu_table +='|&nbsp;&nbsp;|--'
									menu_table += '<input name="menu" onclick="selectOther(\''+mlist[j].menu_id+'\',\''+mlist[j].menu_pid+'\')" type="checkbox" value="'+mlist[j].menu_id+'" class="parentcode_'+mlist[j].menu_pid+'">'+mlist[j].menu_mc+'<br />';
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
						$("input:checkbox[value='"+usermlist[i].menu_id+"']").attr('checked','true');
					}
				}
				$("#qd").attr("disabled",false);
				divloadcenter();
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
	if(trimspace($("#addmc").val())=='' || $("#addjgid").val()==''){
		alert("姓名和机构不能为空");
		return;
	}
	$("#add").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/rywh/add.do",
		type : "POST",
		data : "&mc="+trimspace($("#addmc").val())+"&jgid="+$("#addjgid").val()+"&tel="+trimspace($("#addtel").val())+"&note="+$("#addnote").val(),
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
	if(trimspace($("#updatemc").val())=='' || $("#updatejgid").val()==''){
		alert("姓名和机构编号不能为空");
		return;
	}
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
var ismouseondiv = false;
function focusAdd(){
	ismouseondiv=true;
}
function blurAdd(){
	ismouseondiv=false;
	isCloseDiv();
}
var isinputselect = false;
//关闭所有附属区域
function close_append(){
	isinputselect = false;
	isCloseDiv();
}
//打开附属div区域
function open_append(typename){
	isinputselect = true;
	$("#greyground2").show();
	$("#"+typename+"_alert").show();
	if(typename=='update'){
		$("input[name='deparment_update'][value='"+($("#updatejgid").val())+"']").attr("checked","checked");
	}
}
function treegrid_radio_change_add(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_add']:checked").val());
	if(idstr=='addjgid'){
		$("#addjgmc").val($("input[name='deparment_add']:checked").attr("title"));
	}
	powerClose();
}
function treegrid_radio_change_update(idstr){
	$("#"+idstr).val("");
	$("#"+idstr).val($("input[name='deparment_update']:checked").val());
	if(idstr=='updatejgid'){
		$("#updatejgmc").val($("input[name='deparment_update']:checked").attr("title"));
	}
	powerClose();
}

function isCloseDiv(){
	if(ismouseondiv || isinputselect){
		return;
	}
	$("#add_alert").hide();
	treegrid_radio_change_add('addjgid');
	$("#update_alert").hide();
	treegrid_radio_change_update('updatejgid');
	$("#greyground2").hide();
}
function powerClose(){
	$("#add_alert").hide();
	$("#update_alert").hide();
	$("#greyground2").hide();
}

