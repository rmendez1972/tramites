var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { SeguimientoFeedPage } from '../pages/seguimiento-feed/seguimiento-feed';
import { TramiteFeedPage } from '../pages/tramites-feed/tramites-feed';
import { SeguimientoTramitePage } from '../pages/seguimiento-tramite/seguimiento-tramite'; //igh clase que enlista los seguimiento de un tramite
import { PreguntaSeguimientoPage } from '../pages/pregunta-seguimiento/pregunta-seguimiento'; //igh  clase para realizar pregunta o comentario a un tramite
//import { QuestionDetailsPage } from '../pages/question-details/question-details';igh pendiente de borrar
//import { ManageQuestionPage } from '../pages/manage-question/manage-question'; igh pendiente de borrar
import { ManageAnswerPage } from '../pages/manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../pages/respuesta-seguimiento/respuesta-seguimiento';
import { ModrespuestaSeguimientoPage } from '../pages/modrespuesta-seguimiento/modrespuesta-seguimiento';
import { AdjuntosSeguimientoPage } from '../pages/adjuntos-seguimiento/adjuntos-seguimiento';
import { EdicionSeguimientoPage } from '../pages/edicion-seguimiento/edicion-seguimiento';
import { Ubicar } from '../pages/ubicacion/ubicacion';
import { AuthenticationService } from '../services/authentication.service';
//import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { SeguimientoService } from '../services/seguimiento.service';
import { TramiteService } from '../services/tramites.service';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../../sdk/index';
import { ServiceUrl } from '../serviceUrl';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                Welcome,
                Login,
                SeguimientoFeedPage,
                TramiteFeedPage,
                SeguimientoTramitePage,
                PreguntaSeguimientoPage,
                //QuestionDetailsPage,
                //ManageQuestionPage,
                ManageAnswerPage,
                RespuestaSeguimientoPage,
                ModrespuestaSeguimientoPage,
                AdjuntosSeguimientoPage,
                EdicionSeguimientoPage,
                Ubicar,
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                SDKBrowserModule.forRoot(),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                Welcome,
                Login,
                SeguimientoFeedPage,
                TramiteFeedPage,
                SeguimientoTramitePage,
                PreguntaSeguimientoPage,
                //QuestionDetailsPage,
                //ManageQuestionPage,
                ManageAnswerPage,
                RespuestaSeguimientoPage,
                ModrespuestaSeguimientoPage,
                AdjuntosSeguimientoPage,
                EdicionSeguimientoPage,
                Ubicar,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                AuthenticationService,
                //QuestionService,
                AnswerService,
                SeguimientoService,
                ServiceUrl,
                TramiteService,
                Ubicar,
                GoogleMaps,
                Geolocation,
                CallNumber,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map