'use strict';
(function(module) {
  try {
    module = angular.module('tink.nationalnumber');
  } catch (e) {
    module = angular.module('tink.nationalnumber', ['tink.safeApply','tink.formathelper']);
  }
  module.directive('tinkNationalNumber',['$window','safeApply','$timeout',function($window,safeApply,$setimeout){
     return {
      restrict:'AE',
      controller:'tinkFormatController',
      controllerAs:'ctrl',
      require:['tinkNationalNumber','ngModel','?^form'],
      scope:{
        isDisabled:'=?',
        ngModel:'='
      },
      template: function() {
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = false && ('createTouch' in $window.document) && isNative;
        if (isTouch) {
          return '<div><input class="hide-styling" type="text"><div>';
        } else {
          return '<div><div id="input" class="faux-input" contenteditable="true">{{placeholder}}</div></div>';
        }
      },
      link:function(scope,elm,attr,ctrl){
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = false && ('createTouch' in $window.document) && isNative;
        var controller = ctrl[0];
        var form = ctrl[2];
        var ngControl = ctrl[1];
        var element = elm.find('div>:first');
        //variable
        var config = {
          format: '00\\.00\\.00-000\\.00',
          placeholder: 'xx.xx.xx-xxx.xx'
        };

         ngControl.$parsers.unshift(function(value) {
          checkvalidty(value);
          return value;
         });

         ngControl.$formatters.push(function(modelValue) {
          if(modelValue !== undefined){
            if(modelValue && modelValue.length === 11){
              modelValue = modelValue.substr(0,2) + '.' + modelValue.substr(2,2)+ '.' + modelValue.substr(4,2)+'-'+ modelValue.substr(6,3)+'-'+modelValue.substr(9,2);
            }

            if(validFormat(modelValue)){
              if(isTouch){
                element.val(modelValue);
              }else{
                controller.setValue(modelValue,null);
              }
            }else{
              modelValue = null;
              ngControl.$setViewValue(modelValue);
            }
            checkvalidty(modelValue);

          }
          return modelValue;
         });

         element.unbind('input').unbind('keydown').unbind('change');
        //on blur update the model.
        element.on('blur', function() {
          safeApply(scope,function(){
            var value;
            if (isTouch) {
              value = element.val();
            }else{
              value = controller.getValue();
            }
            
              if(isRRNoValid(value)){
                ngControl.$setViewValue(value);
                ngControl.$render();
                //ngControl.$setPristine();
              }else{
                 ngControl.$setViewValue();
                // scope.ngModel = null;
                 //ngControl.$setPristine(true);
              }
              checkvalidty(value);
              /*if(value === 'xx.xx.xx-xxx.xx' || value === ''){
                ngControl.$setViewValue(null);
              }*/
          });
        });

        elm.bind('focus',function(){
          element.focus();
        });

        var prevValue;
        element.bind('valueChanged', function (e, val) {
            //We put this in a safeaply because we are out of the angular scope !
            safeApply(scope, function () {
              //Check if the date we received is a valid date.
              if(ctrl[1] && prevValue !== val){
                ctrl[1].$setDirty();
              }
              prevValue = val;
            });
          });

         var isRequired = (function(){
            if(attr.required === 'true' || attr.required === '' || attr.required === 'required'){
              return true;
            }else{
              return false;
            }
          })();

          function validFormat(value){
            if(value && value.length === 11){
              return value.match(/[0-9]*/g);
            }else if(value && value.length === 15){
              return value.match(/[0-9][0-9].[0-9][0-9].[0-9][0-9]-[0-9][0-9][0-9].[0-9][0-9]/g);
            }else{
              return false;
            }
          }


         function isRRNoValid(n) {
          if(typeof n !== 'string'){
            return false;
          }
            n = n.replace(/[^\d]*/g, '');
              // RR numbers need to be 11 chars long
              if (n.length !== 11) {
                return false;
              }

              var checkDigit = n.substr(n.length - 2, 2);
              var modFunction = function(nr) { return 97 - (nr % 97); };
              var nrToCheck = parseInt(n.substr(0, 9));

              // first check without 2
              if (modFunction(nrToCheck) === parseInt(checkDigit)) {
                return true;
              }
              // then check with 2 appended for y2k+ births
              nrToCheck = parseInt('2' + n.substr(0, 9));
              return (modFunction(nrToCheck) === parseInt(checkDigit));
          }

         function checkvalidty(value){
          if(value === config.placeholder || value === '' || value === null || value === undefined){
            ngControl.$setValidity('format',true);
          }else{
            ngControl.$setValidity('format',isRRNoValid(value));
          }

          if(isRequired){
            if(controller.getValue() === config.placeholder || value === '' || value === null || value === undefined){
              ngControl.$setValidity('required',false);
              ngControl.$setValidity('format',true);
            }else{
              ngControl.$setValidity('required',true);
            }
          }
         }

         if (!isTouch) {
            controller.init(element,config,form,ngControl);
         }
      }
    };
  }]);
})();;