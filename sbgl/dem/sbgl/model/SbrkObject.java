package dem.sbgl.model;

public class SbrkObject {

	private String rkid;//入库编号
	private String sbflid;//设备分类ID
	private String sbmc;//设备名称
	private String sbxh;//设备型号
	private String sccj;//生产厂家
	private String ccbh;//出厂编号
	private String cgr;//采购人
	private String cgrq;//采购日期
	private String rkrq;//入库日期
	private String rksl;//采购（入库）数量
	private String note;//备注
	
	public String getRksl() {
		return rksl;
	}
	public void setRksl(String rksl) {
		this.rksl = rksl;
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
		this.sbmc = sbmc;
	}
	public String getSbxh() {
		return sbxh;
	}
	public void setSbxh(String sbxh) {
		this.sbxh = sbxh;
	}
	public String getSccj() {
		return sccj;
	}
	public void setSccj(String sccj) {
		this.sccj = sccj;
	}
	public String getCcbh() {
		return ccbh;
	}
	public void setCcbh(String ccbh) {
		this.ccbh = ccbh;
	}
	public String getCgr() {
		return cgr;
	}
	public void setCgr(String cgr) {
		this.cgr = cgr;
	}
	public String getCgrq() {
		return cgrq;
	}
	public void setCgrq(String cgrq) {
		this.cgrq = cgrq;
	}
	public String getRkrq() {
		return rkrq;
	}
	public void setRkrq(String rkrq) {
		this.rkrq = rkrq;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
