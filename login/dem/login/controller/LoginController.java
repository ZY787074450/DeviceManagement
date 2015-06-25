package dem.login.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import dem.comm.encrypt.SHA;
import dem.login.model.Loginner;
import dem.login.service.LoginService;

@Controller
@RequestMapping("/user")
public class LoginController {

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
    @ResponseBody
    public String Login(Loginner loginner, ModelMap map,
			HttpServletRequest request, HttpServletResponse response,
			 RedirectAttributes redirectAttributes) {
		String username = loginner.getLoginname();
		String pwd = SHA.instance.getEncryptResult(loginner.getPassword());
		Loginner session_loginner = (Loginner) request.getSession()
				.getAttribute("session_loginner");
		if (session_loginner == null
				|| (session_loginner != null && username != null && !session_loginner
						.getLoginname().equals(username))
				|| (session_loginner != null && pwd != null
						&& pwd.trim().length() > 0 && !pwd
							.equals(session_loginner.getPassword()))) {// 未登陆时重新登陆
			if (null == loginner.getLoginname()
					|| loginner.getLoginname().equals("")
					|| null == loginner.getPassword()
					|| loginner.getPassword().equals("")) {
				map.addAttribute("msg", "用户名或密码不能为空!");
				return "redirect:/index/login.html?msg=用户名或密码不能为空!";
			}
			Loginner l = new Loginner();
			try {
				l = loginService.userLogin(loginner);
				request.getSession().setAttribute("session_loginner", null);
				if (l != null) {
					request.getSession().setAttribute("session_loginner", l);
					return "redirect:/index/index.html?username="+l.getLoginname();
				} else {
					map.addAttribute("msg", "用户名或者密码错误！请重新输入！");
					return "redirect:/index/login.htm?msg=用户名或者密码错误！请重新输入！";
				}

			} catch (Exception e) {
				logger.error(e);
				map.addAttribute("msg", "系统异常无法登录！");
				return "redirect:/index/login.html?msg=系统异常无法登录！";
			}
		} else {// 已登录则跳至主页
			return "redirect:/index/index.html?username="+username;
		}
	}
}
