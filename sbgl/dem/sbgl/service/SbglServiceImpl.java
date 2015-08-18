package dem.sbgl.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.tomcat.util.digester.SetRootRule;
import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.util.CommonUtil;
import dem.comm.util.StringUtils;
import dem.sbgl.model.SbcjObject;
import dem.sbgl.model.SbrkObject;
import dem.sbgl.model.SbsyHisObject;
import dem.sbgl.model.SbsyObject;


@Service("sbglService")
public class SbglServiceImpl implements SbglService {

	private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	//设备入库
	@Override
	public Map<String, Object> addsbrk(SbrkObject sbrkObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID
		
		sbrkObject.setRkid(newUUID);//设备分类ID
		
		baseDao.insert("dem.sbgl.mapper.SbglMapper.sbrkInsert",sbrkObject);
		map.put("code", "200");
		map.put("info", "新增成功！");
		map.put("sbmc", sbrkObject.getSbmc());

		return map;
	}

	//设备使用记录查询
	@Override
	public Map<String, Object> sbsycx(SbsyObject sbsyObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.sbgl.mapper.SbglMapper.sbsyquery",sbsyObject);
		int sum = (Integer)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbsycountquery", sbsyObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}

	//设备操作(安装、维修、维护、检定、报废、修改)6合1更新操作，需前台传入关键词
	@Override
	public Map<String, Object> sbsydoaction(SbsyObject sbsyObject,SbsyHisObject sbsyhisObject, String czlx, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		String responsesbmc = "";
		if(czlx.equals("0")){//如果操作类型是0新增设备使用记录，则执行新增SQL
			int ms = (Integer)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbkcquery", sbsyObject.getSbflid());
			if(ms<=0){
				map.put("code", "200");
				map.put("info", "操作成功！");
				map.put("sbckbz", "此设备库存已不足，请采购入库后使用！");

				return map;
			}
			
			String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID
			sbsyObject.setXh(newUUID);
			baseDao.insert("dem.sbgl.mapper.SbglMapper.sbsyinsert", sbsyObject);
			responsesbmc = sbsyObject.getSbmc();
		}else if(czlx.equals("5")){//操作类型为5修改，则只更新设备状态
			SbsyObject sbsyqueryobj = (SbsyObject)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbsyqueryone", sbsyObject.getXh());
			baseDao.update("dem.sbgl.mapper.SbglMapper.sbsyupdate", sbsyObject);
			responsesbmc = sbsyqueryobj.getSbmc();
		}else{//其它类型(1维修、2报废、3检定、4回库(原“维护”功能))则执行更新update，4执行delete
			sbsyhisObject.setSbsylx(czlx);
			switch(czlx){
			case "1":
				sbsyObject.setSbzt("1");
				sbsyhisObject.setCzr(sbsyObject.getWxr());
				break;
			case "2":
				sbsyObject.setSbzt("2");
				sbsyhisObject.setCzr(sbsyObject.getBfr());
				break;
			case "3":
				sbsyObject.setSbzt("0");
				sbsyhisObject.setCzr(sbsyObject.getJdr());
				break;
			case "4":
				sbsyObject.setSbzt("0");
				sbsyhisObject.setCzr(sbsyObject.getWhr());
				break;
			}
			SbsyObject sbsyqueryobj = (SbsyObject)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbsyqueryone", sbsyObject.getXh());
			if("4".equals(czlx)){
				baseDao.delete("dem.sbgl.mapper.SbglMapper.sbsydelete", sbsyObject.getXh());//删除sbgl_sbsy使用记录
			}else{
				baseDao.update("dem.sbgl.mapper.SbglMapper.sbsyupdate", sbsyObject);//更新sbgl_sbsy使用记录表
			}
			
			sbsyhisObject.setXh((CommonUtil.getUUID()).toUpperCase());
			sbsyhisObject.setRkid(sbsyqueryobj.getRkid());
			sbsyhisObject.setSbflid(sbsyqueryobj.getSbflid());
			sbsyhisObject.setSbmc(sbsyqueryobj.getSbmc());
			sbsyhisObject.setJgid(sbsyqueryobj.getJgid());
			sbsyhisObject.setSbsylx(czlx);
			baseDao.insert("dem.sbgl.mapper.SbglMapper.sbczinsert", sbsyhisObject);//sbgl_sbsy_his表添加设备操作记录
			responsesbmc = sbsyqueryobj.getSbmc();
		}
		map.put("code", "200");
		map.put("info", "操作成功！");
		map.put("sbmc", responsesbmc);

		return map;
	}

	//设备使用记录删除(检定人/日期、维修人/日期、维护人/日期、报废人/日期都为空时方可删除)
	@Override
	public Map<String, Object> sbsydelete(SbsyObject sbsyObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		SbsyObject sbsyqueryobj = (SbsyObject)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbsyqueryone", sbsyObject.getXh());
		if(!(StringUtils.isNullOrEmpty(sbsyqueryobj.getJdrq())&&StringUtils.isNullOrEmpty(sbsyqueryobj.getWxrq())
				&&StringUtils.isNullOrEmpty(sbsyqueryobj.getBfrq())&&StringUtils.isNullOrEmpty(sbsyqueryobj.getWhrq()))){
			map.put("code", "202");
			map.put("info", "执行条件不足！");
			map.put("msg", "当前设备已存在使用记录，无法执行记录删除操作！");
			return map;
		}
		baseDao.delete("dem.sbgl.mapper.SbglMapper.sbsydelete",sbsyObject.getXh());
		map.put("code", "200");
		map.put("info", "删除成功！");
		map.put("sbmc", sbsyqueryobj.getSbmc());

		return map;
	}

	//设备使用操作记录
	@Override
	public Map<String, Object> sbsyjlcx(SbsyHisObject sbsyhisObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.sbgl.mapper.SbglMapper.sbsyjlquery",sbsyhisObject);
		int sum = (Integer)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbsyjlcountquery", sbsyhisObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsyjllist", list);
		map.put("sum", sum);

		return map;
	}

