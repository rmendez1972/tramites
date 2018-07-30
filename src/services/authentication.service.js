var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ServiceUrl } from '../serviceUrl';
import 'rxjs/add/operator/map';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, url, alertCtrl) {
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
        this.loginUrl = String(this.url.getUrllogin());
    }
    AuthenticationService.prototype.login = function (username, password) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var miusuario = { 'nombre': username, 'password': password };
        var jsonData = JSON.stringify(miusuario);
        console.log({ Data: JSON.stringify(miusuario) });
        return this.http.post(this.loginUrl + username + "&password=" + password, { Data: JSON.stringify(miusuario) }, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            //let connection: MockConnection;
            //connection.mockError(new Error('Username or password is incorrect'));
            //alert('user.user '+JSON.stringify(user.user).length);
            if (JSON.stringify(user.user).length > 10) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.user));
            }
            else {
                //alert('dentro de else en el service');
                localStorage.setItem('currentUser', JSON.stringify(user.user));
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('direccion');
        localStorage.removeItem('solicitudes');
        localStorage.removeItem('unidadadministrativa');
        localStorage.removeItem('data');
        localStorage.removeItem('solicitud');
        localStorage.removeItem('tramite');
        localStorage.removeItem('seguimiento');
        localStorage.removeItem('status');
        this.showAlert('Sesion Cerrada, regresa pronto');
    };
    AuthenticationService.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, ServiceUrl, AlertController])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map