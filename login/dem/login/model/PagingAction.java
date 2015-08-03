package dem.login.model;

public class PagingAction {
	private boolean ispaging=false;//是否分页(初始不分页)
	
	private String sortname="";//排序字段名

	private int currpage=0;//当前页面(请求页)页码(初始页面0)
	private int prevpage;//请求页的上一页页码
	private int nextpage;//请求页的下一页页码
	
	private int countline=0;//页面记录条数(初始页面记录数0)
	
	private boolean firstpage;//请求页是否是首页
	private boolean endpage;//请求页是否是尾页
	
	//以下为SQL参数部分
	private int firstpram;//分页查询第一个参数
	private int secondpram;//分页查询第二个参数
	
	//SQL分页排序语句
	private String sql_paging_sort="";

	public String getSql_paging_sort() {
		if(!("".equals(getSortname())) && getSortname()!=null){
			sql_paging_sort += (" order by "+getSortname());
		}
		if(ispaging && getCountline()!=0 && getCurrpage()>=0){
			sql_paging_sort += (" limit "+getFirstpram()+","+getSecondpram());
		}
		return sql_paging_sort;
	}
	public void setSql_paging_sort(String sql_paging_sort) {
		this.sql_paging_sort = "";
	}
	
	public String getSortname() {
		return sortname;
	}
	public void setSortname(String sortname) {
		this.sortname = trimAllWords(sortname);
	}
	
	public boolean isIspaging() {
		return ispaging;
	}
	public void setIspaging(boolean ispaging) {
		this.ispaging = ispaging;
	}
	public int getFirstpram() {
		if(ispaging && countline!=0 && currpage>=0){
			return (currpage-1)*countline;
		}else{
			if(countline==0 || currpage<0){ //当页面记录条数请求为0是，判定为不分页
				ispaging = false;
			}
			return firstpram;
		}
	}
	public void setFirstpram(int firstpram) {
		this.firstpram = firstpram;
	}
	public int getSecondpram() {
		if(ispaging){
			return countline;
		}else{
			return secondpram;
		}
	}
	public void setSecondpram(int secondpram) {
		this.secondpram = secondpram;
	}
	
	
	public int getCurrpage() {
		return currpage;
	}
	public void setCurrpage(int currpage) {
		this.currpage = currpage;
	}
	public int getPrevpage() {
		return prevpage;
	}
	public void setPrevpage(int prevpage) {
		this.prevpage = prevpage;
		this.currpage = prevpage+1;
	}
	public int getNextpage() {
		return nextpage;
	}
	public void setNextpage(int nextpage) {
		this.nextpage = nextpage;
		this.currpage = nextpage-1;
	}
	public int getCountline() {
		return countline;
	}
	public void setCountline(int countline) {
		this.countline = countline;
	}
	public boolean isFirstpage() {
		return firstpage;
	}
	public void setFirstpage(boolean firstpage) {
		this.firstpage = firstpage;
	}
	public boolean isEndpage() {
		return endpage;
	}
	public void setEndpage(boolean endpage) {
		this.endpage = endpage;
	}
	
	//去除非法字符串，防止嵌入SQL语句关键词
	public String trimAllWords(String str){
		String[] arr_sql_str = str.split(" ");
		String sql_new_str = "";
		for(int i=0;i<arr_sql_str.length;i++){
			sql_new_str += arr_sql_str[i];
		}
		if(sql_new_str.indexOf("delete")>=0 || sql_new_str.indexOf("insert")>=0 || sql_new_str.indexOf("update")>=0 || sql_new_str.indexOf("select")>=0){
			System.out.println("请求参数字符串非法，请求无效！");
			return "";
		}
		sql_new_str = sql_new_str.replace("@", " ");
		return sql_new_str;
	}
	
}
