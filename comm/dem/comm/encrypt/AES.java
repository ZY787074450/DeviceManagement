package dem.comm.encrypt;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.log4j.Logger;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class AES {
	
	private AES() {

	};

	public static String defaultKey = RandomStringUtils.randomAlphabetic(16);
	private static Logger logger = Logger.getLogger(AES.class);

	public static String Encrypt(String sSrc, String sKey) {
		if (sKey == null || sKey.length() != 16) {
			sKey = AES.defaultKey;
		}
		byte[] raw = sKey.getBytes();
		try {
			SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			IvParameterSpec iv = new IvParameterSpec(getIV().getBytes());
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
			byte[] encrypted = cipher.doFinal(sSrc.getBytes());
			return new BASE64Encoder().encode(encrypted);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return null;
		}
	}

	private static String getIV() {
		return "L+\\~f4,Ir)b$=pkf";
	}

	public static String Decrypt(String sSrc, String sKey) {
		if (sKey == null || sKey.length() != 16) {
			sKey = AES.defaultKey;
		}
		try {
			byte[] raw = sKey.getBytes("ASCII");
			SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			IvParameterSpec iv = new IvParameterSpec(getIV().getBytes());
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
			byte[] encrypted1 = new BASE64Decoder().decodeBuffer(sSrc);
			byte[] original = cipher.doFinal(encrypted1);
			String originalString = new String(original);
			return originalString;
		} catch (Exception ex) {
			logger.error(ex.getMessage(), ex);
			return null;
		}
	}

	public static void main(String[] args) {
		try {
			System.out.println(AES.Decrypt(AES
					.Encrypt("1111111111111111", null), null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}