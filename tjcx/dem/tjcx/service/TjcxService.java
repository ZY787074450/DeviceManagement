package dem.tjcx.service;

import java.util.Map;

import dem.sbgl.model.SbsyHisObject;
import dem.tjcx.model.FileTypeObject;
import dem.tjcx.model.TimeFrameObject;

public interface TjcxService {

	//设备使用统计（站点）查询
	public Map<String, Object> sbsytj_zdlistQuery(TimeFrameObject timeFrameObject,String userid);
	
	//设备使用统计（设备）查询
	public Map<String, Object> sbsytj_sblistQuery(TimeFrameObject timeFrameObject,String userid);
	
	//表格导出
	public Map<String, Object> createExcelFile(FileTypeObject fileTypeObject, SbsyHisObject sbsyHisObject,String userid);
}
