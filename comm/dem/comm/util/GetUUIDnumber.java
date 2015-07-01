package dem.comm.util;

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
	}

}
