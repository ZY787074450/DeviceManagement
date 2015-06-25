package dem.comm.util;

/**
 * 分页工具
 * @author ZhangYun
 * TIME:ZhangYun
 */
public class Page {
	
	private int pageSize = 10;   //每页记录数，默认10条
	private int pageIndex = 1;  //第几页，默认第一页
	private int totalCount = 0; //最高记录数，默认0条
	private int startPage = 0; //开始页码
	private int endPage = totalCount; //结束页码,默认为最高纪录数
	private String pageMySql = " "; //分页MySQL的字符串
	private Boolean whetherPage = false; //是否分页，默认不分页
	
	public Page() {
		super();
	}
	
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public String getPageMySql() {
		if(getWhetherPage()){
			if( totalCount>0 ){ 
			    int  start = this.getStartPage();
				int  end   = this.getEndPage();
				if (totalCount <= start) {
					return " limit "+totalCount+","+start;
				}else if (totalCount <= end && totalCount > start) {
					return " limit "+start+","+totalCount;
				}else {
					return " limit "+start+","+end;
				}
			}else{
				return this.pageMySql;
			}
		}else {
			return this.pageMySql;
		}
	}
	public void setPageMySql(String pageMySql) {
		this.pageMySql = pageMySql;
	}

	public Boolean getWhetherPage() {
		return whetherPage;
	}
	public void setWhetherPage(Boolean whetherPage) {
		this.whetherPage = whetherPage;
	}

	public int getStartPage() {
		if (whetherPage) {
			return (pageIndex-1)*pageSize+1;
		}else {
			return startPage;
		}
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		if (whetherPage) {
			return pageIndex*pageSize;
		}else {
			return endPage;
		}
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}


}
