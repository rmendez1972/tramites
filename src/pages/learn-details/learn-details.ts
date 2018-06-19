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
  selector: 'learn-details-page',
  templateUrl: 'learn-details.html'
})
export class LearnDetailsPage {
  currentUser: User;//igh

  questions: Array<any> = [];
  solicitud : any;
  tramite : any;
  questionId:any;

  public seguimiento : any;
  seguimientos:any[];//igh

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
    this.getQuestions();
    console.log(this.seguimientos);
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
  delete(questionId){
    let confirm = this.alertCtrl.create({
      title: 'Eliminar comentario',
      message: 'Seguro de eliminar tu comentario a este seguimiento?',
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
            this.questionService.deleteQuestion(questionId)
            .then(res => this.getQuestions());
            this.answerService.getAnswers(questionId)
            .then(answers => {
              for(let answer of answers){
                this.answerService.deleteAnswer(answer.id);
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  addPositiveVote(question){
    let data = question;
    data.positiveVotes += 1;
    data.questionSlug = this.solicitud.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  addNegativeVote(question){
    let data = question;
    data.negativeVotes += 1;
    data.questionSlug = this.solicitud.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  countAnswers(questionId){
    return this.answerService.countAnswers(questionId)
    .then(res => console.log(res))
  }

  openAnswers(question){
    this.navCtrl.push(ModrespuestaSeguimientoPage, {
      id: question.id
    });
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
