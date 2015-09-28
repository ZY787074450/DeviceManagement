package dem.jcxx.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.encrypt.SHA;
import dem.comm.file.FileUpLoadManager;
import dem.comm.util.CommonUtil;
import dem.jcxx.model.JgQueryCondition;
import dem.jcxx.model.SbflwhObject;
import dem.jcxx.model.UserQueryCondition;
import dem.jcxx.model.YjzwhObject;
import dem.login.model.Department;
import dem.login.model.Loginner;
import dem.login.model.PagingAction;

@Service("jcxxService")
public class JcxxServiceImpl implements JcxxService {
	
	private FileUpLoadManager fileUpLoadManager;

	public FileUpLoadManager getFileUpLoadManager() {
		return fileUpLoadManager;
	}

	@Resource
	public void setFileUpLoadManager(FileUpLoadManager fileUpLoadManager) {
		this.fileUpLoadManager = fileUpLoadManager;
		// 设置将头像保存在当前的工程下的upload/buyers中
		this.fileUpLoadManager.setPathDir("upload/buyers");
	}

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
		int sum = (Integer)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.userCount", userQueryCondition);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("userlist", list);
		map.put("sum", sum);
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
		m1.put("menucode", "B876B28AB11B4483BCB0CF9105FF3A46");
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.setUserMenus", m1);
		Map<String, Object> m2 = new HashMap<String, Object>();
		m2.put("usercode", loginner.getUserid());
		m2.put("menucode", "B1A0ADFE67BF496C8D43DFA0B7EC3960");
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
		int sum = (Integer)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.departmentCount", jgQueryCondition);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);
		map.put("sum", sum);
		return map;
	}
	
	//机构新增
	@Override
	public Map<String, Object> jgInsert(Department department, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		if("".equals(department.getJglx())){
			map.put("code", "202");
			map.put("info", "新增失败，未检测到站点类型！");
			return map;
		}
		if("".equals(department.getJgid()) || department.getJgid()==null){
			
				map.put("code", "203");
				map.put("info", "新增失败！站点编号不能为空！");
	
				return map;
		}else{
			int sum = (Integer)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.countJgid", department);
			if(sum>0){
				map.put("code", "203");
				map.put("info", "新增失败！当前站点编号已存在！");
	
				return map;
			}
		}
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.addJg",department);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("mc", department.getMc());
		map.put("jgid", department.getJgid());

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

	//预警值维护查询
	@Override
	public Map<String, Object> yjlistQuery(YjzwhObject yjzwhObject,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.yjlistQuery", yjzwhObject);
		int sum = (Integer)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.yjzCount", yjzwhObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("yjlist", list);
		map.put("sum", sum);
		return map;
	}

	//预警值维护信息更新
	@Override
	public Map<String, Object> yjUpdate(YjzwhObject yjzwhObject, String userid) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		yjzwhObject.setYjz((Integer.parseInt(yjzwhObject.getYjz()))+"");//验证是否为数字，不是数字就向上级抛出转换错误异常，是数字则去除首位0
		baseDao.update("dem.jcxx.mapper.JcxxMapper.updateYj",yjzwhObject);
		map.put("code", "200");
		map.put("info", "更新成功！");
		map.put("jgid", yjzwhObject.getYjid());

		return map;
	}
	
	//设备分类维护查询
	@Override
	public Map<String, Object> sblblistQuery(String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.sblblistQuery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sblblist", list);
		return map;
	}

	//设备类别新增
	@Override
	public Map<String, Object> sblbInsert(SbflwhObject sbflwhObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		
		String url = "/DeviceManagement/";//请求地址http://localhost:8080
		String pathDiv = "tpzy/sbtp";//图片存储路径(当前工程下的路径)"+File.separator+"
		String fix = "jpg";//文件类型(后缀)
		String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID用于生成设备图片名
		String fileName = null;
		if(sbflwhObject.getSbtpfile()!=null && sbflwhObject.getSbtpfile().getSize()>0){

			if((!sbflwhObject.getSbtpfile().getContentType().endsWith("/jpeg")) && (!sbflwhObject.getSbtpfile().getContentType().endsWith("/jpg"))){
				map.put("code", "202");
				map.put("info", "图片格式不符合规定，上传失败！本次操作无效！");
				map.put("sblbmc", sbflwhObject.getSblbmc());
				return map;
			}
			fileUpLoadManager.setPathDir(pathDiv);
			fileName="sbtp_"+newUUID+"."+fix;//设备图片名称规范:sbtp_32位UUID.jpg
			boolean judge = fileUpLoadManager.upload(sbflwhObject.getSbtpfile(), fileName);//生成服务器端图片文件
			if(!judge){
				map.put("code", "202");
				map.put("info", "图片上传失败！");
				map.put("sblbmc", sbflwhObject.getSblbmc());
				return map;
			}
			sbflwhObject.setSbtpdz(url+pathDiv+"/"+fileName);//设置数据库中存储的服务器端图片地址
		}
		
		String max_num = (String)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.getLastSbflid", sbflwhObject);//当前分类下最大序列号
		String childid = "";
		if("1".equals(sbflwhObject.getSbcj())){
			if("".equals(max_num) || max_num == null){
				childid = "01";
			}else{
				if(Integer.parseInt(max_num) == 99){
					return map;
				}
				childid = (Integer.parseInt(max_num) + 1) + "";
				childid = produceNewXh(2,childid);
			}
		}else if("2".equals(sbflwhObject.getSbcj())){
			if("".equals(max_num) || max_num == null){
				childid = sbflwhObject.getFsbflid()+"01";
			}else{
				if(Integer.parseInt(max_num.substring(2, 4)) == 99){
					return map;
				}
				childid = (Integer.parseInt(max_num) + 1) + "";
				childid = produceNewXh(4,childid);
			}
		}else if("3".equals(sbflwhObject.getSbcj())){
			if("".equals(max_num) || max_num == null){
				childid = sbflwhObject.getFsbflid()+"000001";
			}else{
				if(Integer.parseInt(max_num.substring(4, 10)) == 999999){
					return map;
				}
				childid = (Integer.parseInt(max_num) + 1) + "";
				childid = produceNewXh(10,childid);
			}
		}else{
			map.put("code", "203");
			map.put("info", "新增失败！");
			map.put("sblbmc", "**设备分类层级过高**");

			return map;
		}
		
		sbflwhObject.setSbflid(childid);//设备分类ID
		baseDao.update("dem.jcxx.mapper.JcxxMapper.updatesfzl",sbflwhObject);//更新父分类“是否子类”状态为父类0
		
		baseDao.insert("dem.jcxx.mapper.JcxxMapper.sblbInsert",sbflwhObject);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("sblbmc", sbflwhObject.getSblbmc());
		map.put("childid", childid);

		return map;
	}
	
	public String produceNewXh(int sum, String str){//产生位数足够的规则序号，参数分别为：所需最小位数、当前序号字符串；当位数足够则返回原值
		for(int a=str.length();a<sum;a++){
			str = "0"+str;
		}
		return str;
	}

	//设备类别删除
	@Override
	public Map<String, Object> sblbDelete(SbflwhObject sbflwhObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String fsbflidarr = sbflwhObject.getSbflid();
		for(int i=1;i<=6;i++){
			if(fsbflidarr==null || (fsbflidarr.trim()).equals("")){
				break;
			}
			//拼装SQL条件字符串开始--->
			String[] arr = fsbflidarr.split(",");
			//<---拼装SQL条件字符串结束
			int sum_sbrk = (Integer)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.countsbrkwithsbflid", Arrays.asList(arr));
			if(sum_sbrk>0){
				map.put("code", "202");
				map.put("info", "注销无效！");
				map.put("cannot", "当前分类或该分类下的子类存在设备入库记录，无法删除此类！");
				return map;
			}
			fsbflidarr = (String)baseDao.selectOne("dem.jcxx.mapper.JcxxMapper.findchildren", Arrays.asList(arr));
			
		}
		
		baseDao.update("dem.jcxx.mapper.JcxxMapper.sblbDelete",sbflwhObject);
		map.put("code", "200");
		map.put("info", "注销成功！");
		map.put("sblbmc", sbflwhObject.getSblbmc());

		return map;
	}

	@Override
	public Map<String, Object> jglxlistQuery(String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.jglxlistQuery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);
		return map;
	}

	@Override
	public Map<String, Object> jgqylistQuery(String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		list = baseDao.selectList("dem.jcxx.mapper.JcxxMapper.jgqylistQuery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);
		return map;
	}

	//设备类别信息更新
	@Override
	public Map<String, Object> sblbUpdate(SbflwhObject sbflwhObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		baseDao.update("dem.jcxx.mapper.JcxxMapper.sblbUpdate",sbflwhObject);
		map.put("code", "200");
		map.put("info", "更新成功！");
		map.put("sblbmc", sbflwhObject.getSblbmc());

		return map;
	}
}
