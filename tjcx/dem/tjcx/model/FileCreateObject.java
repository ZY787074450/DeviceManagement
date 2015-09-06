package dem.tjcx.model;

public class FileCreateObject {

	private String sbazsl="0";//设备安装数量
	private String sbcjsl="0";//设备出借数量
	private String sbbfsl="0";//设备报废数量
	private String sbjdcs="0";//设备检定次数
	private String sbwxcs="0";//设备维修次数
	private String jgwhcs="0";//机构维护次数
	private String jgwxcs="0";//机构维修次数
	
	private String jgid="未知";//机构ID
	private String jgmc="未知";//机构名称
	
	private String sbflid="未知";//设备分类ID
	private String sblbmc="未知";//设备类别名称
	private String rksl="0";//设备采购入库数量
	
	private String sbrksl="0";//设备入库数量
	private String sbsysl="0";//设备已被使用数量
	private String sbkc="0";//设备剩余库存
	
	private String sbmc="未知";//设备名称
	private String sbsylx="未知";//设备使用类型
	private String czr="未知";//操作人
	private String czrq="未知";//操作日期
	private String note="未知";//操作备注
	
	public String getSbazsl() {
		return sbazsl;
	}
	public void setSbazsl(String sbazsl) {
		this.sbazsl = sbazsl;
	}
	public String getSbcjsl() {
		return sbcjsl;
	}
	public void setSbcjsl(String sbcjsl) {
		this.sbcjsl = sbcjsl;
	}
	public String getSbbfsl() {
		return sbbfsl;
	}
	public void setSbbfsl(String sbbfsl) {
		this.sbbfsl = sbbfsl;
	}
	public String getSbjdcs() {
		return sbjdcs;
	}
	public void setSbjdcs(String sbjdcs) {
		this.sbjdcs = sbjdcs;
	}
	public String getSbwxcs() {
		return sbwxcs;
	}
	public void setSbwxcs(String sbwxcs) {
		this.sbwxcs = sbwxcs;
	}
	public String getJgwhcs() {
		return jgwhcs;
	}
	public void setJgwhcs(String jgwhcs) {
		this.jgwhcs = jgwhcs;
	}
	public String getJgwxcs() {
		return jgwxcs;
	}
	public void setJgwxcs(String jgwxcs) {
		this.jgwxcs = jgwxcs;
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid;
	}
	public String getJgmc() {
		return jgmc;
	}
	public void setJgmc(String jgmc) {
		this.jgmc = jgmc;
	}
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
	public String getSbrksl() {
		return sbrksl;
	}
	public void setSbrksl(String sbrksl) {
		this.sbrksl = sbrksl;
	}
	public String getSbsysl() {
		return sbsysl;
	}
	public void setSbsysl(String sbsysl) {
		this.sbsysl = sbsysl;
	}
	public String getSbmc() {
		return sbmc;
	}
	public void setSbmc(String sbmc) {
		this.sbmc = sbmc;
	}
	public String getSbsylx() {
		return sbsylx;
	}
	public void setSbsylx(String sbsylx) {
		String str = "";
		if("1".equals(sbsylx.trim())){
			str = "维修";
		}else if("2".equals(sbsylx.trim())){
			str = "报废";
		}else if("3".equals(sbsylx.trim())){
			str = "检定";
		}else if("4".equals(sbsylx.trim())){
			str = "维护";
		}
		this.sbsylx = str;
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
	public String getRksl() {
		return rksl;
	}
	public void setRksl(String rksl) {
		this.rksl = rksl;
	}
	public String getSbkc() {
		int a = 0;
		int b = 0;
		if((!"".equals(sbrksl.trim())) && sbrksl != null){
			a = Integer.parseInt(sbrksl);
		}
		if((!"".equals(sbsysl.trim())) && sbsysl != null){
			b = Integer.parseInt(sbsysl);
		}
		sbkc = (a - b) + "";
		return sbkc;
	}
	public void setSbkc(String sbkc) {
		this.sbkc = sbkc;
	}

}
