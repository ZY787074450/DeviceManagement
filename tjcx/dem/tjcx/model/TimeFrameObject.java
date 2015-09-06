package dem.tjcx.model;

import dem.login.model.PagingAction;

public class TimeFrameObject extends PagingAction {

	private String sbcj;//设备层级
	
	private String rq_start;//起始时间
	private String rq_end;//终止时间
	
	public String getRq_start() {
		return rq_start;
	}
	public void setRq_start(String rq_start) {
		this.rq_start = rq_start;
	}
	public String getRq_end() {
		return rq_end;
	}
	public void setRq_end(String rq_end) {
		this.rq_end = rq_end;
	}
	public String getSbcj() {
		return sbcj;
	}
	public void setSbcj(String sbcj) {
		this.sbcj = sbcj;
	}
	
}
