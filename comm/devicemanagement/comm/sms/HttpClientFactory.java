package devicemanagement.comm.sms;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.StandardHttpRequestRetryHandler;
import org.apache.http.impl.conn.BasicHttpClientConnectionManager;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import easybuy.comm.util.StringUtils;

@Component("httpClientFactory")
public class HttpClientFactory implements InitializingBean {
	private HttpClientBuilder httpClientBuilder;
	
	private Logger logger = Logger.getLogger(getClass());
	/**
	 * 回收过期空闲connection monitor
	 */
	private IdleConnectionMonitorThread idleConnectionMonitorThread = IdleConnectionMonitorThread
			.getInstance();

	private HttpClientConnectionManager httpClientConnectionManager;

	public static final int sinleThreadMode = 1;

	public static final int multiThreadMode = 2;

	private Map<String, Integer> routeCount;

	private int timeOut = 500;

	public int getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(int timeOut) {
		this.timeOut = timeOut;
	}

	private int maxTotal = 2000;

	private int maxPer = 20;

	private ConnectionConfig connectionConfig;

	private int threadMode = 2;

	public void setThreadMode(int threadMode) {
		this.threadMode = threadMode;
	}

	public int getThreadMode() {
		return threadMode;
	}

	public void setConnectionConfig(ConnectionConfig connectionConfig) {
		this.connectionConfig = connectionConfig;
	}

	public ConnectionConfig getConnectionConfig() {
		return connectionConfig;
	}

	public HttpClientFactory() {
	}

	public void setMaxPer(int maxPer) {
		this.maxPer = maxPer;
	}

	public void setMaxTotal(int maxTotal) {
		this.maxTotal = maxTotal;
	}

	public void setRouteCount(Map<String, Integer> routeCount) {
		this.routeCount = routeCount;
	}

	public Map<String, Integer> getRouteCount() {
		return routeCount;
	}

	public static enum ResultType {
		byteArray, stream, String
	}

	public Object getResult(ResultType resultType,HttpUriRequest uriRequest,String charset) {
		CloseableHttpClient httpClient = httpClientBuilder.build();
		CloseableHttpResponse response = null;
		Object object = null;
		try {
			response = httpClient.execute(uriRequest);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK
					|| response.getStatusLine().getStatusCode() == HttpStatus.SC_NOT_MODIFIED) {
				switch (resultType) {
				case byteArray:
					object =  EntityUtils.toByteArray(response.getEntity());
					break;
				case String:
					HttpEntity entity = response.getEntity();
					if(charset==null&&null!=entity.getContentEncoding())
					   charset= entity.getContentEncoding().getValue();
					if(StringUtils.isNotNullAndEmpty(charset))
         					object = EntityUtils.toString(entity,charset);
					else {
						object = EntityUtils.toString(entity);
					}
				    break;
				case stream:
				default:
					object = response.getEntity().getContent();
					break;
				}
			}
		} catch (ClientProtocolException e) {
			logger.error(e.getMessage(),e);
			return null;
		} catch (IOException e) {
			logger.error(e.getMessage(),e);
			return null;
		}
		finally{
		}
		return object;
	}

	public void afterPropertiesSet() throws Exception {
//		logger = logger.getLogger(getClass());
		if (connectionConfig == null)
			connectionConfig = ConnectionConfig.DEFAULT;
		if (HttpClientFactory.sinleThreadMode == getThreadMode()) {
			BasicHttpClientConnectionManager basicHttpClientConnectionManager = new BasicHttpClientConnectionManager();
			basicHttpClientConnectionManager
					.setConnectionConfig(connectionConfig);
			this.httpClientConnectionManager = basicHttpClientConnectionManager;

		} else {
			PoolingHttpClientConnectionManager poolingHttpClientConnectionManager = new PoolingHttpClientConnectionManager();
			poolingHttpClientConnectionManager
					.setDefaultConnectionConfig(connectionConfig);
			poolingHttpClientConnectionManager.setMaxTotal(maxTotal);
			poolingHttpClientConnectionManager.setDefaultMaxPerRoute(maxPer);
			if (null != routeCount && routeCount.size() > 0) {
				Set<Entry<String, Integer>> entrys = routeCount.entrySet();
				for (Entry<String, Integer> entry : entrys) {
					if (StringUtils.isNotNullAndEmpty(entry.getKey())
							&& entry.getValue() > 0)
						poolingHttpClientConnectionManager.setMaxPerRoute(
								new HttpRoute(new HttpHost(entry.getKey())),
								entry.getValue());
				}
			}
		}
		httpClientBuilder = HttpClients.custom().setConnectionManager(
				httpClientConnectionManager);
/*		httpClientBuilder
				.setUserAgent("Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2) Gecko/20100115 Firefox/3.6");
*/
		httpClientBuilder.setRetryHandler(new StandardHttpRequestRetryHandler(
				3, true));
		idleConnectionMonitorThread.addConnManager(httpClientConnectionManager);
	}
public static void main(String[] args) {
	HttpClientFactory httpClientFactory = new HttpClientFactory();
	try {
		httpClientFactory.afterPropertiesSet();
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	System.out.println(httpClientFactory.getResult(ResultType.String, new HttpGet("http://www.baidu.com"),null));;
}
}
