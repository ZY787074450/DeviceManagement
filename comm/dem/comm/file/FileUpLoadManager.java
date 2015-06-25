package dem.comm.file;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 上传文件管理类
 * @author fangmin
 */

@Component("fileUpLoadManager")
public class FileUpLoadManager {

	private Logger logger = Logger.getLogger(getClass());
	
	//当前工程路径
	private String webroot = System.getProperty("webapp.root");
	
	//上传文件目录(一定是在当前工程下保存的路径)
	//默认为""表示直接将文件上传的当前工程的根目录下
	private String pathDir = ""; 

	//初始化上传文件目录
	private void initPathDir(){
		File fileDir = new File(webroot + pathDir + File.separator);
		if(!fileDir.exists()){
			fileDir.mkdirs(); //创建目录
		}
	}
	
	//设置上传文件目录的名称
	public void setPathDir(String pathDir) {
		this.pathDir = pathDir;
	}

	/**
	 * 上传文件
	 * @param multipartFile  spring里面的文件流
	 * @param fileName  指定文件的名称,不要加后缀保持与客户端传递过来的文件后缀相同,缺省保持与原文件名相同
	 * @param cover 是否覆盖 true 如果同名文件只存在一份， false 如果同名文件会产生多个备份 
	 * @return
	 */
	public boolean upload(MultipartFile multipartFile,String fileName,boolean cover){
		//初始化上传文件目录
		initPathDir();
		if(multipartFile!=null){
			//获取上传上来的文件原名称
	        String pName = multipartFile.getOriginalFilename();
			//获取文件的后缀    
	        String suffix = pName.substring(pName.lastIndexOf("."));
	        //获取名称名称
	        String fName = pName.substring(0,pName.lastIndexOf("."));
	        //如果有文件名称传递进来，以传递进来的文件名称为准
	        if(fileName!=null && fileName.trim().length()>0){
	        	fName = fileName;
	        }
	        
	        File pFile = new File(webroot + pathDir + File.separator +fName);
	        //处理不需要覆盖问题
	        if(pFile.exists() && !cover){
	        	pFile = new File(webroot + pathDir + File.separator + fName+"_" + UUID.randomUUID().toString()+ suffix);
	        }
	        if(!pFile.exists()){
	        	try {
					pFile.createNewFile();
					multipartFile.transferTo(pFile); 
			        return true;
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
					e.printStackTrace();
				}
	        }
		}
		return false;
	}
	
	//默认覆盖
	public boolean upload(MultipartFile multipartFile,String fileName){
		return upload(multipartFile, fileName, true);
	}
	
	public boolean upload(MultipartFile multipartFile){
		return upload(multipartFile, null);
	}
	
}
