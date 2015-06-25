package dem.comm.encrypt;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.log4j.Logger;
/**
 * sha1 加密单列
 * @author 方敏
 */
public enum SHA {
	instance;
	private MessageDigest  messageDigest;
	
	private Logger logger =Logger.getLogger(getClass());
	
	private SHA(){
		try {
			messageDigest = MessageDigest.getInstance("SHA-1");
		} catch (NoSuchAlgorithmException e) {
			logger.error(e.getMessage(),e);
		}
	}
	/**
	 * 获取 sha加密结果
	 * @param inStr
	 * @return
	 */
    public  String getEncryptResult(String inStr) {
        String outStr = null;
        byte[] digest = messageDigest.digest(inStr.getBytes());    
        outStr = bytetoString(digest);
        return outStr;
    }
    
    private String bytetoString(byte[] digest) {
        StringBuilder str = new StringBuilder();
        String tempStr = "";
        for (int i = 0; i < digest.length; i++) {
            tempStr = (Integer.toHexString(digest[i] & 0xff));
            if (tempStr.length() == 0) {
                str.append(str).append("0");
            }
            str.append(tempStr);
        }
        return str.toString().toLowerCase();
    }
    public static void main(String[] args) {
		System.out.println(SHA.instance.getEncryptResult("123456"));
	}
}