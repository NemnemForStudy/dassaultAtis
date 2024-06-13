<?xml version="1.0" encoding="UTF-8" ?>
<!--  PPN's proposal of OfficeDoc, conceptually for 22x...FD01 , but only used in 23XFD02 (pure service solution , only in OC-->
<derivedformatmanagement xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="DerivedFormatDeclarative.xsd">
	<converter name="ODC" synchronous="false"   nlsFile="??" comment="not used in 22xFD01, the conversion service is hard coding behaviour for OC (and not impl for OP)">
		<datasources>
			<datasource name="MicrosoftOffice">
				<!-- For Preview format, all parameters are hardcoded , whatever the input format
				FINALLY all visu case should not even be seen here ... concept of hardcoded and hidden rules, out of customer control
				  Note the ODC converter doesn't support the same PDF versions than SPACO 
				-->
				
				<!-- MS Word documents -->
				<source name="doc,docx,docm" type="Document" subtype="WordProcessed"> 
					<!-- Below a prototype for PDF for Export, to 'see' -->
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_7|PDF_2_0|PDF_A_1a|PDF_A_1b|PDF_A_2a|PDF_A_2u" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="dot,dotx,dotm" type="Document" subtype="WordProcessed"> 
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_7|PDF_2_0|PDF_A_1a|PDF_A_1b|PDF_A_2a|PDF_A_2u" type="enum" default="PDF_1_7" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="rtf" type="Document" subtype="WordProcessed"> 
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_7|PDF_2_0|PDF_A_1a|PDF_A_1b|PDF_A_2a|PDF_A_2u" type="enum" default="PDF_1_7" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				
				<!-- MS PowerPoint documents -->
				<source name="ppt,pptx,pptm" type="Document" subtype="Presentation">
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="pps,ppsx,ppsm" type="Document" subtype="Presentation">
                    <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="pot,potx,potm" type="Document" subtype="Presentation">
                    <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				
				<!-- MS Excel documents -->
				<source name="xls,xlsx,xlsm" type="Document" subtype="Spreadsheet"> 
	                <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_A_1a|PDF_A_1b" type="enum" default="PDF_A_1b" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="xlsb" type="Document" subtype="Spreadsheet"> 
			        <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_A_1a|PDF_A_1b" type="enum" default="PDF_A_1b" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="xlt,xltx,xltm" type="Document" subtype="Spreadsheet"> 
	               <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">>
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_A_1a|PDF_A_1b" type="enum" default="PDF_A_1b" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				
				<!-- MS Outlook mail,a ssociated to word files -->
				<source name="msg" type="Document" subtype="email"> 
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">>
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_7|PDF_2_0|PDF_A_1a|PDF_A_1b|PDF_A_2a|PDF_A_2u" type="enum" default="PDF_1_7" description="PDF version to use" mandatory="true"/>
					</target>
				</source>

				<!-- CSV file, associated to Excel files -->
				<source name="csv" type="Document" subtype="CSV"> 
	               <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">>
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_A_1a|PDF_A_1b" type="enum" default="PDF_A_1b" description="PDF version to use" mandatory="true"/>
					</target>
				</source>

				<events>
					<event name="checkin" type="Trigger" />
					<event name="promote" type="Trigger" maturityGraph="lifecycle" />
					<event name="ondemand" />
				</events>
			</datasource>

			
            <!-- image = alternate approach, more compact, to manage all images in only 2 families, no choice for customer -->
            <datasource name="Image">
				<source name="png,bmp,gif,ico,jpeg,jpg,tiff,tga" type="Document" subtype="raster"> 
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">>
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
 				<source name="svg" type="Document" subtype="vectorial"> 
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">>
						<!-- the below mand param allows to compute the 'unified format (refinement from 'PDF')  -->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="checkin" type="Trigger" />
					<event name="promote" type="Trigger" maturityGraph="lifecycle" />
					<event name="ondemand" />
				</events>
			</datasource>
            
            
			<!-- LibreOffice/openOffice not yet supported, but declaration may be envisionned...
			<datasource name="LibreOffice">
				<source name="odt" type="Document" subtype="WordProcessed"
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!- the below mand param allows to compute the 'unified format (refinement from 'PDF')  ->
						<parameter name="PDFSaveMode"         values="PDF_1_7|PDF_2_0|PDF_A_1a|PDF_A_1b|PDF_A_2a|PDF_A_2u" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="ods" type="Document" subtype="Spreadsheet">
			        <target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!- the below mand param allows to compute the 'unified format (refinement from 'PDF')  ->
						<parameter name="PDFSaveMode"         values="PDF_A_1a|PDF_A_1b" type="enum" default="PDF_A_1b" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<source name="odp" type="Document" subtype="Presentation">
					<target name="PDF" inputStreamId="authoring"  outputStreamId="*" conversionService="true" cloudOnly="true">
						<!- the below mand param allows to compute the 'unified format (refinement from 'PDF')  ->
						<parameter name="PDFSaveMode"         values="PDF_1_5|PDF_A_1a|PDF_A_1b" type="enum" default="PDF_1_5" description="PDF version to use" mandatory="true"/>
					</target>
				</source>
				<events>
					<event name="checkin"
							type="Trigger" />
					<event name="promote"
     						type="Trigger"
							maturityGraph="lifecycle" />
					<event name="ondemand" />
				</events>
			</datasource>
			-->
		</datasources>
	</converter>
</derivedformatmanagement>
