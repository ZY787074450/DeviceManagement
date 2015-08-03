package dem.yjgl.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.login.model.PagingAction;


@Service("yjglService")
public class YjglServiceImpl implements YjglService {

private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	//设备库存预警查询
	@Override
	public Map<String, Object> sbkcyjlistQuery(PagingAction pagingAction,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.yjgl.mapper.YjglMapper.sbkcyjquery",pagingAction);
		int sum = (Integer)baseDao.selectOne("dem.yjgl.mapper.YjglMapper.sbkcyjcountquery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}

	//设备维护预警查询
	@Override
	public Map<String, Object> sbwhyjlistQuery(PagingAction pagingAction,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.yjgl.mapper.YjglMapper.sbwhyjquery",pagingAction);
		int sum = (Integer)baseDao.selectOne("dem.yjgl.mapper.YjglMapper.sbwhyjcountquery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}
}
