# ngEventEmitter

This is a small library to add an event emitter functionality in AngularJS 1.x, and it contains a small factory with two methods, `.on` and `.triggerEvent`, written mostly because I didn't want to depend to the $rootScope or the $scope providers, but to have a much more lightweight version of event emitters.

## Installation

To download the library you can do it via bower:

```
bower install ng-event-emitter --save
```

Or via NPM

```
npm install ng-event-emitter --save
```

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

  // Passing data from the triggerEvent
  this.events.on('cheers', function(name){
    console.log('cheers ' + name);
  });

  this.events.triggerEvent('cheers', 'Alex'); // it will print `cheers Alex` in the console

  // Multiple callbacks for the same event

  this.events.on('test', function(){
    console.log('test 1');
  });

  this.events.on('test', function(){
    console.log('test 2');
  });

  this.events.triggerEvent('test'); // it will print `test 1` and `test 2` in the console

  // One callback for multiple events with passed data

  this.events.on(['test1', 'test2'], function(name){
    console.log('hello ' + name);
  });

  this.events.triggerEvent('test1', 'Alex'); // it will print `test Alex` in the console
  this.events.triggerEvent('test2', 'Liza'); // it will print `test Liza` in the console
});

```

If you want to clear all the callbacks previously assigned to a specific events, you can pass the options object as a second argument, specifying `clearEvent` to be `true`, as shown in the example below:

```javascript
this.events.on('test', function(){
  console.log('test 1');
});

this.events.on('test', {clearEvent: true}, function(){
  console.log('test 2');
});

this.events.triggerEvent('test'); // it will print `test 2` only in the console
```

---

### Unit tests

To run the unit tests, just use the command `npm test` from the command line, but be sure to have ran `npm install` and `bower install` before to install all the dependencies needed.
