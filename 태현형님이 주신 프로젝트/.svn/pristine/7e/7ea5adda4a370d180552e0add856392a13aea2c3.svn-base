/*   emxInterfaceLineage.
 **
 **   Copyright (c) 2002-2020 Dassault Systemes.
 **   All Rights Reserved.
 **
 ** Changed for: IR-241663-3DEXPERIENCER2017x
 **
 ** Changed for: IR-764407-3DEXPERIENCER2021x: to consider multiple parents
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.search.index.Indexer;
import com.matrixone.search.index.config.Config;

import matrix.db.*;
import matrix.util.*;

/**
 * The <code>emxInterfaceLineage</code> class contains implementation code for emxInterfaceLineage.
 *
 * @version AEF 2013
 */

public class emxInterfaceLineage_mxJPO {
  // a cache of interface->lineage map.
  // Note this does not support dynamic addition or modification of types, unlike the kernel..

  private static Map<String,Map<String,String>> lineages = new HashMap<String,Map<String,String>>();

  public emxInterfaceLineage_mxJPO(Context ctx, String[] args)
  { }

  static private Map<String, String> buildInterfaceHierarchy(Context context) throws Exception {
      Map<String, String> interfaces = new HashMap<String, String>();
      Map<String, Set<String>> firstPass = new HashMap<String, Set<String>>();

      String result = MqlUtil.mqlCommand(context, "list interface select $1 derived dump $2","name","|");      

      BufferedReader in = new BufferedReader(new StringReader(result));
      StringTokenizer tokenizer;
      boolean hasMoreParents;
      String interfaceName;
      String line;

      try {
          while ((line = in.readLine()) != null) {
              hasMoreParents = false;
              tokenizer = new StringTokenizer(line, "|");
              if (tokenizer.countTokens() > 1) {
                  hasMoreParents = true;
              }

              interfaceName = tokenizer.nextToken().trim();
			  Set<String> parents = new HashSet<String>();
			  while (hasMoreParents) {
				parents.add(tokenizer.nextToken().trim());
				if(!tokenizer.hasMoreTokens())
					hasMoreParents = false;
			  }
				
              firstPass.put(interfaceName, parents);
          }
      } catch (IOException ex) {
          throw new MatrixException(ex.getMessage());
      }

      String interfaceLineage;
      Iterator<String> itr = firstPass.keySet().iterator();
      while (itr.hasNext()) {
          interfaceLineage = null;
          interfaceName = itr.next();
          interfaceLineage = interfaceName;
          Set<String> hierarchies = new HashSet<String>();
          Set<String> parents = firstPass.get(interfaceName);
          //Set<String> hierarchies = getParentHierarchies(parents, firstPass));
          Iterator<String> parentsItr = parents.iterator();
          while (parentsItr.hasNext()) {
        	  String parentName = parentsItr.next();
              getParentHierarchies(hierarchies, parentName, interfaceLineage, firstPass);
          }
          StringBuilder buf = new StringBuilder();
          for (String hierarchy : hierarchies) {
        	  if (buf.length() > 0)
        	  	buf.append(Indexer.cTaxonomyDelimiter);
        	  buf.append(hierarchy);
          }
          //interfaces.put(interfaceName, buf.toString());
          interfaces.put(interfaceName, (buf.length()==0)?interfaceName:buf.toString());
      }
	return interfaces;
  }
  
  private static Set <String> getParentHierarchies(Set<String> hierarchies, String parent, String hieararchy, Map<String, Set<String>> allInterfaceHierarchies)
  {
	  String interfaceLineage = parent + SelectConstants.cSelectDelimiter + hieararchy;
      Set <String> parents = allInterfaceHierarchies.get(parent);
      if (parents.isEmpty()) {
    	  hierarchies.add(interfaceLineage);
    	  return hierarchies;
      }
      Iterator<String> parentsItr = parents.iterator();
      while (parentsItr.hasNext()) {
    	  String parentName = parentsItr.next();
          getParentHierarchies(hierarchies, parentName, interfaceLineage, allInterfaceHierarchies);
      }
      return hierarchies;
  }

  public String getLineage(Context ctx, String [] args) throws MatrixException{
		if(args!=null && args.length<2 && UIUtil.isNullOrEmpty(args[0])){
			return "";
		}
	  Map<String,String> lineage = null;
	  String tenant = Config.getTenant(ctx);
	  
      synchronized (emxInterfaceLineage_mxJPO.class) {
    	  lineage = lineages.get(tenant);
    	  if (lineage == null){
			    lineages.put(tenant, null);			    
    	  }
      }

          if (lineage == null) {
              try {
                  lineage = buildInterfaceHierarchy(ctx);
              lineages.put(tenant, lineage);
              } catch (Exception e) {
                  System.out.println("Exception building Interface hierarchy: " + e.toString());
              }
          }

      String [] interfaces = args[0].split(SelectConstants.cSelectDelimiter);
      String ret = "";
      for(String interfaceName : interfaces ) {
			String val = null;
			if(lineage.containsKey(interfaceName)){
				val = lineage.get(interfaceName);
			}else{
        	  val = getNewInterfaceHierarchy(ctx, interfaceName);
        	  lineage.put(interfaceName, val);
          }          
          
          if (ret.length() > 0)
              ret += Indexer.cTaxonomyDelimiter;
          ret += (val == null) ? "" : val.toString();
      }
      return ((ret == null) ? "" : ret.toString());
  }
  
  // this method is to get the newly added interface hierarchy, this newly added interface has to be updated into map. 
  private String getNewInterfaceHierarchy(Context ctx, String interfaceName) throws FrameworkException{	 
	  
	  String interfaceParent = MqlUtil.mqlCommand(ctx, "list interface $1 select $2 dump $3",interfaceName,"derived", "|");
	  boolean hasMoreParents = false;
	  
	  StringTokenizer tokenizer = new StringTokenizer(interfaceParent, "|");
      if (tokenizer.countTokens() > 1) {
          hasMoreParents = true;
      }

      Set<String> parents = new HashSet<String>();
	  while (hasMoreParents) {
		parents.add(tokenizer.nextToken().trim());
		if(!tokenizer.hasMoreTokens())
			hasMoreParents = false;
	  }

	  Iterator<String> parentsItr = parents.iterator();
      while (parentsItr.hasNext()) {
    	  String parentName = parentsItr.next();
    	  Set<String> hierarchies = new HashSet<String>();
          hierarchies.add(getNewInterfaceHierarchy(ctx, parentName));
          StringBuilder buf = new StringBuilder();
          for (String hierarchy : hierarchies) {
        	  if (buf.length() > 0)
        	  	buf.append(Indexer.cTaxonomyDelimiter);
        	  buf.append(hierarchy);
          }
      }
	  if(UIUtil.isNullOrEmpty(interfaceParent)){
		   return interfaceName;
	  } else{
		   return getNewInterfaceHierarchy(ctx, interfaceParent) + SelectConstants.cSelectDelimiter + interfaceName ;
	  }
  }
}

