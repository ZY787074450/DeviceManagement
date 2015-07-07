package dem.jcxx.controller;

import java.util.HashMap;
import java.util.List;
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
import dem.jcxx.service.JcxxService;
import dem.login.model.Department;
import dem.login.model.Loginner;


@Controller
@RequestMapping("/jcxx")
public class JcxxController {

	private JcxxService jcxxService;

	public JcxxService getJcxxService() {
		return jcxxService;
	}

	@Resource
	public void setJcxxService(JcxxService jcxxService) {
		this.jcxxService = jcxxService;
	}
	
	/**
	 * 人员查询
	 * @param userQueryCondition
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/rywh/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> rywh_cx(UserQueryCondition userQueryCondition, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.userlistQuery(userQueryCondition,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
			map.put("userlist", null);
		}
		return map;
	}
	
	@RequestMapping(value = "/rywh/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> rywh_add(Loginner loginner, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.userInsert(loginner,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "新增失败");
		}
		return map;
	}
	
	@RequestMapping(value = "/rywh/update.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> rywh_update(Loginner loginner, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.userUpdate(loginner,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "更新失败");
		}
		return map;
	}
	
	@RequestMapping(value = "/rywh/remove.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> rywh_remove(Loginner loginner, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.userDelete(loginner,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "注销失败");
		}
		return map;
	}
	
	//获取系统菜单、用户当前拥有菜单
	@RequestMapping(value = "/rywh/getusermemus.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getMenus(Loginner loginner, ModelMap map,
			HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = jcxxService.getMenusList(loginner,userid);	
		} catch (Exception e) {
			m.put("code", "201");
			m.put("msg", "系统异常");
		}
		return m;
	}
	
	//分配菜单权限
	@RequestMapping(value = "/rywh/setusermemus.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> setUserMenus(String usermlist, ModelMap map,
			HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = jcxxService.userMenusSet(usermlist,userid);	
		} catch (Exception e) {
			m.put("code", "201");
			m.put("msg", "系统异常，权限分配失败");
		}
		return m;
	}
	
	//人员密码修改
	@RequestMapping(value = "/mmxg/updateUserPassword.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateUserPassword(String oldpassword, String newpassword, ModelMap map,
			HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = jcxxService.setUserPassword(userid,oldpassword,newpassword);
			System.out.println("输出显示操作代码："+m.get("code"));
			if("200".equals(m.get("code"))){
				System.out.println("当前角色已注销");
				request.getSession().setAttribute("session_loginner", null);
				request.getSession().setAttribute("session_menulist", null);
			}
		} catch (Exception e) {
			m.put("code", "201");
			m.put("msg", "系统异常，密码修改失败！");
		}
		return m;
	}
	
	//气象站点及部门维护机构条件查询
	@RequestMapping(value = "/qxzdjbmwh/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxzdjbmwh_cx(JgQueryCondition jgQueryCondition, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.jglistQuery(jgQueryCondition,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "查询失败");
			map.put("jglist", null);
		}
		return map;
	}
	
	//气象站点及部门维护新增部门
	@RequestMapping(value = "/qxzdjbmwh/add.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxzdjbmwh_add(Department department, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.jgInsert(department,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "新增失败");
		}
		return map;
	}
	
	//气象站点及部门维护信息更新
	@RequestMapping(value = "/qxzdjbmwh/update.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxzdjbmwh_update(Department department, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.jgUpdate(department,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "更新失败");
		}
		return map;
	}
	
	//气象站点及部门维护注销部门
	@RequestMapping(value = "/qxzdjbmwh/remove.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> qxzdjbmwh_remove(Department department, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			map = jcxxService.jgDelete(department,userid);
		}catch(Exception e){
			map.put("code", "888");
			map.put("info", "注销失败");
		}
		return map;
	}
	
}
