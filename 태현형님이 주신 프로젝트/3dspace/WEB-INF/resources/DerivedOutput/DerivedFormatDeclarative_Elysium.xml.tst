<?xml version="1.0" encoding="UTF-8" ?>

<!-- 
	This operation is executed post installation of 3DEXPERIENCE On Premise Server (strictly by Lattice Administrator).
	Place the XML in the below location and restart the 3DSpace server : 
		${MATRIXINSTALL}/STAGING/ematrix/WEB-INF/resources/DerivedOutput/
	This Functionality will be available on R2021x FD06.
-->

<derivedformatmanagement xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="DerivedFormatDeclarative.xsd">
	<converter name="Elysium" synchronous="false" nlsFile="emxDerivedFormatManagementElysiumStringResource">
		<datasources>
			<datasource name="3DEXPERIENCE">
				<source name="CATPart" type="Part">
					<target name="XVL" inputStreamId="authoring" outputStreamId="XVL" />

					<target name="NX" inputStreamId="authoring" outputStreamId="NX" >
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
					
					<target name="Creo" inputStreamId="authoring" outputStreamId="CREO" >					
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
					
					<!-- CATPart to ICD-->
					<target name="iCAD" inputStreamId="authoring" outputStreamId="ICAD" >					
						<parameter name="Extension" values="icd" type="enum" default="icd" description="" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="checkin"	type="Trigger" />
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
				</events>
			</datasource>
			
			<datasource name="CATIAV5">
				<source name="CATPart" type="Part">					
					<target name="XVL" inputStreamId="authoring" outputStreamId="XVL" />
					
					<target name="NX" inputStreamId="authoring" outputStreamId="NX" >
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
					
					<target name="Creo" inputStreamId="authoring" outputStreamId="CREO" >					
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
					
					<!-- CATPart to ICD-->
					<target name="iCAD" inputStreamId="authoring" outputStreamId="ICAD" >					
						<parameter name="Extension" values="icd" type="enum" default="icd" description="" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<!-- planned in 23xFD01 - confirmed by SGD7 -->
					<event name="onXCADSave" />
				</events>
			</datasource>
			
            
            
			<!-- =============================== NX (from 22xFD06) =========================================================================================  -->
			<datasource name="NX">
				<source name="NX" type="Part">
					<target name="ExactGeometry" inputStreamId="authoring" outputStreamId="linkable"  downloadable="false" >
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave"  />
				</events>
			</datasource>		



			<!-- =============================== Creo (from 22xFD06) =========================================================================================  -->
			<datasource name="CREO">
				<source name="Creo" type="Part">					
					<target name="ExactGeometry" inputStreamId="authoring" outputStreamId="linkable"  downloadable="false" >
						<parameter name="Extension" values="prt" type="enum" default="prt" description="" mandatory="true"/>
					</target>
				</source>
                
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave" />
				</events>
			</datasource>		
            
            
            
			<!-- Kobe Steel Project, 22xFD06  : icd '3D'  to CGR ; and icd 'Drawing' to UDL/PDF-->
			<datasource name="ICAD">          
				<source name="iCAD" type="Part">					
					<target name="CGR" inputStreamId="authoring" outputStreamId="linkable" >
						<parameter name="Extension" values="icd" type="enum" default="icd" description="" mandatory="true"/>
					</target>
				</source>
                				
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave" />
				</events>
			</datasource>		
			
		</datasources>
	</converter>
    
    <!-- specifically for iCAD , I declare soem Std DFC possibilities for drawing-->
	<converter name="3DEXPERIENCE" synchronous="false" nlsFile="emxDerivedFormatManagementStringResource" comment="all the conversion managed asynchronously by DS, By DerivedFormatConverter (OnTheEdge DO converter) or Conversion Service" >
		<datasources>
			<!-- Kobe Steel Project, 22xFD06  : icd '3D'  to CGR ; and icd 'Drawing' to UDL/PDF-->
			<datasource name="ICAD">          
				<source name="icd" type="Drawing">					
					<target name="UDL"  inputStreamId="DWG" outputStreamId="authoringvisu" >					
					</target>
					<target name="PDF"  inputStreamId="authoringvisu" outputStreamId="*" downloadable="true" > <!-- this one is a 2nd step conversion -->
						<parameter name="PDFSaveMode"          values="PDF_1_3|PDF_A_1b|PDF_1_6" type="enum" default="PDF_1_3" description="PDF version to use" mandatory="true"/>
				    </target>
                </source>
				
				<events>
					<event name="promote"	type="Trigger"	maturityGraph="lifecycle" />
					<event name="ondemand" />
					<event name="onXCADSave" />
				</events>
			</datasource>		

		</datasources>
	</converter>
     
</derivedformatmanagement>
