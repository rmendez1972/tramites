import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { Question } from '../../../sdk';
import { AnswerService } from '../../services/answer.service';

import { RespuestaSeguimientoPage } from '../respuesta-seguimiento/respuesta-seguimiento';
import { CategoryModel } from '../../services/seguimiento.model';
import {SeguimientoService} from '../../services/seguimiento.service';
import {EdicionSeguimientoPage} from '../edicion-seguimiento/edicion-seguimiento';
import { isPresent } from 'ionic-angular/util/util';


/**
 * Generated class for the ModrespuestaSeguimientoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modrespuesta-seguimiento',
  templateUrl: 'modrespuesta-seguimiento.html',
})
export class ModrespuestaSeguimientoPage {

  answers: Array<any> = [];
  question: any = new Question();
  questionId: any;
  //private seguimiento: CategoryModel;
  extraer:any={};
  tramite:any={};
  //private modelseguimiento:any={};
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  actividad:Array<CategoryModel> = new Array<CategoryModel>();
  segB:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  private muestrabot: boolean=false;
  private currentUser:any[];
  private mid_usuario: number;

  solicitud : any={};
  //tramite : any;

  public seguimiento : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public segservices:SeguimientoService,
    public seguimientoservices: SeguimientoService,
  ) {


    let seguimiento = navParams.get('seguimiento');


    this.seguimiento = isPresent(seguimiento)  ? seguimiento : '';

     }
  //metodo para insertar
  createAnswerModal() {
    //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
    if(this.solicitud.id_status==2){
      //creando modal para insertar
      let create_answer_data = {
        mode: 'Agregar',
        questionId: this.questionId
      };
      let create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
      create_answer_modal.onDidDismiss(data => {
         this.getAnswers();
      });
      create_answer_modal.present();

    }else{

      this.showMensaje('No es posible generar comentario. El estatus del trámite es: '+this.extraer.estatus);

    }


  }
  //metodo para editar
  editAnswerModal(seguimiento: any) {
    let id_seguimiento = seguimiento.id_seguimiento;
    let observaciones = seguimiento.observaciones;
    let adjuntos = seguimiento.adjunto;
    let status = seguimiento.id_status;
    //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
    if(this.solicitud.id_status==2){
      //creando modal para editar
      let edit_answer_data = {
        mode: 'Editar',
        answer: observaciones,
        questionId: id_seguimiento,
        adjuntos: adjuntos,
        status: status
      };
      let edit_answer_modal = this.modalCtrl.create(EdicionSeguimientoPage, { data: edit_answer_data });
      edit_answer_modal.onDidDismiss(data => {
        this.getAnswers();
      });
      edit_answer_modal.present();

    }else{

      this.showMensaje('No es posible editar el comentario. El estatus del trámite es: '+this.extraer.estatus);

    }
  }

  ionViewWillEnter() {
    this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
    this.mid_usuario=this.currentUser[0].id;
    //se recuperan los valores del localstorage en el metodo de getAnswers
    this.getAnswers();

    //recuperando valores del localstorage de solicitud
    let solicitud = JSON.parse(localStorage.getItem('solicitud'));
    //for para recuperar el valor del estatus
    for(var s in solicitud){
      this.solicitud = solicitud[s];
    }
    //recuperando del localstorage
    let tramite = JSON.parse(localStorage.getItem('tramite'));
    //for para recuperar el valor del estatus
    for(var t in tramite) {
      this.tramite = tramite[t];
    }


  }

  ionViewDidEnter(){


  }

  //metodo en donde se buscan los seguimientos y la solicitud que estan guardados en el localStorage
  getAnswers(){
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();

    //recuperando valores del localstorage de seguimiento
    this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));

    loading.dismiss();

  }
  //metodo para eliminar
  delete(id_seguimiento,adjuntos){
    //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
    if(this.solicitud.id_status==2){

    //recuperamos los datos del local storage de seguimiento
    this.seg = JSON.parse(localStorage.getItem('seguimiento'));
    //obtenemos la id_solicitud
    for (var elemento in this.seg){
      this.extraer.id_solicitud = this.seg[elemento].id_solicitud;
    }
    //comparando si este seguimiento tiene un archivo adjunto. Si lo tiene, no se puede borrar
    if(adjuntos){
      this.showMensaje('No puede borrar este registro ya que cuenta con un archivo adjunto');

    }else{
      console.log("entrando confirm para borrar");

      //confirm que se presenta para confirmar la eliminacion
      let confirm = this.alertCtrl.create({
        title: 'Borrar Respuesta',
        message: '¿Seguro que quiere borrar este comentario?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('No clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.segservices.deleteSeguimiento(id_seguimiento,this.extraer.id_solicitud).subscribe(
                //obtenemos la lista con los valores actualizados de la lista de seguimientos
                (seguimiento)=>{
                  this.seguimientos = seguimiento.seguimiento;
                  console.log(this.seguimientos);
                  //se almacenan en el localstorage
                localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));
                }
              )
              this.showMensaje('Se elimino el registro con exito');
              this.getAnswers();
            }
          }
        ]
      });
      confirm.present();
    //fin else del la comparacion del adjunto
    }

    }else{

      this.showMensaje('No es posible borraar el comentario. El estatus del trámite es: '+this.extraer.estatus);

    }

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