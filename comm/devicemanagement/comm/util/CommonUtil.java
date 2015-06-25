package devicemanagement.comm.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


public class CommonUtil {
	private CommonUtil(){
		
	};
	
	/**
	 * 得到uuid
	 * @return  uuid
	 */
	public static String getUUID(){
		String s =  UUID.randomUUID().toString();
		String uuid =  s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
		return uuid;
	}
	
	/**
	 * 获取uuid+timestamp
	 */
	public static String getUUIDAndTimaStamp(){
		return "_"+getUUID()+"_"+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
	}
}
