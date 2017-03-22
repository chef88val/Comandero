angular.module('starter.controllers', ['starter.services', 'ionic-notification-bar'])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, $rootScope, UsuarioServicio, $localstorage, $notificationBar) {
    /*$notificationBar.timer = 1000;
    $notificationBar.show('Your message here', $notificationBar.SUCCESS);
    */
    $scope.nCategoriaBebidaData = {};
    $scope.nCategoriaPlatoData = {};
    $scope.nBebidaData = {};
    $scope.nPlatoData = {};
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
        //$timeout(function() {
        $scope.closeLogin();
        //}, 1000);
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
        $scope.accionPersonal = $rootScope.accionPersonal
        console.log("modalPersonal" + $scope.accionPersonal + "Service")
            //utilsService.hideModal()
        $scope.hideModal = function() {
            $scope.listaPersonalTMP.forEach(function(element) {
                if ($rootScope.accionPersonal == 1) {
                    UsuarioServicio.entrarPersonal(element.idpersonal).then(function(success) {
                        //$state.go('app.mesas', { reload: true })
                        console.log("entrar" + $rootScope.accionPersonal + "Personal")
                    })
                }
                if ($rootScope.accionPersonal == 2) {
                    UsuarioServicio.sacarPersonal(element.idpersonal).then(function(success) {
                        console.log("sacar" + $rootScope.accionPersonal + "Personal")
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

        $scope.mesaSeleccionada = $rootScope.mesaSeleccionada;
        $scope.listaBebidasMesaTMP = []


        UsuarioServicio.obtenerCategoriasBebidas().then(function(success) {
            ////console.log("listaBebidas" + success)
            $scope.listaCategorias = success;
            //$scope.show();
        })
        $scope.categoriaSeleccionada = function(id) {
            console.log("categoriaSeleccionada" + id);

            UsuarioServicio.obtenerBebidasCategorias(id).then(function(success) {
                console.log("obtenerBebidasCategorias" + success)
                $scope.listaBebidas = success;
                //$scope.show();
            })
        }

        $scope.actualizarBebida = function(idbebida, cc) {
            ////console.log(idbebida)
            //console.log(cc + "cout")
            UsuarioServicio.actualizarBebida($scope.mesaSeleccionada.idmesa, idbebida, cc).then(function(success) {
                $state.go('app.mesas')
            })
        }

        $scope.bebidaSeleccionada = function(id) {
            ////console.log(id)
            ////console.log($scope.listaBebidas)

            $scope.listaBebidas.forEach(function(element) {
                ////console.log(element.nombre)

                if (element.idbebida == id)
                    if (!UsuarioServicio.userExists($scope.listaBebidasMesaTMP, element.nombre))
                        $scope.listaBebidasMesaTMP.push({ idbebida: element.idbebida, nombre: element.nombre, cantidad: 1 });
                    else
                        $ionicPopup.alert({ template: "Ya lo has agregado", title: "Incluir bebida" });
                    ////console.log($scope.listaBebidasMesaTMP)
                    ////console.log("..." + UsuarioServicio.userExists($scope.listaBebidasMesaTMP, element.nombre));
                    ////console.log()
            }, this);

            ////console.log($scope.listaBebidasMesaTMP)
        }


        /* $scope.addBebidaMesa = function() {
             $ionicfromTemplateUrl('templates/dd.html', {
                 scope: $scope
             }).then(function(modal) {
                 $scope.modal = modal;
             });
         }*/

        // Triggered in the login modal to close it
        $scope.hideModal = function() {
            $scope.listaBebidasMesaTMP.forEach(function(element) {
                console.log(element)
                UsuarioServicio.insertarBebida($scope.mesaSeleccionada.idmesa, element.idbebida, element.cantidad).then(function(success) {
                    UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                        ////console.log("-+" + success)
                        $scope.listaBebidasMesa = success;
                        //$scope.nPersonaMesaValueActualizada();
                    })

                })

            }, this);
            $scope.modal.hide();
            $scope.listaBebidasMesaTMP = []
            $state.go('app.mesas')
        };
        /*$scope.hideModal = function() {
            $scope.modal.hide();
            $state.go('app.mesas')
        }*/

    })
    .controller('modalPlatoCtrl', function($scope, $rootScope, modalPlatoService, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        $scope.modalPlatoService = modalPlatoService
            //utilsService.hideModal()

        $scope.mesaSeleccionada = $rootScope.mesaSeleccionada;
        $scope.listaPlatosMesaTMP = []


        UsuarioServicio.obtenerCategoriasPlatos().then(function(success) {
            ////console.log("listaPlatos" + success)
            $scope.listaCategorias = success;
            //$scope.show();
        })
        $scope.categoriaSeleccionada = function(id) {
            console.log("categoriaSeleccionada" + id);

            UsuarioServicio.obtenerPlatosCategorias(id).then(function(success) {
                console.log("obtenerPlatosCategorias" + success)
                $scope.listaPlatos = success;
                //$scope.show();
            })
        }

        $scope.actualizarPlato = function(idplato, cc) {
            ////console.log(idplato)
            //console.log(cc + "cout")
            UsuarioServicio.actualizarPlato($scope.mesaSeleccionada.idmesa, idplato, cc).then(function(success) {
                $state.go('app.mesas')
            })
        }

        $scope.platoSeleccionada = function(id) {
            ////console.log(id)
            ////console.log($scope.listaPlatos)

            $scope.listaPlatos.forEach(function(element) {
                ////console.log(element.nombre)

                if (element.idplato == id)
                    if (!UsuarioServicio.userExists($scope.listaPlatosMesaTMP, element.nombre))
                        $scope.listaPlatosMesaTMP.push({ idplato: element.idplato, nombre: element.nombre, cantidad: 1 });
                    else
                        $ionicPopup.alert({ template: "Ya lo has agregado", title: "Incluir plato" });
                    ////console.log($scope.listaPlatosMesaTMP)
                    ////console.log("..." + UsuarioServicio.userExists($scope.listaPlatosMesaTMP, element.nombre));
                    ////console.log()
            }, this);

            ////console.log($scope.listaPlatosMesaTMP)
        }


        /* $scope.addPlatoMesa = function() {
             $ionicfromTemplateUrl('templates/dd.html', {
                 scope: $scope
             }).then(function(modal) {
                 $scope.modal = modal;
             });
         }*/

        // Triggered in the login modal to close it
        $scope.hideModal = function() {
            $scope.listaPlatosMesaTMP.forEach(function(element) {
                console.log(element)
                UsuarioServicio.insertarPlato($scope.mesaSeleccionada.idmesa, element.idplato, element.cantidad).then(function(success) {
                    UsuarioServicio.obtenerPlatosMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                        ////console.log("-+" + success)
                        $scope.listaPlatosMesa = success;
                        //$scope.nPersonaMesaValueActualizada();
                    })

                })

            }, this);
            $scope.modal.hide();
            $scope.listaPlatosMesaTMP = []
            $state.go('app.mesas')
        };
        /*$scope.hideModal = function() {
            $scope.modal.hide();
            $state.go('app.mesas')
        }*/

    })
    .controller('modalFacturarCtrl', function($scope, $rootScope, modalFacturarService, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        $scope.modalFacturarService = modalFacturarService
        $scope.metodosPago = [{ nombre: "Efectivo", icon: "ion-cash" }, { nombre: "Tarjeta", icon: "ion-card" }]
        $scope.totalDineroMesaSeleccionada = $rootScope.totalDineroMesaSeleccionada
        $scope.mesaSeleccionada = $rootScope.mesaSeleccionada
        console.log($rootScope.totalDineroMesaSeleccionada + "$rootScope.totalDineroMesaSeleccionada")
        $scope.pagoSeleccionada = function(id) {
                /*console.log("pagoSeleccionada" + id)
                if (id === "Efectivo") $scope.metodoPago = "Efectivo";
                else if (id === "Tarjeta") $scope.metodoPago = "Tarjeta"*/
                $ionicPopup.confirm({
                    title: 'Cerrar mesa ' + $scope.mesaSeleccionada.referencia,
                    template: 'Estas segura que deseas cerrar la mesa <b>' + id + '</b>'
                }).then(function(res) {
                    if (res) {

                        UsuarioServicio.addPagoMesa($scope.mesaSeleccionada.idmesa, id, $scope.totalDineroMesaSeleccionada).then(function(success) {
                            UsuarioServicio.cambiarEstadoMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                                UsuarioServicio.cerrarMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
                                    $scope.hideModal();
                                    $state.go('app.mesas', { reload: true })
                                })
                            })
                        })
                    } else {
                        console.log('You are not sure');
                    }
                });;
            }
            //utilsService.hideModal()
        $scope.hideModal = function() { $scope.modal.hide() }

    })
    .controller('MesaCtrl', function($scope, modalBebidaService, modalFacturarService, modalPlatoService, $rootScope, $state, $stateParams, $ionicModal, $ionicPopup, $ionicHistory, UsuarioServicio) {
        //$scope.modalPersonalService = modalPersonalService
        $scope.nPersonaMesaValue = 1;
        $scope.modalPlatoService = modalPlatoService
        $scope.modalFacturarService = modalFacturarService
        $scope.modalBebidaService = modalBebidaService
        $scope.goFacturar = function() { $scope.modalFacturarService.showModal() }
        $scope.addBebida = function() { $scope.modalBebidaService.showModal() }
        $scope.addPlato = function() { $scope.modalPlatoService.showModal() }
        UsuarioServicio.obtenerPlatosMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
            $scope.listaPlatosMesa = success;
        })

        UsuarioServicio.obtenerBebidasMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
            ////console.log("-+" + success)
            $scope.listaBebidasMesa = success;
        })

        $scope.resumenBebidaMesa = function() {
            $ionicPopup.show({
                template: '<ion-scroll style="height: 370px"><ion-list>                                ' +
                    '  <ion-item ng-repeat="item in listaBebidasMesa"> ' +
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
        $scope.resumenPlatoMesa = function() {
            $ionicPopup.show({
                template: '<ion-scroll style="height: 370px"><ion-list>                                ' +
                    '  <ion-item ng-repeat="item in listaPlatosMesa"> ' +
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
        UsuarioServicio.obtenerTotalDineroMesa($scope.mesaSeleccionada.idmesa).then(function(success) {
            console.log($scope.nPersonaMesaValue + "-" + success[0].total_mesa)
            $scope.totalDineroMesaSeleccionada = success[0].total_mesa
            $scope.totalDineroMesaSeleccionadaPersona = success[0].total_mesa / $scope.nPersonaMesaValue;
            $rootScope.totalDineroMesaSeleccionada = success[0].total_mesa
            console.log("$rootScope.totalDineroMesaSeleccionada" + $rootScope.totalDineroMesaSeleccionada)

        })

        $scope.nPersonaMesaValueActualizada = function(n) {

            if (n.nPersonaMesaValue == "") $rootScope.totalDineroMesaSeleccionada = $scope.totalDineroMesaSeleccionadaPersona

            //$rootScope.totalDineroMesaSeleccionada = $scope.totalDineroMesaSeleccionadaPersona / n.nPersonaMesaValue
            console.log("$rootScope.nPersonaMesaValueActualizada" + $rootScope.totalDineroMesaSeleccionada)
        }
        $scope.totalDineroMesaSeleccionadaPersona = $scope.totalDineroMesaSeleccionada / $scope.nPersonaMesaValue;

        $scope.goBack = function() { $ionicHistory.goBack(); }
        $scope.mostrarBebidaValue = false;
        $scope.mostrarBebida = function() { $scope.mostrarBebidaValue = !$scope.mostrarBebidaValue }
        $scope.mostrarPlatoValue = false;
        $scope.mostrarPlato = function() { $scope.mostrarPlatoValue = !$scope.mostrarPlatoValue }
        $scope.mostrarDetalleValue = false;
        $scope.mostrarDetalle = function() { $scope.mostrarDetalleValue = !$scope.mostrarDetalleValue }
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
    $scope.mostrarBebidaValue = false;
    $scope.mostrarBebida = function() { $scope.mostrarBebidaValue = !$scope.mostrarBebidaValue }
    $scope.mostrarBebidaAddValue = false;
    $scope.mostrarBebidaAdd = function() { $scope.mostrarBebidaAddValue = !$scope.mostrarBebidaAddValue }
    $scope.mostrarBebidaCategoriaValue = false;
    $scope.mostrarBebidaCategoria = function() { $scope.mostrarBebidaCategoriaValue = !$scope.mostrarBebidaCategoriaValue }
    $scope.mostrarBebidaActualizarValue = false;
    $scope.mostrarBebidaActualizar = function() { $scope.mostrarBebidaActualizarValue = !$scope.mostrarBebidaActualizarValue }


    $scope.mostrarPlatoValue = false;
    $scope.mostrarPlato = function() { $scope.mostrarPlatoValue = !$scope.mostrarPlatoValue }
    $scope.mostrarPlatoAddValue = false;
    $scope.mostrarPlatoAdd = function() { $scope.mostrarPlatoAddValue = !$scope.mostrarPlatoAddValue }
    $scope.mostrarPlatoCategoriaValue = false;
    $scope.mostrarPlatoCategoria = function() { $scope.mostrarPlatoCategoriaValue = !$scope.mostrarPlatoCategoriaValue }
    $scope.mostrarPlatoActualizarValue = false;
    $scope.mostrarPlatoActualizar = function() { $scope.mostrarPlatoActualizarValue = !$scope.mostrarPlatoActualizarValue }

    $scope.mostrarMesaAddValue = false;
    $scope.mostrarMesaAdd = function() { $scope.mostrarMesaAddValue = !$scope.mostrarMesaAddValue }

    $scope.mostrarPersonalValue = false;
    $scope.mostrarPersonal = function() { $scope.mostrarPersonalValue = !$scope.mostrarPersonalValue }

    $scope.mostrarCerrarCajaValue = false;
    $scope.mostrarCerrarCaja = function() { $scope.mostrarCerrarCajaValue = !$scope.mostrarCerrarCajaValue }

    $scope.mostrarPersonalAddZonaValue = false;
    $scope.mostrarPersonalAddZona = function() { $scope.mostrarPersonalAddZonaValue = !$scope.mostrarPersonalAddZonaValue }


    $scope.mostrarPersonalHorasValue = false;
    $scope.mostrarPersonalHoras = function() { $scope.mostrarPersonalHorasValue = !$scope.mostrarPersonalHorasValue }


    UsuarioServicio.getCategoriaBebida().then(function(success) { $scope.listaCategoriasBebida = success; });
    UsuarioServicio.getCategoriaPlato().then(function(success) { $scope.listaCategoriasPlato = success; });
    UsuarioServicio.obtenerBebidas().then(function(success) { $scope.listaBebidas = success })
    UsuarioServicio.obtenerPlatos().then(function(success) { $scope.listaPlatos = success })
    $scope.categoriaBebidaGuardar = function() {
        //console.log($scope.nCategoriaBebidaData.Nombre)
        console.log($scope.nCategoriaBebidaData)
        UsuarioServicio.addCategoriaBebida($scope.nCategoriaBebidaData.Nombre).then(function(success) {
            $scope.nCategoriaBebidaData.Nombre = "";
            ////console.log("categoria añadida" + $scope.nCategoriaData.Nombre);
            UsuarioServicio.getCategoriaBebida().then(function(success) { $scope.listaCategoriasBebida = success; });
            $state.go('app.admin', { reload: true })
        });
    }
    $scope.categoriaPlatoGuardar = function() {
        UsuarioServicio.addCategoriaPlato($scope.nCategoriaPlatoData.Nombre).then(function(success) {
            $scope.nCategoriaPlatoData.Nombre = "";
            ////console.log("categoria añadida" + $scope.nCategoriaData.Nombre);
            UsuarioServicio.getCategoriaPlato().then(function(success) { $scope.listaCategoriasPlato = success; });
            $state.go('app.admin', { reload: true })
        });
    }
    UsuarioServicio.obtenerMesaPagos().then(function(success) { $scope.listaMesasPago = success })
    $scope.cerrarTurno = function() {
        UsuarioServicio.obtenerMesasAbiertas().then(function(success) {
            console.log($scope.listaMesasPago)
            if (success[0].total == 0) {
                if (angular.isUndefined($scope.listaMesasPago[0]))
                    $ionicPopup.alert({ title: "Hay habido un error", template: "No hay mesas que cerrar" });
                else
                    UsuarioServicio.cerrarTurno().then(function(success) {
                        $ionicPopup.alert({ title: "Cerrar turno", template: "Well " + $scope.listaMesasPago[0].total + " dones" });
                        $state.go('app.mesas')
                    })
            } else if (success[0].total >= 1) {
                $ionicPopup.alert({ title: "Cerrar turno", template: "Hay mesas abiertas" });
                $state.go('app.mesas')
            } else if (angular.isUndefined(success[0].total)) $ionicPopup.alert({ title: "Cerrar turno", template: "Hay habido un error" });
        })

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
            UsuarioServicio.obtenerBebidas().then(function(success) { $scope.listaBebidas = success })
                ////console.log("bebida añadida" + $scope.nBebidaData.Nombre + "-" + $scope.nBebidaData.Precio + "-" + $scope.nBebidaData.Categoria);
        });
    }

    $scope.bebidaActualizar = function() {
        console.log("$scope.nBebidaDataActualizar.Nombre, $scope.nBebidaDataActualizar.Precio" + $scope.nBebidaDataActualizar.Nombre + $scope.nBebidaDataActualizar.Categoria + $scope.nBebidaDataActualizar.Precio)
        UsuarioServicio.updateBebida($scope.nBebidaDataActualizar.Nombre, $scope.nBebidaDataActualizar.Precio, $scope.nBebidaDataActualizar.Categoria).then(function(success) {
            $scope.nBebidaDataActualizar.Nombre = "";
            $scope.nBebidaDataActualizar.Precio = "";
            $scope.nBebidaDataActualizar.Categoria = 0;
            UsuarioServicio.obtenerBebidas().then(function(success) { $scope.listaBebidas = success })
                ////console.log("bebida añadida" + $scope.nBebidaData.Nombre + "-" + $scope.nBebidaData.Precio + "-" + $scope.nBebidaData.Categoria);
        });
    }

    $scope.platoGuardar = function() {
        UsuarioServicio.addPlato($scope.nPlatoData.Nombre, $scope.nPlatoData.Precio, $scope.nPlatoData.Categoria).then(function(success) {
            $scope.nPlatoData.Nombre = "";
            $scope.nPlatoData.Precio = "";
            UsuarioServicio.obtenerPlatos().then(function(success) { $scope.listaPlatos = success })
                ////console.log("plato añadida" + $scope.nPlatoData.Nombre + "-" + $scope.nPlatoData.Precio + "-" + $scope.nPlatoData.Categoria);
        });
    }

    $scope.platoActualizar = function() {
        console.log("$scope.nPlatoDataActualizar.Nombre, $scope.nPlatoDataActualizar.Precio" + $scope.nPlatoDataActualizar.Nombre + $scope.nPlatoDataActualizar.Categoria + $scope.nPlatoDataActualizar.Precio)
        UsuarioServicio.updatePlato($scope.nPlatoDataActualizar.Nombre, $scope.nPlatoDataActualizar.Precio, $scope.nPlatoDataActualizar.Categoria).then(function(success) {
            $scope.nPlatoDataActualizar.Nombre = "";
            $scope.nPlatoDataActualizar.Precio = "";
            $scope.nPlatoDataActualizar.Categoria = 0;
            UsuarioServicio.obtenerPlatos().then(function(success) { $scope.listaPlatos = success })
                ////console.log("plato añadida" + $scope.nPlatoData.Nombre + "-" + $scope.nPlatoData.Precio + "-" + $scope.nPlatoData.Categoria);
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
        /*$scope.pagoSeleccionada = function(id) {
            
            $ionicPopup.show({
                title: 'Cerrar mesa ' + id,
                template: 'Estas segura que deseas cerrar la mesa <b>' + id + '</b>',
                scope: $scope,
                buttons: [
                    { text: "<i class='icon ion-android-cancel'></i>" },
                    { text: "<i class='icon ion-cash'></i>", type: 'button-positive', onTap: function(e) { return "Efectivo" } },
                    { text: "<i class='icon ion-card'></i>", type: 'button-assertive', onTap: function(e) { return "Tarjeta" } }
                ]
            }).then(function(res) {
                if (res) {
                    var mesaSeleccionada = UsuarioServicio.devolverEtiqueta($scope.listaMesasPago, "referencia", id, "idmesa")
                    var mesaSeleccionadaTotal = UsuarioServicio.devolverEtiqueta($scope.listaMesasPago, "referencia", id, "cantidad")
                    UsuarioServicio.addPagoMesa(mesaSeleccionada, id, mesaSeleccionadaTotal).then(function(success) {
                        UsuarioServicio.cambiarEstadoMesa(mesaSeleccionada).then(function(success) {
                            UsuarioServicio.cerrarMesa(mesaSeleccionada).then(function(success) {
                                //$state.go('app.admin', { reload: true })
                            })
                        })
                    })

                } else {
                    console.log('You are not sure');
                }
            });;
        }
        $scope.pagoSeleccionadaAccion = function(idmesa, id) {
            console.log('You are not sure' + idmesa);
            var mesaSeleccionada = UsuarioServicio.devolverEtiqueta($scope.listaMesasPago, "referencia", idmesa, "idmesa")
            var mesaSeleccionadaTotal = UsuarioServicio.devolverEtiqueta($scope.listaMesasPago, "referencia", idmesa, "cantidad")
            UsuarioServicio.addPagoMesa(mesaSeleccionada, id, mesaSeleccionadaTotal).then(function(success) {
                UsuarioServicio.cambiarEstadoMesa(mesaSeleccionada).then(function(success) {
                    UsuarioServicio.cerrarMesa(mesaSeleccionada).then(function(success) {
                        $state.go('app.mesas', { reload: true })
                    })
                })
            })
        }*/
    $scope.accionPersonal = function(id) {
        $rootScope.accionPersonal = id
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
        } else if (id == 1) {
            $scope.modalPersonalService.showModal();

        } else if (id == 2) {
            $scope.modalPersonalService.showModal();
        } else {

            $scope.modal.show();
            //$rootScope.accionPersonal = id
            console.log("$rootScope.accionPersonal" + $rootScope.accionPersonal)
        }
    }

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