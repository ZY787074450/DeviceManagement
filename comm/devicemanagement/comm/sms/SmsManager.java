package devicemanagement.comm.sms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import devicemanagement.comm.sms.HttpClientFactory.ResultType;

/**
 * 短信收发管理类
 * @author fangmin
 * 400：短信发送成功！
 * 401：异常信息
 * 402：发送失败！
 */
@Component("smsManager")
public class SmsManager {

	private Logger logger = Logger.getLogger(getClass());

	@Value("#{messagesettings['url']}")
	private String messageurl = "http://106.ihuyi.cn/webservice/sms.php?method=Submit";

	@Value("#{messagesettings['account']}")
	private String messageAccount = "cf_910293002";

	@Value("#{messagesettings['password']}")
	private String messagePassword = "123456";

	@Value("#{messagesettings['sendok']}")
	private String SENDMESSAGEOK = "2";

	@Value("#{messagesettings['connectTimeout']}")
	private int connectTimeout = 1000;

	@Value("#{messagesettings['socketTimeout']}")
	private int socketTimeout = 1000;

	private HttpClientFactory httpClientFactory;

	private Builder builder;

	public HttpClientFactory getHttpClientFactory() {
		return httpClientFactory;
	}

	@Resource(name = "httpClientFactory")
	public void setHttpClientFactory(HttpClientFactory httpClientFactory) {
		this.httpClientFactory = httpClientFactory;
	}

	public Map<String, Object> sendDataByMessage(String phone, String password){
		Map<String, Object> rmap = new HashMap<String, Object>();
		rmap.put("code", "402");
		try{
			if(builder==null){
				builder = RequestConfig.custom().setConnectTimeout(connectTimeout).setSocketTimeout(socketTimeout);
			}
			HttpPost httpPost = new HttpPost(messageurl);
			httpPost.setConfig(builder.build());
			httpPost.setHeader("ContentType","application/x-www-form-urlencoded;charset=UTF-8");
			List<NameValuePair> list = new ArrayList<NameValuePair>();
			list.add(new BasicNameValuePair("mobile", phone));
			list.add(new BasicNameValuePair("content", "您的验证码是：" + password
					+ "。请不要把验证码泄露给其他人。"));
			list.add(new BasicNameValuePair("account", messageAccount));
			list.add(new BasicNameValuePair("password", messagePassword));
			httpPost.setEntity(new UrlEncodedFormEntity(list, "utf-8"));
			String result = (String) httpClientFactory.getResult(ResultType.String,
					httpPost, null);
			Document doc = DocumentHelper.parseText(result);
			if(doc!=null){
				final Element root = doc.getRootElement();
				if(root!=null && SENDMESSAGEOK.equals(root.elementText("code").trim())){ //短信发送成功
					rmap.put("code", "400");
					rmap.put("info", "短信发送成功!");
				}else{
					rmap.put("info", root.elementText("msg"));
				}
			}
		}catch (Exception e) {
			logger.error(e.getMessage(), e);
			rmap.put("code", "401");
			rmap.put("info", "["+e.getMessage()+","+e.getClass().getName()+"]");
		}
		return rmap;
	}

}
