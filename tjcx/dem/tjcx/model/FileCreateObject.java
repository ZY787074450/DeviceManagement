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
	
	private String sbxh;//设备型号
	private String sbzt;//设备状态
	private String jdrq;//上次检定日期
	private String yjz;//预警值
	private String jdrqcz;//检定日期差值
	private String ccyjz;//超出预警值
	
	private String sccj;//生产厂家
	private String ccbh;//出厂编号
	
	
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
	public String getSbxh() {
		return sbxh;
	}
	public void setSbxh(String sbxh) {
		this.sbxh = sbxh;
	}
	public String getSbzt() {
		return sbzt;
	}
	public void setSbzt(String sbzt) {
		if("0".equals(sbzt)){
			this.sbzt = "使用中";
		}else{
			this.sbzt = "非使用中";
		}
	}
	public String getJdrq() {
		return jdrq;
	}
	public void setJdrq(String jdrq) {
		this.jdrq = jdrq;
	}
	public String getYjz() {
		return yjz;
	}
	public void setYjz(String yjz) {
		this.yjz = yjz;
	}
	public String getJdrqcz() {
		return jdrqcz;
	}
	public void setJdrqcz(String jdrqcz) {
		this.jdrqcz = jdrqcz;
	}
	public String getCcyjz() {
		if("".equals(jdrqcz) || jdrqcz==null){
			return "尚未检定记录";
		}else{
			return ((Integer.parseInt(jdrqcz)-Integer.parseInt(yjz))<0?"未超过":((Integer.parseInt(jdrqcz)-Integer.parseInt(yjz))+""));
		}
	}
	public void setCcyjz(String ccyjz) {
		this.ccyjz = ccyjz;
	}
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
		}else if("0".equals(sbsylx.trim())){
			str = "安装";
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
