/**
 * 
 */
FormOp={
	loginname : "",
	password : "",
	
	initdata : function(){
		FormOp.loginname = $("#loginname").val();
		FormOp.password = $("#password").val();
	},
	validate : function(){
		FormOp.initdata();
		if(FormOp.loginname=="")
			return false;
		if(FormOp.password=="")
			return false;
		return true;
	}
};

function click_submit(){
	if(FormOp.validate()){
		$.ajax({
			url : "/DeviceManagement/user/login.do",
			type : "POST",
			data : FormOp,
			success : function(data){
				
			}
		});
	}else{
		alert("用户名、密码不能为空!");
	}
}

$(document).ready(function(){
	var str = (window.location.href).split("?");
	if(str.length>1){
		var params = str[1].split("&");
		for(var i=0;i<params.length;i++){
			if((params[i].split("="))[0]=="msg"){
				alert(decodeURI((params[i].split("="))[1]));
			}
		}
	}
});