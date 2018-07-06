import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, AlertController, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Welcome } from '../pages/welcome/welcome';
import { AuthenticationService } from '../services/authentication.service';
import { SeguimientoFeedPage } from '../pages/seguimiento-feed/seguimiento-feed';

import { Ubicar } from '../pages/ubicacion/ubicacion';



@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LearnFeedPage the root (or first) page

  rootPage: any = Welcome;
  private currentUser:any;
  private username:string;
  private firstname:string;


  pages: Array<{title: string, icon: string, component: any, params: any}>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menu: MenuController,
    public app: App,
    public alertCtrl: AlertController,
    public events: Events,
    public authenticationservice: AuthenticationService,
    public ubicarPage: Ubicar,
  ) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.events.subscribe("userloggedin", (user) => {
        this.currentUser = user;
        this.firstname=this.currentUser.firstname;
        this.username=this.currentUser.username;
        console.log('se disparo userloggedin');
      });

      this.events.subscribe("menubuiltin", (menu) => {
        this.pages = menu;
        console.log('se disparo menubuiltin');
      });

    });
  }


  //abrimos la pagina root y poblamos con cards todos los seguimientos del trámite
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.showAlert();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component, page.params);
  }

  cerrarSesion() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.authenticationservice.logout();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(Welcome, '');
  }


  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert(subtitle:string='En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>') {
    //cerramos el menu lateral
    this.menu.close();
    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }
  ubicar(){
    this.menu.close();
    this.nav.push(Ubicar);
  };

  // muestro las credenciales del usuario autenticado
  muestraUser() {
    //cerramos el menu lateral
    //this.menu.close();
    const alert = this.alertCtrl.create({
      title: 'Credenciales',
      subTitle: 'Te has autenticado como el usario '+this.username,
      buttons: ['Ok']
    });
    alert.present();
  }
}
