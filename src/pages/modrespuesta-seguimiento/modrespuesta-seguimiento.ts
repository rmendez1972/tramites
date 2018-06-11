import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { Question } from '../../../sdk';
import { AnswerService } from '../../services/answer.service';
import { QuestionService } from '../../services/question.service';
import { ManageAnswerPage } from '../manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../respuesta-seguimiento/respuesta-seguimiento';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
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

  editAnswerModal(answer) {
    console.log('Entrando a editAnswerModal');
    let edit_answer_data = {
      mode: 'Edit',
      answer: answer,
      questionId: this.questionId
    };
    let edit_answer_modal = this.modalCtrl.create(ManageAnswerPage, { data: edit_answer_data });
    edit_answer_modal.onDidDismiss(data => {
      this.getAnswers();
    });
    edit_answer_modal.present();
  }

  ionViewWillEnter() {
   this.questionId = this.navParams.get('id');
   this.getQuestion();
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
      content: 'Please wait...'
    });
    loading.present();
    this.answerService.getAnswers(this.questionId)
    .then(res => {
      this.answers = res;
      loading.dismiss();
    })
  }

  delete(answerId){
    let confirm = this.alertCtrl.create({
      title: 'Delete answer',
      message: 'Are you sure you want to delete this answer?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.answerService.deleteAnswer(answerId)
            .then(res => this.getAnswers())
          }
        }
      ]
    });
    confirm.present();
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

}
