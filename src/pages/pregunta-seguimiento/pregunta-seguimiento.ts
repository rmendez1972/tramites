import { Component } from '@angular/core';
import { NavParams, ViewController,AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { isPresent } from 'ionic-angular/util/util';
import { CategoryModel } from '../../services/seguimiento.model'; //igh
import {SeguimientoService} from '../../services/seguimiento.service';//igh
import { Question } from '../../../sdk';//igh

@Component({
  selector: 'pregunta-seguimiento-page',
  templateUrl: 'pregunta-seguimiento.html'
})
export class PreguntaSeguimientoPage {
  questionForm: FormGroup;
  id_usuario: number;
  id_solicitud:number;
  id_status:number;
  id_seguimiento:string;
  adjunto:string;
  question: Question = new Question();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public seguimientoservices: SeguimientoService,
  ) {

    this.seguimientos =JSON.parse(localStorage.getItem('seguimiento'));
    this.id_usuario=30;//El id 3 es fijo y pertenece al usuario "Ciudadano", revisar el modelo
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
    let data = value;//se recupera el valor del text area
    console.log('Text area: '+data.question+' '+ this.id_usuario,this.id_solicitud,this.id_status);
    this.seguimientoservices.pushComentario(data.question,this.id_usuario,this.id_solicitud,this.id_status)

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
