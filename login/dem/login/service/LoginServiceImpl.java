package dem.login.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.encrypt.SHA;
import dem.login.model.Loginner;

@Service("loginService")
public class LoginServiceImpl implements LoginService {

	private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}


	/**
	 * 用户登录
	 * @author zhangah
	 */
	@Override
	public Loginner userLogin(Loginner loginner) {
		loginner.setUserpass(SHA.instance.getEncryptResult(loginner.getUserpass()));
		Loginner l= (Loginner)baseDao.selectOne("dem.login.mapper.LoginMapper.loginnerSelect", loginner);
		return l;
	}

	/**
	 * 获取用户对应可执行菜单
	 * @author zhangah
	 */
	@Override
	public List getMenus(Loginner loginner, String menucode) {
		Map<String, String> m = new HashMap<String, String>();
		m.put("userid", loginner.getUserid());
		m.put("menucode", menucode);
		List list = (List)baseDao.selectList("dem.login.mapper.LoginMapper.menusSelect", m);
		return list;
	}

	@Override
	public List getMenucodeList(Loginner loginner) {
		List list = null;
		list = (List)baseDao.selectList("dem.login.mapper.LoginMapper.menucodeListSelect", loginner.getUserid());
		return list;
	}

}
