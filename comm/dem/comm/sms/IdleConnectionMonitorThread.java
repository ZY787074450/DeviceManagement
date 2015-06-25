package dem.comm.sms;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.impl.conn.BasicHttpClientConnectionManager;
public class IdleConnectionMonitorThread extends Thread {
	private static IdleConnectionMonitorThread monitorThread;
    private  List<HttpClientConnectionManager> connMgrs;
    private AtomicBoolean isblock;
    private volatile boolean shutdown;
    
    public synchronized static IdleConnectionMonitorThread getInstance(){
    	if(monitorThread==null)
    		monitorThread = new IdleConnectionMonitorThread();
    	return monitorThread;
    }
    public synchronized void addConnManager(HttpClientConnectionManager httpClientConnectionManager){
       connMgrs.add(httpClientConnectionManager);
       isblock.set(false);
       notifyAll();
    }
    
    private IdleConnectionMonitorThread(){
    	connMgrs = new ArrayList<HttpClientConnectionManager>();
    	Collections.synchronizedCollection(connMgrs);
    	isblock = new AtomicBoolean(true);
    	start();
    };

    @Override
    public void run() {
        try {
            while (!shutdown) {
                if(!isblock.get()){
                    synchronized (this) {
                        isblock.set(true);
                        wait();
                    	if(connMgrs.size()>0)
                    	{
                    		for(int i=0;i<connMgrs.size();i++)
                    		{
                    			HttpClientConnectionManager connMgr = connMgrs.get(i);
                    			connMgr.closeExpiredConnections();
                                connMgr.closeIdleConnections(30, TimeUnit.SECONDS);
                    		}
                    	}
                    }
                }
            }
        } catch (InterruptedException ex) {
            // terminate
        }
    }
    
    public void shutdown() {
        shutdown = true;
        synchronized (this) {
            notifyAll();
        }
    }
    
    public static void main(String[] args) {
		IdleConnectionMonitorThread.getInstance().addConnManager(new BasicHttpClientConnectionManager());
	}
}