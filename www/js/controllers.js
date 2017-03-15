angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $rootScope, UsuarioServicio, $localstorage) {
    $scope.nCategoriaData = {};
    $scope.nBebidaData = {};
    $scope.nZonaData = {};
    $scope.nBebidaDataActualizar = {};
    $scope.nMesaData = {};
    $scope.trabajadorHoras = {};
    //$scope.nCategoriaData={};
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    //192.168.1.132
    //console.log("AppCtrl$localstorage" + $localstorage.get('ipServidor'))
    if (angular.isUndefined($localstorage.get('ipServidor'))) {
        $state.go('app.ajustes')
            //console.log("app.ajustes")
    } else {
        //console.log("Usuario" + $localstorage.get('ipServidor') + "Servicio")
        $rootScope.patron = 'http://' + $localstorage.get('ipServidor') + ':5000';
        UsuarioServicio.obtenerConexion().then(function(success) {
            //console.log("success" + success)
            if (success) $state.go('app.mesas')
            else $state.go('app.ajustes')
        })
    }
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bebidas.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        //console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('MesasCtrl', function($scope, $rootScope, $state, $ionicPopup, UsuarioServicio, $localstorage, $timeout) {

        //$timeout(function() {
        UsuarioServicio.obtenerConexion().then(function(success) {
            //console.log("success" + success)
            if (success) {
                UsuarioServicio.obtenerMesas().then(function(success) {
                    ////console.log("ejecutar obtenerMesas")
                    $scope.mesas = success;
                })
            } else $state.go('app.ajustes')
        })

        //}, 00);

        $scope.abrirMesa = function(id) {
            $rootScope.mesaSeleccionada = $scope.mesas[UsuarioServicio.buscarporID($scope.mesas, "idmesa", id)];
            ////console.log($scope.mesaSeleccionada);
            ////console.log("-" + $scope.mesaSeleccionada.estado.data);
            if ($scope.mesaSeleccionada.estado.data == "1") $state.go('app.mesa', { mesaId: id })
            else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Abrir mesa',
                    template: 'Quiere abrir la mesa?'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        UsuarioServicio.abrirMesa(id).then(function(success) {
                            $state.go('app.mesa', { mesaId: id })
                        })
                    } else {
                        $ionicPopup.alert({ template: "La mesa" + id + " no ha sido abierta", title: "Abrir mesa" });
                    }
                });


            }
        }
    })
    .controller('modalPersonalCtrl', function($scope, $rootScope, modalPersonalService, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        $scope.listaPersonalTMP = []
        $scope.modalPersonalService = modalPersonalService
            //utilsService.hideModal()
        $scope.hideModal = function() {
            $scope.listaPersonalTMP.forEach(function(element) {
                if ($rootScope.accionPersonal == 1) {
                    UsuarioServicio.entrarPersonal(element.idpersonal).then(function(success) {
                        //$state.go('app.mesas', { reload: true })
                    })
                }
                if ($rootScope.accionPersonal == 2) {
                    UsuarioServicio.sacarPersonal(element.idpersonal).then(function(success) {

                    })
                }
            }, this);
            $scope.modal.hide();
            $scope.listaPersonalTMP = []
            $scope.accionPersonal = 0
            $state.go('app.admin', { reload: true })
        }
        UsuarioServicio.obtenerZonas().then(function(success) {

            ////console.log("-+" + success)
            $scope.listaZonas = success;
        })
        UsuarioServicio.obtenerPersonal().then(function(success) {
            ////console.log("-+" + success)
            $scope.listaPersonal2 = success;
        })
        $scope.zonaSeleccionada = function(id) {
            ////console.log("categoriaSeleccionada" + id);
            if ($rootScope.accionPersonal == 1) {
                UsuarioServicio.obtenerPersonalZonaActivo(id).then(function(success) {
                    ////console.log("listaBebidas" + success)
                    $scope.listaPersonal = success;
                    //$scope.modal.show();
                })
            }
            if ($rootScope.accionPersonal == 2) {
                UsuarioServicio.obtenerPersonalZonaParado(id).then(function(success) {
                    ////console.log("listaBebidas" + success)
                    $scope.listaPersonal = success;
                    //$scope.modal.show();
                })
            }
        }


        $scope.personalSeleccionada = function(id) {
            $scope.accionPersonal = $rootScope.accionPersonal
            console.log("2$rootScope.accionPersonal" + $rootScope.accionPersonal)
            $scope.listaPersonal.forEach(function(element) {
                if (element.idpersonal == id)
                    if (!UsuarioServicio.userExists($scope.listaPersonalTMP, element.Nombre))
                        $scope.listaPersonalTMP.push({ idpersonal: element.idpersonal, nombre: element.Nombre, estado: !element.Nombre });
                    else
                        $ionicPopup.alert({ template: "Ya lo has agregado", title: "Incluir bebida" });
                    ////console.log($scope.modal.listaBebidasMesaTMP)
                    ////console.log("..." + UsuarioServicio.userExists($scope.modal.listaBebidasMesaTMP, element.nombre));
                    ////console.log()
            }, this);

            ////console.log($scope.modal.listaBebidasMesaTMP)
        }
    })
    .controller('modalBebidaCtrl', function($scope, $rootScope, modalBebidaService, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        $scope.modalBebidaService = modalBebidaService
            //utilsService.hideModal()
        $scope.hideModal = function() { $scope.modal.hide() }

    })
    .controller('MesaCtrl', function($scope, modalPersonalService, $rootScope, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        //$scope.modalPersonalService = modalPersonalService
        $scope.modal.listaBebidasMesaTMP = []
        $scope.mesaSeleccionada = $rootScope.mesaSeleccionada;
        $scope.nPersonaMesaValue = 1;
        UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) { $scope.resumenBebidaMesaSeleccionada = success })
        $scope.resumenBebidaMesa = function() {

            $ionicPopup.show({
                template: '<ion-scroll style="height: 370px"><ion-list>                                ' +
                    '  <ion-item ng-repeat="item in resumenBebidaMesaSeleccionada"> ' +
                    '    {{item.cantidad}}. {{item.nombre}}                              ' +
                    '  </ion-item>                             ' +
                    '</ion-list> </ion-scroll>                              ',

                title: 'Resumen de la  ' + $scope.mesaSeleccionada.referencia,
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                ]
            });

        }
        UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
            ////console.log("-+" + success)
            $scope.listaBebidasMesa = success;
        })

        UsuarioServicio.obtenerTotalDineroMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
            //console.log($scope.nPersonaMesaValue + "-" + success[0].total)
            $scope.totalDineroMesaSeleccionada = success[0].total
            $scope.totalDineroMesaSeleccionadaPersona = success[0].total / $scope.nPersonaMesaValue;
        })
        $scope.totalDineroMesaSeleccionadaPersona = $scope.totalDineroMesaSeleccionada / $scope.nPersonaMesaValue;
        UsuarioServicio.obtenerCategoriasBebidas().then(function(success) {
            ////console.log("listaBebidas" + success)
            $scope.modal.listaCategorias = success;
            //$scope.modal.show();
        })
        $scope.modal.categoriaSeleccionada = function(id) {
            ////console.log("categoriaSeleccionada" + id);

            UsuarioServicio.obtenerBebidasCategorias(id).then(function(success) {
                ////console.log("listaBebidas" + success)
                $scope.modal.listaBebidas = success;
                //$scope.modal.show();
            })
        }

        $scope.actualizarBebida = function(idbebida, cc) {
            ////console.log(idbebida)
            //console.log(cc + "cout")
            UsuarioServicio.actualizarBebida($scope.mesaSeleccionada.idmesa, idbebida, cc).then(function(success) {
                $state.go('app.mesas')
            })
        }

        $scope.modal.bebidaSeleccionada = function(id) {
            ////console.log(id)
            ////console.log($scope.modal.listaBebidas)

            $scope.modal.listaBebidas.forEach(function(element) {
                ////console.log(element.nombre)

                if (element.idbebida == id)
                    if (!UsuarioServicio.userExists($scope.modal.listaBebidasMesaTMP, element.nombre))
                        $scope.modal.listaBebidasMesaTMP.push({ idbebida: element.idbebida, nombre: element.nombre, cantidad: 1 });
                    else
                        $ionicPopup.alert({ template: "Ya lo has agregado", title: "Incluir bebida" });
                    ////console.log($scope.modal.listaBebidasMesaTMP)
                    ////console.log("..." + UsuarioServicio.userExists($scope.modal.listaBebidasMesaTMP, element.nombre));
                    ////console.log()
            }, this);

            ////console.log($scope.modal.listaBebidasMesaTMP)
        }


        $scope.addBebidaMesa = function() {
            $ionicModal.fromTemplateUrl('templates/bebidas.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });
        }

        // Triggered in the login modal to close it
        $scope.modal.closeLogin = function() {
            $scope.modal.listaBebidasMesaTMP.forEach(function(element) {
                ////console.log(element)
                UsuarioServicio.insertarBebida($scope.mesaSeleccionada.idmesa, element.idbebida, element.cantidad).then(function(success) {
                    UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                        ////console.log("-+" + success)
                        $scope.listaBebidasMesa = success;
                    })

                })

            }, this);
            $scope.modal.hide();
            $scope.modal.listaBebidasMesaTMP = []
        };

        // Open the login modal
        $scope.login = function() {

            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            //console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
        $scope.goBack = function() { $ionicHistory.goBack(); }
    })

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $state, UsuarioServicio, $rootScope) {
    $rootScope.rootActivo = false;
    $rootScope.administradorActivo = false;;
    $scope.doSomething = function() {
        $scope.modal.hide();
    }
    $scope.doLogin = function() {
        UsuarioServicio.adminLogin($scope.loginData.clave).then(function(success) {
            ////console.log(success)
            if (success == "admin") {
                ////console.log("dentro como admin")
                $rootScope.administradorActivo = true;
                $rootScope.rootActivo = false;
                $state.go('app.admin', { reload: true });
            } else if (success == "root") {
                ////console.log("dentro como root")
                $rootScope.rootActivo = true;
                $state.go('app.admin', { reload: true });
            } else {
                $rootScope.administradorActivo = false;
                $rootScope.rootActivo = false;
                $state.go('app.mesas', { reload: true });
            }

        })
    };
})

