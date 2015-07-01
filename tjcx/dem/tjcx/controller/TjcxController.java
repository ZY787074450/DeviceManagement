package dem.tjcx.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dem.tjcx.service.TjcxService;


@Controller
@RequestMapping("/user")
public class TjcxController {

	private TjcxService tjcxService;

	public TjcxService getTjcxService() {
		return tjcxService;
	}

	@Resource
	public void setTjcxService(TjcxService tjcxService) {
		this.tjcxService = tjcxService;
	}
	
}
