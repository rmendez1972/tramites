import { Component } from '@angular/core';
import {  NavParams, AlertController  } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'ubicacion',
  templateUrl: 'ubicacion.html'
})
export class Ubicar {

  map: GoogleMap;
  myPosition: any = {};
  markers: any[] = [
    {
      position:{
        latitude: 18.49926214,
        longitude: -88.31169829,
      },
      title:'SEDETUS',
      icon: 'blue',
      animation: 'DROP',
    },
  ];
 
  constructor(
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    public alertCtrl: AlertController,
  ) {}

  ionViewDidLoad(){
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map_canvas');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 17,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Mi Ubicacion",
        icon: 'blue',
        animation: 'DROP',
      };

      this.addMarker(markerOptions);

      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }

  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert(subtitle:string='En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>') {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }
}
