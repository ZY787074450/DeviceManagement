/**
 * 
 */
$(document).ready(function(){
	//queryuserlist_for_test();
	//queryuserlist();//手绘树状图
	queryuserlist_for_easyui();//使用easyui绘制树状图
	
	getUrlParam();
});

function getUrlParam(){
	var str = (window.location.href).split("?");
	if(str.length>1){
		var params = str[1].split("&");
		for(var i=0;i<params.length;i++){
			if((params[i].split("="))[0]=="msg"){
				alert(decodeURI((params[i].split("="))[1]));
			}
		}
	}
} 

function queryuserlist(){
	greybackadd();
	$.ajax({
		url : "/DeviceManagement/jcxx/sbflwh/cx.do?time="+new Date(),
		type : "POST",
		data : "",
		success : function(data){
			greyback();
			var tablehtml = '<tr>'
								+'<th style="text-align: left;">设备类别名称</th>'
								+'<th>分类级别</th>'
								+'<th>设备图片</th>'
								+'<th>操作</th>'
							+'</tr>';
			if(data.sblblist != null && data.sblblist != 'null' && data.sblblist.length>0){
				
				var sblbList = data.sblblist;
				tablehtml += drawsixlevel(sblbList);
			}
			$("#data_table").html(tablehtml);
			
		}
	});
}
//根据设备分类级别，分装数据列表，并产生树状图html
function drawsixlevel(sblbList){
	var tablehtml = "";
	var sblblist1 = new Array();
	var sblblist2 = new Array();
	var sblblist3 = new Array();
	var sblblist4 = new Array();
	var sblblist5 = new Array();
	var sblblist6 = new Array();
	for(var i=0;i<sblbList.length;i++){
		if(sblbList[i].sbcj==1){
			sblblist1.push(sblbList[i]);
		}else if(sblbList[i].sbcj==2){
			sblblist2.push(sblbList[i]);
		}else if(sblbList[i].sbcj==3){
			sblblist3.push(sblbList[i]);
		}else if(sblbList[i].sbcj==4){
			sblblist4.push(sblbList[i]);
		}else if(sblbList[i].sbcj==5){
			sblblist5.push(sblbList[i]);
		}else if(sblbList[i].sbcj==6){
			sblblist6.push(sblbList[i]);
		}
	}
	for(var a=0;a<sblblist1.length;a++){
		tablehtml += drawtreemodel(sblblist1[a],1);
		for(var b=0;b<sblblist2.length;b++){if(sblblist2[b].fsbflid == sblblist1[a].sbflid){
			tablehtml += drawtreemodel(sblblist2[b],2);
			for(var c=0;c<sblblist3.length;c++){if(sblblist3[c].fsbflid == sblblist2[b].sbflid){
				tablehtml += drawtreemodel(sblblist3[c],3);
				for(var d=0;d<sblblist4.length;d++){if(sblblist4[d].fsbflid == sblblist3[c].sbflid){
					tablehtml += drawtreemodel(sblblist4[d],4);
					for(var e=0;e<sblblist5.length;e++){if(sblblist5[e].fsbflid == sblblist4[d].sbflid){
						tablehtml += drawtreemodel(sblblist5[e],5);
						for(var f=0;f<sblblist6.length;f++){if(sblblist6[f].fsbflid == sblblist5[e].sbflid){
							tablehtml += drawtreemodel(sblblist6[f],6);
						}}
					}}
				}}
			}}
		}}
	}
	return tablehtml;
}
//绘制树状前缀特效，参数sblbList当前层级数据列表，参数cj当前绘制树状层级
function drawtreemodel(sblbObj,cj){

	var draw_cj = (sblbObj.sfzl==0)?('<i class="icon-chevron-down"></i>'):(' &nbsp; &nbsp; ');//当前层级所需要的前缀特效
	for(var i=1;i<cj;i++){
		draw_cj = (' &nbsp; &nbsp; &nbsp; &nbsp; '+draw_cj);
	}
	var tablehtml = ('<tr>'
						+'<td style="text-align: left;">'+draw_cj+(sblbObj.sblbmc?sblbObj.sblbmc:'')+'</td>'
						+'<td>'+(sblbObj.sbcj?sblbObj.sbcj:'')+'</td>'
						+('<td><a href="#" title="点击查看大图" onclick="loadpicture(\''+(sblbObj.sbtpdz?sblbObj.sbtpdz:'')+'\')">点击查看大图</a></td>')
						+('<td><a href="#" title="添加子类" onclick="addsblb(\''+(sblbObj.sbflid?sblbObj.sbflid:'')+'\',\''+(sblbObj.sbcj?sblbObj.sbcj:'')+'\')">'
						+'<i class="icon-plus-sign"></i></a>&nbsp;&nbsp;')
						+('<a href="#" title="删除该类" onclick="removesblb(\''+(sblbObj.sbflid?sblbObj.sbflid:'')+'\',\''+(sblbObj.sblbmc?sblbObj.sblbmc:'')+'\')">'
						+'<i class="icon-minus-sign"></i></a></td>')
					+'</tr>');
	return tablehtml;
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
	$("#remove").hide();
	$("#loadpic").hide();
}
function loadpicture(url){
	if(url==null || url=="null" || url==""){
		alert("未找到此类图片！");
		return;
	}
	greybackadd();
	$("#loadpic").show();
	$("#loadsbtp").attr("src",url);
}
//打开新增区域div
function addsblb(fsbflid,sbcj){
	if(sbcj==''||sbcj=='6'){
		alert("当前设备层级已达上限，不可添加子类！");
		return;
	}
	greybackadd();
	$("#add").show();
	$("#addfsbflid").val(fsbflid);
	$("#addsbcj").val((parseInt(sbcj)+1));
}
//打开新增区域div
function removesblb(sbflid,sblbmc){
	greybackadd();
	$("#remove").show();
	$("#removesbzl").text(sblbmc);
	$("#removesbflid").val(sbflid);
}
function addsbwhfl(){
	$("#addsblb").submit();
	greyback();
}
function removesbwhfl(){
	$("#remove").hide();
	$.ajax({
		url : "/DeviceManagement/jcxx/sbflwh/remove.do",
		type : "POST",
		data : "&sbflid="+$("#removesbflid").val()+"&sblbmc="+$("#removesbzl").text(),
		success : function(data){
			if(data.sblbmc){
				alert("设备类别 ["+data.sblbmc+"]已被系统注销！");
			}else{
				alert("数据处理异常，请联系系统管理员！");
			}
			greyback();
			queryuserlist_for_easyui();
		}
	});
}

