package dem.comm.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import dem.login.model.Loginner;

public class LoginUserFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//放行的请求地址
		String[] notFilter = {"login.html","login.do","/user/getusername.do","testEasyUi.html"};
		//uri地址字符串
		String uriStr = request.getRequestURI();
		//是否执行过滤
		boolean dofilter = true;
		//是否是恶意非法请求
		boolean isWrongAsk = true;
		for(String i : notFilter){
			if(uriStr.indexOf(i)>0){
				dofilter = false;
				break;
			}
		}
		if(uriStr.indexOf(".do") > 0 || uriStr.indexOf(".html") > 0){
			if(dofilter){
				Object obj = request.getSession().getAttribute("session_loginner");
				if(null == obj){
					 request.getRequestDispatcher("/user/backlogin.do").forward(request,response);
					 isWrongAsk = false;
				}else{
					if(uriStr.indexOf(".do") > 0 && uriStr.indexOf("/getmemus.do")<=0){
						//配置所有菜单名称对应请求字段
						String[] menunames = {"人员维护","气象站点及部门维护","预警值维护","设备分类维护","密码修改"};//菜单名称数组
						String[] menuuris = {"/jcxx/rywh","/jcxx/qxzdjbmwh","/jcxx/yjzwh","/jcxx/sbflwh","/jcxx/mmxg"};//菜单通用请求地址(与menunames一一对应,需加上父菜单的通用请求地址作为前缀)
						//此处编写恶意非法请求拦截代码
						List list = (List)request.getSession().getAttribute("session_menulist");
						if(null == list){
							request.getRequestDispatcher("/user/roolbacklogin.do").forward(request,response);
						}else{
							String menuname = "/user/backlogin.do";//请求所属菜单的通用请求地址(初始化地址为登录地址)
							for(int i=0;i<menuuris.length;i++){
								if(uriStr.indexOf(menuuris[i]) > 0){
									menuname = menunames[i];
									break;
								}
							}
							for(Object m : list){
								if(menuname.equals(((Map<String, String>)m).get("menu_mc"))){
									isWrongAsk = false;
								}
							}
							if(isWrongAsk){
								request.getRequestDispatcher("/user/roolbacklogin.do").forward(request,response);
							}
						}//非法请求拦截设置结束
					}
					
					filterChain.doFilter(request, response);
				}
			}else{
				 filterChain.doFilter(request, response);
			}
		}else{
			filterChain.doFilter(request, response);
		}

	}

}
