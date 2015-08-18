package dem.yjgl.controller;

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
import dem.login.model.Loginner;
import dem.login.model.PagingAction;
import dem.yjgl.service.YjglService;


@Controller
@RequestMapping("/yjgl")
public class YjglController {

	private YjglService yjglService;

	public YjglService getYjglService() {
		return yjglService;
	}

	@Resource
	public void setYjglService(YjglService yjglService) {
		this.yjglService = yjglService;
	}
	
	//设备库存预警查询
	@RequestMapping(value = "/sbkcyj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbkcyjlist(PagingAction pagingAction, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = yjglService.sbkcyjlistQuery(pagingAction,userid);	
		} catch (Exception e) {
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("sbsylist", null);
		}
		return m;
	}
	
	//设备维护预警查询
	@RequestMapping(value = "/sbwhyj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbwhyjlist(PagingAction pagingAction, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = yjglService.sbwhyjlistQuery(pagingAction,userid);	
		} catch (Exception e) {
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("sbsylist", null);
		}
		return m;
	}
	
	//设备维护预警查询
	@RequestMapping(value = "/sbjdyj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbjdyjlist(PagingAction pagingAction, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = yjglService.sbjdyjlistQuery(pagingAction,userid);	
		} catch (Exception e) {
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("sbsylist", null);
		}
		return m;
	}
	
}
