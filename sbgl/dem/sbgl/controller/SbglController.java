package dem.sbgl.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dem.sbgl.service.SbglService;


@Controller
@RequestMapping("/user")
public class SbglController {

	private SbglService sbglService;

	public SbglService getSbglService() {
		return sbglService;
	}

	@Resource
	public void setSbglService(SbglService sbglService) {
		this.sbglService = sbglService;
	}
	
}
