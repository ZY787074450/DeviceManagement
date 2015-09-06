package dem.zdgl.service;

import java.util.Map;

import dem.jcxx.model.JgQueryCondition;
import dem.zdgl.model.ZdglQxsjdrObject;
import dem.zdgl.model.ZdglWhWxObject;

public interface ZdglService {

	//站点维护
	public Map<String, Object> addzdwh(ZdglWhWxObject zdglWhWxObject, String userid);
	
	//站点维修
	public Map<String, Object> addzdwx(ZdglWhWxObject zdglWhWxObject, String userid);
	
	//站点气象数据查询
	public Map<String, Object> selectqxsjlist(ZdglQxsjdrObject zdglQxsjdrObject, String userid);
	
	//站点气象数据新增
	public Map<String, Object> addqxsj(ZdglQxsjdrObject zdglQxsjdrObject, String userid);
	
	//站点气象数据查询
	public Map<String, Object> selectzdwhlist(JgQueryCondition jgQueryCondition, String userid);
	
	//站点气象数据查询
	public Map<String, Object> selectzdwxlist(JgQueryCondition jgQueryCondition, String userid);
}
