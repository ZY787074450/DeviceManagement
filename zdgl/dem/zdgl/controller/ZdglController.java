package dem.zdgl.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dem.jcxx.model.JgQueryCondition;
import dem.jcxx.model.UserQueryCondition;
import dem.login.model.Loginner;
import dem.zdgl.model.ZdglQxsjdrObject;
import dem.zdgl.model.ZdglWhWxObject;
import dem.zdgl.service.ZdglService;

@Controller
@RequestMapping("/zdgl")
public class ZdglController {

	private ZdglService zdglService;

	public ZdglService getZdglService() {
		return zdglService;
	}

	@Resource
	public void setZdglService(ZdglService zdglService) {
		this.zdglService = zdglService;
	}
	
	/**
	 * 站点维护
	 * @param userQueryCondition
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/zdwh/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> zdwh_add(ZdglWhWxObject zdglWhWxObject, ModelMap map, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> m = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = zdglService.addzdwh(zdglWhWxObject,userid);
		}catch(Exception e){
			m.put("code", "888");
			m.put("info", "操作失败");
			m.put("userlist", null);
		}
		return m;
	}
	/**
	 * 站点维修
	 * @param userQueryCondition
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/zdwx/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> zdwx_add(ZdglWhWxObject zdglWhWxObject, ModelMap map, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> m = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = zdglService.addzdwx(zdglWhWxObject,userid);
		}catch(Exception e){
			m.put("code", "888");
			m.put("info", "操作失败");
			m.put("userlist", null);
		}
		return m;
	}
	
	//气象数据查询
	@RequestMapping(value = "/qxsjdr/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxsj_cx(ZdglQxsjdrObject zdglQxsjdrObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = zdglService.selectqxsjlist(zdglQxsjdrObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
			map.put("jglist", null);
		}
		return map;
	}
	
	//气象数据新增
	@RequestMapping(value = "/qxsjdr/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxsj_add(ZdglQxsjdrObject zdglQxsjdrObject, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = zdglService.addqxsj(zdglQxsjdrObject,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "导入失败");
			map.put("jglist", null);
		}
		return map;
	}
	
}