.controller('AjustesCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, UsuarioServicio, $rootScope, $localstorage) {
    $scope.data = {}
    $scope.ipServidor = $localstorage.get('ipServidor');
    $scope.setIP = function() {
        $rootScope.ipServidor = $scope.data.ipServidor;
        $rootScope.patron = 'http://' + $rootScope.ipServidor + ':5000';
        ////console.log("$rootScope.patron" + $rootScope.patron)
        $localstorage.set('ipServidor', $scope.data.ipServidor);
        ////console.log("AjustesCtrl$localstorage" + $localstorage.get('ipServidor'))
        if (!$scope.data.ipServidor) {
            $state.go('app.ajustes')

        } else {
            UsuarioServicio.obtenerConexion().then(function(success) {
                //console.log("success" + success)
                if (success) $state.go('app.mesas')
                else $state.go('app.ajustes')
            })
        }


    }
})

.controller('AdminCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, UsuarioServicio, $rootScope, modalPersonalService) {
    ////console.log($rootScope.administradorActivo + "-" + $rootScope.rootActivo);
    $scope.modalPersonalService = modalPersonalService
    UsuarioServicio.getCategoria().then(function(success) { $scope.listaCategorias = success; });
    UsuarioServicio.obtenerBebidas().then(function(success) { $scope.listaBebidas = success })
    $scope.categoriaGuardar = function() {
        UsuarioServicio.addCategoria($scope.nCategoriaData.Nombre).then(function(success) {
            $scope.nCategoriaData.Nombre = "";
            ////console.log("categoria añadida" + $scope.nCategoriaData.Nombre);
            UsuarioServicio.getCategoria().then(function(success) { $scope.listaCategorias = success; });
            $state.go('app.admin', { reload: true })
        });
    }

    $scope.zonaGuardar = function() {
        UsuarioServicio.addZonaPersonal($scope.nZonaData.Nombre).then(function(success) {
            $scope.nZonaData.Nombre = "";
            ////console.log("categoria añadida" + $scope.nCategoriaData.Nombre);
        });
    }

    $scope.bebidaGuardar = function() {
        UsuarioServicio.addBebida($scope.nBebidaData.Nombre, $scope.nBebidaData.Precio, $scope.nBebidaData.Categoria).then(function(success) {
            $scope.nBebidaData.Nombre = "";
            $scope.nBebidaData.Precio = "";
            ////console.log("bebida añadida" + $scope.nBebidaData.Nombre + "-" + $scope.nBebidaData.Precio + "-" + $scope.nBebidaData.Categoria);
        });
    }

    $scope.bebidaActualizar = function() {
        ////console.log("$scope.nBebidaDataActualizar.Nombre, $scope.nBebidaDataActualizar.Precio" + $scope.nBebidaDataActualizar.Nombre + $scope.nBebidaDataActualizar.Precio)
        UsuarioServicio.cambiarPrecioBebida($scope.nBebidaDataActualizar.Categoria, $scope.nBebidaDataActualizar.Precio).then(function(success) {
            $scope.nBebidaDataActualizar.Nombre = "";
            $scope.nBebidaDataActualizar.Precio = "";
            ////console.log("bebida añadida" + $scope.nBebidaData.Nombre + "-" + $scope.nBebidaData.Precio + "-" + $scope.nBebidaData.Categoria);
        });
    }

    UsuarioServicio.obtenerPersonalActivoNombreZona().then(function(success) {
        //console.log(success)
        $scope.obtenerPersonalActivoNombreZona = success;

    })
    UsuarioServicio.obtenerPersonalParadoNombreZona().then(function(success) {
        //console.log(success)
        $scope.obtenerPersonalParadoNombreZona = success;

    })
    UsuarioServicio.obtenerPersonalNombreZona().then(function(success) {
        //console.log(success)
        $scope.obtenerPersonalNombreZona = success;

    })

    UsuarioServicio.obtenerPersonal().then(function(success) {
        //console.log(success)
        $scope.obtenerPersonal = success;

    })

    $scope.trabajadorCalcularHoras = function() {
        console.log("trabajadorHoras" + $scope.trabajadorHoras.id)
        UsuarioServicio.obtenerPersonalHoras($scope.trabajadorHoras.id).then(function(success) {
            //console.log(success)
            $scope.obtenerPersonalHoras = success;
            console.log("obtenerPersonalHoras" + $scope.obtenerPersonalHoras[0].total)

        })
        $ionicPopup.alert({
            title: '<span>Horas trabajadas</span>',
            template: '{{obtenerPersonalHoras[0].Nombre}} {{obtenerPersonalHoras[0].total}} horas',
            scope: $scope
        });
    }
    $scope.accionPersonal = function(id) {
        if (id == 10) {

            $ionicPopup.alert({
                title: '<span class="ok">Activos</span>',
                template: '<ion-list>' +
                    '<ion-item ng-repeat="item in obtenerPersonalActivoNombreZona">' +
                    '{{item.Nombre}}' + ' ( {{item.nombre_zona}} )' + '</ion-item></ion-list>',
                scope: $scope
            });

        } else if (id == 20) {
            $ionicPopup.alert({
                title: '<span>Lista</span>',
                template: '<ion-list>' +
                    '<ion-item ng-repeat="item in obtenerPersonalNombreZona">' +
                    '{{item.Nombre}}' + ' ( {{item.nombre_zona}} )' + '</ion-item></ion-list>',
                scope: $scope
            });
        } else if (id == 30) {
            $ionicPopup.alert({
                title: '<span class="nok">Parados</span>',
                template: '<ion-list>' +
                    '<ion-item ng-repeat="item in obtenerPersonalParadoNombreZona">' +
                    '{{item.Nombre}}' + ' ( {{item.nombre_zona}} )' + '</ion-item></ion-list>',
                scope: $scope
            });
        } else {

            $scope.modal.show();
            $rootScope.accionPersonal = id
            console.log("$rootScope.accionPersonal" + $rootScope.accionPersonal)
        }
    }
    $ionicModal.fromTemplateUrl('templates/personal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.mesaGuardar = function() {
            UsuarioServicio.addMesa($scope.nMesaData.Nombre).then(function(success) {
                $scope.nMesaData.Nombre = "";
                ////console.log("bebida añadida" + $scope.nMesaData.Nombre);
            });
        }
        /*
            $scope.modal.listaBebidasMesaTMP = []
                //$scope.addBebidaMesa = function() {
            $ionicModal.fromTemplateUrl('templates/personal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });
            // }

            // Triggered in the login modal to close it
            $scope.modal.closeLogin = function() {
                $scope.modal.listaBebidasMesaTMP.forEach(function(element) {
                    ////console.log(element)
                    UsuarioServicio.insertarBebida($scope.mesaSeleccionada.idmesa, element.idbebida, element.cantidad).then(function(success) {
                        UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                            ////console.log("-+" + success)
                            $scope.listaBebidasMesa = success;
                        })

                    })

                }, this);
                $scope.modal.hide();
                $scope.modal.listaBebidasMesaTMP = []
            };
            
                $scope.modal.bebidaSeleccionada = function(id) {
                    ////console.log(id)
                    ////console.log($scope.modal.listaBebidas)

                    $scope.modal.listaBebidas.forEach(function(element) {
                        ////console.log(element.nombre)

                        if (element.idbebida == id)
                            if (!UsuarioServicio.userExists($scope.modal.listaBebidasMesaTMP, element.nombre))
                                $scope.modal.listaBebidasMesaTMP.push({ idbebida: element.idbebida, nombre: element.nombre, cantidad: 1 });
                            else
                                $ionicPopup.alert({ template: "Ya lo has agregado", title: "Incluir bebida" });
                            ////console.log($scope.modal.listaBebidasMesaTMP)
                            ////console.log("..." + UsuarioServicio.userExists($scope.modal.listaBebidasMesaTMP, element.nombre));
                            ////console.log()
                    }, this);

                    ////console.log($scope.modal.listaBebidasMesaTMP)
                }*/
    UsuarioServicio.obtenerCategoriasBebidas().then(function(success) {
        ////console.log("listaBebidas" + success)
        $scope.modal.listaCategorias = success;
        //$scope.modal.show();
    })
    $scope.modal.categoriaSeleccionada = function(id) {
        ////console.log("categoriaSeleccionada" + id);

        UsuarioServicio.obtenerBebidasCategorias(id).then(function(success) {
            ////console.log("listaBebidas" + success)
            $scope.modal.listaBebidas = success;
            //$scope.modal.show();
        })
    }
});