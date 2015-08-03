package dem.sbgl.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dem.login.model.Loginner;
import dem.login.model.PagingAction;
import dem.sbgl.model.SbcjObject;
import dem.sbgl.model.SbrkObject;
import dem.sbgl.model.SbsyHisObject;
import dem.sbgl.model.SbsyObject;
import dem.sbgl.service.SbglService;


@Controller
@RequestMapping("/sbgl")
public class SbglController {

	private SbglService sbglService;

	public SbglService getSbglService() {
		return sbglService;
	}

	@Resource
	public void setSbglService(SbglService sbglService) {
		this.sbglService = sbglService;
	}
	
	//设备入库
	@RequestMapping(value = "/sbrk/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbrk_add(SbrkObject sbrkObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.addsbrk(sbrkObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "新增失败");
		}
		return map;
	}
	
	//设备入库信息查询
	@RequestMapping(value = "/sbrk/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbrk_cx(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbrkcx(userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
			map.put("jglist", null);
		}
		return map;
	}
		
	//设备使用记录查询(表sbgl_sbsy中记录)
	@RequestMapping(value = "/sbsy/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbsy_cx(SbsyObject sbsyObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbsycx(sbsyObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
		}
		return map;
	}
	//设备操作(安装、维修、维护、检定、报废、修改)6合1更新操作，需前台传入关键词
	@RequestMapping(value = "/sbsy/doaction.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbsy_do(SbsyObject sbsyObject, SbsyHisObject sbsyhisObject, String czlx, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbsydoaction(sbsyObject,sbsyhisObject,czlx,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "操作失败");
		}
		return map;
	}
	//设备使用记录删除(检定人、维修人、维护人、报废人都为空时方可删除)
	@RequestMapping(value = "/sbsy/delete.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbsy_delete(SbsyObject sbsyObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbsydelete(sbsyObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "删除失败");
		}
		return map;
	}
	
	//设备出借记录查询(表sbgl_sbcj中记录)
	@RequestMapping(value = "/sbcj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbcj_cx(SbcjObject sbcjObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbcjlistcx(sbcjObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
			map.put("sbsylist", null);
		}
		return map;
	}
	//设备8出借操作
	@RequestMapping(value = "/sbcj/cj.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbcj_cj(SbcjObject sbcjObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbcjcj(sbcjObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "操作失败");
		}
		return map;
	}
	//设备9还入操作
	@RequestMapping(value = "/sbcj/hr.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbcj_hr(SbcjObject sbcjObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbcjhr(sbcjObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "操作失败");
		}
		return map;
	}
	
	//设备使用操作记录查询(表sbgl_sbsy_his中记录)
	@RequestMapping(value = "/sbsyjl/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> sbsyjl_cx(SbsyHisObject sbsyhisObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = sbglService.sbsyjlcx(sbsyhisObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
		}
		return map;
	}
	
}
