package devicemanagement.comm.util;

public class HTMLFactory {

	private StringBuffer htmlheader = new StringBuffer();
	private StringBuffer htmlender = new StringBuffer("</body></html>");
	private StringBuffer htmlstr = new StringBuffer();

	public HTMLFactory() {
		htmlheader.append("<html><head><title></title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /></head><body>");
	}

	public HTMLFactory(String title) {
		htmlheader.append("<html><head><title>" + title + "</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /></head><body>");
	}

	public StringBuffer appendContent(String contents) {
		return htmlstr.append(contents);
	}

	public StringBuffer appendDiv(String contents) {
		return htmlstr.append("<div>" + contents + "</div>");
	}

	public StringBuffer appendTagP(String contents) {
		return htmlstr.append("<p>" + contents + "</p>");
	}

	public StringBuffer appendHtmlHeader() {
		return this.htmlheader.append(htmlstr);
	}

	public StringBuffer appendHtmlEnder() {
		return this.htmlheader.append(this.htmlender);
	}

	public String getHtmlTemp() {
		appendHtmlHeader();
		appendHtmlEnder();
		return this.htmlheader.toString();
	}

}
