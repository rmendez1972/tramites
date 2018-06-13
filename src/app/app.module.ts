import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';


import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';


import { SeguimientoFeedPage } from '../pages/seguimiento-feed/seguimiento-feed';

import { LearnDetailsPage } from '../pages/learn-details/learn-details';
import { QuestionDetailsPage } from '../pages/question-details/question-details';
import { ManageQuestionPage } from '../pages/manage-question/manage-question';
import { ManageAnswerPage } from '../pages/manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../pages/respuesta-seguimiento/respuesta-seguimiento';

import { AuthenticationService } from '../services/authentication.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { SeguimientoService } from '../services/seguimiento.service';

import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../../sdk/index';

import {ServiceUrl} from '../serviceUrl'


@NgModule({
  declarations: [
    MyApp,

    Welcome,
    Login,
    SeguimientoFeedPage,

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

    LearnDetailsPage,
    QuestionDetailsPage,
    ManageQuestionPage,
    ManageAnswerPage,
    RespuestaSeguimientoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    QuestionService,
    AnswerService,
    SeguimientoService,
    ServiceUrl,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
