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
				}else{
					alert("数据处理异常，请联系系统管理员！");
				}
			}
		});
	}else{
		alert("再次输入的新密码与新密码不匹配！请确认！");
	}
}
