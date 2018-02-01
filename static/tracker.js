var serverUrl = 'http://localhost:8000/truecaller/';
fireTracker(mobileNumbers);
//showDesktopNotification("Your Number banged Spammed");
// showDesktopNotification("Neenga Shut up pannunga");

function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(
          function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
      ).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}

function fireTracker(phoneNumbers) {
  phoneNumbers.forEach(obj => {
    postAjax(serverUrl, {number: obj.number}, function(responseData){
        //updateTrackerTable(responseData);
        responseData = JSON.parse(responseData);
        updateRowStatus(responseData.number, responseData.score, (responseData.score > 10) ? 'failure': 'success')
        if(responseData.score > 10)
          showDesktopNotification(responseData.name + '(' + responseData.number +') spam score of '+ responseData.score);
    });
  });
}

function showDesktopNotification(message){
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message, {
      icon: '/static/genesys.jpg',
    });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }

}