package dem.zdgl.model;

import dem.login.model.PagingAction;

public class ZdglQxsjdrObject extends PagingAction {

	private String uuid;
	private String jgid;
	private String qxsjsj_1;
	private String qxsjsj_2;
	private String fx;
	private String fs;
	private String yl;
	private String wd;
	private String sd;
	private String qy;
	
	private String sjd_start;//查询时间段起
	private String sjd_end;//查询时间段止
	
	
	public String getSjd_start() {
		return sjd_start;
	}
	public void setSjd_start(String sjd_start) {
		this.sjd_start = sjd_start;
	}
	public String getSjd_end() {
		return sjd_end;
	}
	public void setSjd_end(String sjd_end) {
		this.sjd_end = sjd_end;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid;
	}
	public String getQxsjsj_1() {
		return qxsjsj_1;
	}
	public void setQxsjsj_1(String qxsjsj_1) {
		this.qxsjsj_1 = qxsjsj_1;
	}
	public String getQxsjsj_2() {
		return qxsjsj_2;
	}
	public void setQxsjsj_2(String qxsjsj_2) {
		this.qxsjsj_2 = qxsjsj_2;
	}
	public String getFx() {
		return fx;
	}
	public void setFx(String fx) {
		this.fx = fx;
	}
	public String getFs() {
		return fs;
	}
	public void setFs(String fs) {
		this.fs = fs;
	}
	public String getYl() {
		return yl;
	}
	public void setYl(String yl) {
		this.yl = yl;
	}
	public String getWd() {
		return wd;
	}
	public void setWd(String wd) {
		this.wd = wd;
	}
	public String getSd() {
		return sd;
	}
	public void setSd(String sd) {
		this.sd = sd;
	}
	public String getQy() {
		return qy;
	}
	public void setQy(String qy) {
		this.qy = qy;
	}
	
	
}
