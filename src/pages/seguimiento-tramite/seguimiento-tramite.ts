import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { QuestionDetailsPage } from '../question-details/question-details';
import { ManageQuestionPage } from '../manage-question/manage-question';
import { ModrespuestaSeguimientoPage } from '../modrespuesta-seguimiento/modrespuesta-seguimiento';
import { User } from '../login/user';//igh


@Component({
  selector: 'seguimiento-tramite-page',
  templateUrl: 'seguimiento-tramite.html'
})
export class SeguimientoTramitePage {
  currentUser: User;//igh

  questions: Array<any> = [];
  solicitud : any;
  tramite : any;
  questionId:any;

  public seguimiento : any;
  seguimientos:any[];//igh
  public id_grupo: number;
 
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,

  ) {
    let solicitud_param = navParams.get('solicitud');
    let tramite_param = navParams.get('tramite');
    let seguimientos_param = navParams.get('seg');

    //localStorage.setItem('solicitud',JSON.stringify(solicitud_param));
    this.solicitud = isPresent(solicitud_param) ? solicitud_param : null;
    this.tramite = isPresent(tramite_param) ? tramite_param : null;
    this.seguimiento= isPresent(seguimientos_param) ? seguimientos_param : null;
  }

  createQuestionModal() {
    console.log('Creando comentario..');

    let create_question_modal = this.modalCtrl.create(ManageQuestionPage, { slug: this.solicitud.slug });
    create_question_modal.onDidDismiss(data => {
      this.getQuestions();
    });
    create_question_modal.present();
  }


  ionViewWillEnter() {
    this.seguimientos=[];//igh
    this.seguimientos =JSON.parse(localStorage.getItem('seguimiento'));//igh
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//igh
    this.id_grupo=this.currentUser[0].id_grupo;
    console.log('Grupo...'+this.id_grupo);
    console.log(this.seguimientos);
    //this.getQuestions();
    
  }

  getQuestions(){
    let loading = this.loadingCtrl.create({
      content: 'Recuperando Datos del Servidor de SEDETUS...'
    });
    loading.present();
    //this.questionService.getQuestionsBySlug(this.solicitud.slug)
    //.then(res => {
    // this.questions = res;
    //loading.dismiss();
   //})
    loading.dismiss();
  }


  openAnswers(seguimiento, tramite, solicitud){

    let data_params = {
      seguimientos:seguimiento,
      tramites:tramite,
      solicitud:solicitud
    }
 
    this.navCtrl.push(ModrespuestaSeguimientoPage, {data: data_params });
  }

   // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert() {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> ',
      buttons: ['Ok']
    });
    alert.present();
  }

}
