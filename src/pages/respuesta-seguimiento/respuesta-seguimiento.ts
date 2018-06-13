import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../../sdk';
import {SeguimientoService} from '../../services/seguimiento.service';
import { CategoryModel } from '../../services/seguimiento.model';


/**
 * Generated class for the RespuestaSeguimientoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-respuesta-seguimiento',
  templateUrl: 'respuesta-seguimiento.html',
})
export class RespuestaSeguimientoPage {

  _mode : string;
  _question_id: string;
  _answer_id: string;
  answerForm: FormGroup;
  answer: Answer = new Answer();
  data : Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  extraer:any={};
  id_seguimiento:string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public answerService: AnswerService,
    public seguimientoservices: SeguimientoService,
  ) {
    let data = navParams.get('data');
    this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
    this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
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
    this.id_seguimiento = this._question_id

    //recuperando valores del localstorage

    if(this.id_seguimiento){
      console.log("metodo para actualizar");

      this.seguimientoservices.updateSeguimiento(this.id_seguimiento,data.answer)

    }else{
      console.log("metodo para insertar");

      //valores de los parametros del metodo 
      //pushSeguimiento(valor del text area, id_usuario, id_solicitud, id_status)
      this.seguimientoservices.pushSeguimiento(data.answer,53,70,2)
      .subscribe(
        (seguimiento)=>{
          this.seguimientos = seguimiento.seguimiento;
          console.log(this.seguimientos);
          localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));        
        });
      this.dismiss();


    }

    /*
    //recuperamos los datos del local storage de seguimiento
    this.seg = JSON.parse(localStorage.getItem('seguimiento'));
    //obtenemos el id_usuario
    for (var elemento in this.seg){
      this.extraer.id_solicitud = this.seg[elemento].id_solicitud;
    }*/
  }

}
