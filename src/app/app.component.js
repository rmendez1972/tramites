var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Welcome } from '../pages/welcome/welcome';
import { AuthenticationService } from '../services/authentication.service';
import { Ubicar } from '../pages/ubicacion/ubicacion';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menu, app, alertCtrl, events, authenticationservice) {
        var _this = this;
        this.menu = menu;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.authenticationservice = authenticationservice;
        // make LearnFeedPage the root (or first) page
        this.rootPage = Welcome;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.show();
            splashScreen.hide();
            _this.events.subscribe("userloggedin", function (user) {
                _this.currentUser = user;
                _this.firstname = _this.currentUser.firstname;
                _this.username = _this.currentUser.username;
                console.log('se disparo userloggedin');
            });
            _this.events.subscribe("menubuiltin", function (menu) {
                _this.pages = menu;
                console.log('se disparo menubuiltin');
            });
        });
    }
    //abrimos la pagina root y poblamos con cards todos los seguimientos del trámite
    MyApp.prototype.openPage = function (page) {
        var sol = {
            id_solicitud: page.params.id_solicitud,
            id_solicitante: page.params.id_solicitante
        };
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.showAlert();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component, { sol: sol, page: page });
    };
    MyApp.prototype.cerrarSesion = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.authenticationservice.logout();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(Welcome, '');
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    MyApp.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        //cerramos el menu lateral
        this.menu.close();
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    MyApp.prototype.ubicar = function () {
        this.menu.close();
        this.nav.push(Ubicar);
    };
    ;
    // muestro las credenciales del usuario autenticado
    MyApp.prototype.muestraUser = function () {
        //cerramos el menu lateral
        //this.menu.close();
        var alert = this.alertCtrl.create({
            title: 'Credenciales',
            subTitle: 'Te has autenticado como el usario ' + this.username,
            buttons: ['Ok']
        });
        alert.present();
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            MenuController,
            App,
            AlertController,
            Events,
            AuthenticationService])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map