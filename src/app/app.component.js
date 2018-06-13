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
import { Platform, MenuController, Nav, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Welcome } from '../pages/welcome/welcome';
import { SeguimientoFeedPage } from '../pages/seguimiento-feed/seguimiento-feed';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menu, app, alertCtrl) {
        this.menu = menu;
        this.app = app;
        this.alertCtrl = alertCtrl;
        // make LearnFeedPage the root (or first) page
        this.rootPage = Welcome;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pages = [
            {
                title: 'Todos los Trámites',
                icon: 'list-box',
                component: SeguimientoFeedPage,
                params: {
                    query: 'all'
                }
            },
            {
                title: 'Ultimo Trámite',
                icon: 'list',
                component: SeguimientoFeedPage,
                params: {
                    query: 'basic'
                }
            }
        ];
    }
    //abrimos la pagina root y poblamos con cards todos los seguimientos del trámite
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.showAlert();
        // navigate to the new page if it is not the current page
        //this.nav.setRoot(page.component, page.params);
    };
    MyApp.prototype.cerrarSesion = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(Welcome, '');
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    MyApp.prototype.showAlert = function () {
        //cerramos el menu lateral
        this.menu.close();
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) http://qroo.gob.mx/sedetus desde tu laptop o computadora de escritorio',
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
            AlertController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map