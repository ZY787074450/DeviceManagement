package dem.jcxx.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.jcxx.model.UserQueryCondition;
import dem.login.model.Loginner;

@Service("jcxxService")
public class JcxxServiceImpl implements JcxxService {

private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	//人员条件查询
	@Override
	public Map<String, Object> userlistQuery(UserQueryCondition userQueryCondition, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.userlistQuery", userQueryCondition);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("userlist", list);
		return map;
	}

	//系统操作人员新增
	@Override
	public Map<String, Object> userInsert(Loginner loginner, String userid) {
		// TODO Auto-generated method stub
		return null;
	}

	//系统操作人员修改
	@Override
	public Map<String, Object> userUpdate(Loginner loginner, String userid) {
		// TODO Auto-generated method stub
		return null;
	}

	//系统人员注销
	@Override
	public Map<String, Object> userDelete(Loginner loginner, String userid) {
		// TODO Auto-generated method stub
		return null;
	}

	//系统操作人员权限分配
	@Override
	public Map<String, Object> userMenusSet(Loginner loginner, String userid) {
		// TODO Auto-generated method stub
		return null;
	}
}
