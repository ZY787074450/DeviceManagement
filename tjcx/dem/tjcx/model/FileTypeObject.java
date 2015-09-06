package dem.tjcx.model;

public class FileTypeObject {

	private String filetype;//所需生成的文件参数
	private String filesqlname;//产生文件的数据查询来源名称
	private String filetypecode;//文件类型代码
	
	private String rq_start;//时间启
	private String rq_end;//时间止
	
	private String sbcj;//设备层级
	
	
	public String getRq_start() {
		return rq_start;
	}
	public void setRq_start(String rq_start) {
		this.rq_start = rq_start;
	}
	public String getRq_end() {
		return rq_end;
	}
	public void setRq_end(String rq_end) {
		this.rq_end = rq_end;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}
	public String getFilesqlname() {
		return filesqlname;
	}
	public void setFilesqlname(String filesqlname) {
		this.filesqlname = filesqlname;
	}
	public String getFiletypecode() {
		return filetypecode;
	}
	public void setFiletypecode(String filetypecode) {
		this.filetypecode = filetypecode;
	}
	public String getSbcj() {
		return sbcj;
	}
	public void setSbcj(String sbcj) {
		this.sbcj = sbcj;
	}
	
	
}
