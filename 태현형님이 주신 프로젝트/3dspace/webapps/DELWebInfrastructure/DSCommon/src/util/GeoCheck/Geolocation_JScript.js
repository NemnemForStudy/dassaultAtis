 

$( document ).ready(function(){
	
    //checking geolocation support
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(CurPosition, geoPosError, options);
		
		
		navigator.geolocation.watchPosition(geoChangedPosition);
	}

    //capture device orientation
	if (window.DeviceOrientationEvent) {
	    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
	}

    //capture device movement
	if (window.DeviceMotionEvent) {
	    window.addEventListener("devicemotion", deviceMotionHandler);
	} 
});

var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
}; 

function CurPosition(position){
	startPos = position;
    $('#geoTable').append('<tr><td>' + startPos.coords.latitude + '</td><td>' + startPos.coords.longitude + '</td><td>' + startPos.coords.accuracy + '</td><td>' + startPos.coords.altitude + '</td><td>' + startPos.coords.altitudeAccuracy + '</td><td>' + startPos.coords.heading + '</td><td>' + startPos.coords.speed+'</td></tr>');
}

function geoChangedPosition(ChangedPosition){
    $('#geoTable').append('<tr><td>' + ChangedPosition.coords.latitude + '</td><td>' + ChangedPosition.coords.longitude + '</td><td>' + ChangedPosition.coords.accuracy + '</td><td>' + ChangedPosition.coords.altitude + '</td><td>' + ChangedPosition.coords.altitudeAccuracy + '</td><td>' + ChangedPosition.coords.heading + '</td><td>' + ChangedPosition.coords.speed + '</td></tr>');
}

function geoPosError(err){
	console.warn('ERROR(' + err.code + '): ' + err.message);
}


var deviceOrientationData;

var G_BufferingOn = false;
var G_SensorBuffer=[]; // new 8/25/2015 by qif 

function deviceMotionHandler(evt) { 
    devAcc = { x: 0, y: 0, z: 0 };
    var fixed = 7; 
    var data = {timeStamp:evt.timeStamp, interval:evt.interval, type:evt.type};
    if (evt.acceleration.x != null) {
        devAcc.x = evt.acceleration.x.toFixed(fixed);
        devAcc.y = evt.acceleration.y.toFixed(fixed);
        devAcc.z = evt.acceleration.z.toFixed(fixed);
        $('#xAcc').html('x :' + devAcc.x);
        $('#yAcc').html('y :' + devAcc.y);
        $('#zAcc').html('z :' + devAcc.z);
        $('#accSupport').html('without gravity effect');
        data.acceleration={x:devAcc.x, y:devAcc.y, z:devAcc.z}; 
    }
    else if (evt.accelerationIncludingGravity.x != null) {
        devAcc.x = evt.accelerationIncludingGravity.x.toFixed(fixed);
        devAcc.y = evt.accelerationIncludingGravity.y.toFixed(fixed);
        devAcc.z = evt.accelerationIncludingGravity.z.toFixed(fixed);
        $('#accSupport').html('with gravity effect');
        $('#xAcc').html('x :' + devAcc.x);
        $('#yAcc').html('y :' + devAcc.y);
        $('#zAcc').html('z :' + devAcc.z);
        data.accelerationIncludingGravity={x:devAcc.x, y:devAcc.y, z:devAcc.z}; 
    }
    else {
        $('#accSupport').html('Acceleration is NOT supported on your device');
    } 
    if(evt.rotationRate) {
        var rotation = evt.rotationRate;
        var alphaRate = rotation.alpha?rotation.alpha.toFixed(fixed):0;
        var betaRate = rotation.beta?rotation.beta.toFixed(fixed):0;
        var gammaRate =  rotation.gamma?rotation.gamma.toFixed(fixed):0;
        $('#AlphaRate').html('alpha :' + alphaRate);
        $('#BetaRate').html(' beta :' +  betaRate);
        $('#GammaRate').html('gamma :' + gammaRate); 
        data.rotationRate={alpha:alphaRate, beta:betaRate, gamma:gammaRate};         
    } 
    if(G_BufferingOn && (data.acceleration || data.accelerationIncludingGravity || data.rotationRate)) {
        G_SensorBuffer.push(data);
        $("#buffer_size").html(G_SensorBuffer.length);
    } 
} 

function deviceOrientationHandler(evt) { 
    var alpha;
    var beta;
    var gamma;
    var fixed = 7;
    deviceOrientationData = evt;
    var data = {timeStamp:evt.timeStamp, /*interval:evt.interval,*/ type:evt.type};
    try {
        alpha = evt.alpha.toFixed(fixed);
        beta = evt.beta.toFixed(fixed);
        gamma = evt.gamma.toFixed(fixed);
        $('#Alpha').html('alpha:'+alpha);
        $('#Beta').html('beta:'+beta);
        $('#Gamma').html('gamma:'+gamma);
        $('#rotSupport').html('');
        data.alpha = alpha; data.beta = beta; data.gamma = gamma;
        
        v = gamma; 
    
        /*
        timestamp.innerText = new Date(evt.timeStamp);
        alpha.innerText = evt.alpha.toFixed(fixed);
        beta.innerText = evt.beta.toFixed(fixed);
        gamma.innerText = evt.gamma.toFixed(fixed);
        var rotation = "rotate(" + evt.alpha + "deg) rotate3d(1,0,0, " + (evt.gamma * -1) + "deg)";
        h5logo.style.webkitTransform = rotation;
        h5logo.style.transform = rotation;*/
    }
    catch (ex) { 
        $('#rotSupport').html('Orientation is NOT supported on your device'); 
    } 
    if(G_BufferingOn && (data.alpha || data.beta || data.gamma)) {
        G_SensorBuffer.push(data);
        $("#buffer_size").html(G_SensorBuffer.length);
    } 
} 


