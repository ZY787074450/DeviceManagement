package devicemanagement.comm.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;


/**
 * 该类实现参数拼装Javabean
 * @author zhangyun
 *
 */
public class ParamsSwitchToBean {

    /**
     * 该方法将源JavaBean的数据转换成指定的目标JavaBean，
     * 如果目标Javabean中没有属性名与源Javabean的属性名相同，则不转换，以目标Javabean为基础去源Javabean中寻找有用的数据
     * @param sourceBean  数据源JavaBean
     * @param goalBeanClass  目标Javabean
     * @return  <T>  T     返回带有源JavaBean中数据的目标Javabean
     * @throws Exception    调用该方法者捕捉异常
     */
	 public static <T>  T  BeanSwitchToBean(Object sourceBean,Class<T> goalBeanClazz) throws Exception {    
		 T  returnValue  = null ;
			if(sourceBean !=null ){   
				returnValue = goalBeanClazz.newInstance();                                                                      //创建目标JavaBean泛型类的对象
			    BeanInfo goalBeanInfo = Introspector.getBeanInfo(goalBeanClazz,Object.class);   							       //得到目标JavaBean的BeanInfo对象  
		        PropertyDescriptor[] goalProDescriptors = goalBeanInfo.getPropertyDescriptors();              //得到目标JavaBean的属性组 
		        BeanInfo sourceBeanInfo = Introspector.getBeanInfo(sourceBean.getClass(),Object.class);                                 //得到源JavaBean的BeanInfo对象  
		        PropertyDescriptor[] sourceProDescriptors = sourceBeanInfo.getPropertyDescriptors();      //得到源JavaBean的属性组 
		        for(PropertyDescriptor goalprop: goalProDescriptors){                                        	            //遍历目标属性
		        	 for(PropertyDescriptor sourceprop: sourceProDescriptors){                                           //遍历属性
						if(sourceprop.getName().equals(goalprop.getName())){              							    //源Javabean的属性名与目标JavaBean的属性名相同
							Method sourceReadmethod = sourceprop.getReadMethod();   						    //得到源JavaBean读方法
							Method goalWirtemethod = goalprop.getWriteMethod(); 	                                //得到目标JavaBean写方法
							Object    object   =  sourceReadmethod.invoke(sourceBean);
							goalWirtemethod.invoke(returnValue,object);     //执行读写方法，将值先读后写入
						}
			        }
		        }
		    }  	
		return returnValue;
	 }

 
    /**
     * 该方法将源JavaBean的数据转换成指定的目标JavaBean，自适应参数
     * 如果目标Javabean中没有属性名与源Javabean的属性名相同，则不转换，以目标Javabean为基础去源Javabean中寻找有用的数据
     * @param sourceBean  数据源JavaBean
     * @param goalBeanClass  目标Javabean
     * @return  <T>  T     返回带有源JavaBean中数据的目标Javabean
     * @throws Exception    调用该方法者捕捉异常
     */
	 public static <T>  T  TypeBeanSwitchToBean(Object sourceBean,Class<T> goalBeanClazz) throws Exception {    
		 T  returnValue  = null ;
			if(sourceBean !=null ){   
				returnValue = goalBeanClazz.newInstance();                                               //创建目标JavaBean泛型类的对象
			    BeanInfo goalBeanInfo = Introspector.getBeanInfo(goalBeanClazz,Object.class);   		 //得到目标JavaBean的BeanInfo对象  
		        PropertyDescriptor[] goalProDescriptors = goalBeanInfo.getPropertyDescriptors();              //得到目标JavaBean的属性组 
		        BeanInfo sourceBeanInfo = Introspector.getBeanInfo(sourceBean.getClass(),Object.class);        //得到源JavaBean的BeanInfo对象  
		        PropertyDescriptor[] sourceProDescriptors = sourceBeanInfo.getPropertyDescriptors();       //得到源JavaBean的属性组 
		        for(PropertyDescriptor goalprop: goalProDescriptors){                                        	    //遍历目标属性
		        	 for(PropertyDescriptor sourceprop: sourceProDescriptors){                                  //遍历属性
						if(sourceprop.getName().equals(goalprop.getName())){              						//源Javabean的属性名与目标JavaBean的属性名相同
							Method sourceReadmethod = sourceprop.getReadMethod();   						    //得到源JavaBean读方法
							Method goalWirtemethod = goalprop.getWriteMethod(); 	                           //得到目标JavaBean写方法
							if(sourceprop.getPropertyType() == goalprop.getPropertyType()){   //类型相同
								Object    object   =  sourceReadmethod.invoke(sourceBean);
								goalWirtemethod.invoke(returnValue,object);                                    //执行读写方法，将值先读后写入
						 	}else if (goalprop.getPropertyType() == java.util.Date.class) {
								if(sourceprop.getPropertyType() == java.sql.Date.class){
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()== java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(d));
								}else if (sourceprop.getPropertyType()==java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(d.longValue()));
								}else if (sourceprop.getPropertyType()==java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.util.Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(d).getTime()));
								}
							}else if (goalprop.getPropertyType()==java.sql.Date.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(d));
								}else if (sourceprop.getPropertyType()==java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(d.longValue()));
								}else if (sourceprop.getPropertyType()==java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(d).getTime()));
								}
							}else if (goalprop.getPropertyType()==java.sql.Timestamp.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Date.class) {
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(d));
								}else if (sourceprop.getPropertyType()==java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(d.longValue()));
								}else if (sourceprop.getPropertyType()== java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Timestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(d).getTime()));
								}
							}else if (goalprop.getPropertyType()== java.sql.Time.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Date.class) {
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(d));
								}else if (sourceprop.getPropertyType()==java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(d.longValue()));
								}else if (sourceprop.getPropertyType()==java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.sql.Time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(d).getTime()));
								} 	
							}else if (goalprop.getPropertyType()==java.lang.Long.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Long(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Date.class) {
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Long(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Long(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Long(d.getTime()));
								}else if (sourceprop.getPropertyType()==java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Long(d.longValue()));
								}else if (sourceprop.getPropertyType()== java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.Long.valueOf(d));
								} 
							}else if (goalprop.getPropertyType()==java.lang.Integer.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.Integer.valueOf(new java.lang.Long(d.getTime()).toString()));  
								}else if (sourceprop.getPropertyType()== java.sql.Date.class) {
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.Integer.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()==java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.Integer.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.Integer.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()==java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Integer(d.toString()));
								}else if (sourceprop.getPropertyType()==java.lang.String.class) {
									java.lang.String  d  =  (java.lang.String) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,new java.lang.Integer(d));
								} 
							}else if (goalprop.getPropertyType()==java.lang.String.class) {
								if(sourceprop.getPropertyType()==java.util.Date.class){
									java.util.Date  d  =  (java.util.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(new java.lang.Long(d.getTime()).toString()));  
								}else if (sourceprop.getPropertyType()==java.sql.Date.class) {
									java.sql.Date  d  =  (java.sql.Date) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()== java.sql.Timestamp.class) {
									java.sql.Timestamp  d  =  (java.sql.Timestamp) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()==java.sql.Time.class) {
									java.sql.Time  d  =  (java.sql.Time) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(new java.lang.Long(d.getTime()).toString()));
								}else if (sourceprop.getPropertyType()==java.lang.Long.class) {
									java.lang.Long  d  =  (java.lang.Long) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(d.toString()));
								}else if (sourceprop.getPropertyType()== java.lang.Integer.class) {
									java.lang.Integer  d  =  (java.lang.Integer) sourceReadmethod.invoke(sourceBean);
									goalWirtemethod.invoke(returnValue,java.lang.String.valueOf(d.toString()));
								} 
							}		
						}
			        }
		        }
		    }  	
		return returnValue;
	 }

    /**
     * 该方法将map的数据转换成指定的Javabean，
     * 如果Javabean中没有属性名与map的key相同，则不转换，以Javabean为基础去map中寻找有用的数据
     * @param sourceMap  数据源map
     * @param goalBeanClass  目标Javabean
     * @return  <T>  T     返回带有map中数据的目标Javabean
     * @throws Exception    调用该方法者捕捉异常
     */
	public static <T>  T  MapSwitchToBean(Map<String, Object> sourceMap,Class<T> goalBeanClazz) throws Exception{
		T  returnValue  = null ;
			if(sourceMap !=null  && sourceMap.size()>0){                                                //说明传递来map中有值
				returnValue = goalBeanClazz.newInstance();                                            //创建泛型类的对象
		        BeanInfo beanInfo = Introspector.getBeanInfo(goalBeanClazz,Object.class);                     //得到BeanInfo对象  
		        PropertyDescriptor[] proDescriptors = beanInfo.getPropertyDescriptors();     //得到属性组 
		        for(PropertyDescriptor prop: proDescriptors){                                              //遍历属性
					Set<String>  set  = sourceMap.keySet();           
					Iterator<String> it = set.iterator();
					while(it.hasNext()){                                                                                  //遍历map
						String name = it.next();                                                                        //属性名
						if(name.equals(prop.getName())){                                                        //Javabean的属性名与map集合的key值相同
							Method methodWrite = prop.getWriteMethod();                                 //得到写方法
							Object   value  = sourceMap.get(name);                                          //从map中得到value
							methodWrite.invoke(returnValue,value);                                                             //执行写方法，将值写入
						}
					}
		        }
		     }  	
		return returnValue;
	}

    /**
     * 该方法将多个源JavaBean的数据转换成指定的单个目标JavaBean，
     * 如果目标Javabean中没有属性名与源Javabean的属性名相同，则不转换，以目标Javabean为基础去源Javabean中寻找有用的数据
     * @param sourceBean  数据源JavaBean
     * @param goalBeanClass  目标Javabean
     * @return  <T>  T     返回带有源JavaBean中数据的目标Javabean
     * @throws Exception    调用该方法者捕捉异常
     */
	 public static <T>  T  BeansSwitchToBean(Class<T> goalBeanClazz,Object... sourceBean) throws Exception {    
		 T  returnValue  = null ;
			if(sourceBean !=null){   
				returnValue = goalBeanClazz.newInstance();                                                                             //创建目标JavaBean泛型类的对象
				BeanInfo goalBeanInfo = Introspector.getBeanInfo(goalBeanClazz,Object.class);   							       //得到目标JavaBean的BeanInfo对象  
			    PropertyDescriptor[] goalProDescriptors = goalBeanInfo.getPropertyDescriptors();              //得到目标JavaBean的属性组 
				for (Object sourceObj:sourceBean) {
			        BeanInfo sourceBeanInfo = Introspector.getBeanInfo(sourceObj.getClass(),Object.class);                                 //得到源JavaBean的BeanInfo对象  
			        PropertyDescriptor[] sourceProDescriptors = sourceBeanInfo.getPropertyDescriptors();      //得到源JavaBean的属性组 
			        for(PropertyDescriptor goalprop: goalProDescriptors){                                        	            //遍历目标属性
			        	 for(PropertyDescriptor sourceprop: sourceProDescriptors){                                           //遍历属性
							if(sourceprop.getName().equals(goalprop.getName())){              							    //源Javabean的属性名与目标JavaBean的属性名相同
								Method sourceReadmethod = sourceprop.getReadMethod();   						    //得到源JavaBean读方法
								Method goalWirtemethod = goalprop.getWriteMethod(); 								    //得到目标JavaBean写方法
								Object   sourcedata= sourceReadmethod.invoke(sourceObj);
								goalWirtemethod.invoke(returnValue,sourcedata);                                           //执行读写方法，将值先读后写入
							}
				        }
			        }
				 }  
		     }  	
		return returnValue;
	 }
	
		
}
