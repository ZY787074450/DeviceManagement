package dem.login.service;

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
		loginner.setPassword(SHA.instance.getEncryptResult(loginner.getPassword()));
		Loginner l= (Loginner)baseDao.selectOne("SQL语句地址", loginner);
		return l;
	}

}
