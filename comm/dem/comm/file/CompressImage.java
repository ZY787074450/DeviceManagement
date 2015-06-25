package dem.comm.file;

import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.FileOutputStream;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 图片压缩类
 * @author fangmin
 */

@Component("compressImage")
public class CompressImage {

	private Logger logger = Logger.getLogger(getClass());

	// 压缩比0~1范围之内
	@Value("#{picsettings['qality']}")
	private float qality = 0.1f;

	public boolean compressPic(MultipartFile file, String fileName, String fix) {
		BufferedImage src = null;
		FileOutputStream out = null;
		ImageWriter imgWrier;
		ImageWriteParam imgWriteParams;
		// 指定写图片的方式为 jpg
		imgWrier = ImageIO.getImageWritersByFormatName(fix).next();
		imgWriteParams = new javax.imageio.plugins.jpeg.JPEGImageWriteParam(
				null);
		// 要使用压缩，必须指定压缩方式为MODE_EXPLICIT
		imgWriteParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		// 这里指定压缩的程度，参数qality是取值0~1范围内，
		imgWriteParams.setCompressionQuality(qality);
		imgWriteParams.setProgressiveMode(ImageWriteParam.MODE_DISABLED);
		ColorModel colorModel = ColorModel.getRGBdefault();
		// 指定压缩时使用的色彩模式
		imgWriteParams.setDestinationType(new javax.imageio.ImageTypeSpecifier(
				colorModel, colorModel.createCompatibleSampleModel(16, 16)));
		try {
			src = ImageIO.read(file.getInputStream());
			out = new FileOutputStream(fileName);
			imgWrier.reset();
			imgWrier.setOutput(ImageIO.createImageOutputStream(out));
			imgWrier.write(null, new IIOImage(src, null, null), imgWriteParams);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return false;
	}

}
