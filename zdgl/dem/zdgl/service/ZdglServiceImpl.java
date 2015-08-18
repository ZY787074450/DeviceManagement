package dem.zdgl.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.util.CommonUtil;
import dem.zdgl.model.ZdglQxsjdrObject;
import dem.zdgl.model.ZdglWhWxObject;

@Service("zdglService")
public class ZdglServiceImpl implements ZdglService {

	private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	@Override
	public Map<String, Object> addzdwh(ZdglWhWxObject zdglWhWxObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID
		
		zdglWhWxObject.setUuid(newUUID);//设备分类ID
		
		baseDao.insert("dem.zdgl.mapper.ZdglMapper.addzdwh",zdglWhWxObject);
		map.put("code", "200");
		map.put("info", "维护已记录成功！");
		map.put("mc", zdglWhWxObject.getMc());

		return map;
	}

	@Override
	public Map<String, Object> addzdwx(ZdglWhWxObject zdglWhWxObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID
		
		zdglWhWxObject.setUuid(newUUID);//设备分类ID
		
		baseDao.insert("dem.zdgl.mapper.ZdglMapper.addzdwx",zdglWhWxObject);
		map.put("code", "200");
		map.put("info", "维修已记录成功！");
		map.put("mc", zdglWhWxObject.getMc());

		return map;
	}

	@Override
	public Map<String, Object> selectqxsjlist(ZdglQxsjdrObject zdglQxsjdrObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();

		List list = new ArrayList();
		
		if((!"".equals(zdglQxsjdrObject.getSjd_start())) && zdglQxsjdrObject.getSjd_start()!=null){
			String[] arr = (zdglQxsjdrObject.getSjd_start()).trim().split(" ");
			String[] arr1 = arr[0].trim().split("-");
			String[] arr2 = arr[1].trim().split(":");
			String sjd_start = "";
			for(int i=0;i<arr1.length;i++){
				sjd_start = sjd_start+arr1[i];
			}
			for(int j=0;j<arr2.length;j++){
				sjd_start = sjd_start+arr2[j];
			}
			zdglQxsjdrObject.setSjd_start(sjd_start);
		}
		if((!"".equals(zdglQxsjdrObject.getSjd_end())) && zdglQxsjdrObject.getSjd_end()!=null){
			String[] arr = (zdglQxsjdrObject.getSjd_end()).trim().split(" ");
			String[] arr1 = arr[0].trim().split("-");
			String[] arr2 = arr[1].trim().split(":");
			String sjd_end = "";
			for(int i=0;i<arr1.length;i++){
				sjd_end = sjd_end+arr1[i];
			}
			for(int j=0;j<arr2.length;j++){
				sjd_end = sjd_end+arr2[j];
			}
			zdglQxsjdrObject.setSjd_end(sjd_end);
		}
		
		list = baseDao.selectList("dem.zdgl.mapper.ZdglMapper.qxsjlistquery", zdglQxsjdrObject);
		int sum = (Integer)baseDao.selectOne("dem.zdgl.mapper.ZdglMapper.qxsjCount", zdglQxsjdrObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);
		map.put("sum", sum);
		return map;
	}

	@Override
	public Map<String, Object> addqxsj(ZdglQxsjdrObject zdglQxsjdrObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		int sum = (Integer)baseDao.selectOne("dem.zdgl.mapper.ZdglMapper.zdqxsjCount", zdglQxsjdrObject);
		if(sum>0){
			map.put("code", "203");
			map.put("info", "新增失败！此站点已存在对应时间气象数据，请勿重复导入！");

			return map;
		}
		if("".equals(zdglQxsjdrObject.getQxsjsj_1()) || zdglQxsjdrObject.getQxsjsj_1()==null){
			map.put("code", "203");
			map.put("info", "新增失败！未获得时间数据！");

			return map;
		}else{
			String str = "";
			String str1 = zdglQxsjdrObject.getQxsjsj_1().substring(0,8);
			int str2 = Integer.parseInt(zdglQxsjdrObject.getQxsjsj_1().substring(8,10)) + 8;
			String str3 = zdglQxsjdrObject.getQxsjsj_1().substring(10,14);
			if(str2<10){
				str = str1 + "0" + str2 + str3;
			}else{
				str = str1 + str2 + str3;
			}
			if(str.trim().length()!=14){
				map.put("code", "203");
				map.put("info", "新增失败！恶意时间数据，无法完成添加！");

				return map;
			}
			zdglQxsjdrObject.setQxsjsj_2(str);
			String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID用于序号
			zdglQxsjdrObject.setUuid(newUUID);
		}
		baseDao.insert("dem.zdgl.mapper.ZdglMapper.addqxsj",zdglQxsjdrObject);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("jgid", zdglQxsjdrObject.getJgid());

		return map;
	}

}
