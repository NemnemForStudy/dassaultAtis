# ___Select Event___
>Version 1

>Available from __*3DEXPERIENCER2021xFD06*__
## Context
---
Cross highlight between apps is very important to be able to improve the efficiency and to get the most of the __*3DEXPERIENCE Platform*__.

To be able to activate the selection from another app than ours, ENOPAD infrastructure put in place a Publish/Subscribe mecanism. It is used in a wide variety of apps/commands.
* Publish and Listen selection:
  - Product Structure Editor,
  - 3D Compose, 3D Annotation...
  - Product Explorer,
  - 3D Navigate,
  - Bookmark Editor,
  - ...
* Only Listen selection:
  - Properties


<div style="page-break-before: always;"> </div>

## Selection event format
---

_Topic name:_**DS/ENO/select**
_Data format:_ This is a JSON object with the following Properties

|Name|Type|Description|
|----|----|----------|
|metadata|object| Metadata objects that is used to know where the event comes from. See precise description below.|
|data|object| Description the selected objects inside the app in a JSON format. See precise description below.|

##### *metadata* JSON object description:

|Name|Type|Description|
|----|----|----------|
|uid|String| Uid for the event - it is a random string|
|originUid|String| Uid of the Publisher. Used for clean up of the subscription queue. It also avoid the loop (to dismiss event that we receive ig the same code published it).|
|timestamp|String| timestamp on when the event has been sent|
|appid|String| Id of the Application from where the event has been published. It is retrieved thanks to *widget.getValue('x3dSharedId')* or *widget.getValue('x3dAppId')* depending if the app is a multi-widget app or not.|
|originWidgetId|String| Widget Id of the Application from where the event has been published. It is retrieved thanks to *widget<span></span>.id* |

<div style="page-break-before: always;"> </div>

##### *data* JSON object description:

|Name|Type|Attributes|Description|
|----|----|----------|-----------|
|version|String|| Version of the data that is sent on the event. Actual version is 1.1|
|tenant|String|| Tenant name of the selected data. Only single tenant is managed. It is that all the data that are selected comes from the same tenant|
|paths|array|| Array of paths of the selected objects. The path are built as an array of physical ids (as string) [referenceid1, instanceid1, referenceid2, instanceid2,referenceid3].
|attributes|object|```<Optional>```| Object that contains attributes description for each selected object. Each keys inside the object is the physical id of the described object. Then inside this object there is key/value mecanism that give attribute name/value|
|changeControl|object|```<Optional>```|Change Control object managed by **DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext**. Content is retrieve and set by the API.

<div style="page-break-before: always;"> </div>

### Here is a sample for a multiselection:
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
		"paths": [["982EB29A6A404792B723982AD7343689"], ["982EB29A6A404792B723982AD7343689", "382EE2721D4646A48C786DBBDA7A137B", "FC01EC72676045C68547DC6F4A2B5959"]],
		"tenant": "OnPremise",
		"attributes": {
			"982EB29A6A404792B723982AD7343689": {
				"type": "VPMReference",
				"label": "GearAssembly01(Default)"
			},
			"FC01EC72676045C68547DC6F4A2B5959": {
				"type": "VPMReference",
				"label": "FrontCover01(Default)"
			}
		},
		"version": "1.1",
		"changeControl": {
			"version": "1.0",
			"AuthoringContextHeader": null,
			"change": {
				"id": "",
				"name": "",
				"context": [],
				"title": "",
				"description": "",
				"severity": ""
			},
			"evolution": {
				"id": "",
				"displayExpression": ""
			}
		}
	}
}


```

## Sample
This sample is based on the official sample for publish subscribe: [Dashboard Apps JavaScript | Widget Interactions | Between Widgets | Using Publish/Subscribe Protocol](http://dsdoc/devdoccaa/3DEXPERIENCER2019x/en/English/CAAWebAppsJSBetweenWdg/CAAWebAppsUcPubSub.htm).

* Modification to do in CAAWebAppsPublisherFile.html to publish a select event:
You simply have to change the topic name from **'CAA.CAAWebAppsPublisher'** to **'DS/ENO/select'** and put the data in the previously describe format.
* Modification to do in CAAWebAppsSubscriberFile.html  to subscribe to a select event:
You simply have to change the topic name from **'CAA.CAAWebAppsPublisher'** to **'DS/ENO/select'**. In the callback function, you will receive data in the previously describe format.


>***Be careful on the loop***: indeed if you publish and subscribe to the same event, you will be callback as any other subscriber.
