package dem.yjgl.service;

import java.util.Map;

import dem.login.model.PagingAction;

public interface YjglService {

	//设备库存预警查询
	public Map<String, Object> sbkcyjlistQuery(PagingAction pagingAction,String userid);
	
	//设备维护预警查询
	public Map<String, Object> sbwhyjlistQuery(PagingAction pagingAction,String userid);
	
	//设备检定预警查询
	public Map<String, Object> sbjdyjlistQuery(PagingAction pagingAction,String userid);
	
}
