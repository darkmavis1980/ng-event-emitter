'use strict';

/**
 * @namespace ngEventEmitter
 **/

angular.module('ngEventEmitter',[
  'ngLodash'
])

/**
 * @namespace factories
 * @memberOf  ngEventEmitter
 **/
.factory('EventEmitter', ['lodash',
  function(_){
    var EventEmitter = function(obj){
      obj = obj || {};
      _.assignIn(this, obj);
      this.eventRegistry = {};
    };

    EventEmitter.prototype = {
      /**
       * @function      on
       * @description   Add a callback to a specific event
       * @param         {String} eventName - The event to trigger, eg: 'change'
       * @param         {Function} callback - The callback to invoke with the event
       * @memberOf      ngEventEmitter.factories
       */
      on: function(eventName, callback){
        var that = this;
        // all the arguments are compulsory and callback must be a function
        if(!_.some(arguments, function(arg){
          return _.isUndefined(arg) || _.isNull(arg);
        }) && _.isFunction(callback)){
          if(_.isArray(eventName)){
            _.forEach(eventName, function(name){
              if(!_.isArray(that.eventRegistry[name])){
                that.eventRegistry[name] = [];
              }
              // check if it's not a duplicate
              if(!_.includes(that.eventRegistry[name], callback)){
                that.eventRegistry[name].push(callback);
              }// end if
            });
          } else if(_.isString(eventName)){
            if(!_.isArray(that.eventRegistry[eventName])){
              that.eventRegistry[eventName] = [];
            }// end if
            // check if it's not a duplicate
            if(!_.includes(that.eventRegistry[eventName], callback)){
              that.eventRegistry[eventName].push(callback);
            }// end if
          }// end if
        }// end if
      },

      /**
       * @function      triggerEvent
       * @description   This trigger the event
       * @param         {String} eventName - The event to trigger, eg: 'change'
       * @param         {Object} [data] - Optional data to pass to the callback
       * @memberOf      ngEventEmitter.factories
       */
      triggerEvent: function(eventName, data){
        var that = this;
        data = data || {}; // set empty object if no data is passed
        // all the arguments are compulsory
        if(!_.isUndefined(eventName)){
          if(!_.isUndefined(this.eventRegistry)){
            if(!_.isUndefined(this.eventRegistry[eventName])){
              if(_.isArray(this.eventRegistry[eventName])){
                _.each(this.eventRegistry[eventName], function(event){
                  event(data);
                });
              } else {
                this.eventRegistry[eventName](data);
              }// end if
            }// end if
          }// end if
        }// end if
      }
    };

    return EventEmitter;
  }
]);
