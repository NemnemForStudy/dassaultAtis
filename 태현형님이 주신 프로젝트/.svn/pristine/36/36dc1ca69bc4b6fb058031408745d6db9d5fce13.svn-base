<%@ page import="java.util.*" %>
<%@ page import="com.matrixone.apps.domain.util.*" %>
<%@ page import="matrix.db.Context" %>
<%@include file = "../common/emxNavigatorInclude.inc"%>
<%@include file = "../common/emxNavigatorTopErrorInclude.inc"%>
<%@include file = "../emxTagLibInclude.inc"%>
<%@page import = "com.dassault_systemes.parameter_modeler.PlmParameterPrivateServices"%>
<%@page import = "com.dassault_systemes.parameter_ui.PlmParameterJPOServices"%>
<%@page import = "com.dassault_systemes.knowledge_itfs.IKweUnit"%>
<HTML>


<emxUtil:localize id="i18nId" bundle="emxParameterStringResource" locale='<%=request.getHeader("Accept-Language")%>' />
<%
	// get Preferred Magnitudes
	StringList dimensionList = PlmParameterPrivateServices.getDefaultMagnitudes(context);
	String dimensionListHidden = "";
	int i=0, dimsize = null != dimensionList && !dimensionList.isEmpty() ? dimensionList.size() : 0;
	if (dimsize > 0)
	{
		for(; i < dimsize-1; i++)
			dimensionListHidden += dimensionList.elementAt(i)+";";
		dimensionListHidden += dimensionList.elementAt(dimsize-1)+";";
	}
	
	// get Preferred Units
	TreeMap<String, IKweUnit>  displayUnitsMap = PlmParameterPrivateServices.getAllMagnitudesWithDisplayUnit(context);
