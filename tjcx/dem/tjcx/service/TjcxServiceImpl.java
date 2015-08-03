package dem.tjcx.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.login.model.PagingAction;
import dem.tjcx.model.TimeFrameObject;


@Service("tjcxService")
public class TjcxServiceImpl implements TjcxService {

private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	//设备使用统计（站点）查询
	@Override
	public Map<String, Object> sbsytj_zdlistQuery(TimeFrameObject timeFrameObject,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.tjcx.mapper.TjcxMapper.sbsytj_zdquery",timeFrameObject);
		int sum = (Integer)baseDao.selectOne("dem.tjcx.mapper.TjcxMapper.sbsytj_zdcountquery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}

	//设备使用统计（设备）查询
	@Override
	public Map<String, Object> sbsytj_sblistQuery(TimeFrameObject timeFrameObject,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.tjcx.mapper.TjcxMapper.sbsytj_sbquery",timeFrameObject);
		int sum = (Integer)baseDao.selectOne("dem.tjcx.mapper.TjcxMapper.sbsytj_sbcountquery", timeFrameObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}
}
