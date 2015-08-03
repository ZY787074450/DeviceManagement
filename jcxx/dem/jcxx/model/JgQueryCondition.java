package dem.jcxx.model;

import dem.login.model.PagingAction;

public class JgQueryCondition extends PagingAction {

	private String jgid;//机构编号
	private String mc;//机构名称
	private String jgqy;//机构所属区域
	private String jglx;//机构类型
	private String jgzt;//机构状态
	private String lrrq;//录入日期
	
	
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
