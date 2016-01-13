// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('weatherCtrl', function ($http){
  var weather = this;
  var url = 'http://api.wunderground.com/api/fdcf53c91a30803b/conditions/forecast/geolookup/q/autoip.json';
  weather.temp = "--";
  weather.summary = "Loading....";

  $http.get(url).then(parseWUdata)

  navigator.geolocation.getCurrentPosition(function (geopos) {
    console.log(geopos);
    var lat = geopos.coords.latitude;
    var long = geopos.coords.longitude;
    // var apikey = 'fdcf53c91a30803b';
    $http.get('http://api.wunderground.com/api/fdcf53c91a30803b/conditions/forecast/geolookup/q/' + lat + ',' + long + '.json').then(parseWUdata);
  

  //     // console.log(res);
  //     // // debugger;
  //     // weather.city = res.data.location.city;
  //     // weather.state = res.data.location.state;
  //     // console.log(weather.city);
  //     // weather.temp = res.data.current_observation.temp_f;
  //     // weather.summary = res.data.current_observation.weather;
  //     // weather.icon = 'http://icons.wxug.com/i/c/k/' + res.data.current_observation.icon + '.gif';
  });

  function parseWUdata(res) {
    console.log(res);
    // debugger;
    weather.city = res.data.location.city;
    weather.state = res.data.location.state;
    // console.log(weather.city);
    weather.temp = res.data.current_observation.temp_f;
    weather.summary = res.data.current_observation.weather;
    weather.icon = 'http://icons.wxug.com/i/c/k/' + res.data.current_observation.icon + '.gif';
    return res;
  }

  weather.search = function () {
    console.log("Yep");
    $http.get('http://api.wunderground.com/api/fdcf53c91a30803b/conditions/forecast/geolookup/q/' + weather.searchQuery + '.json').then(parseWUdata).then(function(res){
      // console.log(res.data.current_observation.station_id);
      var city = res.data.location.city;
      var state = res.data.location.state;

      var history = JSON.parse(localStorage.getItem("searchHistory")) || {};
      var keyname = city + "," + state;
      console.log("keyname", keyname);
      history[keyname] = res.data.current_observation.station_id
      localStorage.setItem("searchHistory", JSON.stringify(history)); 
    });
  }

});

// .config(function($stateProvider, $urlRouterProvider){
//   $stateProvider.state('root', {
//     url:'/',
//     template: '<h1>Hello World</h1>'
//   });

//   $urlRouterProvider.otherwise('/');
// })