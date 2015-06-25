package devicemanagement.comm.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

/**
 * 
 * office文件产生器
 * @author  zhangyun
 */
public class HSSFGenerator {
	/**
	 * 
	 * Excel文件产生器
	 * @return  File对象
	 * @param outFilePath  导出文件的全路径
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class
	 * @param x   表格的起始原点第几列，下标从0始
	 * @param y   表格的起始原点第几行，下标从0始
	 */
	public static File ExcelOutFileGenerator(String outFilePath,String[] asgArray,List<?> list,Class<?> obj,int x,int y) throws Exception{
		    	File  file = new File(outFilePath);
				FileOutputStream  fos  = new FileOutputStream(file);
				HSSFWorkbook  hssfWorkbook  = new HSSFWorkbook();
				HSSFSheet  hssfSheet  = hssfWorkbook.createSheet("表一");
				Comm(hssfSheet , x , y ,asgArray ,list,obj,true);
				hssfWorkbook.write(fos);
				fos.flush();
				fos.close();	
		return file;
	}

	
	
	/**
	 * 
	 * Excel文件产生器
	 * @return  OutputStream对象
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class
	 * @param x   表格的起始原点第几列，下标从0始
	 * @param y   表格的起始原点第几行，下标从0始
	 */
	public static OutputStream ExcelOutIoGenerator(String[] asgArray,List<?> list,Class<?> obj,int x,int y) throws Exception{			
				HSSFWorkbook  hssfWorkbook  = new HSSFWorkbook();
				HSSFSheet  hssfSheet  = hssfWorkbook.createSheet("表一");
				Comm(hssfSheet , x , y ,asgArray ,list,obj,true);
		        OutputStream  os = new ByteArrayOutputStream();
				hssfWorkbook.write(os);
		return os;
	}
	
	/**
	 * 
	 * Excel文件产生器
	 * @return  HSSFWorkbook对象
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class
	 * @param x   表格的起始原点第几列，下标从0始
	 * @param y   表格的起始原点第几行，下标从0始
	 */
	public static HSSFWorkbook ExcelOutIoHSSFGenerator(String[] asgArray,List<?> list,Class<?> obj,int x,int y) throws Exception{			
				HSSFWorkbook  hssfWorkbook  = new HSSFWorkbook();
				HSSFSheet  hssfSheet  = hssfWorkbook.createSheet("表一");
				Comm(hssfSheet , x , y ,asgArray ,list,obj,true);
		return hssfWorkbook;
	}
	/**
	 * 
	 * Excel文件产生器
	 * @return  将要下载的临时文件名
	 * @param inFilePath  文件模板的全路径
	 * @param outFilePath  导入数据生成后文件的全路径
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class 
	 * @param x   模板表格的起始原点第几列，下标从0始
	 * @param y   模板表格的起始原点第几行，下标从0始
	 * @param sheetIndex   模板表格的第几个工作薄，下标从0始
	 */
	public static String ExcelInAndOutGenerator(String inFilePath,String outFilePath,String[] asgArray,List<?> list,Class<?> obj,int x,int y,int sheetIndex) throws Exception{
			    File  fiDir  = new File(outFilePath);
			    if(!fiDir.exists()){
			    	fiDir.mkdirs();
			    }
		        String  fileNameUUID =  getDATEandUUID();
		        HSSFWorkbook hssfWorkbook = new HSSFWorkbook(new FileInputStream(new File(inFilePath)));	  //读取excel模板
				HSSFSheet  hssfSheet  = hssfWorkbook.getSheetAt(sheetIndex);                                                     //读取工作簿
				Comm(hssfSheet , x , y ,asgArray ,list,obj,false);
				File temfile =  new File(outFilePath+fileNameUUID+".xls");
		        FileOutputStream  fos  = new FileOutputStream(temfile);
				hssfWorkbook.write(fos);
				fos.flush();
				fos.close();	
		return fileNameUUID+".xls";
	}

	/**
	 * 
	 * Excel文件产生器
	 * @return  FileOutputStream对象
	 * @param inFilePath  文件模板的全路径
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class
	 * @param x   模板表格的起始原点第几列，下标从0始
	 * @param y   模板表格的起始原点第几行，下标从0始
	 * @param sheetIndex   模板表格的第几个工作薄，下标从0始
	 */
	public static OutputStream ExcelInAndOutGenerator(String inFilePath,String[] asgArray,List<?> list,Class<?> obj,int x,int y,int sheetIndex) throws Exception{	
				HSSFWorkbook hssfWorkbook = new HSSFWorkbook(new FileInputStream(new File(inFilePath)));	  //读取excel模板
				HSSFSheet  hssfSheet  = hssfWorkbook.getSheetAt(sheetIndex);                                                     //读取工作簿
				Comm(hssfSheet , x , y ,asgArray ,list,obj,false);
		        ByteArrayOutputStream  stream = new ByteArrayOutputStream();
				hssfWorkbook.write(stream);
		return stream;
	}
	
	
	/**
	 * 
	 * Excel文件产生器
	 * @return  HSSFWorkbook对象
	 * @param inFilePath  文件模板的全路径
	 * @param asgArray  需要的插入到表格的字段名
	 * @param list   数据list，你从后台的查询的list
	 * @param obj   你从后台的查询的list中的对象Javabean  BrandSearchForm.class
	 * @param x   模板表格的起始原点第几列，下标从0始
	 * @param y   模板表格的起始原点第几行，下标从0始
	 * @param sheetIndex   模板表格的第几个工作薄，下标从0始
	 */
	public static HSSFWorkbook ExcelInAndOutHSSFGenerator(String inFilePath,String[] asgArray,List<?> list,Class<?> obj,int x,int y,int sheetIndex) throws Exception{	
				HSSFWorkbook hssfWorkbook = new HSSFWorkbook(new FileInputStream(new File(inFilePath)));	  //读取excel模板
				HSSFSheet  hssfSheet  = hssfWorkbook.getSheetAt(sheetIndex);                                                     //读取工作簿
				Comm(hssfSheet , x , y ,asgArray ,list,obj,false);
		return hssfWorkbook;
	}
	
