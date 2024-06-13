import java.io.StringReader;
import java.text.MessageFormat;
import java.util.*;

import javax.json.JsonArray;
import javax.json.JsonObject;

import matrix.db.Context;
import matrix.db.JPO;
import matrix.util.Pattern;
import matrix.util.StringList;

import com.matrixone.apps.domain.DomainConstants;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.VaultUtil;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.EnoviaResourceBundle;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkProperties;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PersonUtil;
import com.matrixone.apps.framework.ui.UIComponent;
import com.matrixone.apps.framework.ui.UIMenu;
import com.matrixone.apps.framework.ui.UINavigatorUtil;
import com.matrixone.apps.framework.ui.UISearch;
import com.matrixone.apps.framework.ui.UISearchUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.jdom.Document;
import com.matrixone.jdom.Element;
import com.matrixone.jdom.input.SAXBuilder;
import com.matrixone.search.index.config.DataModelConfig;
import com.matrixone.search.index.config.Field;
import com.matrixone.search.index.config.Config;
import com.matrixone.search.index.config.Config.ConfigType;
import com.matrixone.apps.domain.util.PropertyUtil;



public class decDeleteCodeDetail_mxJPO {


	private static final String DYNAMIC = "Dynamic";
	private static final String UTF8 = "UTF-8";
	private static final String NULL = "null";
	private static final String PIPE_SEPARATOR = "|";
	private static final String WORD_LAST = "last";

	//Full Text Search Constants
	private static final String PARAM_LIBRARIES = "LIBRARIES";
	private static final String PARAM_TYPES = "TYPES";
	private static final String EQUALS = "EQUALS";
	private static final String GREATER = "GREATER";
	private static final String LESS = "LESS";

	private static final String USER_NAME = "<User Name>";
	private static final String LAST_NAME = "<Last Name>";
	private static final String FIRST_NAME = "<First Name>";

	protected static final String PARAM_FREEZE_PANE = "freezePane";

	//Added for FullText Search Dynamic Filter Columns
	protected static final String PARAM_FILTER_COLUMN_POSITION = "filterColumnPosition";

	protected static final String CONTROL_HAS_FILTER_COLUMNS   = "hasFilterColumns";

	protected static final String BASIC_FILTER_COLUMNS         = "basicFilterColumns";

	protected static final String EXPRESSION_FILTER_COLUMNS    = "expressionFilterColumns";

	

	/**
	 * @param context
	 * @param objectId
	 * @return Map
	 * @throws Exception
	 */

	public String deleteObjects(Context context, String[] args) throws Exception
	{
		
		for (int i = 0; i < args.length; i++) {
			
			String objectId = args[i];
			DomainObject dom = new DomainObject(objectId);
			dom.deleteObject(context);
			
		}
		
		return "성공";
	}
}