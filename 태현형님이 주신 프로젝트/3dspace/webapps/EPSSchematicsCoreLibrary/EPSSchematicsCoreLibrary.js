/*
  Empty place-holder file used to prevent any 404 HTTP error when
  referencing concatenated JS file in debug (-g) mode.

  When using mkmk without debug an EPSSchematicsCoreLibrary.js file is created
  containing the concatenation of all files in EPSSchematicsCoreLibrary.mweb;
  this file is returned by mkrun webserver on request of any of the URL
  EPSSchematicsCoreLibrary/xxx.js where xxx is the name of one of the original file in
  EPSSchematicsCoreLibrary.mweb/src. To speedup the page loading by preventing useless
  GET requests of EPSSchematicsCoreLibrary/xxx.js files that would return the same
  concatenated content the recommendation is to include in the page
  EPSSchematicsCoreLibrary/EPSSchematicsCoreLibrary.js with an explicit script element. But since the
  concatenated file is not created by "mkmk -g" that would trigger a
  404 error. To prevent this error this empty file is available and
  will be returned in debug mode.
*/
