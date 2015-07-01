package dem.jcxx.model;

public class UserQueryCondition {

	private String userid;//人员编号
	private String mc;//姓名
	private String jgid;//人员所属机构编号
	private String tel;//联系电话
	private String userzt;//人员状态
	private String lrrq_start;//注册(添加)时间起
	private String lrrq_zend;//注册(添加)时间止
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid.trim();
	}
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc.trim();
	}
	public String getJgid() {
		return jgid;
	}
	public void setJgid(String jgid) {
		this.jgid = jgid.trim();
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel.trim();
	}
	public String getUserzt() {
		return userzt;
	}
	public void setUserzt(String userzt) {
		this.userzt = userzt.trim();
	}
	public String getLrrq_start() {
		return lrrq_start;
	}
	public void setLrrq_start(String lrrq_start) {
		this.lrrq_start = lrrq_start;
	}
	public String getLrrq_zend() {
		return lrrq_zend;
	}
	public void setLrrq_zend(String lrrq_zend) {
		this.lrrq_zend = lrrq_zend;
	}
	
}
