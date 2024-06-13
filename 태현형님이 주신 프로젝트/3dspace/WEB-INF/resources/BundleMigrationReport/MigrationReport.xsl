<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	        xmlns:rp="http://www.dassault_systemes.com/fst/migration/report"
	        xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="no" />

  <xsl:template match="/">
    <xsl:variable name="date" select="substring-before(/rp:BundleMigrationReport/@startTime, 'T')" />
    <xsl:variable name="time" select="substring-after(/rp:BundleMigrationReport/@startTime, 'T')" />
    <xsl:variable name="start">
      <xsl:call-template name="dateTime-to-seconds" >
        <xsl:with-param name="dateTime" select="/rp:BundleMigrationReport/@startTime"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="end">
      <xsl:call-template name="dateTime-to-seconds" >
        <xsl:with-param name="dateTime" select="/rp:BundleMigrationReport/@endTime"/>
      </xsl:call-template>
    </xsl:variable>
  
    <html>
      <head>
	    <meta charset="UTF-8" />
	    <title>Bundle Migration Report</title>
	    <link rel="stylesheet" href="MigrationReport.css" />
	    <script type="text/javascript">
	      function enable_visibility(id) {
	        var chkbox = document.getElementById(id);
	        chkbox.checked=true;
	        return true;
	      }
	    </script>
      </head>
      <body>
	<h1>Bundle Migration Report: <xsl:value-of select="concat($date,' ', substring($time,1,8),' UTC')" />
	</h1>
	<div>
	  <input type="checkbox" id="summary" />
	  <h2>
	    <label for="summary">Summary:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
          <th>Duration</th>
		  <th>Nb Products modified</th>
		  <th>Nb Bundles created</th>
		  <th>Nb Fasteners moved</th>
          <th>Nb Objects routed</th>
          <th>Nb MCX deleted</th>
          <th>Nb Errors</th>
		</tr>
	      </thead>
	      <tbody>
		<tr>          
		  <td>
		    <xsl:value-of select="$end - $start" /> sec
		  </td>	
		  <td>
		    <xsl:value-of select="count(//rp:Product)" />
		  </td>
		  <td>
		    <xsl:value-of select="count(//rp:Bundle)" />
		  </td>
		  <td>
		    <xsl:value-of select="count(//rp:FastenerInstance)" />
		  </td>
          <td>
		    <xsl:value-of select="count(//rp:Routed)" />
		  </td>
		  <td>
		    <xsl:value-of select="/rp:BundleMigrationReport/MigrationResults/@nbMCX" />
		  </td>
		  <td>
		    <xsl:value-of select="count(//rp:NotMigrated)" />
		  </td>
		</tr>
	      </tbody>
	    </table>
	  </div>
	</div>
	<div>
	  <input type="checkbox" id="products" />
	  <h2>
	    <label for="products">Products:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
		  <th>product pid</th>
		  <th>product name</th>
		  <th>bundles</th>
		</tr>
	      </thead>
	      <tbody>
		<xsl:apply-templates mode="product" />
	      </tbody>
	    </table>
	  </div>
	</div>
	<div>
	  <input type="checkbox" id="bundles" />
	  <h2>
	    <label for="bundles">Bundles:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
		  <th>bundle pid</th>
		  <th>bundle name</th>
		  <th>parent product</th>
		  <th>fasteners</th>
		</tr>
	      </thead>
	      <tbody>
		<xsl:apply-templates mode="bundle" />
	      </tbody>
	    </table>
	  </div>
	</div>
	<div>
	  <input type="checkbox" id="fasteners" />
	  <h2>
	    <label for="fasteners">Fasteners:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
		  <th>fastener pid</th>
		  <th>parent bundle</th>
		</tr>
	      </thead>
	      <tbody>
		<xsl:apply-templates mode="fastener" />
	      </tbody>
	    </table>
	  </div>
	</div>
    <div>
	  <input type="checkbox" id="routed" />
	  <h2>
	    <label for="routed">Re-Routed:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
		  <th>pid</th>
		  <th>type</th>
		  <th>name</th>
		</tr>
	      </thead>
	      <tbody>
		<xsl:apply-templates mode="routed" />
	      </tbody>
	    </table>
	  </div>
	</div>
	<div>
	  <input type="checkbox" id="errors" />
	  <h2>
	    <label for="errors">Errors:</label>
	  </h2>
	  <div class="report">
	    <table class="rtable">
	      <thead>
		<tr>
		  <th>pid</th>
		  <th>type</th>
		</tr>
	      </thead>
	      <tbody>
		<xsl:apply-templates mode="errors" />
	      </tbody>
	    </table>
	  </div>
	</div>
    </body>
    </html>
  </xsl:template>

  <xsl:template
      match="/rp:BundleMigrationReport/rp:MigrationResults" mode="product">
    <xsl:for-each select="rp:Product">
      <tr>
	<td>
	  <xsl:attribute name="id"><xsl:value-of
	  select="@pid" />
	  </xsl:attribute>
	  <xsl:value-of select="@pid" />
	</td>
	<td>
	  <xsl:value-of select="@name" />
	</td>
	<td>
	  <ul>
	    <xsl:for-each select="rp:Bundle">
	      <li>
		<xsl:element name="a">
		  <xsl:attribute name="href">#<xsl:value-of select="@pid" />
		  </xsl:attribute>
		  <xsl:attribute name="onclick">enable_visibility('bundles');
                  </xsl:attribute>
		  <xsl:value-of select="@name" />
		</xsl:element>
	      </li>
	    </xsl:for-each>
	  </ul>
	</td>
      </tr>
    </xsl:for-each>
  </xsl:template>

  <xsl:template
      match="/rp:BundleMigrationReport/rp:MigrationResults" mode="bundle">
    <xsl:for-each select="rp:Product/rp:Bundle">
      <tr>
	<td>
	  <xsl:attribute name="id"><xsl:value-of
	  select="@pid" />
	  </xsl:attribute>
	  <xsl:value-of select="@pid" />
	</td>
	<td>
	  <xsl:value-of select="@name" />
	</td>
	<td>
	  <xsl:element name="a">
	    <xsl:attribute name="href">#<xsl:value-of
	    select="../@pid" />
	    </xsl:attribute>
	    <xsl:attribute name="onclick">enable_visibility('products');
            </xsl:attribute>
	    <xsl:value-of select="../@name" />
	  </xsl:element>
	</td>
	<td>
	  <ul>
	    <xsl:for-each select="rp:FastenerInstance">
	      <li>
		<xsl:element name="a">
		  <xsl:attribute name="href">#<xsl:value-of
		  select="@pid" />
                  </xsl:attribute>
                  <xsl:attribute name="onclick">enable_visibility('fasteners');
                  </xsl:attribute>
		  <xsl:value-of select="@pid" />
		</xsl:element>
	      </li>
	    </xsl:for-each>
	  </ul>
	</td>
      </tr>
    </xsl:for-each>
  </xsl:template>

  <xsl:template
      match="/rp:BundleMigrationReport/rp:MigrationResults" mode="fastener">
    <xsl:for-each
	select="rp:Product/rp:Bundle/rp:FastenerInstance">
      <tr>
	<td>
	  <xsl:attribute name="id"><xsl:value-of
	  select="@pid" />
	  </xsl:attribute>
	  <xsl:value-of select="@pid" />
	</td>
	<td>
	  <xsl:element name="a">
	    <xsl:attribute name="href">#<xsl:value-of
	    select="../@pid" />
            </xsl:attribute>
            <xsl:attribute name="onclick">enable_visibility('bundles');
            </xsl:attribute>
	    <xsl:value-of select="../@name" />
	  </xsl:element>
	</td>
      </tr>
    </xsl:for-each>
  </xsl:template>

   <xsl:template
      match="/rp:BundleMigrationReport/rp:MigrationResults" mode="routed">
     <xsl:for-each select="rp:Routed">
      <tr>
	<td>
	  <xsl:attribute name="id"><xsl:value-of
	  select="@pid" />
	  </xsl:attribute>
	  <xsl:value-of select="@pid" />
	</td>
	<td>
	  <xsl:value-of select="@type" />
	</td>
	<td>
	  <xsl:value-of select="@name" />
	</td>
      </tr>
    </xsl:for-each>
  </xsl:template>
  
  <xsl:template
      match="/rp:BundleMigrationReport/rp:MigrationErrors" mode="errors">
     <xsl:for-each select="rp:NotMigrated">
      <tr>
	<td>
	  <xsl:attribute name="id"><xsl:value-of
	  select="@pid" />
	  </xsl:attribute>
	  <xsl:value-of select="@pid" />
	</td>
	<td>
	  <xsl:value-of select="@type" />
	</td>
      </tr>
    </xsl:for-each>
  </xsl:template>
  <xsl:template name="dateTime-to-seconds">
    <xsl:param name="dateTime"/>

    <xsl:variable name="date" select="substring-before($dateTime, 'T')" />
    <xsl:variable name="time" select="substring-after($dateTime, 'T')" />

    <xsl:variable name="year" select="substring($date, 1, 4)" />
    <xsl:variable name="month" select="substring($date, 6, 2)" />
    <xsl:variable name="day" select="substring($date, 9, 2)" />

    <xsl:variable name="hour" select="substring($time, 1, 2)" />
    <xsl:variable name="minute" select="substring($time, 4, 2)" />
    <xsl:variable name="second" select="substring($time, 7, 2)" />

    <xsl:variable name="a" select="floor((14 - $month) div 12)"/>
    <xsl:variable name="y" select="$year + 4800 - $a"/>
    <xsl:variable name="m" select="$month + 12*$a - 3"/>    
    <xsl:variable name="d" select="$day + floor((153*$m + 2) div 5) + 365*$y + floor($y div 4) - floor($y div 100) + floor($y div 400) - 32045" />

    <xsl:value-of select="86400*$d + 3600*$hour + 60*$minute + $second" />
</xsl:template> 
  
</xsl:stylesheet>