//使用easyui发送请求获得树状图
function queryuserlist_for_easyui(){
	greybackadd();
	$.ajax({
		url : "/DeviceManagement/jcxx/sbflwh/cx.do?time="+new Date(),
		type : "POST",
		dataType: "json",
		data : "",
		success : function(data){
			greyback();
			if(data.sblblist != null && data.sblblist != 'null' && data.sblblist.length>0){
				var sblbList = data.sblblist;
				var newData = drawsixlevel_cz(sblbList);
				$("#dataarea").treegrid('loadData', newData);
			}			
		}
	});
}
var sum = 0;
//js对象重组,返回重组完成后的json格式对象
function drawsixlevel_cz(sblbList){
	var sblblist1 = new Array();
	var sblblist2 = new Array();
	var sblblist3 = new Array();
	var sblblist4 = new Array();
	var sblblist5 = new Array();
	var sblblist6 = new Array();
	
	for(var i=0;i<sblbList.length;i++){
		if(sblbList[i].sbcj==1){
			sblblist1.push(sblbList[i]);
		}else if(sblbList[i].sbcj==2){
			sblblist2.push(sblbList[i]);
		}else if(sblbList[i].sbcj==3){
			sblblist3.push(sblbList[i]);
		}else if(sblbList[i].sbcj==4){
			sblblist4.push(sblbList[i]);
		}else if(sblbList[i].sbcj==5){
			sblblist5.push(sblbList[i]);
		}else if(sblbList[i].sbcj==6){
			sblblist6.push(sblbList[i]);
		}
	}
	
	var list1 = new Array();
	for(var a=0;a<sblblist1.length;a++){
		var list2 = new Array();
		for(var b=0;b<sblblist2.length;b++){
			if(sblblist2[b].fsbflid == sblblist1[a].sbflid){
			var list3 = new Array();
			for(var c=0;c<sblblist3.length;c++){
				if(sblblist3[c].fsbflid == sblblist2[b].sbflid){
				var list4 = new Array();
				for(var d=0;d<sblblist4.length;d++){
					if(sblblist4[d].fsbflid == sblblist3[c].sbflid){
					var list5 = new Array();
					for(var e=0;e<sblblist5.length;e++){
						if(sblblist5[e].fsbflid == sblblist4[d].sbflid){
						var list6 = new Array();
						for(var f=0;f<sblblist6.length;f++){
							if(sblblist6[f].fsbflid == sblblist5[e].sbflid){	
							list6.push(sblblist6[f]);
							}
						}
						sblblist5[e].children = list6;
						list5.push(sblblist5[e]);
						}
					}
					sblblist4[d].children = list5;
					list4.push(sblblist4[d]);
					}
				}
				sblblist3[c].children = list4;
				list3.push(sblblist3[c]);
				}
			}
			sblblist2[b].children = list3;
			list2.push(sblblist2[b]);
			}
		}
		sblblist1[a].children = list2;
		list1.push(sblblist1[a]);
	}
	return list1;
}

function checkpic(sbtpdz){
	return '<a href="#" title="点击查看大图" onclick="loadpicture(\''+(sbtpdz?sbtpdz:'')+'\')">点击查看大图</a>';
}
function cz(sbflid,rowObj){
	return ('<a href="#" title="添加子类" onclick="addsblb(\''+(sbflid?sbflid:'')+'\',\''+(rowObj.sbcj?rowObj.sbcj:'')+'\')">'
			+'<i class="icon-plus-sign"></i></a>&nbsp;&nbsp;')
			+('<a href="#" title="删除该类" onclick="removesblb(\''+(sbflid?sbflid:'')+'\',\''+(rowObj.sblbmc?rowObj.sblbmc:'')+'\')">'
			+'<i class="icon-minus-sign"></i></a>');
}
function sfzl(sfzl){
	return (sfzl=='1'?'是':'否');
}

