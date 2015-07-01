package dem.yjgl.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dem.yjgl.service.YjglService;


@Controller
@RequestMapping("/user")
public class YjglController {

	private YjglService yjglService;

	public YjglService getYjglService() {
		return yjglService;
	}

	@Resource
	public void setYjglService(YjglService yjglService) {
		this.yjglService = yjglService;
	}
	
}
