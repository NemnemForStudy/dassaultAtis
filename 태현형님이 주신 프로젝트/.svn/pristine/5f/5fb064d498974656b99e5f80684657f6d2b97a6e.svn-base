define('DS/ENXWFLoader/core/ENXWorkforceStatus',
['DS/WAFData/WAFData'],
function(WAFData) {

    'use strict';

    const invokeURL =  async function(URL, options){
      try{
          return new Promise(function(resolve, reject){
            options.onComplete = function(data) {
                resolve(data);
            };
            options.onFailure = function(error, data) {
                data ? reject(data) : reject(error);
            };
            WAFData.authenticatedRequest(URL, options);
          });
        } catch(error) {
          throw error;
        }
    };

    const is3DWorkforceEnabled = async function(workforceURL){
      try{
        let url = workforceURL + '/3dorg/resources/v1/3dworkforce/isEnabled';
        let options = {};
        options.method = 'GET';
        options.headers = {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return await invokeURL(url, options);
      } catch (error) {
        throw error;
      }
    };

    return {
      isWorkforceEnabled : is3DWorkforceEnabled
    };
});

define('DS/ENXWFLoader/core/ENXWFCommonUILoader',

['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices',
 'DS/ENXWFLoader/core/ENXWorkforceStatus'],

function(i3DXCompassPlatformServices, ENXWorkforceStatus) {

  'use strict';

  let configurationAlreadyDoneForThisSession = false;

  function setWithExpiry(key, value, expiryInHours) {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + (expiryInHours*60*60*1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getWithExpiry(key) {
  	const itemStr = localStorage.getItem(key);
  	// if the item doesn't exist, return null
  	if (!itemStr) {
  		return null;
  	}
  	const item = JSON.parse(itemStr);
  	const now = new Date();
  	// compare the expiry time of the item with the current time
  	if (now.getTime() > item.expiry) {
  		// If the item is expired, delete the item from storage
  		// and return null
  		localStorage.removeItem(key);
  		return null;
  	}
  	return item.value;
  }

    const cacheBustLoad = (responseText)=>{
      var versionNumberFileContent = responseText ? responseText.trim() : null;
      //split on lines
      var match = versionNumberFileContent.match(/COMMIT_ID=(?<commitid>.*)/m);
      if (match) {
        var defaultURL = new URL(require.toUrl(''));
        defaultURL.searchParams.append('_WFVersion', match[1]);
        return defaultURL.search.substring(1);
      }
      return '';
    };

    const makeRequest =  (url) => {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error({
              status: this.status,
              statusText: xhr.statusText
            }));
          }
        };
        xhr.onerror = function () {
          reject(new Error({
            status: this.status,
            statusText: xhr.statusText
          }));
        };
        xhr.send();
      });
    };


    const updateRequireConfig = (data) => {
      const modules = ['ENXWFCommonUI'];
      const configPath = {};
      modules.forEach((module) => {
        configPath['DS/' + module] = data.serviceUrl+'/3dorgapp/webapps/'+module;
      });
      require.config({
        paths: configPath,
        urlArgs: data.urlArgs
      });
    };

    const getServiceUrl = async (options)=> { return  new Promise( function(resolve, reject) {
        i3DXCompassPlatformServices.getServiceUrl({
          serviceName: '3dorganization',
          platformId: options.platformId,
          onComplete: function(serviceUrl) {
            if (serviceUrl) {
              resolve(serviceUrl);
            } else {
              reject(new Error('3DOrganization service unavailable!!!'));
            }
          },
          onFailure: () => {
            reject(new Error('3DOrganization service unavailable!!!'));
          }
        });
      });
    };

    const fallbackConfig = function(serviceURL){
      var defaultURL = new URL(require.toUrl(''));
      defaultURL.searchParams.append('_WFVersion' , new Date().getTime());
      updateRequireConfig({serviceURL: serviceURL, urlArgs: defaultURL.search.substring(1)});
    };

    const changeRequireConfig = async function(options){
      if(configurationAlreadyDoneForThisSession) {
        return true;
      }
      let wf_status, serviceUrl;
      try{
        serviceUrl = await getServiceUrl(options);
        wf_status = getWithExpiry('_WF_STATUS');
        if(wf_status===null) {
          wf_status = await ENXWorkforceStatus.isWorkforceEnabled(serviceUrl);
          setWithExpiry('_WF_STATUS', wf_status, 24);
        }
        if(wf_status!=='true') {
          throw new Error("3DWorkForce is not enabled!!");
        }
      }catch(e) {
        throw e;
      }
      try{
        const versionFileURL = serviceUrl+'/3dorgapp/webapps/ENXWFCommonUI/assets/version.properties?_t='+new Date().getTime();
        const versionFileResponse = await makeRequest(versionFileURL);
        let urlArgs = cacheBustLoad(versionFileResponse);
        updateRequireConfig({serviceUrl: serviceUrl, urlArgs: urlArgs});
      } catch(error) {
        console.log("Cache busting logic failed!!!");
        fallbackConfig(serviceUrl);
      }finally{
        configurationAlreadyDoneForThisSession = true;
      }
    };

  return {checkAndEnableWorkForce: changeRequireConfig};

});

