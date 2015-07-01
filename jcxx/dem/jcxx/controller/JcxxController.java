package dem.jcxx.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dem.jcxx.model.UserQueryCondition;
import dem.jcxx.service.JcxxService;
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
	 * @param loginner
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
		}
		return map;
	}
}