%>
  <HEAD>
    <TITLE></TITLE>
    <META http-equiv="imagetoolbar" content="no">
    <META http-equiv="pragma" content="no-cache">
    <script src="../common/scripts/emxUICore.js" type="text/javascript"></script>
    <SCRIPT language="JavaScript" src="../common/scripts/emxUIConstants.js"
    type="text/javascript">
    </SCRIPT>
    <SCRIPT language="JavaScript" src="../common/scripts/emxUIModal.js"
          type="text/javascript">
    </SCRIPT>
    <SCRIPT language="JavaScript" src="../common/scripts/emxUIPopups.js"
          type="text/javascript">
    </SCRIPT>
	<script src="../common/scripts/jquery-latest.js"></script>
    <SCRIPT type="text/javascript">
      addStyleSheet("emxUIDefault");
      addStyleSheet("emxUIForm");
                                
      function doLoad() {
        if (document.forms[0].elements.length > 0) {
          var objElement = document.forms[0].elements[0];
                                                                
          if (objElement.focus) objElement.focus();
          if (objElement.select) objElement.select();
        }
      }
	  
	  function onAddMagnitude(){
		var dimensionNLS = $('#dimensionNLS').val();
		var dimension = $('#dimension').val();
		
		var dimAlreadyInList = ($('#dimensionList option[value='+ dimension +']').length > 0);
		
		if(dimension != "" && dimensionNLS != "" && !dimAlreadyInList){
			$('#dimensionList').append(new Option(dimensionNLS, dimension, true, true));
			$('#dimensionListHidden').val($('#dimensionListHidden').val()+dimension+';');
			$('#dimensionNLS').val('');
			$('#dimension').val('');
		}
	  }
	  
	  function onDeleteMagnitude(){
		var nbMag = $('#dimensionList option').length;
		if(nbMag > 1)
		{
			$('#dimensionList option:selected').remove();
		}
		$('#dimensionList').val($('#dimensionList option:first').val());
		$('#dimensionListHidden').val('');
		var val = '';
		$("#dimensionList>option").each(function() {
			val += $(this).val()+';';
		});
		$('#dimensionListHidden').val(val);
	  }
	  
    </SCRIPT>
  </HEAD>
 <%
 	
 %>
  <BODY onload="doLoad(), turnOffProgress()">
    <FORM method="post" action="emxParameterPrefDimensionProcessing.jsp">
    <%@include file = "../common/enoviaCSRFTokenInjection.inc"%>
      <TABLE border="0" cellpadding="5" cellspacing="2"
             width="100%">
        <TR>
          <TD width="150" class="label">
          	<%
          		String defaultMagLabel = EnoviaResourceBundle.getProperty(context, PlmParameterPrivateServices.stringResourceFile, context.getLocale(),"emxParameter.Preference.DefaultMagnitudes");
          	%>
          	<emxUtil:i18n localize="i18nId"><xss:encodeForHTMLAttribute><%=defaultMagLabel%></xss:encodeForHTMLAttribute></emxUtil:i18n>
          </TD>
          <td class="inputField">
            <table>
                <tr>
	                <td>
	                	<select id="dimensionList" name="dimensionList" size="5" style="width:14em"/>
						<%
							for(i = 0; i < dimsize; i++){
								String name = (String) dimensionList.elementAt(i);
								String nameNLS = PlmParameterJPOServices.getDimensionNLS(context, name);
						%>
							<option value="<xss:encodeForHTMLAttribute><%=name%></xss:encodeForHTMLAttribute>"><xss:encodeForHTMLAttribute><%=nameNLS%></xss:encodeForHTMLAttribute></option>
						<%
							}
						%>
	                	</select>
						<br>
	                </td>
                </tr>
				<tr>
                	<td>
                		<input type="text" size="10" id="dimensionNLS" name="dimensionNLS" disabled/>
						<input type="hidden" id="mode" name="mode" value="save"/>
						<input type="hidden" id="dimension" name="dimension"/>
						<input type="hidden" id="dimensionListHidden" name="dimensionListHidden" value="<xss:encodeForHTMLAttribute><%=dimensionListHidden%></xss:encodeForHTMLAttribute>"/>
						<input type="button"  value="..." style="padding-left:10px" onclick="javascript:showModalDialog('../common/emxTable.jsp?targetDir=parameter&amp;table=PARInterfaceName&amp;CancelButton=true&amp;headerRepeat=0&amp;pagination=0&amp;program=emxParameterCreation:getInterfacesList&amp;selection=single&amp;targetLocation=popup&amp;SubmitURL=../parameter/emxParameterSubmitNewParamTypePref.jsp', 850, 630, true)"/>
						<input type="button"  value="+" style="padding-left:10px" onclick="onAddMagnitude()"/>
						<input type="button"  value="-" style="padding-left:10px" onclick="onDeleteMagnitude()"/>
                	</td>
                </tr>
            </table>
          </td>
        </TR>
        <TR id="display_units">
          <TD width="150" class="label">
          	<%
          		String defaultUnitsLabel = EnoviaResourceBundle.getProperty(context, PlmParameterPrivateServices.stringResourceFile, context.getLocale(),"emxParameter.Preference.DefaultUnits");
          	%>
          	<emxUtil:i18n localize="i18nId"><xss:encodeForHTMLAttribute><%=defaultUnitsLabel%></xss:encodeForHTMLAttribute></emxUtil:i18n>
          </TD>
          <td class="inputField">
            <table>
            	<%
            		for (Map.Entry<String, IKweUnit> displayUnit : displayUnitsMap.entrySet())
					{
            			try {
							String itf = displayUnit.getKey();
							if (null != itf)
							{
		        		        String itfNLS = PlmParameterJPOServices.getDimensionNLS(context, itf);
		        		        if (null != itfNLS && !itfNLS.isEmpty())
		        		        {
			        		        IKweUnit unit = displayUnit.getValue();
			        		        if (null != unit)
			        		        {
				        		        String unitNLS = unit.getNLSName(context);
				        		        String unitSymbol = unit.getSymbol();
				        		        
				        		        out.write("\r\n           \t\t<tr>\r\n\t                <td>");
				        		        out.print(itfNLS);
				        		        out.write("</td>\r\n\t                <td>\r\n\t                \t<select id=\"");
				        		        out.print(itf);
				        		        out.write("\" name=\"");
				        		        out.print(itf);
				        		        out.write("\" size=\"1\" style=\"width:14em\"/>\r\n\t                \t\t<option value=\"");
				        		        out.print(unitSymbol);
				        		        out.write("\" selected=\"selected\">");
				        		        out.print(unitNLS);
				        		        out.write("</option>\r\n\t                \t</select>\r\n\t\t\t\t\t\t<br>\r\n\t\t\t\t\t\t<br>\r\n\t                </td>\r\n                </tr>\r\n           \t\t");
			        		        }
		        		        }
							}
            			} catch (Exception e) {e.printStackTrace();}
            		}
            	%>
            </table>
          </td>
        </TR>
      </TABLE>
    </FORM>
  </BODY>
  <script type="text/javascript">
  $("#display_units select").mouseover(function createSelect(event){
	  	var dropDown =  $(this);
	    
		var xmlhttp;
	    if (window.XMLHttpRequest) { 
			xmlhttp=new XMLHttpRequest();
	    } else if (window.ActiveXObject) {
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	    } else {
			alert("Your browser does not support XMLHTTP!");
	    }
	    
	    xmlhttp.onreadystatechange=function() {
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var prevUnit = $('#'+dropDown.attr('id')+' option:selected');
				
				var units;
				if (xmlhttp.responseXML != null)
					units = xmlhttp.responseXML.getElementsByTagName("unit");
				else
				{
					try {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
						units = xmlDoc.getElementsByTagName("unit");
					}
					catch(e){}
				}
			
				dropDown.empty();
				$.each(units, function(i, unit){
					$('<option>').val(unit.getAttribute('value')).text(unit.innerHTML).appendTo('#'+dropDown.attr('id'));
				});
				
				dropDown.val(prevUnit.attr('value'));
			}
		}

	    xmlhttp.open("GET", "../parameter/emxParameterPrefDimensionProcessing.jsp?mode=units&mag="+dropDown.attr('id'),true);
	    xmlhttp.send(null);
	    
	  	dropDown.unbind(event);
});
  </script>
  

<%@include file = "../common/emxNavigatorBottomErrorInclude.inc"%>

</HTML>

