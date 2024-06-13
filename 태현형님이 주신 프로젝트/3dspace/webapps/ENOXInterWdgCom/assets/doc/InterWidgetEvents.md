# ___Inter widget communication ENOPAD Events documentation___
>Version 1
## Context
---
This documentation will list all the supported ENOPAD events based on PlatformAPI.

## Infrastructure used
---
This publish/subscribe mecanism is based on the Platform API  ___DS/PlatformAPI/PlatformAPI___. Its documentation can be found in the official CAA documentation under [Dashboard Apps JavaScript | Widget Interactions | Between Widgets | Publish and Subscribe Protocol](http://dsdoc/devdoccaa/3DEXPERIENCER2019x/en/English/CAAWebAppsJSBetweenWdg/CAAWebAppsTaWidgetComm.htm).

Also a usage sample can also be found under [Dashboard Apps JavaScript | Widget Interactions | Between Widgets | Using Publish/Subscribe Protocol](http://dsdoc/devdoccaa/3DEXPERIENCER2019x/en/English/CAAWebAppsJSBetweenWdg/CAAWebAppsUcPubSub.htm).

An event is defined by a topic and data.

The interwidget communication require __NO__ dependencies on ENOPAD AMD modules.

<div style="page-break-before: always;"> </div>

## List of supported events
---

|Event name|Type|Description|
|----|----|----------|
|[select](./select.md)|_public_|Cross highlight between apps inside the __*3DDashboard*__.|
|[focus](./focus.md)|_public_|Searching for an element that is loaded inside the app.|
|[searchInApp](./searchInApp.md)|_public_|Searching for an element that is loaded inside the app (at least the root object). It will search the string inside the query properties on server side.|