	@Override
	public Map<String, Object> sbrkcx(String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.sbgl.mapper.SbglMapper.sbrkquery","");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("jglist", list);

		return map;
	}

	//设备出借
	@Override
	public Map<String, Object> sbcjcj(SbcjObject sbcjObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();		
		int ms = (Integer)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbkcquery", sbcjObject.getSbflid());
		if(ms<=0){
			map.put("code", "200");
			map.put("info", "操作成功！");
			map.put("sbckbz", "此设备库存已不足，请采购入库后使用！");

			return map;
		}
		
		String responsesbmc = "";
		String newUUID = (CommonUtil.getUUID()).toUpperCase();//产生UUID
		sbcjObject.setXh(newUUID);
		baseDao.insert("dem.sbgl.mapper.SbglMapper.sbcjinsert", sbcjObject);
		responsesbmc = sbcjObject.getSbmc();
		map.put("code", "200");
		map.put("info", "操作成功！");
		map.put("sbmc", responsesbmc);

		return map;
	}

	//设备还入
	@Override
	public Map<String, Object> sbcjhr(SbcjObject sbcjObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		String responsesbmc = "";
		baseDao.update("dem.sbgl.mapper.SbglMapper.sbcjupdate", sbcjObject);
		responsesbmc = sbcjObject.getSbmc();
		map.put("code", "200");
		map.put("info", "操作成功！");
		map.put("sbmc", responsesbmc);

		return map;
	}
	//设备出借记录查询
	@Override
	public Map<String, Object> sbcjlistcx(SbcjObject sbcjObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.sbgl.mapper.SbglMapper.sbcjlistquery",sbcjObject);
		int sum = (Integer)baseDao.selectOne("dem.sbgl.mapper.SbglMapper.sbcjcountquery", sbcjObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);

		return map;
	}
}
