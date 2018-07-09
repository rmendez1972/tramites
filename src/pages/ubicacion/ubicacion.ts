import { Component } from '@angular/core';
import {  NavParams, AlertController  } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 GoogleMapOptions
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
      title:'SEDETUS CHETUMAL',
      icon: 'assets/icon/government.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 21.1608688,
        longitude: -86.8516804,
      },
      title:'SEDETUS CANCUN',
      icon: 'assets/icon/government-buildings.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 21.143846,
        longitude: -86.821805,
      },
      title:'SEDETUS CANCUN',
      icon: 'assets/icon/government1.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 20.5055727,
        longitude: -86.942274,
      },
      title:'SEDETUS COZUMEL',
      icon: 'assets/icon/embassy.png',
      animation: 'DROP',
    },

  ];
 
  constructor(
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    public alertCtrl: AlertController,
    private callNumber: CallNumber,
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
    let mapOptions: GoogleMapOptions = {
         controls: {
           'myLocationButton': true,
           'compass': true,
           'indoorPicker': true,
           'zoom': true,   
           'streetViewControl':true,
           'mapTypeControl':true,    
         }, 
       };
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map_canvas');
    this.map = this.googleMaps.create(element,mapOptions);

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 13,
      tilt: 10
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Mi Ubicacion",
        icon: 'assets/icon/user.png',
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

  //Call phone
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
  }
}
