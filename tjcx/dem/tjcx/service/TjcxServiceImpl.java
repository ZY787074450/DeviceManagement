package dem.tjcx.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import dem.comm.dao.BaseDao;
import dem.comm.util.HSSFGenerator;
import dem.sbgl.model.SbsyHisObject;
import dem.tjcx.model.FileCreateObject;
import dem.tjcx.model.FileTypeObject;
import dem.tjcx.model.TimeFrameObject;


@Service("tjcxService")
public class TjcxServiceImpl implements TjcxService {

	private BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	@Resource
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}

	//设备使用统计（站点）查询
	@Override
	public Map<String, Object> sbsytj_zdlistQuery(TimeFrameObject timeFrameObject,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.tjcx.mapper.TjcxMapper.sbsytj_zdquery",timeFrameObject);
		int sum = (Integer)baseDao.selectOne("dem.tjcx.mapper.TjcxMapper.sbsytj_zdcountquery", "");
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}

	//设备使用统计（设备）查询
	@Override
	public Map<String, Object> sbsytj_sblistQuery(TimeFrameObject timeFrameObject,String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List list = (List)baseDao.selectList("dem.tjcx.mapper.TjcxMapper.sbsytj_sbquery",timeFrameObject);
		int sum = (Integer)baseDao.selectOne("dem.tjcx.mapper.TjcxMapper.sbsytj_sbcountquery", timeFrameObject);
		map.put("code", "200");
		map.put("info", "查询成功！");
		map.put("sbsylist", list);
		map.put("sum", sum);
		return map;
	}
	
	//下载表格
	@Override
	public Map<String, Object> createExcelFile(FileTypeObject fileTypeObject, SbsyHisObject sbsyHisObject, String userid) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		String[] arr1 = {"dem.tjcx.mapper.TjcxMapper.sbsytj_zdquery","dem.tjcx.mapper.TjcxMapper.sbsytj_sbquery","dem.yjgl.mapper.YjglMapper.sbkcquery","dem.sbgl.mapper.SbglMapper.sbsyjldataquery"};//查询语句id数组
		String[] arr2 = {"设备使用统计（站点）查询","设备使用统计（设备）查询","设备库存统计","设备使用记录"};//查询对应的功能
		String[] arr3 = {"1","2","3","4"};//查询对应的请求类型数字
		String[] arr4 = {(this.getClass().getClassLoader().getResource("/").getPath()+"../../tjcx_model/sbsytjzd.xls"),
						 (this.getClass().getClassLoader().getResource("/").getPath()+"../../tjcx_model/sbsytjsb.xls"),
						 (this.getClass().getClassLoader().getResource("/").getPath()+"../../tjcx_model/sbkctj.xls"),
						 (this.getClass().getClassLoader().getResource("/").getPath()+"../../tjcx_model/sbsyjl.xls")};//查询对应表格模板
		
		String outFilePath =  this.getClass().getClassLoader().getResource("/").getPath()+"../../tjcx_xls/";
		
		String asgArray1[] ={"jgid","jgmc","sbazsl","sbbfsl","sbjdcs","sbwxcs","jgwhcs","jgwxcs"};//对应4类表数据格式
		String asgArray2[] ={"sbflid","sblbmc","rksl","sbazsl","sbbfsl","sbjdcs","sbwxcs"};
		String asgArray3[] ={"sbflid","sblbmc","sbrksl","sbsysl","sbkc"};
		String asgArray4[] ={"sbflid","sbmc","jgid","jgmc","sbsylx","czr","czrq","note"};
		
		String basepath = "/tjcx_xls/";
		String filepath = "";
		
		TimeFrameObject timeFrameObject = new TimeFrameObject();
		if(fileTypeObject.getRq_start()!=null && (!"".equals(fileTypeObject.getRq_start()))){
			timeFrameObject.setRq_start(fileTypeObject.getRq_start());
		}
		if(fileTypeObject.getRq_end()!=null && (!"".equals(fileTypeObject.getRq_end()))){
			timeFrameObject.setRq_end(fileTypeObject.getRq_end());
		}
		
		try {
			if(arr3[0].equals(fileTypeObject.getFiletypecode())){
				List<FileCreateObject> list  = baseDao.queryList(arr1[0],timeFrameObject);
				filepath = HSSFGenerator.ExcelInAndOutGenerator(arr4[0], outFilePath, asgArray1, list, FileCreateObject.class, 0, 1, 0);
			}else if(arr3[1].equals(fileTypeObject.getFiletypecode())){
				timeFrameObject.setSbcj(fileTypeObject.getSbcj());
				List<FileCreateObject> list  = baseDao.queryList(arr1[1],timeFrameObject);
				filepath = HSSFGenerator.ExcelInAndOutGenerator(arr4[1], outFilePath, asgArray2, list, FileCreateObject.class, 0, 1, 0);
			}else if(arr3[2].equals(fileTypeObject.getFiletypecode())){
				List<FileCreateObject> list  = baseDao.queryList(arr1[2],null);
				filepath = HSSFGenerator.ExcelInAndOutGenerator(arr4[2], outFilePath, asgArray3, list, FileCreateObject.class, 0, 1, 0);
			}else if(arr3[3].equals(fileTypeObject.getFiletypecode())){
				List<FileCreateObject> list  = baseDao.queryList(arr1[3],sbsyHisObject);
				filepath = HSSFGenerator.ExcelInAndOutGenerator(arr4[3], outFilePath, asgArray4, list, FileCreateObject.class, 0, 1, 0);
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", "201");
			map.put("info", "系统异常，无法导出表格文件！");
			return map;
		}
		
		map.put("code", "200");
		map.put("info", "Excel表已生成，等待下载！");
		map.put("excelurl", (basepath + filepath));
		return map;
	}
}
