package dem.login.model;

public class Loginner {

	private String userid;//主键 人员编号
	private String mc;//姓名
	private String userpass;//人员登录密码
	private String jgid;//所属机构编号
	private String tel;//联系电话
	private String userzt;//人员状态：0正常、1注销
	private String note;//备注
	private String lrrq;//录入日期
	private String zxrq;//注销日期(退出登录时间)
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc;
	}
	public String getUserpass() {
		return userpass;
	}
	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getUserzt() {
		return userzt;
	}
	public void setUserzt(String userzt) {
		this.userzt = userzt;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getLrrq() {
		return lrrq;
	}
	public void setLrrq(String lrrq) {
		this.lrrq = lrrq;
	}
	public String getZxrq() {
		return zxrq;
	}
	public void setZxrq(String zxrq) {
		this.zxrq = zxrq;
	}
	
	
}
