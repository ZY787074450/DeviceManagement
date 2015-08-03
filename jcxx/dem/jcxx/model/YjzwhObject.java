package dem.jcxx.model;

import dem.login.model.PagingAction;

public class YjzwhObject extends PagingAction {

	private String yjid;
	private String jgid;
	private String jgmc;
	private String mc;
	private String yjz;
	private String note;
	private String yjlx;
	
	
	public String getYjlx() {
		return yjlx;
	}
	public void setYjlx(String yjlx) {
		this.yjlx = yjlx.trim();
	}
	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc.trim();
	}
	public String getYjid() {
		return yjid;
	}
	public void setYjid(String yjid) {
		this.yjid = yjid.trim();
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
	public String getYjz() {
		return yjz;
	}
	public void setYjz(String yjz) {
		this.yjz = yjz.trim();
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
