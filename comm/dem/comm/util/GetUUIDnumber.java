package dem.comm.util;

import dem.comm.encrypt.SHA;

/**
 * 单独生成一系列UUID，供新增菜单使用
 * @author zhangah
 *
 */
public class GetUUIDnumber {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int sum = 5;
		for(int i=0;i<sum;i++)
			System.out.println("新生成UUID值为："+(CommonUtil.getUUID()).toUpperCase());
		
		System.out.println("字符串转SHA字符串："+(SHA.instance.getEncryptResult("123456")));
	}

}
