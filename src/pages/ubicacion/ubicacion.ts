import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import {  AlertController } from 'ionic-angular';
import { GoogleMaps,GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions} from '@ionic-native/google-maps';

@Component(
{
  selector: 'ubicacion',
  templateUrl: 'ubicacion.html'
}
)
/**
* class Ubicar()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Angel Lara
* @return {export} export class 
*/

export class Ubicar {
  /**
  * Variables locales
  */
  map: any;
  myPosition: any = {};
  //Declarando las posiciones de las oficinas
  markers: any[] = [
  {
    position:{
      latitude: 18.499035,
      longitude: -88.3118765,
    },
    title:'SEDETUS CHETUMAL',
    icon: 'assets/icon/logo.png',
    animation: 'DROP',
  },
  {
    position:{
      latitude: 21.1608994,
      longitude: -86.8515999,
    },
    title:'SEDETUS CANCUN 1',
    icon: 'assets/icon/logo.png',
    animation: 'DROP',
  },
  {
    position:{
      latitude: 21.1438652,
      longitude: -86.8223822,
    },
    title:'SEDETUS CANCUN PLAZA VIVENDI',
    icon: 'assets/icon/logo.png',
    animation: 'DROP',
  },
  {
    position:{
      latitude: 20.5054173,
      longitude: -86.9431962,
    },
    title:'SEDETUS COZUMEL',
    icon: 'assets/icon/logo.png',
    animation: 'DROP',
  },
  ];
  constructor(
    public alertCtrl: AlertController,
    private callNumber: CallNumber
    ) 
  {};

  ionViewWillEnter(){
    this.loadMap();
  };
  /**
  * loadMap()
  * Este Metodo es para iniciar el mapa
  * @author: Angel Lara
  * @param {void } 
  * @return {void} 
  */
  loadMap(){
    //Creando variable de tipo html para el mapa
    let element: HTMLElement = document.getElementById('map_canvas');

    //variable para crear el mapa
    this.map = GoogleMaps.create(element);
    //Declarando opciones de control del mapa
    this.map.setOptions(
    {
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        indoorPicker: true,
        streetviewcontrol:true,
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
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 15,
      tilt: 10
    };


    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      this.getPosition();
      this.map.moveCamera(position);
      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
    })
    .catch(error =>{
      console.log(error);
    });

  };

  /**
  *addMarker()
  * Este Metodo para agregar marcadores al mapa
  * @author: Angel Lara
  * @param {any} options
  * @return {void} 
  */
  addMarker(options:any){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon,
      zoom: 15,
      tilt: 10,
    };
    this.map.addMarker(markerOptions);
  };
  /**
  * getPosition()
  * Este Metodo para obtener posicion del usuario
  * @author: Angel Lara
  * @param {void} void
  * @param {catch} error
  * @return {void} 
  */
  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'Mi Ubicacion',
        icon: 'assets/icon/user.png',
        animation: 'BOUNCE',
        position: response.latLng,
      });
    })
    .catch(error =>{
      console.log(error);
    });
  };
  
  /**
  * callJoint()
  * Este Metodo para realizar Llamadas
  * @author: Angel Lara
  * @param {string} telephoneNumber
  * @param {catch} res
  * @param {catch} error
  * @return {void} 
  */
  callJoint(telephoneNumber:string) {
    this.callNumber.callNumber(telephoneNumber, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  };

  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert(subtitle:string='En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>') {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  };
  /**
  * refreshUbicacion()
  * Metodo para ubicar las oficinas de la dependencia desde los Card's
  * @author: Angel Lara
  * @param {number} pos
  * @return {void} 
  */
  refreshUbicacion(pos:number){
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.markers[pos].position.latitude, this.markers[pos].position.longitude),
      zoom: 17,
      tilt: 30
    };
    this.map.moveCamera(position);
   };


}
