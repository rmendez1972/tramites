var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
/**
* Component()
* Este es el componente de la clase
* @author: Angel Lara
* @return {Component} Component
*/
var Ubicar = /** @class */ (function () {
    /**
    * class constructor()
    * Constructor de la clase
    * @author: Angel Lara
    * @return {constructor} constructor
    */
    function Ubicar(
    /**
    * Variables local
    * @param {AlertController} alertCtrl
    */
    alertCtrl, 
    /**
    * Variables local
    * @param {CallNumber} callNumber
    */
    callNumber) {
        this.alertCtrl = alertCtrl;
        this.callNumber = callNumber;
        /**
        * Variables local
        * @param {any} myPosition
        */
        this.myPosition = {};
        /**
        * Variables local
        * @param {any} markers
        */
        this.markers = [
            {
                position: {
                    latitude: 18.499035,
                    longitude: -88.3118765,
                },
                title: 'SEDETUS CHETUMAL',
                icon: 'assets/icon/logo.png',
                animation: 'DROP',
            },
            {
                position: {
                    latitude: 21.1608994,
                    longitude: -86.8515999,
                },
                title: 'SEDETUS CANCUN 1',
                icon: 'assets/icon/logo.png',
                animation: 'DROP',
            },
            {
                position: {
                    latitude: 21.1438652,
                    longitude: -86.8223822,
                },
                title: 'SEDETUS CANCUN PLAZA VIVENDI',
                icon: 'assets/icon/logo.png',
                animation: 'DROP',
            },
            {
                position: {
                    latitude: 20.5054173,
                    longitude: -86.9431962,
                },
                title: 'SEDETUS COZUMEL',
                icon: 'assets/icon/logo.png',
                animation: 'DROP',
            },
        ];
    }
    ;
    /**
    * ionViewWillEnter()
    * Metodo de clase para llamar al invocador del mapa
    * @author: Angel Lara
    * @param {void}
    * @return {method}
    */
    Ubicar.prototype.ionViewWillEnter = function () {
        this.loadMap();
    };
    ;
    /**
    * loadMap()
    * Este Metodo es para iniciar el mapa
    * @author: Angel Lara
    * @param {void }
    * @return {void}
    */
    Ubicar.prototype.loadMap = function () {
        var _this = this;
        /**
        * Creando variable de tipo html para el mapa
        */
        var element = document.getElementById('map_canvas');
        /**
        * variable para crear el mapa
        */
        this.map = GoogleMaps.create(element);
        /**
        * Declarando opciones de control del mapa
        */
        this.map.setOptions({
            controls: {
                compass: true,
                myLocation: true,
                myLocationButton: true,
                indoorPicker: true,
                streetviewcontrol: true,
                zoom: true,
                mapToolbar: true
            },
            styles: [],
            gestures: {
                scroll: true,
                tilt: true,
                zoom: true,
                rotate: true
            },
            building: true,
        });
        /**
        * create CameraPosition
        */
        var position = {
            target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
            zoom: 15,
            tilt: 10
        };
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(function () {
            _this.getPosition();
            _this.map.moveCamera(position);
            _this.markers.forEach(function (marker) {
                _this.addMarker(marker);
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ;
    /**
    *addMarker()
    * Este Metodo para agregar marcadores al mapa
    * @author: Angel Lara
    * @param {any} options
    * @return {void}
    */
    Ubicar.prototype.addMarker = function (options) {
        var markerOptions = {
            position: new LatLng(options.position.latitude, options.position.longitude),
            title: options.title,
            icon: options.icon,
            zoom: 15,
            tilt: 10,
        };
        this.map.addMarker(markerOptions);
    };
    ;
    /**
    * getPosition()
    * Este Metodo para obtener posicion del usuario
    * @author: Angel Lara
    * @param {void} void
    * @param {catch} error
    * @return {void}
    */
    Ubicar.prototype.getPosition = function () {
        var _this = this;
        this.map.getMyLocation()
            .then(function (response) {
            _this.map.moveCamera({
                target: response.latLng
            });
            _this.map.addMarker({
                title: 'Mi Ubicacion',
                icon: 'assets/icon/user.png',
                animation: 'BOUNCE',
                position: response.latLng,
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ;
    /**
    * callJoint()
    * Este Metodo para realizar Llamadas
    * @author: Angel Lara
    * @param {string} telephoneNumber
    * @param {catch} res
    * @param {catch} error
    * @return {void}
    */
    Ubicar.prototype.callJoint = function (telephoneNumber) {
        this.callNumber.callNumber(telephoneNumber, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ;
    /**
    * showAlert()
    * muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    * @author: Angel Lara
    * @param {string} subtitle
    * @return {void}
    */
    Ubicar.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    ;
    /**
    * refreshUbicacion()
    * Metodo para ubicar las oficinas de la dependencia desde los Card's
    * @author: Angel Lara
    * @param {number} pos
    * @return {void}
    */
    Ubicar.prototype.refreshUbicacion = function (pos) {
        var position = {
            target: new LatLng(this.markers[pos].position.latitude, this.markers[pos].position.longitude),
            zoom: 17,
            tilt: 30
        };
        this.map.moveCamera(position);
    };
    ;
    Ubicar = __decorate([
        Component({
            selector: 'ubicacion',
            templateUrl: 'ubicacion.html'
        })
        /**
        * class Ubicar()
        * Esta clase se usa para conectar con el Back End y obtener los datos a usar.
        * @author: Angel Lara
        * @return {class} Ubicar
        */
        ,
        __metadata("design:paramtypes", [AlertController,
            CallNumber])
    ], Ubicar);
    return Ubicar;
}());
export { Ubicar };
//# sourceMappingURL=ubicacion.js.map