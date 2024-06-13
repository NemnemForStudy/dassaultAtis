/*!
Script: DSSocialGlobeUWA.js

This file is part of UWA JS Runtime.

About: License

Copyright 2006-2013 Dassault Systèmes company.
All rights reserved.
*/
define("DS/SocialGlobeAPI/Marker",["UWA/Controls/Abstract"],function(t){"use strict";return t.extend({init:function(t,i,e,n,a,l){this.lat=t,this.lon=i,this.title=e,this.description=n,this.color=a,this._map=l.map,this.type="marker",this.uuid=null,this._leafletmarker=this._map.addMarkerFromAPI(this)},delete:function(){this._map.removeMarkerFromAPI(this.title)}})}),
/*!
Script: DSSocialGlobeUWA.js

This file is part of UWA JS Runtime.

About: License

Copyright 2006-2013 Dassault Systèmes company.
All rights reserved.
*/
define("DS/SocialGlobeAPI/Link",["UWA/Controls/Abstract"],function(t){"use strict";return t.extend({init:function(t,i){this.markers=t,this._map=i.map,this._leafletmarkers=t.map(function(t){return t._leafletmarker}),this.type="link",this.uuid=null,this._leafletlink=this._map.addLink(this)},setIcon:function(t){this._map.setLinkIcon(this,t)},edit:function(t,i){this._map.editLink(this,t,i)},select:function(){this._map.selectLink(this)},unselect:function(){this._map.unselectLink(this)},delete:function(){this._map.deleteLink(this)}})}),
/*!
Script: DSSocialGlobeUWA.js

This file is part of UWA JS Runtime.

About: License

Copyright 2006-2013 Dassault Systèmes company.
All rights reserved.
*/
define("DS/SocialGlobeAPI/GlobeAPI",["UWA/Controls/Abstract","DS/SocialGlobe/GlobeItf","DS/SocialGlobeAPI/Marker","DS/SocialGlobeAPI/Link"],function(t,i,e,n){"use strict";return t.extend({init:function(t,e,n,a,l){this._globe=i.create(document.getElementById(t),!0,!0),this._map=this._globe.globe,this._map.initialTileMapValue=e+"{z}/{x}/{y}."+n,this._map.initialMaxLevel=a,this._map.initialZoomLevel=l.initialZoomLevel?l.initialZoomLevel:5,this._map.initialGeoloc=l.initialCoordinates?l.initialCoordinates.join(","):void 0,this._map.start()},addGeoJson:function(t){this._map.clearGeoJSONData(),this._map.loadGeoJSON(t)},moveCamera:function(t,i,e){var n=this._map.map.getZoom();e&&(n=e.zoomLevel?e.zoomLevel:n),this._map.flyToLatLon(t,i,n)},addMarker:function(t,i,n,a,l){var o=void 0;return l&&(o=l.color?l.color:o),new e(t,i,n,a,o,{map:this._map})},reset:function(){this._map.clearGeoJSONData()},select:function(t){if(t.length&&t.length>0){var i=t[0];"marker"==i.type?this._map.selectMarkerFromAPI(i.title):this._map.selectLink(i)}},unselect:function(t){this._map.unselectAll(),t.length&&t.length},setOnSelectCallback:function(t){this._map._onSelectCallback=t},setOnClickCallback:function(t){this._map._onClickCallback=t},addLink:function(t){return new n(t,{map:this._map})}})});