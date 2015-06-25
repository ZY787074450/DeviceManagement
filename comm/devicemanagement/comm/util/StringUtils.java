package devicemanagement.comm.util;

import java.util.Calendar;

/**
 * String utils
 * 
 * @author user1
 * 
 */
public class StringUtils {

	private StringUtils() {

	};

	public static String trim(String str)
	{
		return str==null?"":str.trim();
	}
	/**
	 * 
	 * @param date
	 *            日期
	 * @param format
	 *            日期格式 参照new SimpleDateformat yyyy MM dd hh HH mm ss SSS
	 * @return
	 */
	public static String formatDate(Calendar date, String format) {
		if (format == null || format.length() == 0)
			return date.toString();
		StringBuilder sbBuffer = new StringBuilder();
		int[] param = new int[] { date.get(Calendar.YEAR), date.get(Calendar.MONTH) + 1, date.get(Calendar.DATE), date.get(Calendar.HOUR_OF_DAY),
				date.get(Calendar.HOUR), date.get(Calendar.MINUTE), date.get(Calendar.SECOND), date.get(Calendar.MILLISECOND) };
		for (int i = format.length() - 1; i >= 0; i--) {
			char ch = format.charAt(i);
			switch (ch) {
			case 'y':
				sbBuffer.append(param[0] % 10);
				param[0] = param[0] / 10;
				break;
			case 'M':
				sbBuffer.append(param[1] % 10);
				param[1] = param[1] / 10;
				break;
			case 'd':
				sbBuffer.append(param[2] % 10);
				param[2] = param[2] / 10;
				break;
			case 'H':
				sbBuffer.append(param[3] % 10);
				param[3] = param[3] / 10;
				break;
			case 'h':
				sbBuffer.append(param[4] % 10);
				param[4] = param[4] / 10;
				break;
			case 'm':
				sbBuffer.append(param[5] % 10);
				param[5] = param[5] / 10;
				break;
			case 's':
				sbBuffer.append(param[6] % 10);
				param[6] = param[6] / 10;
				break;
			case 'S':
				sbBuffer.append(param[7] % 10);
				param[7] = param[7] / 10;
				break;
			// 其他非日期格式字符
			default:
				sbBuffer.append(ch);
			}

		}
		return sbBuffer.reverse().toString();
	}

	public static boolean isNull(String str) {
		return str == null;
	}

	public static boolean isNotNull(String str) {
		return !isNull(str);
	}

	public static boolean isNullOrEmpty(String str) {
		return str == null || "".equals(str.trim());
	}

	public static boolean isNotNullAndEmpty(String str) {
		return !isNullOrEmpty(str);
	}

	public static String lpad(char paddingChar, int length, Object obj) {
		String old = obj.toString();
		int oldLength = old.length();
		if (oldLength >= length)
			return old;
		for (int index = 0; index < length - oldLength; index++) {
			old = paddingChar + old;
		}
		return old;
	}

	public static boolean isFileName(String name)
	{
		if(name==null||name.length()==0)
			return false;
		return name.endsWith(".png")||name.endsWith(".bmp")||name.endsWith(".jpg");
	}
	



}
