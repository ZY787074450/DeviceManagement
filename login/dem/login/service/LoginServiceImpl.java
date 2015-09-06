package dem.login.service;

import java.util.ArrayList;
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

	@Override
	public Map<String, Object> getNewTimeList(String lasttime,String lasttimenotes, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		int sum = (Integer)baseDao.selectOne("dem.login.mapper.LoginMapper.newTimeCount", lasttime);
		int sum_note = (Integer)baseDao.selectOne("dem.login.mapper.LoginMapper.newTimeNoteCount", lasttime);
		if(sum>0){
			list = baseDao.selectList("dem.login.mapper.LoginMapper.newTimelistQuery", lasttime);
			map.put("code", "200");
			map.put("info", "数据库已存在最新时间点！");
			map.put("newtimelist", list);
			return map;
		}else if(!lasttimenotes.equals((sum_note+""))){
			list = baseDao.selectList("dem.login.mapper.LoginMapper.newTimelistQuery", lasttime);
			map.put("code", "202");
			map.put("info", "数据库最新时间点数据有更新！");
			map.put("newtimelist", list);
			return map;
		}else{
			map.put("code", "201");
			map.put("info", "无新时间点！");
			map.put("newtimelist", null);
			return map;
		}
		
	}

}
