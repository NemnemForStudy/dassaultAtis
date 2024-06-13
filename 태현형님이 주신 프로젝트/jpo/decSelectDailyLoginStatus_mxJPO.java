/*
**  emxAEFCollectionBase
**
**  Copyright (c) 1992-2020 Dassault Systemes.
**  All Rights Reserved.
**  This program contains proprietary and trade secret information of MatrixOne,
**  Inc.  Copyright notice is precautionary only
**  and does not evidence any actual or intended publication of such program
**
**   This JPO contains the implementation of emxAEFCollectionBase
*/

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.apache.ibatis.session.SqlSession;

import com.daewooenc.mybatis.main.decSQLSessionFactory;
import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;

import matrix.db.Context;
import matrix.util.StringList;

/**
 * The <code>emxAEFCollectionBase</code> class contains methods for the
 * "Collection" Common Component.
 *
 * @version AEF 10.0.Patch1.0 - Copyright (c) 2003, MatrixOne, Inc.
 */

public class decSelectDailyLoginStatus_mxJPO {

	
	public void mxMain(Context context, String[] args) throws Exception {
	
		
		String abcd =  "2023/05/25";
//		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
//		Date login_date = format.parse(abcd);
//		Calendar calendar = Calendar.getInstance();
//		calendar.setTime(login_date);
//		calendar.set(Calendar.HOUR_OF_DAY, 0);
//		calendar.set(Calendar.MINUTE, 0);
//		calendar.set(Calendar.SECOND, 0);
//		calendar.set(Calendar.MILLISECOND, 0);
//		Date dateWithoutTime = calendar.getTime();
		String abcde ="dwuser02";
		try {
			try ( SqlSession sqlSession = decSQLSessionFactory.getSession() ){
				Map selectParamMap = new HashMap();
				selectParamMap.put("PERSON_NAME","dwuser02");
				List<Map> resultList = sqlSession.selectList("Project.selectDailyLoginPersonName", selectParamMap);
//				selectParamMap.put("PERSON_NAME", abcde);
//				List<Map> resultList = sqlSession.selectList("Project.selectDailyLoginPersonName", selectParamMap);
				System.out.println("resultList:"+resultList);
				System.out.println("selectParamMap:"+selectParamMap);
				System.out.println("rows:"+resultList.size());
//				for(int i = 0 ; i<=resultList.size(); i++) {
//					HashMap<?, ?> mlCodeMasterhashmap = (HashMap<?, ?>) resultList.get(i);
//					
//				}
				for(Map resultMap : resultList) {
					System.out.println("result:"+resultMap);
				}
				
				
			}
				
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
		}
		

		
//	insert program C:/workspace_test/customFD02/jpo/decSelectDailyLoginStatus_mxJPO.java;
//	compile prog decSelectDailyLoginStatus force update;
//	execute program decSelectDailyLoginStatus -method mxMain;
	}
}