/**
 * 
 */
FormOp={
	userid : "",
	userpass : "",
	
	initdata : function(){
		FormOp.userid = $("#userid").val();
		FormOp.userpass = $("#userpass").val();
	},
	validate : function(){
		FormOp.initdata();
		if(FormOp.userid=="")
			return false;
		if(FormOp.userpass=="")
			return false;
		return true;
	}
};

function click_submit(){
	if(FormOp.validate()){
		$("#login_message").submit();
		
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