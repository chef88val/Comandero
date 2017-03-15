'use strict'

angular.module('starter.directives', [])
    .component("barraInferior", function() {
        return {
            scope: { type: '@' },
            restrict: 'E',
            controller: 'AdminCtrl',
            template: '<ion-footer-bar align-title="left" class="bar-light"><div class="buttons">' +
                '<button class="button button-icon icon ion-edit" ng-click="adminEditar();"></button></div>' +
                '<h1 class="title"></h1> <div class="buttons">' +
                '<button class="button button-icon icon ion-ios-download" ng-if="valoradminEditar" ng-click="adminGuardar()">' +
                '</button></div>' +
                '</ion-footer-bar>'


            //template : '<h1 ng-if="valor{{type}}Editar" ng-click="{{type}}Editar()">Made by{{type}} a directive!</h1>'
            /*template : '<ion-footer-bar align-title="left" class="bar-light">'+
        '    <div class="buttons">      <button class="button button-icon icon ion-edit" ng-click="{{type}}Editar()"></button></div>'
    +'<h1 class="title"></h1> <div class="buttons">'
    +'<button class="button button-icon icon ion-ios-download" ng-if="valor{{type}}Editar" ng-click="{{type}}Guardar()"></button></div> </ion-footer-bar>'
    */
        };
    }).directive('onReadFile', function($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                element.on('change', function(onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function(onLoadEvent) {
                        scope.$apply(function() {
                            fn(scope, { $fileContent: onLoadEvent.target.result });
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    })
    .directive('input', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function(scope, element, attr) {
                element.bind('focus', function(e) {
                    if (scope.onFocus) {
                        $timeout(function() {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function(e) {
                    if (scope.onBlur) {
                        $timeout(function() {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function(e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function() {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    });