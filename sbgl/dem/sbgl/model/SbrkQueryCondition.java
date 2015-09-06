package dem.sbgl.model;

import dem.login.model.PagingAction;

public class SbrkQueryCondition extends PagingAction {

	private String sbflid;//设备分类ID
	private String sblbmc;//设备分类名称
	private String rkrq_start;//入库时间起
	private String rkrq_end;//入库时间止
	
	public String getSbflid() {
		return sbflid;
	}
	public void setSbflid(String sbflid) {
		this.sbflid = sbflid;
	}
	public String getSblbmc() {
		return sblbmc;
	}
	public void setSblbmc(String sblbmc) {
		this.sblbmc = sblbmc;
	}
	public String getRkrq_start() {
		return rkrq_start;
	}
	public void setRkrq_start(String rkrq_start) {
		this.rkrq_start = rkrq_start;
	}
	public String getRkrq_end() {
		return rkrq_end;
	}
	public void setRkrq_end(String rkrq_end) {
		this.rkrq_end = rkrq_end;
	}
	
}
