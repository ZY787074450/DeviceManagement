package dem.login.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sun.org.apache.bcel.internal.generic.GETSTATIC;

import dem.comm.encrypt.SHA;
import dem.jcxx.model.UserQueryCondition;
import dem.login.model.Loginner;
import dem.login.model.QxsjObject;
import dem.login.service.LoginService;

@Controller
@RequestMapping("/user")
public class LoginController{

	private LoginService loginService;
	
	public LoginService getLoginService() {
		return loginService;
	}

	@Resource
	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}
	
	private static final Logger logger = Logger
			.getLogger(LoginController.class);
	
	@RequestMapping(value="/login.do",method = RequestMethod.POST)
    public String Login(Loginner loginner, ModelMap map,
			HttpServletRequest request, HttpServletResponse response,
			 RedirectAttributes redirectAttributes) throws UnsupportedEncodingException {
		String userid = loginner.getUserid();
		String pwd = SHA.instance.getEncryptResult(loginner.getUserpass().trim());
		Loginner session_loginner = (Loginner) request.getSession()
				.getAttribute("session_loginner");
		if (session_loginner == null
				|| (session_loginner != null && userid != null && !session_loginner
						.getUserid().equals(userid))
				|| (session_loginner != null && pwd != null
						&& pwd.trim().length() > 0 && !pwd
							.equals(session_loginner.getUserpass()))) {// 未登陆时重新登陆
			if (null == loginner.getUserid()
					|| loginner.getUserid().equals("")
					|| null == loginner.getUserpass()
					|| loginner.getUserpass().equals("")) {
				map.addAttribute("msg", "用户名或密码不能为空！");
				return new String("redirect:/index/login.html?msg=用户名或密码不能为空！".getBytes("utf-8"),"iso8859-1");
			}
			Loginner l = new Loginner();
			try {
				//人员信息放入session域
				l = loginService.userLogin(loginner);
				request.getSession().setAttribute("session_loginner", null);
				request.getSession().setAttribute("session_menulist", null);
				
				if (l != null) {
					
					request.getSession().setAttribute("session_loginner", l);
					//人员拥有的菜单权限的代码放入session域
					List list = loginService.getMenucodeList(l);
					request.getSession().setAttribute("session_menulist", list);
					return new String(("redirect:/index/index.html?username="+l.getMc()).getBytes("utf-8"),"iso8859-1");
				} else {
					map.addAttribute("msg", "用户名或者密码错误！请重新输入！");
					return new String("redirect:/index/login.html?msg=用户名或者密码错误！请重新输入！".getBytes("utf-8"),"iso8859-1");
				}

			} catch (Exception e) {
				logger.error(e);
				map.addAttribute("msg", "系统异常无法登录！");
				return new String("redirect:/index/login.html?msg=系统异常无法登录！".getBytes("utf-8"),"iso8859-1");
			}
		} else {// 已登录则跳至主页    
			return new String(("redirect:/index/index.html?username="+session_loginner.getMc()).getBytes("utf-8"),"iso8859-1");
		}
	}
	
	//获取菜单
	@RequestMapping(value = "/getmemus.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getMenus(Loginner loginner,String menucode, ModelMap map,
			HttpServletRequest request, HttpServletResponse response) {
		Loginner session_loginner = (Loginner) request.getSession()
				.getAttribute("session_loginner");
		Map<String, Object> m = new HashMap<String, Object>();
		if (session_loginner == null) {
			m.put("code", 201);
			m.put("menudatas", null);
			m.put("msg", menucode);
			return m;
		}
		@SuppressWarnings("rawtypes")
		List list = null;
		try {
			list = loginService.getMenus(session_loginner,menucode);
			m.put("code", 200);
			m.put("menudatas", list);
			m.put("msg", menucode);
		} catch (Exception e) {
			m.put("code", 888);
			m.put("menudatas", null);
			m.put("msg", "系统异常");
		}
		return m;
	}
	
	//请求非法/恶意请求时，打回登录界面，原登录用户失效
	@RequestMapping(value="/roolbacklogin.do")
	public String rollbackLogin(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.getSession().setAttribute("session_loginner", null);
		request.getSession().setAttribute("session_menulist", null);
		return new String("redirect:/index/login.html?msg=检测到恶意非法请求，当前登录用户失效，请重新登录！".getBytes("utf-8"),"iso8859-1");
	}
	//过滤后无提示返回登录界面
	@RequestMapping(value="/backlogin.do")
	public String backLogin(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.getSession().setAttribute("session_loginner", null);
		request.getSession().setAttribute("session_menulist", null);
		return new String("redirect:/index/login.html".getBytes("utf-8"),"iso8859-1");
	}
	
	//获取用户名
	@RequestMapping(value = "/getusername.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getUsername(ModelMap map, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		Loginner session_loginner = (Loginner) request.getSession().getAttribute("session_loginner");
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("name", session_loginner.getMc());
		return m;
	}
	
	//获取气象数据最新数据的时间
	@RequestMapping(value = "/qxsjzxsj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> rywh_cx(QxsjObject qxsjObject, ModelMap map, HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> m = new HashMap<String, Object>();
		try{
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			if(qxsjObject.getLasttime()==null || "".equals(qxsjObject.getLasttime().trim())){
				qxsjObject.setLasttime("20150101000000");
			}
			if(qxsjObject.getLasttimenotes()==null || "".equals(qxsjObject.getLasttimenotes().trim())){
				qxsjObject.setLasttimenotes("0");
			}
			m = loginService.getNewTimeList(qxsjObject.getLasttime().trim(),qxsjObject.getLasttimenotes().trim(),userid);
		}catch(Exception e){
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("newtimelist", null);
		}
		return m;
	}

}
