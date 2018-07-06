import { Component } from '@angular/core';
import { NavParams, ViewController,AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { isPresent } from 'ionic-angular/util/util';
//import { QuestionService } from '../../services/question.service';
import { CategoryModel } from '../../services/seguimiento.model'; //igh
import {SeguimientoService} from '../../services/seguimiento.service';//igh
//import { Answer } from '../../../sdk';//igh
import { Question } from '../../../sdk';//igh


@Component({
  selector: 'pregunta-seguimiento-page',
  templateUrl: 'pregunta-seguimiento.html'
})
export class PreguntaSeguimientoPage {

  //_detail_slug : string;
  //questionSlug: string;
  questionForm: FormGroup;
  //observaciones: string;
  id_usuario: number;
  id_solicitud:number;
  id_status:number;

  //igh
  //_mode : string;
  //_question_id: string;
  //_answer_id: string;
  //_adjuntos: string;
  id_seguimiento:string;
  adjunto:string;
  //answerForm: FormGroup;
  question: Question = new Question();//igh
 //answer: Answer = new Answer();//igh

  //data : Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  //seg:Array<CategoryModel> = new Array<CategoryModel>();
  //user:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  extraer:any={};


  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    //public questionservices: QuestionService,
    public alertCtrl: AlertController,
    public seguimientoservices: SeguimientoService,
  ) {
    /*this.questionSlug = navParams.get('slug');
    this._detail_slug = isPresent(this.questionSlug) ? this.questionSlug : '';*/
    //igh

    //let data = navParams.get('slug');
    //this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    //this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    //this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
    //this._adjuntos = isPresent(data) && isPresent(data.adjuntos) ? data.adjuntos : '';

    this.seguimientos =JSON.parse(localStorage.getItem('seguimiento'));//igh
    this.id_usuario=30;
    this.id_solicitud=this.seguimientos[0].id_solicitud;
    this.id_status=this.seguimientos[0].id_status

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

  //Método para la insersión de un comentario del ciudadano
  onSubmit(value){
    //se recupera el valor del text area
    let data = value;
    console.log("Imprimiendo el valor de text area"+data.question)

    //recuperando valores del localstorage de solicitud
    this.sol = JSON.parse(localStorage.getItem('solicitud'));
    for(var s in this.sol){
      this.extraer.id_solicitud = this.sol[s].id_solicitud;
    }
    for(var esta in this.sol){
      this.extraer.id_status = this.sol[esta].id_status;
    }
      //pushSeguimiento(valor del text area, id_usuario, id_solicitud, id_status)
      this.extraer.id_usuario=30;//El id 3 es fijo y pertenece al usuario "Ciudadano", revisar el modelo
      console.log(this.extraer.id_usuario,this.extraer.id_solicitud,this.extraer.id_status);
      console.log('Valor del mensaje'+data.question);
      this.seguimientoservices.pushComentario(data.question,this.extraer.id_usuario,this.extraer.id_solicitud,this.extraer.id_status)

      .subscribe(
        (seguimiento)=>{
          this.seguimientos = seguimiento.seguimiento;
          console.log('IMPRIMIENDO SEGUIMIENTOS'+this.seguimientos);
          localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));
        });
      this.showMensaje('Se inserto el registro con exito');
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
