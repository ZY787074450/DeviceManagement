package dem.jcxx.model;

import dem.login.model.PagingAction;

public class JgQueryCondition extends PagingAction {

	private String jgid;//机构编号
	private String mc;//机构名称
	private String jgqy;//机构所属区域
	private String jglx;//机构类型
	private String jgzt;//机构状态
	private String lrrq;//录入日期
	
	private String rq_start;//查询起始时间
	private String rq_end;//查询终止时间
	
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
	public String getJglx() {
		return jglx;
	}
	public void setJglx(String jglx) {
		this.jglx = jglx.trim();
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid.trim();
	}
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc.trim();
	}
	public String getJgqy() {
		return jgqy;
	}
	public void setJgqy(String jgqy) {
		this.jgqy = jgqy.trim();
	}
	public String getJgzt() {
		return jgzt;
	}
	public void setJgzt(String jgzt) {
		this.jgzt = jgzt.trim();
	}
	public String getLrrq() {
		return lrrq;
	}
	public void setLrrq(String lrrq) {
		this.lrrq = lrrq.trim();
	}
	
}
