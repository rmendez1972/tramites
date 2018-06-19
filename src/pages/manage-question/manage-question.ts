import { Component } from '@angular/core';
import { NavParams, ViewController,AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { isPresent } from 'ionic-angular/util/util';
import { QuestionService } from '../../services/question.service';
import { CategoryModel } from '../../services/seguimiento.model'; //igh
import {SeguimientoService} from '../../services/seguimiento.service';//igh


@Component({
  selector: 'manage-question-page',
  templateUrl: 'manage-question.html'
})
export class ManageQuestionPage {

  _detail_slug : string;
  questionSlug: string;
  questionForm: FormGroup;

  //igh  
  _mode : string;
  _question_id: string;
  _answer_id: string;
  _adjuntos: string;
  id_seguimiento:string;
  adjunto:string;
  data : Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  user:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  extraer:any={};


  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public questionService: QuestionService,
    public alertCtrl: AlertController,
    public seguimientoservices: SeguimientoService,
  ) {
    this.questionSlug = navParams.get('slug');
    this._detail_slug = isPresent(this.questionSlug) ? this.questionSlug : '';
    //igh
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
    this._adjuntos = isPresent(data) && isPresent(data.adjuntos) ? data.adjuntos : '';

  }

  ionViewWillLoad() {
    this.questionForm = new FormGroup({
      question: new FormControl('', Validators.required)
    })
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmit(value){
    console.log('Aqui voyxxx');
    console.log(this._detail_slug)
    let data = value;
    data.questionSlug = this.questionSlug;
    this.questionService.createQuestion(value)
    .then( res => this.dismiss() )
  }
  //metodo para la insersion de la respuesta del enlace
  onSubmitx(value){
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

    //comparamos el id_seguimiento si contiene valor para determinar si vamos a insertar o actualizar un seguimiento
    if(this.id_seguimiento){
      

      this.seguimientoservices.updateSeguimiento(this.id_seguimiento,data.answer,this.extraer.id_solicitud,this.extraer.id_usuario,2,this.adjunto)
      .subscribe(
        (seguimiento)=>{
          this.seguimientos = seguimiento.seguimiento;
          console.log(this.seguimientos);
          localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));        
        });
      this.showMensaje('Se actualizo el registro con exito');
      this.dismiss();

    }else{
      

      //valores de los parametros del metodo 
      //pushSeguimiento(valor del text area, id_usuario, id_solicitud, id_status)
      this.seguimientoservices.pushSeguimiento(data.answer,this.extraer.id_usuario,this.extraer.id_solicitud,2)
      .subscribe(
        (seguimiento)=>{
          this.seguimientos = seguimiento.seguimiento;
          console.log(this.seguimientos);
          localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));        
        });
      this.showMensaje('Se inserto el registro con exito');
      this.dismiss();


    }

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
