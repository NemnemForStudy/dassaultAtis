# ___SearchInApp Event___
>Version 1

>Available from __*3DEXPERIENCER2021xFD06*__

## Context
---
Searching for an element that is loaded inside the app is very important in some customer scenario.

This scenario is achievabled today thanks to the "Search in Dashboard".

The goal of the new ___DS/PlatformAPI/PlatformAPI___ topic ______searchInApp______ that has been introduced in ___3DExperience R2019xFD03___ is to enable another app to trigger by code the same capability.

ENOPAD infrastructure put in place a Publish/Subscribe mecanism. It is used in a wide variety of apps/commands.
* Apps that subscribe to ___searchInApp___:
  - Product Structure Editor,
  - 3D Compose, 3D Annotation...
  - Product Explorer,
  - 3D Navigate,
  - ...

<div style="page-break-before: always;"> </div>

## Selection event format
---

_Topic name:_**DS/ENO/searchInApp**

_Data format:_ This is a JSON object with the following Properties


|Name|Type|Description|
|----|----|----------|
|metadata|object| Metadata objects that is used to know where the event comes from. See precise description below.|
|data|object| Query string that will be searched inside the Apps|

##### *metadata* JSON object description:

|Name|Type|Description|
|----|----|----------|
|uid|String|Uid for the event - it is a random string|
|originUid|String| Uid of the Publisher. Used for clean up of the subscription queue. It also avoid the loop (to dismiss event that we receive ig the same code published it).|
|timestamp|String| timestamp on when the event has been sent|
|appid|String| Id of the Application from where the event has been published. It is retrieved thanks to *widget.getValue('x3dSharedId')* or *widget.getValue('x3dAppId')* depending if the app is a multi-widget app or not.|
|originWidgetId|String| Widget Id of the Application from where the event has been published. It is retrieved thanks to *widget<span></span>.id* |

<div style="page-break-before: always;"> </div>

##### *data* JSON object description:

|Name|Type|Description|
|----|----|----------|
|query|String| Value of the query String (same that can be entered inside the Search field inside the 3DDashboard topbar|

<div style="page-break-before: always;"> </div>

### Here is a sample:
```json
{
	"metadata": {
		"uid": "d89c",
		"originUid": "d87c",
		"timestamp": 1548833667591,
		"appid": "/cc4243",
		"originWidgetId": "90-lHIeAKJGeGJHYtm1c"
	},
	"data": {
		"query":"test"
	}
}


```

## Sample
This sample is based on the official sample for publish subscribe: [Dashboard Apps JavaScript | Widget Interactions | Between Widgets | Using Publish/Subscribe Protocol](http://dsdoc/devdoccaa/3DEXPERIENCER2019x/en/English/CAAWebAppsJSBetweenWdg/CAAWebAppsUcPubSub.htm).

* Modification to do in CAAWebAppsPublisherFile.html to publish a select event:
You simply have to change the topic name from **'CAA.CAAWebAppsPublisher'** to **'DS/ENO/searchInApp'** and put the data in the previously describe format.

