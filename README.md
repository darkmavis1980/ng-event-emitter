# ngEventEmitter

This is a small library to add an event emitter functionality in AngularJS 1.x, and it contains a small factory with two methods, `.on` and `.triggerEvent`, written mostly because I didn't want to depend to the $rootScope or the $scope providers, but to have a much more lightweight version of event emitters.

To add to your angular project, just add the `ngEventEmitter` into your module dependencies, and `EventEmitter` as a dependency injection to your service/controller.

The `.on(eventName, callback)` method requires two arguments, an *eventName* (a simple string to identify the event) and a *callback* function.
Multiple callbacks can be attached to the same event, and they will all be invoked once the event is triggered.
The `.triggerEvent(eventName [,data])` method simply trigger the passed event, which is the only compulsory argument, a second argument can be passed to send data to the `.on` method, as shown in the second example down below.

```javascript

angular.module('myApp', ['ngEventEmitter'])

.service('MyService', function(EventEmitter){
  this.events = new EventEmitter();

  this.events.on('salute', function(){
    console.log('hello world');
  });

  this.events.triggerEvent('salute'); // it will print `hello world` in the console

  this.events.on('cheers', function(name){
    console.log('cheers ' + name);
  });

  this.events.triggerEvent('cheers', 'Alex'); // it will print `cheers Alex` in the console
});

```