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

  _mode : string;
  _question_id: string;
  _answer_id: string;
  _adjuntos: string;
  answerForm: FormGroup;
  answer: Answer = new Answer();
  data : Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  user:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  observaciones : Array<CategoryModel> = new Array<CategoryModel>();
  extraer:any={};
  id_seguimiento:string;
  adjunto:string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public answerService: AnswerService,
    public alertCtrl: AlertController,
    public seguimientoservices: SeguimientoService,
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
    this._adjuntos = isPresent(data) && isPresent(data.adjuntos) ? data.adjuntos : '';
  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
    console.log("valor de data"+data.answer);
    this.observaciones = data.answer;
    if(data.answer){
      this.answer = data.answer;
    }
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answer.answer, Validators.required)
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
  this.id_seguimiento = this._question_id;
  this.adjunto = this._adjuntos;

  console.log("adjunto en el submit"+this.adjunto);

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
    //llamado al service para la actualizacion
    this.seguimientoservices.updateSeguimiento(this.id_seguimiento,data.answer,this.extraer.id_solicitud,this.extraer.id_usuario,2,this.adjunto)
    .subscribe(
      (seguimiento)=>{
        this.seguimientos = seguimiento.seguimiento;
        console.log(this.seguimientos);
        localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));        
      });
    this.showMensaje('Se actualizo el registro con exito');
    this.dismiss();

}


  showMensaje(msg) {

    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: msg ,
      buttons: ['Ok']
    });
    alert.present();
  }


}
