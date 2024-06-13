package com.dec.util;

import java.io.InputStream;
import java.util.Properties;

import org.apache.ibatis.io.Resources;

public class decPropertyUtil {

	public static Properties getProperties(String propertiesPath) throws Exception{
		try (InputStream input = Resources.getResourceAsStream(propertiesPath)) {
            if (input == null) {
                throw new Exception("Sorry, unable to find config.properties");
            }
            
            Properties prop = new Properties();
            prop.load(input);
            
            return prop;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
	
	public static Properties getConnectionProperties() throws Exception {
		return decPropertyUtil.getProperties("com/daewooenc/mybatis/config/connection.properties");
	}
}
