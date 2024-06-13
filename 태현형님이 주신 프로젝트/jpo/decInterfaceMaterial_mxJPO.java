import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.SqlSession;

import com.daewooenc.mybatis.main.decSQLSessionFactory;
import com.dec.util.DecConstants;
import com.dec.util.decListUtil;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.MapList;

import matrix.db.Context;
import matrix.util.StringList;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class decInterfaceMaterial_mxJPO {

	public Map interfaceCWPMaterialList(Context context, String[] args) throws Exception{
		Map resultMap = new HashMap();
		try ( SqlSession sqlSession = decSQLSessionFactory.getBatchSession() ) {
			String objectId = null;
			StringList projectIdList = null;
			
			if ( args.length >= 1 )
			{
				objectId = args[0];
				projectIdList = new StringList(objectId);
			}
			else
			{
				MapList projectList = DomainObject.findObjects(context
						, DecConstants.TYPE_PROJECT_SPACE
						, DecConstants.SYMB_WILD
						, DecConstants.SYMB_WILD
						, DecConstants.SYMB_WILD
						, DecConstants.VAULT_ESERVICE_PRODUCTION
						, "attribute[decProjectType] == 'ongoing' && current != 'Complete' && current != 'Archive'"
						, false
						, new StringList(DecConstants.SELECT_ID));
				
				projectIdList = decListUtil.getSelectValueListForMapList(projectList, DecConstants.SELECT_ID);
			}
			
			MapList projectInfoList = DomainObject.getInfo(context, projectIdList.toStringArray(), new StringList( new String[] {DecConstants.SELECT_ID, DecConstants.SELECT_NAME}));
			
			Map projectInfo = null;
			String projectId = null;
			String projectCode = null;
			DomainObject doProject = DomainObject.newInstance(context);
			DomainObject doCWP = DomainObject.newInstance(context);
			Map selectParamMap = new HashMap();
			List<Map> cwpKeyQtyList = null;
			String CWP_NO = null;
			Map<String,Map> cwpNameMap = null;
			Map cwpInfo = null;
			String cwpId = null;
			String uom = null;
			String qtyColumnName = null;
			String qty = null;
			Map attrMap = new HashMap();
			String IF_MSG = null;
			
			StringList slSelect = new StringList();
			slSelect.add(DecConstants.SELECT_ID);
			slSelect.add(DecConstants.SELECT_NAME);
			slSelect.add(DecConstants.SELECT_ATTRIBUTE_DECKEYQUANTITYUOM);
			
			List<Map> cwpKeyQtyIFResultList = new ArrayList<Map>();
			Map cwpKeyQtyIFResultMap = null;
			
			for ( Object obj : projectInfoList )
			{
				try {
					ContextUtil.startTransaction(context, true);
					
					projectInfo = (Map) obj;
					
					projectId = (String) projectInfo.get(DecConstants.SELECT_ID);
					projectCode = (String) projectInfo.get(DecConstants.SELECT_NAME);
					
					doProject.setId(projectId);
					
					// CWP 조회
					{
						MapList cwpList = doProject.getRelatedObjects(context, "Project Access List,Project Access Key", "Project Access List,decCWPTask"
								, slSelect, null
								, true, true
								, (short) 0
								, null, null
								, 0);
						
						cwpNameMap = decListUtil.getSelectKeyDataMapForMapList(cwpList, DecConstants.SELECT_NAME);
					}
					
					// FMCS CWP Material 조회
					selectParamMap.clear();
					selectParamMap.put("SITE_CD", projectCode);
					
					cwpKeyQtyList = sqlSession.selectList("IF_Material.selectCWPKeyQtyList", selectParamMap);
					
					for (Map cwpKeyQtyMap : cwpKeyQtyList)
					{
						try {
							CWP_NO = (String) cwpKeyQtyMap.get("CWP_NO");
							
							// IF 결과 저장용 변수 준비
							IF_MSG = "Update Success.";
							cwpKeyQtyIFResultMap = new HashMap();
							cwpKeyQtyIFResultMap.put("SITE_CD", projectCode);
							cwpKeyQtyIFResultMap.put("CWP_NO", CWP_NO);
							
							cwpKeyQtyIFResultList.add(cwpKeyQtyIFResultMap);
							
							// EPC CWP 조회
							cwpInfo = cwpNameMap.get(CWP_NO);
							
							cwpId = (String) cwpInfo.get(DecConstants.SELECT_ID);
							uom = (String) cwpInfo.get(DecConstants.SELECT_ATTRIBUTE_DECKEYQUANTITYUOM);
							
							// Key Qty UOM이 있을 경우에만 처리
							if ( StringUtils.isNotEmpty(uom) )
							{
								// UOM에 따라 Qty를 가져올 컬럼 설정
								switch (uom.toUpperCase())
								{
									case "DI":case "LM":
										qtyColumnName = "TOT_BM_QTY";
										break;
									case "KG":case "TON":
										qtyColumnName = "TOT_WGT";
										break;
									case "PKG":
										qtyColumnName = "TOT_PACKAGE_QTY";
										break;
									default:
										qtyColumnName = "TOT_ITEM_QTY";
										break;
								}
								
								qty = String.valueOf( cwpKeyQtyMap.get(qtyColumnName) );
								
								doCWP.setId(cwpId);
								
								attrMap.clear();
								attrMap.put(DecConstants.ATTRIBUTE_DECKEYQUANTITYCOMPLETED, qty);
								
								doCWP.setAttributeValues(context, attrMap);
							}
							else
							{
								IF_MSG = "CWP has no uom.";
							}
							
							// IF 결과 List에 임시 보관
							cwpKeyQtyIFResultMap.put("IF_FLAG", "Y");
//							if ( IF_MSG != null )
//							{
								cwpKeyQtyIFResultMap.put("IF_MSG", IF_MSG);
//							}
							
						} catch (Exception e) {
							e.printStackTrace();
							cwpKeyQtyIFResultMap.put("IF_FLAG", "E");
							cwpKeyQtyIFResultMap.put("IF_MSG", e.getMessage());
						}
						
					}
					
					// IF 결과 프로젝트 단위로 commit
					for (Map temp : cwpKeyQtyIFResultList)
					{
						sqlSession.update("IF_Material.updateCWPKeyQtyIFResult", temp);
					}
					
					sqlSession.commit();
					ContextUtil.commitTransaction(context);
					
				} catch (Exception e) {
					sqlSession.rollback();
					ContextUtil.abortTransaction(context);
					e.printStackTrace();
				}
				
			}
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			resultMap.put("result", "Error");
			resultMap.put("msg", e.getMessage());
		}
		return resultMap;
	}
}