	/**
	 * @param Sheet
	 * @param x
	 * @param y
	 * @param asgArray
	 * @param list
	 * @param obj
	 * @param flag
	 * @throws Exception
	 */
	private static void Comm(HSSFSheet Sheet ,int x ,int y ,String[] asgArray ,List<?> list,Class<?> obj,Boolean flag) throws Exception{
		HSSFSheet  hssfSheet=Sheet;
		int count = 0;
        Iterator<?> iterator = list.iterator();
        while(iterator.hasNext()){                                                                                                            //遍历list  是表格的一行数据来源
            Object   object=	iterator.next();
            HSSFRow hssfRow  = hssfSheet.createRow(count+y);                                                            //创造一行
            count++;
            HSSFCell  seqCell  = hssfRow.createCell(x);
            seqCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
            seqCell.setCellValue(count);  
			BeanInfo beanInfo = Introspector.getBeanInfo(obj);                                                                   //得到BeanInfo对象  
	        PropertyDescriptor[] proDescriptors = beanInfo.getPropertyDescriptors();                                 //得到属性组
	    	for (int i = 0; i < asgArray.length; i++) {  															                         //遍历数组
		        for(PropertyDescriptor prop: proDescriptors){ 												                     //遍历属性
	        		if(prop.getName().equals(asgArray[i])){														                     //如果字段相同
	        			 Method methodGetx = prop.getReadMethod(); 								                             //得到get方法
	        		     if(object!=null && methodGetx.invoke(object)!=null){
	        		    	 HSSFCell   hssfCell  =hssfRow.createCell(x+i+1);	
	        		    	    if (methodGetx.invoke(object) instanceof java.lang.Integer) {                                 //enable字段  0有效  1无效  否者认为是其它字段
		        						if(prop.getName().equals("enable")){
		        							if(methodGetx.invoke(object).equals(new Integer(0))){
			    			        		     hssfCell.setCellType(HSSFCell.CELL_TYPE_STRING);
			    		        		    	 hssfCell.setCellValue("有效");	
			        						}else if(methodGetx.invoke(object).equals(new Integer(1))){
			    			        		     hssfCell.setCellType(HSSFCell.CELL_TYPE_STRING);
			    		        		    	 hssfCell.setCellValue("无效");	
			        						}else {
			        							hssfCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			    		        		    	hssfCell.setCellValue(Double.parseDouble(Integer.toString((Integer)methodGetx.invoke(object))));
											}
		        						}else {
		        							 hssfCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
		    		        		    	 hssfCell.setCellValue(Double.parseDouble(Integer.toString((Integer)methodGetx.invoke(object))));
										}
	        				    }else{
		        				    	 String  strData = HSSFGenerator.allTypeConvertString(methodGetx.invoke(object));   //执行get方法  结果强转成string  保险起见要写一个转换类进行转换
					        		     if(Pattern.compile("[0-9]+\\.?[0-9]*").matcher(strData).matches()){                                                   //该字符串由数字组成
					        		    	 hssfCell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
					        		    	 hssfCell.setCellValue(strData);
					        		     }else{
					        		    	 hssfCell.setCellType(HSSFCell.CELL_TYPE_STRING);
					        		    	 hssfCell.setCellValue(strData);													        	                        //插入值
					        		     }
		        				    	
	        				    }
	        		     }
		        	}
	             }  
	    	}    
        }			
	}	
	/**
	 * @param object  传入的对象
	 * @return  string   返回的string
	 */
	public static String allTypeConvertString(Object object){
		 if(object instanceof java.lang.Boolean){
	    	if((Boolean) object){
			    return   "是";
			}else{
				return    "否";
			}
	    }else if(object instanceof java.lang.Double){
	    	   return    Double.toString((Double) object);
	    }else if(object instanceof java.lang.Float){
	    	   return    Float.toString((Float) object);
	    }else if(object instanceof java.util.Date){
	    	   return    new  SimpleDateFormat("yyyy-MM-dd").format((java.util.Date)object);
	    }else if(object instanceof java.sql.Date){
	    	   return    new  SimpleDateFormat("yyyy-MM-dd").format((java.sql.Date)object);
	    }else if(object instanceof java.sql.Time){
	    	   return    new  SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format((java.sql.Time)object);
	    }else if(object instanceof java.sql.Timestamp){
	    	   return    new  SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format((java.sql.Timestamp)object);
	    }else {                                                                                                                                                               
	    	 return   object.toString();
	    }	 	 	 	 	 	 	 		
   }
	/**
	 * 得到带日期的uuid
	 * @return   string  带日期字符串
	 */
	public static String getDATEandUUID(){
		  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
	      String date=  formatter.format(new Date());
		  String s =  UUID.randomUUID().toString();
		  String uuid =  s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
		  return date+" "+uuid;
	}
	
	/**
	 * 得到uuid
	 * @return  uuid
	 */
	public static String getUUID(){
		String s =  UUID.randomUUID().toString();
		String uuid =  s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
		return uuid;
	}
		
}
