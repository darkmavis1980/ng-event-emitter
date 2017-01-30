describe('EventEmitter', function(){

  var ee, EventEmitter;

  beforeEach(function(){
    module('ngEventEmitter');
    module('ngLodash');

    inject(function(_EventEmitter_){
      EventEmitter = _EventEmitter_;

      ee = new EventEmitter();
    });
  });

  describe('.on', function(){

    beforeEach(function(){
      ee.eventRegistry = {};
    });

    it('should append the event and all the parameters are passed correctly', function(){
      ee.on('change', function(){});
      expect(ee.eventRegistry).toBeDefined();
      expect(ee.eventRegistry.change).toEqual(jasmine.any(Array));
      expect(ee.eventRegistry.change[0]).toEqual(jasmine.any(Function));
    });

    it('should append the events if an array is passed', function(){

      ee.on(['change','reset'], function(){});
      expect(ee.eventRegistry).toBeDefined();
      expect(ee.eventRegistry.change[0]).toEqual(jasmine.any(Function));
      expect(ee.eventRegistry.reset[0]).toEqual(jasmine.any(Function));
    });


    it('should not append anything if any of the arguments are passed', function(){
      ee.on(null, function(){});  
      expect(ee.eventRegistry.null).toBeUndefined();

      expect(function(){
        ee.on('change');
      }).toThrow();
      expect(ee.eventRegistry.change).toBeUndefined();
    });
  });

  describe('.triggerEvent', function(){
    beforeEach(function(){
      window.mockCallback = function(){};
      spyOn(window,'mockCallback').and.callThrough();
      ee.on( 'change', function(data){
        window.mockCallback(data);
      });
    });

    it('should trigger the related event', function(){
      ee.triggerEvent('change', {data: {id: 1}});
      expect(window.mockCallback).toHaveBeenCalled();
    });

    it('should not trigger any events function if there are no event set', function(){
      ee.triggerEvent('test', {data: {id: 1}});
      expect(window.mockCallback).not.toHaveBeenCalled();
    });

    it('should not trigger anything if any of the arguments are passed', function(){
      ee.triggerEvent(null, {data: {id: 1}});
      expect(window.mockCallback).not.toHaveBeenCalled();
    });

    it('should pass data to the callback', function(){
      var mockData = {data: {id: 1}};
      ee.triggerEvent('change', mockData);
      expect(window.mockCallback).toHaveBeenCalledWith(mockData);
    });

    it('should pass an empty object to the callback if the data argument is undefined', function(){
      ee.triggerEvent('change');
      expect(window.mockCallback).toHaveBeenCalledWith({});
    });
  });
});