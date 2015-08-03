package dem.jcxx.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import dem.jcxx.model.JgQueryCondition;
import dem.jcxx.model.SbflwhObject;
import dem.jcxx.model.UserQueryCondition;
import dem.jcxx.model.YjzwhObject;
import dem.login.model.Department;
import dem.login.model.Loginner;
import dem.login.model.PagingAction;

public interface JcxxService {

	//人员条件查询
	public Map<String, Object> userlistQuery(UserQueryCondition userQueryCondition, String userid);
	
	//系统操作人员新增
	public Map<String, Object> userInsert(Loginner loginner, String userid);
	
	//系统操作人员修改
	public Map<String, Object> userUpdate(Loginner loginner, String userid);
	
	//系统人员注销
	public Map<String, Object> userDelete(Loginner loginner, String userid);
	
	//系统菜单、用户当前菜单查询
	public Map<String, Object> getMenusList(Loginner loginner, String userid);
	
	//系统角色权限分配
	public Map<String, Object> userMenusSet(String usermlist, String userid);
	
	//人员密码修改
	public Map<String, Object> setUserPassword(String userid, String oldpassword, String newpassword);
	
	//机构条件查询
	public Map<String, Object> jglistQuery(JgQueryCondition jgQueryCondition, String userid);
	
	//查询机构类型，无条件查询
	public Map<String, Object> jglxlistQuery(String userid);
	
	//查询机构所属区域，无条件查询
	public Map<String, Object> jgqylistQuery(String userid);
	
	//机构信息修改更新
	public Map<String, Object> jgUpdate(Department department, String userid);
	
	//机构新增
	public Map<String, Object> jgInsert(Department department, String userid);
	
	//机构注销
	public Map<String, Object> jgDelete(Department department, String userid);
	
	//预警条件查询
	public Map<String, Object> yjlistQuery(YjzwhObject yjzwhObject, String userid);
	
	//预警修改更新
	public Map<String, Object> yjUpdate(YjzwhObject yjzwhObject, String userid);
	
	//设备分类(类别)维护查询
	public Map<String, Object> sblblistQuery(String userid);
	
	//设备分类更新
	public Map<String, Object> sblbUpdate(SbflwhObject sbflwhObject, String userid);
	
	//设备类别新增
	public Map<String, Object> sblbInsert(SbflwhObject sbflwhObject, String userid);
	
	//设备类别注销
	public Map<String, Object> sblbDelete(SbflwhObject sbflwhObject, String userid);
	
}
