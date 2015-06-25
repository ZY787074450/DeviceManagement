package devicemanagement.comm.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

/**
 * 公共Dao封装
 * @author fangmin
 *
 */

@Repository("baseDao")
public class BaseDao{
	
	protected SqlSessionTemplate sqlSessionTemplate;
	
	protected Logger logger = Logger.getLogger(getClass());

	@Resource(name="sqlSessionTemplate")
	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	public BaseDao() {
	}
	
	public <T> List<T> queryListOfMap(String _mybitsId, Map<String, Object> _params) {
		if (_params == null)
			 return sqlSessionTemplate.selectList(_mybitsId);
		  return sqlSessionTemplate.selectList(_mybitsId, _params);
	}
	
	public <T> List<T> queryList(String _mybitsId, Object params) {
		if (params == null)
			 return sqlSessionTemplate.selectList(_mybitsId);
		  return sqlSessionTemplate.selectList(_mybitsId, params);
	}

	public List<Object> selectList(String id, Object param) {
		if (param == null)
			return sqlSessionTemplate.selectList(id);
		return sqlSessionTemplate.selectList(id, param);
	}

	public Object selectOne(String statement, Object parameter) {
		if (parameter == null)
			return sqlSessionTemplate.selectOne(statement);
		return sqlSessionTemplate.selectOne(statement, parameter);
	}

	public int insert(String statement, Object parameter) {
		if (null == parameter)
			return sqlSessionTemplate.insert(statement);
		return sqlSessionTemplate.insert(statement, parameter);
	}

	public int update(String statement, Object parameter) {
		if (null == parameter)
			return sqlSessionTemplate.update(statement);
		return sqlSessionTemplate.update(statement, parameter);
	}

	public int delete(String statement, Object parameter) {
		if (null == parameter)
			return sqlSessionTemplate.delete(statement);
		return sqlSessionTemplate.delete(statement, parameter);
	}

	public Map<?, ?> selectMap(String statement, String mapKey) {
		return sqlSessionTemplate.selectMap(statement, mapKey);
	}

	public Map<?, ?> selectMap(String statement, Object parameter, String mapKey) {
		return sqlSessionTemplate.selectMap(statement, parameter, mapKey);
	}
	
	
  

}
