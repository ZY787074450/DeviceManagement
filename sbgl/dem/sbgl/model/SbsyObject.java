package dem.sbgl.model;

import dem.login.model.PagingAction;

public class SbsyObject extends PagingAction {

	private String xh;//序号
	private String rkid;//设备入库编号
	private String sbflid;//设备ID
	private String sbmc;//设备名称
	private String jgid;//设备使用站点的ID
	private String sbsyr;//设备使用人
	private String sbzt;//设备状态
	private String azr;//设备安装人
	private String azrq;//设备安装日期
	private String jdr;//检定人
	private String jdrq;//检定日期
	private String wxr;//维修人
	private String wxrq;//维修日期
	private String whr;//维护人
	private String whrq;//维护日期
	private String bfr;//报废人
	private String bfrq;//报废日期
	private String note;//设备安装备注
	
	//以下变量为查询专用
	private String jgmc;//设备使用机构名称
	private String azrq_start;//设备安装时间起
	private String azrq_end;//设备安装时间止
	
	
	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc.trim();
	}
	public String getAzrq_start() {
		return azrq_start;
	}
	public void setAzrq_start(String azrq_start) {
		this.azrq_start = azrq_start;
	}
	public String getAzrq_end() {
		return azrq_end;
	}
	public void setAzrq_end(String azrq_end) {
		this.azrq_end = azrq_end;
	}
	public String getXh() {
		return xh;
	}
	public void setXh(String xh) {
		this.xh = xh;
	}
	public String getRkid() {
		return rkid;
	}
	public void setRkid(String rkid) {
		this.rkid = rkid;
	}
	public String getSbflid() {
		return sbflid;
	}
	public void setSbflid(String sbflid) {
		this.sbflid = sbflid;
	}
	public String getSbmc() {
		return sbmc;
	}
	public void setSbmc(String sbmc) {
		this.sbmc = sbmc.trim();
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid.trim();
	}
	public String getSbsyr() {
		return sbsyr;
	}
	public void setSbsyr(String sbsyr) {
		this.sbsyr = sbsyr;
	}
	public String getSbzt() {
		return sbzt;
	}
	public void setSbzt(String sbzt) {
		this.sbzt = sbzt;
	}
	public String getAzr() {
		return azr;
	}
	public void setAzr(String azr) {
		this.azr = azr;
	}
	public String getAzrq() {
		return azrq;
	}
	public void setAzrq(String azrq) {
		this.azrq = azrq;
	}
	public String getJdr() {
		return jdr;
	}
	public void setJdr(String jdr) {
		this.jdr = jdr;
	}
	public String getJdrq() {
		return jdrq;
	}
	public void setJdrq(String jdrq) {
		this.jdrq = jdrq;
	}
	public String getWxr() {
		return wxr;
	}
	public void setWxr(String wxr) {
		this.wxr = wxr;
	}
	public String getWxrq() {
		return wxrq;
	}
	public void setWxrq(String wxrq) {
		this.wxrq = wxrq;
	}
	public String getBfr() {
		return bfr;
	}
	public void setBfr(String bfr) {
		this.bfr = bfr;
	}
	public String getBfrq() {
		return bfrq;
	}
	public void setBfrq(String bfrq) {
		this.bfrq = bfrq;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getWhr() {
		return whr;
	}
	public void setWhr(String whr) {
		this.whr = whr;
	}
	public String getWhrq() {
		return whrq;
	}
	public void setWhrq(String whrq) {
		this.whrq = whrq;
	}
	
}
