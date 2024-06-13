<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:rp="http://www.dassault_systemes.com/fst/migration/report"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" encoding="UTF-8" />

	<xsl:param name="delimiter" select="','" />
	<xsl:param name="break" select="'&#xA;'" />


	<xsl:template match="/">

		<!-- output the header row -->
        <xsl:text>Product pid</xsl:text>
	    <xsl:value-of select="$delimiter" />
        <xsl:text>Product name</xsl:text>
        <xsl:value-of select="$delimiter" />
        <xsl:text>Bundle pid</xsl:text>
        <xsl:value-of select="$delimiter" />
        <xsl:text>Bundle name</xsl:text>
        <xsl:value-of select="$delimiter" />
        <xsl:text>FastenerInstance pid</xsl:text>

		<!-- output newline -->
	    <xsl:value-of select="$break" />
		<xsl:apply-templates select="//rp:FastenerInstance" />
	</xsl:template>

	<xsl:template match="rp:FastenerInstance">
       <xsl:variable name="bundleNode" select=".." />
       <xsl:variable name="productNode" select="../.." />
		<!-- output the data row -->
		<xsl:value-of select="$productNode/@pid" />
        <xsl:value-of select="$delimiter" />
        <xsl:value-of select="normalize-space($productNode/@name)" />
        <xsl:value-of select="$delimiter" />
        <xsl:value-of select="$bundleNode/@pid" />
        <xsl:value-of select="$delimiter" />
        <xsl:value-of select="normalize-space($bundleNode/@name)" />
        <xsl:value-of select="$delimiter" />
        <xsl:value-of select="@pid" />
		<!-- output newline -->
        <xsl:value-of select="$break" />
	</xsl:template>
</xsl:stylesheet>
