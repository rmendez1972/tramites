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
 *  
 *  Clase que realiza la Eliminacion de un seguimiento y ademas presenta modales para la Inserción y Eliminación de seguimientos
 *.
 */

@Component({
  selector: 'page-modrespuesta-seguimiento',
  templateUrl: 'modrespuesta-seguimiento.html',
})
export class ModrespuestaSeguimientoPage {
  //declaracion de variables
  answers: Array<any> = [];
  question: any = new Question();
  questionId: any;
  extraer:any={};
  tramite:any={};
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  actividad:Array<CategoryModel> = new Array<CategoryModel>();
  segB:Array<CategoryModel> = new Array<CategoryModel>();
  sol:Array<CategoryModel> = new Array<CategoryModel>();
  private currentUser:any[];
  private mid_usuario: number;
  solicitud : any={};
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
    //recibiendo valores del navParams
    let seguimiento = navParams.get('seguimiento');
    //se le asigna el objeto completo a la variable "seguimiento"
    this.seguimiento = isPresent(seguimiento)  ? seguimiento : '';

     }
  
 /**
  * createAmswerModal()
  * metodo para crear y presentar un modal
  *
  *  @return {Void}
  */
  createAnswerModal() {
    //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
    if(this.solicitud.id_status==2){
      //creando un objeto con sus respectivas propiedades
      let create_answer_data = {
        mode: 'Agregar',
        questionId: this.questionId
      };
      //creando modal
      let create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
      create_answer_modal.onDidDismiss(data => {
         this.getAnswers();
      });
      //presentando modal
      create_answer_modal.present();
    }else{
      this.showMensaje('No es posible generar comentario. El estatus del trámite es: '+this.extraer.estatus);
    }
  }


 /**
  * editAnswerModal()
  * metodo para crear y presentar un modal
  *
  *  @param {Object} seguimiento
  *  @return {Void}
  */
  editAnswerModal(seguimiento: any) {
    //declarando variables e inicializando con los valores que recibimos en el objeto "seguimientos"
    let id_seguimiento = seguimiento.id_seguimiento;
    let observaciones = seguimiento.observaciones;
    let adjuntos = seguimiento.adjunto;
    let status = seguimiento.id_status;
    //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
    if(this.solicitud.id_status==2){
      //creando objeto con sus respectivas propiedades
      let edit_answer_data = {
        mode: 'Editar',
        answer: observaciones,
        questionId: id_seguimiento,
        adjuntos: adjuntos,
        status: status
      };
      //creando modal
      let edit_answer_modal = this.modalCtrl.create(EdicionSeguimientoPage, { data: edit_answer_data });
      edit_answer_modal.onDidDismiss(data => {
        this.getAnswers();
      });
      //presentando modal
      edit_answer_modal.present();

    }else{

      this.showMensaje('No es posible editar el comentario. El estatus del trámite es: '+this.extraer.estatus);

    }
  }

  ionViewWillEnter() {
    //recuperando valores del localstorage de currentUser
    this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
    //recuperando el id_usuario
    this.mid_usuario=this.currentUser[0].id;
    //se recuperan los valores del localstorage en el metodo de getAnswers
    this.getAnswers();

    //recuperando valores del localstorage de solicitud
    let solicitud = JSON.parse(localStorage.getItem('solicitud'));
    //for para recuperar el valor del estatus
    for(var s in solicitud){
      this.solicitud = solicitud[s];
    }
    //recuperando del localstorage de tramites
    let tramite = JSON.parse(localStorage.getItem('tramite'));
    //for para recuperar el valor del estatus
    for(var t in tramite) {
      this.tramite = tramite[t];
    }
  }

 /**
  * getAnswers() 
  * metodo en donde se buscan los seguimientos que estan guardados en el localStorage
  *
  *  @return {Void}
  */
  getAnswers(){
    //Preparando un LoadingCtrl
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    //Presentando el LoadingCtrl
    loading.present();

    //recuperando valores del localstorage de seguimiento
    this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));

    loading.dismiss();
  }

  /**
  * delete() metodo para eliminar un seguimiento
  *
  *  @param {Object} seguimiento
  *  @return {Void}
  */
  delete(seguimiento:any){
    //recibiendo el objeto y asignandolo a las variables
    let id_seguimiento = seguimiento.id_seguimiento;
    let adjuntos = seguimiento.adjunto;

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
                //se almacenan en el localstorage
                localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));
                }
              )
              //mostramos mensaje en pantalla
              this.showMensaje('Se elimino el registro con exito');
              //llamamos al metodo para que recupere valores del localstorage
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

    /**
    * showMensaje() metodo para mostrar un mensaje en la pantalla cuando se requiera
    *
    *  @param {Object} msg
    *  @return {Void}
    */
    showMensaje(msg) {

      const alert = this.alertCtrl.create({
        title: 'Aviso',
        subTitle: msg ,
        buttons: ['Ok']
      });
      alert.present();
    }


}