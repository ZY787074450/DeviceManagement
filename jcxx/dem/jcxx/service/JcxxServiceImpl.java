package dem.jcxx.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.encrypt.SHA;
import dem.jcxx.model.JgQueryCondition;
import dem.jcxx.model.UserQueryCondition;
import dem.login.model.Department;
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
		Map<String, Object> map = new HashMap<String, Object>();
		String sum = (String)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.getLastUserid", "");
		Integer s = Integer.parseInt(sum);
		String newId = ""+(s+1);
		for(int i=newId.length();i<6;i++){
			newId = "0"+newId;
		}
		loginner.setUserid(newId);
		loginner.setUserpass(SHA.instance.getEncryptResult("222222"));
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.addUser",loginner);
		//新增人员基本菜单权限(基本信息、修改登录密码)，系统管理员可在人员维护菜单中禁止人员修改登录密码
		Map<String, Object> m1 = new HashMap<String, Object>();
		m1.put("usercode", loginner.getUserid());
		m1.put("menucode", "7FA49ED94E1C479B83E6074F0507D0CD");
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.setUserMenus", m1);
		Map<String, Object> m2 = new HashMap<String, Object>();
		m2.put("usercode", loginner.getUserid());
		m2.put("menucode", "FF8E26F01CF44091A8D750DD24C3EA3D");
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.setUserMenus", m2);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("mc", loginner.getMc());
		map.put("userid", newId);

		return map;
	}

	//系统操作人员修改
	@Override
	public Map<String, Object> userUpdate(Loginner loginner, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		baseDao.update("dem.jcxx.mapper.JcxxMapper.updateUser",loginner);
		map.put("code", "200");
		map.put("info", "更新成功！");
		map.put("userid", loginner.getUserid());

		return map;
	}

	//系统人员注销
	@Override
	public Map<String, Object> userDelete(Loginner loginner, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		baseDao.update("dem.jcxx.mapper.JcxxMapper.removeUser",loginner);
		map.put("code", "200");
		map.put("info", "注销成功！");
		map.put("userid", loginner.getUserid());

		return map;
	}

	//系统角色权限分配
	@Override
	public Map<String, Object> userMenusSet(String usermlist, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		
		String[] strArr = usermlist.split(",");
		baseDao.delete("dem.jcxx.mapper.JcxxMapper.deleteUserMenus",strArr[0].trim());
		for(int i=1;i<strArr.length;i++){
			if("".equals(strArr[i].trim())){
				
			}else{
				Map<String, String> m = new HashMap<String, String>();
				m.put("usercode", strArr[0].trim());
				m.put("menucode", strArr[i].trim());
				baseDao.insert("dem.jcxx.mapper.JcxxMapper.setUserMenus",m);
			}
		}
		map.put("code", "200");
		map.put("info", "权限分配成功！");
		map.put("userid", strArr[0].trim());

		return map;
	}

	//系统菜单查询,角色当前权限菜单查询
	@Override
	public Map<String, Object> getMenusList(Loginner loginner, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		List list1 = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.getMenusList",loginner);
		List list2 = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.getUserMenusList",loginner);
		map.put("code", "200");
		map.put("info", "角色菜单查询成功！");
		map.put("menulist", list1);
		map.put("usermenulist", list2);

		return map;
	}

	//人员密码修改
	@Override
	public Map<String, Object> setUserPassword(String userid, String oldpassword, String newpassword) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String password = (String)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.userPasswordSelect",userid);
		if(password.equals(SHA.instance.getEncryptResult(oldpassword))){
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("userid", userid);
			m.put("newpassword", SHA.instance.getEncryptResult(newpassword));
			baseDao.update("dem.jcxx.mapper.JcxxMapper.userPasswordSet",m);
			map.put("code", "200");
			map.put("info", "密码修改成功！当前用户登录失效，请刷新页面重新登录！");
			map.put("userid", userid);
		}else{
			map.put("code", "202");
			map.put("info", "原密码输入错误！");
			map.put("userid", userid);
		}

		return map;
	}

	//查询机构列表
	@Override
	public Map<String, Object> jglistQuery(JgQueryCondition jgQueryCondition, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.jglistQuery", jgQueryCondition);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);
		return map;
	}
	
	//机构新增
	@Override
	public Map<String, Object> jgInsert(Department department, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		if("".equals(department.getJglx())){
			map.put("code", "202");
			map.put("info", "新增失败，未检测到机构类型！");
			return map;
		}
		String newId = "";
		try{
			String sum = (String)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.getLastJgid", department.getJglx());
			Integer s = Integer.parseInt(sum);
			int num = (int)((s + 1)/100000);
			newId = ""+(s+1);
			if(num == 0){
				for(int i=newId.length();i<6;i++){
					newId = "0"+newId;
				}
			}
		}catch(Exception e){
			newId = department.getJglx()+"00001";
			department.setJgid(newId);
			baseDao.insert("dem.jcxx.mapper.JcxxMapper.addJg",department);
			map.put("code", "200");
			map.put("info", "新增成功！当前机构为对应类型首发机构！");
			map.put("mc", department.getMc());
			map.put("jgid", newId);

			return map;
		}
		department.setJgid(newId);
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.addJg",department);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("mc", department.getMc());
		map.put("jgid", newId);

		return map;
	}

	//机构信息数据更新
	@Override
	public Map<String, Object> jgUpdate(Department department, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		baseDao.update("dem.jcxx.mapper.JcxxMapper.updateJg",department);
		map.put("code", "200");
		map.put("info", "更新成功！");
		map.put("jgid", department.getJgid());

		return map;
	}

	//机构注销
	@Override
	public Map<String, Object> jgDelete(Department department, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		baseDao.update("dem.jcxx.mapper.JcxxMapper.removeJg",department);
		map.put("code", "200");
		map.put("info", "注销成功！");
		map.put("jgid", department.getJgid());

		return map;
	}
}
