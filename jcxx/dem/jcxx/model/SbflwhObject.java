package dem.jcxx.model;

import org.springframework.web.multipart.MultipartFile;

public class SbflwhObject {
	private String sbflid;//设备id
	private String sbcj;//设备层级1~6
	private String fsbflid;//上级设备编号id
	private String sfzl;//是否子类，0父类，1子类
	private String sblbmc;//设备名称
	private String sbtpdz;//设备图片服务器存放地址
	
	private MultipartFile sbtpfile;//设备图片文件

	public String getSbflid() {
		return sbflid;
	}

	public void setSbflid(String sbflid) {
		this.sbflid = sbflid;
	}

	public String getSbcj() {
		return sbcj;
	}

	public void setSbcj(String sbcj) {
		this.sbcj = sbcj;
	}

	public String getFsbflid() {
		return fsbflid;
	}

	public void setFsbflid(String fsbflid) {
		this.fsbflid = fsbflid;
	}

	public String getSfzl() {
		return sfzl;
	}

	public void setSfzl(String sfzl) {
		this.sfzl = sfzl;
	}

	public String getSblbmc() {
		return sblbmc;
	}

	public void setSblbmc(String sblbmc) {
		this.sblbmc = sblbmc;
	}

	public String getSbtpdz() {
		return sbtpdz;
	}

	public void setSbtpdz(String sbtpdz) {
		this.sbtpdz = sbtpdz;
	}

	public MultipartFile getSbtpfile() {
		return sbtpfile;
	}

	public void setSbtpfile(MultipartFile sbtpfile) {
		this.sbtpfile = sbtpfile;
	}

	
}
