'use strict';

/* Services */

angular.module('starter.services', ['ionic', 'ionic-notification-bar'])

.factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    .service('UsuarioServicio', ['$http', '$rootScope', '$ionicPopup', '$state', '$notificationBar', '$ionicLoading', function($http, $rootScope, $ionicPopup, $state, $notificationBar, $ionicLoading) {
        //var patron = 'http://' + $rootScope.ipServidor + ':' + $rootScope.portServidor;
        //console.log("UsuarioServicio$rootScope.ipServidor" + $rootScope.ipServidor)

        var patron = 'http://192.168.1.132:5000'; // + $rootScope.portServidor;
        var servicio = this;
        return {
            obtenerConexion: function() {
                //
                //console.log(servicio.obtenerConexion())
                return $http.get($rootScope.patron + '/obtenerConexion').then(valorOK, valorNOK2("No hay conexion con el servidor<br><hr>IP no valida", "Error de conexion"));
            },
            obtenerBebidas: function() {
                return $http.get($rootScope.patron + '/obtenerBebidas').then(valorOK, valorNOK("obtenerBebidas-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerCategoriasBebidas: function() {
                return $http.get($rootScope.patron + '/obtenerCategoriasBebidas').then(valorOK, valorNOK("obtenerCategoriasBebidas-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerBebidasCategorias: function(id) {
                return $http.get($rootScope.patron + '/obtenerBebidasCategorias/' + id).then(valorOK, valorNOK("obtenerBebidasCategorias-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerBebidasMesa: function(id) {
                return $http.get($rootScope.patron + '/obtenerBebidasMesa/' + id).then(valorOK, valorNOK("obtenerBebidasMesa-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPlatos: function() {
                return $http.get($rootScope.patron + '/obtenerPlatos').then(valorOK, valorNOK("obtenerPlatos-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerCategoriasPlatos: function() {
                return $http.get($rootScope.patron + '/obtenerCategoriasPlatos').then(valorOK, valorNOK("obtenerCategoriasPlatos-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPlatosCategorias: function(id) {
                return $http.get($rootScope.patron + '/obtenerPlatosCategorias/' + id).then(valorOK, valorNOK("obtenerPlatosCategorias-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPlatosMesa: function(id) {
                return $http.get($rootScope.patron + '/obtenerPlatosMesa/' + id).then(valorOK, valorNOK("obtenerPlatosMesa-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerMesas: function() {
                if (this.obtenerConexion())
                    return $http.get($rootScope.patron + '/obtenerMesas').then(valorOK, valorNOK("obtenerMesas-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerTotalDineroMesa: function(idmesa) {
                return $http.get($rootScope.patron + '/obtenerTotalDineroMesa/' + idmesa).then(valorOK, valorNOK("obtenerTotalDineroMesa-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerMesasEstado: function(estado) {
                return $http.get($rootScope.patron + '/obtenerMesasEstado/' + estado).then(valorOK, valorNOK("obtenerMesasEstado-No se han obtenido todos los datos", "Error de conexion"));
            },
            insertarBebida: function(idmesa, idbebida, cantidad) {
                console.log($rootScope.patron + '/bebida/insertarBebida/' + idmesa + '/' + idbebida + '/' + cantidad)
                return $http.post($rootScope.patron + '/bebida/insertarBebida/' + idmesa + '/' + idbebida + '/' + cantidad).then(valorOK, valorNOK("insertarBebida-No se han obtenido todos los datos", "Error de conexion"));
            },
            actualizarBebida: function(idmesa, idbebida, cantidad) {
                return $http.put($rootScope.patron + '/bebida/actualizarBebida/' + idmesa + '/' + idbebida + '/' + cantidad).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            borrarBebida: function(idmesa, idbebida) {
                return $http.post($rootScope.patron + '/bebida/borrarBebida/' + idmesa + '/' + idbebida).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            insertarPlato: function(idmesa, idplato, cantidad) {
                console.log($rootScope.patron + '/plato/insertarPlato/' + idmesa + '/' + idplato + '/' + cantidad)
                return $http.post($rootScope.patron + '/plato/insertarPlato/' + idmesa + '/' + idplato + '/' + cantidad).then(valorOK, valorNOK("insertarPlato-No se han obtenido todos los datos", "Error de conexion"));
            },
            actualizarPlato: function(idmesa, idplato, cantidad) {
                return $http.put($rootScope.patron + '/plato/actualizarPlato/' + idmesa + '/' + idplato + '/' + cantidad).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            borrarPlato: function(idmesa, idplato) {
                return $http.post($rootScope.patron + '/plato/borrarPlato/' + idmesa + '/' + idplato).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            abrirMesa: function(idmesa) {
                return $http.put($rootScope.patron + '/camarero/abrirMesa/' + idmesa).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarEstadoMesa: function(referencia) {
                return $http.put($rootScope.patron + '/camarero/cambiarEstadoMesa/' + referencia).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addPagoMesa: function(referencia, tipo, cantidad) {
                return $http.post($rootScope.patron + '/camarero/addPagoMesa/' + referencia + '/' + tipo + '/' + cantidad).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cerrarMesa: function(idmesa) {
                return $http.put($rootScope.patron + '/camarero/cerrarMesa/' + idmesa).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            admin: function() {
                return $http.get($rootScope.patron + '/admin').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            adminUsers: function() {
                return $http.get($rootScope.patron + '/admin/users').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            adminLogin: function(clave) {
                return $http.get($rootScope.patron + '/admin/adminLogin/' + clave).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            adminUsersNombre: function(nombre) {
                return $http.get($rootScope.patron + '/admin/users/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addBebida: function(nombre, precio, categoria) {
                return $http.post($rootScope.patron + '/admin/addBebida/' + nombre + '/' + precio + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            updateBebida: function(nombre, precio, categoria) {
                return $http.put($rootScope.patron + '/admin/updateBebida/' + nombre + '/' + precio + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarPrecioBebida: function(nombre, precio) {
                return $http.put($rootScope.patron + '/admin/cambiarPrecioBebida/' + nombre + '/' + precio).then(valorOK, valorNOK("cambiarPrecioBebida-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarCategoriaBebida: function(nombre, categoria) {
                return $http.put($rootScope.patron + '/admin/cambiarCategoriaBebida/' + nombre + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            deleteBebida: function(nombre) {
                return $http.post($rootScope.patron + '/admin/deleteBebida/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addCategoriaBebida: function(nombre) {
                return $http.post($rootScope.patron + '/admin/addCategoriaBebida/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            getCategoriaBebida: function() {
                return $http.get($rootScope.patron + '/admin/getCategoriaBebida/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addCategoriaPlato: function(nombre) {
                return $http.post($rootScope.patron + '/admin/addCategoriaPlato/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            getCategoriaPlato: function() {
                return $http.get($rootScope.patron + '/admin/getCategoriaPlato/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addPlato: function(nombre, precio, categoria) {
                return $http.post($rootScope.patron + '/admin/addPlato/' + nombre + '/' + precio + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            updatePlato: function(nombre, precio, categoria) {
                return $http.put($rootScope.patron + '/admin/updatePlato/' + nombre + '/' + precio + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarPrecioPlato: function(nombre, precio) {
                return $http.put($rootScope.patron + '/admin/cambiarPrecioPlato/' + nombre + '/' + precio).then(valorOK, valorNOK("cambiarPrecioPlato-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarCategoriaPlato: function(nombre, categoria) {
                return $http.put($rootScope.patron + '/admin/cambiarCategoriaPlato/' + nombre + '/' + categoria).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            deletePlato: function(nombre) {
                return $http.post($rootScope.patron + '/admin/deletePlato/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addMesa: function(referencia) {
                return $http.post($rootScope.patron + '/admin/addMesa/' + referencia).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addMesaPax: function(referencia, pax) {
                return $http.post($rootScope.patron + '/admin/addMesaPax/' + referencia + '/' + pax).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            deleteMesa: function(referencia) {
                return $http.post($rootScope.patron + '/admin/deleteMesa/' + referencia).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addPersonal: function(nombre, zona, cargo) {
                return $http.post($rootScope.patron + '/admin/addPersonal/' + nombre + '/' + zona + '/' + cargo).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cambiarPersonal: function(nombre) {
                return $http.put($rootScope.patron + '/admin/cambiarPrecioPersonal/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            addZonaPersonal: function(nombre) {
                return $http.post($rootScope.patron + '/admin/addZonaPersonal/' + nombre).then(valorOK, valorNOK("-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerZonas: function() {
                return $http.get($rootScope.patron + '/admin/obtenerZonas/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonal: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonal/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerMesaPagos: function() {
                return $http.get($rootScope.patron + '/admin/obtenerMesaPagos/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerMesasAbiertas: function() {
                return $http.get($rootScope.patron + '/admin/obtenerMesasAbiertas/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalHoras: function(id) {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalHoras/' + id).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalActivo: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalActivo/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalParado: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalParado/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalZona: function(id) {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalZona/' + id).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalZonaActivo: function(id) {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalZonaActivo/' + id).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalZonaParado: function(id) {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalZonaParado/' + id).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalActivoNombreZona: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalActivoNombreZona/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalParadoNombreZona: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalParadoNombreZona/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            obtenerPersonalNombreZona: function() {
                return $http.get($rootScope.patron + '/admin/obtenerPersonalNombreZona/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            deleteZonaPersonal: function(nombre) {
                return $http.post($rootScope.patron + '/admin/deleteZonaPersonal/' + nombre).then(valorOK, valorNOK("deleteZonaPersonal-No se han obtenido todos los datos", "Error de conexion"));
            },
            deletePersonal: function(nombre) {
                return $http.post($rootScope.patron + '/admin/deletePersonal/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            entrarPersonal: function(nombre) {
                return $http.post($rootScope.patron + '/admin/entrarPersonal/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            sacarPersonal: function(nombre) {
                return $http.post($rootScope.patron + '/admin/sacarPersonal/' + nombre).then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            cerrarTurno: function() {
                return $http.post($rootScope.patron + '/admin/cerrarTurno/').then(valorOK, valorNOK("1-No se han obtenido todos los datos", "Error de conexion"));
            },
            buscarporID: function(array, key, value) {
                //console.log(array + key + value)
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key] == value) {
                        return i;
                    }
                }

            },
            userExists: function(arr, username) {
                return arr.some(function(el) {
                    return el.nombre === username;
                });
            },
            devolverEtiqueta: function(array, key, value, nkey) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key] == value) {
                        console.log(array[i][nkey])
                        return array[i][nkey];
                    }
                }
            }

        }
        var config = {
            async: false,
            crossDomain: true,
            withCredentials: true,
            headers: {
                // "Authorization": "Basic ZGVpZGU6ZGlkYQ==",

                "Accept": "application/json; charset=utf-8"
            }
        };


        function buscarporID(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return i;
                }
            }

        }

        function actualizarTiempos(success) {
            /*if(success =="undefined" || success == undefined || success.length <9){
                console.log("sduc")
            }else{*/
            for (var i = 0; i < success.length; i++) {
                if (success[i].Fecha != null) {
                    success[i].Fecha = success[i].Fecha.replace("T", " ");
                    success[i].Fecha = success[i].Fecha.replace("Z", " ");

                }
                if (success[i].tiempoAtendida != null) {
                    success[i].tiempoAtendida = success[i].tiempoAtendida.replace("T", " ");
                    success[i].tiempoAtendida = success[i].tiempoAtendida.replace("Z", " ");

                }
                if (success[i].tiempoSolucionada != null) {
                    success[i].tiempoSolucionada = success[i].tiempoSolucionada.replace("T", " ");
                    success[i].tiempoSolucionada = success[i].tiempoSolucionada.replace("Z", " ");
                }

            }

            //}

            return success;
        }

        function actualizarTiemposChat(success) {
            /*if(success =="undefined" || success == undefined || success.length <9){
                console.log("sduc")
            }else{*/
            for (var i = 0; i < success.length; i++) {
                if (success[i].Creado != null) {
                    success[i].Creado = success[i].Creado.replace("T", " ");
                    success[i].Creado = success[i].Creado.replace("Z", " ");

                }
            }

            //}

            return success;
        }

        function valorOK(res) {
            //DevExpress.ui.dialog.alert("OK","Conexión realizada"); 
            //$notificationBar.timer = 1000;
            //str.replace("http://192.168.1.19:5000/", "")
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $rootScope.statusServicio = true;
            let str = res.config.url
            if (res.status == 200) {
                $ionicLoading.hide();
                $notificationBar.show("OK", $notificationBar.SUCCESS);
            }
            return res.data;
        }
        /* function valorOK(res, titulo) {
            //DevExpress.ui.dialog.alert("OK","Conexión realizada"); 
            //$notificationBar.timer = 1000;
            $notificationBar.show(titulo, $notificationBar.SUCCESS);
            console.log(res)
            $rootScope.statusServicio = true;
            //console.log("res.data" + res.data);
            return res;
        }*/

        function valorNOK(error, tituloerror) {
            return function() {
                $notificationBar.show('No se han aplciado los cambios', $notificationBar.ALERT);
                //$ionicPopup.alert({ template: error, title: tituloerror });
                $rootScope.statusServicio = false;
            }

            // console.log("-"+$rootScope.statusServicio);//return function () {DevExpress.ui.dialog.alert("1"+error, "error", 1000); }; 
        }

        function valorNOK2(error, tituloerror) {
            return function() {
                $notificationBar.show('No se haconectado con el servidor', $notificationBar.ALERT);
                $ionicPopup.alert({ template: error, title: tituloerror });
                $rootScope.statusServicio = false;
                $state.go('app.ajustes', { reload: true })
            }

            // console.log("-"+$rootScope.statusServicio);//return function () {DevExpress.ui.dialog.alert("1"+error, "error", 1000); }; 
        }

        function recorrerArray(array) {
            var resultado = "",
                i = 0,
                valorresultado = "";
            for (var elemento in array) {
                //valorresultado = array[elemento];
                resultado = resultado.concat("/", array[elemento])
                    //i++;
            }
            return resultado
        }

    }]).factory('socket', function($rootScope) {
        //if (angular.isDefined($rootScope.ipServidor) || angular.isDefined($rootScope.portServidor))
        var socket = io.connect('http://' + $rootScope.ipServidor + ':' + $rootScope.portServidor);
        /*else
            var socket = io.connect();*/
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    })
    .factory('intent', function($rootScope) {
        var intent = { data: null };

        intent.setData = function(data) {
            intent.data = data;
            $rootScope.$broadcast('intent');
        };

        intent.getData = function() {
            return intent.data;
        };

        return intent;
    })

.service('modalPersonalService', function($ionicModal) {
        this.showModal = function() {

            var service = this;

            $ionicModal.fromTemplateUrl('templates/modal/personal.html', {
                scope: null,
                controller: 'modalPersonalCtrl'
            }).then(function(modal) {
                service.modal = modal;
                service.modal.show();
            });
        };

        this.hideModal = function() {
            this.modal.hide();
        };
    })
    .service('modalBebidaService', function($ionicModal) {
        this.showModal = function() {

            var service = this;

            $ionicModal.fromTemplateUrl('templates/modal/bebida.html', {
                scope: null,
                controller: 'modalBebidaCtrl'
            }).then(function(modal) {
                service.modal = modal;
                service.modal.show();
            });
        };

        this.hideModal = function() {
            this.modal.hide();
        };
    })
    .service('modalPlatoService', function($ionicModal) {
        this.showModal = function() {

            var service = this;

            $ionicModal.fromTemplateUrl('templates/modal/plato.html', {
                scope: null,
                controller: 'modalPlatoCtrl'
            }).then(function(modal) {
                service.modal = modal;
                service.modal.show();
            });
        };

        this.hideModal = function() {
            this.modal.hide();
        };
    })
    .service('modalFacturarService', function($ionicModal) {
        this.showModal = function() {

            var service = this;

            $ionicModal.fromTemplateUrl('templates/modal/facturar.html', {
                scope: null,
                controller: 'modalFacturarCtrl'
            }).then(function(modal) {
                service.modal = modal;
                service.modal.show();
            });
        };

        this.hideModal = function() {
            this.modal.hide();
        };
    });