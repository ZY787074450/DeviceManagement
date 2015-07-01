package dem.login.service;

import java.util.List;

import dem.login.model.Loginner;

public interface LoginService {

	//用户登录验证
	public Loginner userLogin(Loginner loginner);
	
	//获取用户对应可执行菜单
	public List getMenus(Loginner loginner, String menucode);
	
	//用户对应所有菜单代码
	public List getMenucodeList(Loginner loginner);
	
}
