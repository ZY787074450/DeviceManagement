package dem.sbgl.model;

public class SbsyHisObject {
	private String xh;//序号
	private String rkid;//设备入库编号
	private String sbflid;//设备ID
	private String sbmc;//设备名称
	private String jgid;//设备使用站点ID
	private String sbsylx;//设备使用类型，1维护、2报废、3检定、4维护
	private String czr;//设备操作人
	private String czrq;//设备操作日期
	private String note;//设备操作备注
	
	//以下变量为查询专用
	private String jgmc;//设备使用机构名称
	private String czrq_start;//操作日期起
	private String czrq_end;//操作日期止
	

	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc.trim();
	}
	public String getCzrq_start() {
		return czrq_start;
	}
	public void setCzrq_start(String czrq_start) {
		this.czrq_start = czrq_start;
	}
	public String getCzrq_end() {
		return czrq_end;
	}
	public void setCzrq_end(String czrq_end) {
		this.czrq_end = czrq_end;
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
	public String getSbsylx() {
		return sbsylx;
	}
	public void setSbsylx(String sbsylx) {
		this.sbsylx = sbsylx;
	}
	public String getCzr() {
		return czr;
	}
	public void setCzr(String czr) {
		this.czr = czr;
	}
	public String getCzrq() {
		return czrq;
	}
	public void setCzrq(String czrq) {
		this.czrq = czrq;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
