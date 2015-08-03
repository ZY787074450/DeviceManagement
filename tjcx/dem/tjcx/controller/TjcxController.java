package dem.tjcx.controller;

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

import dem.login.model.Loginner;
import dem.login.model.PagingAction;
import dem.tjcx.model.TimeFrameObject;
import dem.tjcx.service.TjcxService;
import dem.yjgl.service.YjglService;


@Controller
@RequestMapping("/tjcx")
public class TjcxController {

	private TjcxService tjcxService;

	public TjcxService getTjcxService() {
		return tjcxService;
	}

	@Resource
	public void setTjcxService(TjcxService tjcxService) {
		this.tjcxService = tjcxService;
	}
	
	private YjglService yjglService;

	public YjglService getYjglService() {
		return yjglService;
	}

	@Resource
	public void setYjglService(YjglService yjglService) {
		this.yjglService = yjglService;
	}
	
	//设备库存查询
	@RequestMapping(value = "/sbkctj/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbkctjlist(PagingAction pagingAction, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
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
	
	//设备使用统计（站点）查询
	@RequestMapping(value = "/sbsytj_zd/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbsytj_zdlist(TimeFrameObject timeFrameObject, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = tjcxService.sbsytj_zdlistQuery(timeFrameObject,userid);	
		} catch (Exception e) {
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("sbsylist", null);
		}
		return m;
	}
	//设备使用统计（站点）查询
	@RequestMapping(value = "/sbsytj_sb/cx.do", method = RequestMethod.POST,  produces = "application/json")
	@ResponseBody
	public Map<String, Object> getsbsytj_sblist(TimeFrameObject timeFrameObject, ModelMap map, HttpServletRequest request, HttpServletResponse response) {	
		Map<String, Object> m = new HashMap<String, Object>();
		try {
			String userid = ((Loginner)(request.getSession().getAttribute("session_loginner"))).getUserid();
			m = tjcxService.sbsytj_sblistQuery(timeFrameObject,userid);	
		} catch (Exception e) {
			m.put("code", "888");
			m.put("info", "查询失败");
			m.put("sbsylist", null);
		}
		return m;
	}
	
}
