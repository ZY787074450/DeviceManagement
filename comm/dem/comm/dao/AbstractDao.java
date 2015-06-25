package dem.comm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.InitializingBean;

public interface AbstractDao extends InitializingBean{
	
	public List<Object> selectList(String id, Object param);

	public Object selectOne(String statement, Object parameter);

	public int insert(String statement, Object parameter);

	public int update(String statement, Object parameter);

	public int delete(String statement, Object parameter);

	public Map<?, ?> selectMap(String statement, String mapKey);

	public Map<?, ?> selectMap(String statement, Object parameter, String mapKey);
	
	
}
