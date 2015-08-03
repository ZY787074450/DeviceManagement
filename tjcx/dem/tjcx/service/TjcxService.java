package dem.tjcx.service;

import java.util.Map;

import dem.login.model.PagingAction;
import dem.tjcx.model.TimeFrameObject;

public interface TjcxService {

	//设备使用统计（站点）查询
	public Map<String, Object> sbsytj_zdlistQuery(TimeFrameObject timeFrameObject,String userid);
	
	//设备使用统计（设备）查询
	public Map<String, Object> sbsytj_sblistQuery(TimeFrameObject timeFrameObject,String userid);
}
