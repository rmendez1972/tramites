import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { Question } from '../../../sdk';
import { AnswerService } from '../../services/answer.service';
import { QuestionService } from '../../services/question.service';
import { ManageAnswerPage } from '../manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../respuesta-seguimiento/respuesta-seguimiento';
import { CategoryModel } from '../../services/seguimiento.model';
import {SeguimientoService} from '../../services/seguimiento.service';


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
  //private modelseguimiento:any={};
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  seg:Array<CategoryModel> = new Array<CategoryModel>();
  actividad:Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public segservices:SeguimientoService
  ) {}

  createAnswerModal() {
    let create_answer_data = {
      mode: 'Create',
      questionId: this.questionId
    };
    let create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
    create_answer_modal.onDidDismiss(data => {
       this.getAnswers();
    });
    create_answer_modal.present();
  }

  editAnswerModal(id_seguimiento,observaciones,adjuntos) {
    console.log('observaciones'+observaciones);
    console.log('adjuntos'+adjuntos);
    
    let edit_answer_data = {
      mode: 'Edit',
      answer: observaciones,
      questionId: id_seguimiento,
      adjuntos: adjuntos
    };
    let edit_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: edit_answer_data });
    edit_answer_modal.onDidDismiss(data => {
      this.getAnswers();
    });
    edit_answer_modal.present();
  }

  ionViewWillEnter() {
    
    //se recuperan los valores del localstorage en el metodo de getAnswers
    this.getAnswers();

  }

  getQuestion(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.questionService.getQuestion(this.questionId)
    .then(res => {
      this.question = res[0];
      loading.dismiss();
    })
  }

  getAnswers(){
    let loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    loading.present();

    this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));
    loading.dismiss();

  }

  delete(id_seguimiento,adjuntos){
    
    //recuperamos los datos del local storage de seguimiento
    this.seg = JSON.parse(localStorage.getItem('seguimiento'));
    //obtenemos la id_solicitud
    for (var elemento in this.seg){
      this.extraer.id_solicitud = this.seg[elemento].id_solicitud;
    }

    if(adjuntos){
      console.log("mostrando mensaje que no se puede borrar");
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
      

    }

  }

  upVoteQuestion(){
    this.question.positiveVotes += 1;
    this.questionService.updateQuestion(this.question)
    .then(res => console.log(res))
  }

  downVoteQuestion(){
    this.question.negativeVotes += 1;
    this.questionService.updateQuestion(this.question)
    .then(res => console.log(res))
  }

  addPositiveVote(answer){
    answer.positiveVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

  addNegativeVote(answer){
    answer.negativeVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

   // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert() {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) http://qroo.gob.mx/sedetus desde tu laptop o computadora de escritorio',
      buttons: ['Ok']
    });
    alert.present();
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
