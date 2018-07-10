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
  ) {};

  ionViewDidLoad(){
    this.loadMap();
  };

  loadMap(){
    let element: HTMLElement = document.getElementById('map_canvas');

    this.map = this.googleMaps.create(element);
    this.map.setOptions({
        controls: {
          compass: true,
          myLocation: true,
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
      icon: options.icon
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
        animation: 'DROP',
        position: response.latLng
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

}
