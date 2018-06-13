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
import { LearnDetailsPage } from '../pages/learn-details/learn-details';
import { QuestionDetailsPage } from '../pages/question-details/question-details';
import { ManageQuestionPage } from '../pages/manage-question/manage-question';
import { ManageAnswerPage } from '../pages/manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../pages/respuesta-seguimiento/respuesta-seguimiento';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { SeguimientoService } from '../services/seguimiento.service';
import { TramiteService } from '../services/tramites.service';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../../sdk/index';
import { ServiceUrl } from '../serviceUrl';
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
                LearnDetailsPage,
                QuestionDetailsPage,
                ManageQuestionPage,
                ManageAnswerPage,
                RespuestaSeguimientoPage
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
                LearnDetailsPage,
                QuestionDetailsPage,
                ManageQuestionPage,
                ManageAnswerPage,
                RespuestaSeguimientoPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                QuestionService,
                AnswerService,
                SeguimientoService,
                ServiceUrl,
                TramiteService,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map