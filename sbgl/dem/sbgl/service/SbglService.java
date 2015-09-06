package dem.sbgl.service;

import java.util.Map;

import dem.sbgl.model.SbcjObject;
import dem.sbgl.model.SbrkObject;
import dem.sbgl.model.SbrkQueryCondition;
import dem.sbgl.model.SbsyHisObject;
import dem.sbgl.model.SbsyObject;

public interface SbglService {

	//设备入库
	public Map<String, Object> addsbrk(SbrkObject sbrkObject, String userid);
	
	//设备入库记录查询
	public Map<String, Object> sbrkcx(SbrkQueryCondition sbrkQueryCondition, String userid);
	//设备入库记录查询
	public Map<String, Object> sbrkcx2(SbrkQueryCondition sbrkQueryCondition, String userid);
	
	//设备使用记录查询
	public Map<String, Object> sbsycx(SbsyObject sbsyObject, String userid);
	
	//设备(使用)操作
	public Map<String, Object> sbsydoaction(SbsyObject sbsyObject, SbsyHisObject sbsyhisObject, String czlx, String userid);
		
	//设备使用记录删除
	public Map<String, Object> sbsydelete(SbsyObject sbsyObject, String userid);
	
	//设备使用操作记录查询
	public Map<String, Object> sbsyjlcx(SbsyHisObject sbsyhisObject, String userid);
	
	//设备出借
	public Map<String, Object> sbcjcj(SbcjObject sbcjObject, String userid);
	
	//设备还入
	public Map<String, Object> sbcjhr(SbcjObject sbcjObject, String userid);
	
	//设备出借记录查询
	public Map<String, Object> sbcjlistcx(SbcjObject sbcjObject, String userid);
}
