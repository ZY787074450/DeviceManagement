/**
 * 
 */

$(document).ready(function(){
	
});

function updatePassword(){
	if($("#new_password").val() == "" || $("#new_password_again").val() == "" || $("#old_password").val() == ""){
		alert("密码不能为空！");
		return;
	}
	if($("#new_password").val() == $("#new_password_again").val()){
		$.ajax({
			url : "/DeviceManagement/jcxx/mmxg/updateUserPassword.do",
			type : "POST",
			data : "&oldpassword="+$("#old_password").val()+"&newpassword="+$("#new_password").val(),
			success : function(data){
				if(data.userid){
					alert(data.info);
					window.parent.location.href="/DeviceManagement/index/login.html";
				}else{
					alert("密码修改功能暂时停用，请联系系统管理员维护系统！");
				}
			}
		});
	}else{
		alert("再次输入的新密码与新密码不匹配！请确认！");
	}
}
