import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Welcome } from '../pages/welcome/welcome';
import { LearnFeedPage } from '../pages/learn-feed/learn-feed';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LearnFeedPage the root (or first) page
  rootPage: any = Welcome;


  pages: Array<{title: string, component: any, params: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menu: MenuController,
    public app: App,
    public alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {
        title: 'Todos los Trámites',
        component: LearnFeedPage,
        params: {
          query: 'all'
        }
      },
      {
        title: 'Ultimo Trámite',
        component: LearnFeedPage,
        params: {
          query: 'basic'
        }
      },
      {
        title: 'Core',
        component: LearnFeedPage,
        params: {
          query: 'core'
        }
      }
    ];
  }

  //abrimos la pagina root y poblamos con cards todos los seguimientos del trámite
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.showAlert();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, page.params);
  }

  cerrarSesion() {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    this.nav.setRoot(Welcome, '');
  }


  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert() {
    //cerramos el menu lateral
    this.menu.close();
    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) http://qroo.gob.mx/sedetus desde tu laptop o computadora de escritorio',
      buttons: ['Ok']
    });
    alert.present();
  }
}
