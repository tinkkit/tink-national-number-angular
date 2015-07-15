'use strict';
describe('tink-national-number-angular', function() {

  var bodyEl = $('body'), sandboxEl;
  var $compile, $templateCache, scope;

  beforeEach(module('tink.nationalnumber'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _$templateCache_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    bodyEl.html('');
    sandboxEl = $('<div>').attr('id', 'sandbox').appendTo(bodyEl);
  }));

  afterEach(function() {
    scope.$destroy();
    sandboxEl.remove();
  });

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, angular.copy(template.scope || templates['default'].scope), locals);
    var element = $(template.element).appendTo(sandboxEl);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  function triggerInput(el,key){
      $(el).focus();
      for(var i =0; i< key.length;i++){
        var e = jQuery.Event('keypress');
        e.which = key.charCodeAt(i);
        $(el).trigger(e);
      }
    }

    function triggerKeycode(el,code){
      $(el).focus();
        var e = jQuery.Event('keydown');
        e.which = code;
        $(el).trigger(e);
    }

    function unwrap(element){
      var emptyStateValue = element.find('.faux-input').clone()
      emptyStateValue.find('span').contents().unwrap();
      return emptyStateValue.html();
    }

  var templates = {
    'default': {
      scope: {},
      element: '<tink-national-number required name="nationalNoField" data-ng-model="nationalNoModel"></tink-national-number>'
    }
  };
  var placeholder = 'xx.xx.xx-xxx.xx';

  describe('default', function() {
    it('empty should have placeholder',function(){
      var element = compileDirective('default');

      var ctrlValue = angular.element(element).isolateScope().ctrl.getValue();
      var emptyStateValue = element.find('span.placeholder').html();

      expect(ctrlValue).toBe(placeholder);
      expect(emptyStateValue).toBe(placeholder);
    });

    it('when entering 1 schould change placeholder',function(){
      var element = compileDirective('default');
      triggerInput(element.find('.faux-input'),'1');
      scope.$digest();
      var ctrlValue = angular.element(element).isolateScope().ctrl.getValue();

      placeholder = '1x.xx.xx-xxx.xx';

      var emptyStateValue = element.find('.faux-input').clone()
      emptyStateValue.find('span').contents().unwrap();
      emptyStateValue = emptyStateValue.html()

      expect(ctrlValue).toBe(placeholder);
      expect(emptyStateValue).toBe(placeholder);
    });

    it('when removing 1 should have placeholder',function(){
      var element = compileDirective('default');
      triggerInput(element.find('.faux-input'),'1');
      scope.$digest();

      placeholder = '1x.xx.xx-xxx.xx';

      //get tje data of the element
      var ctrlValue = angular.element(element).isolateScope().ctrl.getValue();
      var emptyStateValue = unwrap(element);

      expect(ctrlValue).toBe(placeholder);
      expect(emptyStateValue).toBe(placeholder);

      //backspace keycode
      triggerKeycode(element.find('.faux-input'),8);

      placeholder = 'xx.xx.xx-xxx.xx';

      //Get the data of the element
      ctrlValue = angular.element(element).isolateScope().ctrl.getValue();
      emptyStateValue = unwrap(element);

      expect(ctrlValue).toBe(placeholder);
      expect(emptyStateValue).toBe(placeholder);

    });

    it('when adding a letter do nothing',function(){
      var element = compileDirective('default');
      triggerInput(element.find('.faux-input'),'abc@&é§èçà\'\"(defghjikl*¨/?+?./NBcxvhkx');
      scope.$digest();

      //get tje data of the element
      var ctrlValue = angular.element(element).isolateScope().ctrl.getValue();
      var emptyStateValue = unwrap(element);

      expect(ctrlValue).toBe(placeholder);
      expect(emptyStateValue).toBe(placeholder);
    });

    it('when adding wrong format error',function(){
      var element = compileDirective('default');
      triggerInput(element.find('.faux-input'),'12252023365');
      element.find('.faux-input').blur();
      scope.$digest();      
      expect(element.isolateScope().ctrl.ngControl.$error.format).toBe(true);
    });

    it('when adding good format',function(){
      var element = compileDirective('default');
      triggerInput(element.find('.faux-input'),'92012023339');
      element.find('.faux-input').blur();
      scope.$digest();      
      expect(element.isolateScope().ctrl.ngControl.$error.format).toBe(undefined);
    });
  });


});