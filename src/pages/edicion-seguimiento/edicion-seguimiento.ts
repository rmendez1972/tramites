import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../../sdk';
import {SeguimientoService} from '../../services/seguimiento.service';
import { CategoryModel } from '../../services/seguimiento.model';


/**
 * Generated class for the EdicionSeguimientoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edicion-seguimiento',
  templateUrl: 'edicion-seguimiento.html',
})
export class EdicionSeguimientoPage {
  //declaracion de variables
  _mode : string;
  _idSeguimiento: string;
  _adjuntos: string;
  _idstatus: string;
  answerForm: FormGroup;
  answer: Answer = new Answer();
  data : Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  user:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  observaciones : Array<CategoryModel> = new Array<CategoryModel>();
  extraer:any={};
  id_seguimiento:string;
  adjunto:string;
  status:Array<CategoryModel> = new Array<CategoryModel>();
  solicitud:Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public answerService: AnswerService,
    public alertCtrl: AlertController,
    public seguimientoservices: SeguimientoService,
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._idSeguimiento = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._adjuntos = isPresent(data) && isPresent(data.adjuntos) ? data.adjuntos : '';
    this._idstatus = isPresent(data) && isPresent(data.status) ? data.status : '';
  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
    //recuperar datos del localstorage de status para desplegar en el select de la vista
    this.status = JSON.parse(localStorage.getItem('status'));
    //las observaciones para bindiarlo a la vista
    this.observaciones = data.answer;
    //condicion para verificar si en la variable "data" existe un valor
    if(data.answer){
      this.answer = data.answer;
    }
    //de lo contrario se crea un formulario de la clase FORMGROUP
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answer.answer, Validators.required),
      valstatus: new FormControl('',Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

//metodo para la insersion de la respuesta del enlace
onSubmit(value){
  
  //se recupera el valor del text area
  let data = value;
  //se recupera el id_seguimiento del seguimiento
  this.id_seguimiento = this._idSeguimiento;
  //se recupera el valor adjunto del seguimiento
  this.adjunto = this._adjuntos;

  //recuperando valores del localstorage de usuario
  this.user = JSON.parse(localStorage.getItem('currentUser'));
  for (var u in this.user){
    this.extraer.id_usuario = this.user[u].id;
  }

  //recuperando valores del localstorage de solicitud
  this.sol = JSON.parse(localStorage.getItem('solicitud'));
  for(var s in this.sol){
    this.extraer.id_solicitud = this.sol[s].id_solicitud;
  }
    /*llamado al service para la actualizacion del seguimiento
      valores de los parametros del metodo
      pushSeguimiento(valor del text area, id_usuario, id_solicitud, id_status)*/
    this.seguimientoservices.updateSeguimiento(this.id_seguimiento,data.answer,this.extraer.id_solicitud,this.extraer.id_usuario,data.valstatus,this.adjunto)
    .subscribe(
      (seguimiento)=>{
        this.seguimientos = seguimiento.seguimiento;
        this.solicitud = seguimiento.sol;
        //los valores que recibimos del service los guardamos en el localStorage
        localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));    
        localStorage.setItem('solicitud',JSON.stringify(this.solicitud));     
      });
    this.showMensaje('Se actualizo el registro con exito');
    this.dismiss();

}

  //metodo para mostrar un mensaje en la pantalla cuando se requiera
  showMensaje(msg) {

    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: msg ,
      buttons: ['Ok']
    });
    alert.present();
  }


}
