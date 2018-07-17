var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed';
import { AuthenticationService } from '../../services/authentication.service';
import { TramiteFeedPage } from '../tramites-feed/tramites-feed';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = /** @class */ (function () {
    function Login(navCtrl, navParams, authenticationService, events, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authenticationService = authenticationService;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.model = {};
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Login');
        //this.authenticationService.logout();
    };
    Login.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(function (data) {
            _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (JSON.stringify(_this.currentUser).length > 10) {
                _this.showAlert('Autenticado Exitosamente');
                _this.events.publish("userloggedin", _this.currentUser[0]);
                if (_this.currentUser[0].id_grupo == 2 || _this.currentUser[0].id_grupo == 1) {
                    _this.pages = [
                        {
                            title: 'Todos los Trámites',
                            icon: 'list-box',
                            component: TramiteFeedPage,
                            params: {
                                query: 'all'
                            }
                        },
                        {
                            title: 'Ultimo Trámite',
                            icon: 'list',
                            component: TramiteFeedPage,
                            params: {
                                query: 'basic'
                            }
                        }
                    ];
                    _this.events.publish("menubuiltin", _this.pages);
                    _this.navCtrl.push(TramiteFeedPage);
                    console.log('grupo  ' + _this.currentUser[0].id_grupo);
                }
                if (_this.currentUser[0].id_grupo == 3) {
                    var sol = {
                        id_solicitud: _this.currentUser[0].id_solicitud,
                        id_solicitante: _this.currentUser[0].id_solicitante
                    };
                    _this.pages = [
                        {
                            title: 'Todos los Seguimientos',
                            icon: 'list-box',
                            component: SeguimientoFeedPage,
                            params: {
                                query: 'all',
                                metodo: 'todosSeg',
                                id_solicitud: _this.currentUser[0].id_solicitud,
                                id_solicitante: _this.currentUser[0].id_solicitante
                            }
                        },
                        {
                            title: 'Ultimo Seguimiento',
                            icon: 'list',
                            component: SeguimientoFeedPage,
                            params: {
                                query: 'basic',
                                metodo: 'ultimoSeg',
                                id_solicitud: _this.currentUser[0].id_solicitud,
                                id_solicitante: _this.currentUser[0].id_solicitante
                            }
                        }
                    ];
                    _this.events.publish("menubuiltin", _this.pages);
                    _this.navCtrl.push(SeguimientoFeedPage, { sol: sol });
                    console.log('grupo  ' + _this.currentUser[0].id_grupo);
                }
            }
            else {
                _this.showAlert('usuario y/o contraseña equivocados, intenta de nuevo');
                //this.loading = false;
            }
        }, function (error) {
            //this.alertService.error(error);
            //this.loading = false;
            //this.router.navigate(['/']);
        });
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    Login.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    Login = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthenticationService,
            Events,
            AlertController])
    ], Login);
    return Login;
}());
export { Login };
//# sourceMappingURL=login.js.map