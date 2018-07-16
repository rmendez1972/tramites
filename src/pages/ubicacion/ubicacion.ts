import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import {  AlertController } from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
} from '@ionic-native/google-maps';

declare var google;
@Component({
  selector: 'ubicacion',
  templateUrl: 'ubicacion.html'
})


export class Ubicar {

  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  myPosition: any = {};
  bounds: any = null;
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
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    private callNumber: CallNumber,

  ) {

  };

  ionViewWillEnter(){
    this.loadMap();
  };

  loadMap(){
    let element: HTMLElement = document.getElementById('map_canvas');

    this.map = GoogleMaps.create(element);
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
      }
      );

    // create CameraPosition
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


  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon,
      zoom: 15,
      tilt: 10,
    };
    this.map.addMarker(markerOptions);
  };

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
  
  //Llamadas
  callJoint(telephoneNumber) {
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

   refreshMap(){
     let position: CameraPosition<LatLng> = {
       target: new LatLng(this.markers[0].position.latitude, this.markers[0].position.longitude),
       zoom: 17,
       tilt: 30
     };
     this.map.moveCamera(position);
     console.log("refresh");
   };
   
  refreshUbicacion(pos){
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.markers[pos].position.latitude, this.markers[pos].position.longitude),
      zoom: 17,
      tilt: 30
    };
    this.map.moveCamera(position);
    console.log("refresh ubication " +pos); 
   };

   showErorMap(subtitle:string='Punto en el mapa invalido') {

    const alert = this.alertCtrl.create({
      title: 'Error de puntos en el mapa :(!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  };


}
