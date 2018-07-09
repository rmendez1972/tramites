import { CallNumber } from '@ionic-native/call-number';
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
      title:'SEDETUS CHETUMAL',
      icon: 'assets/icon/embassy.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 21.1608994,
        longitude: -86.8515999,
      },
      title:'SEDETUS CANCUN 1',
      icon: 'assets/icon/government.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 21.1438652,
        longitude: -86.8223822,
      },
      title:'SEDETUS CANCUN PLAZA VIVENDI',
      icon: 'assets/icon/government1.png',
      animation: 'DROP',
    },
    {
      position:{
        latitude: 20.4320275,
        longitude: -87.0143395,
      },
      title:'SEDETUS COZUMEL',
      icon: 'assets/icon/government-buildings.png',
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
    console.log('dentro de getCurrentPosition');
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
    this.map.setOptions({
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          streetviewcontrol:true,
          zoom: true
        }
    });
    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 15,
      tilt: 30
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

  refreshMap(){
    let position: CameraPosition<LatLng> = {
      target: new LatLng(this.markers[0].position.latitude, this.markers[0].position.longitude),
      zoom: 17,
      tilt: 30
    };
    this.map.moveCamera(position);

    console.log("refresh");
  }


  //Lamadas
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
