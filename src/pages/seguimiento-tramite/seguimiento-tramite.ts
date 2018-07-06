import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, RefresherContent } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
//import { SeguimientoService} from '../services/seguimiento.service'
//import { QuestionService } from '../../services/question.service';
//import { AnswerService } from '../../services/answer.service';
//import { QuestionDetailsPage } from '../question-details/question-details';
import { PreguntaSeguimientoPage } from '../pregunta-seguimiento/pregunta-seguimiento';
//import { ManageQuestionPage } from '../manage-question/manage-question';
import { ModrespuestaSeguimientoPage } from '../modrespuesta-seguimiento/modrespuesta-seguimiento';
import { AdjuntosSeguimientoPage } from '../adjuntos-seguimiento/adjuntos-seguimiento';
import { User } from '../login/user';//igh
import { SeguimientoService } from '../../services/seguimiento.service';


@Component({
  selector: 'seguimiento-tramite-page',
  templateUrl: 'seguimiento-tramite.html'
})
export class SeguimientoTramitePage {
  seguimientoService:SeguimientoService;
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
    //public questionService: QuestionService,
    //public answerService: AnswerService,
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

  //Método para crear una pregunta/comentario por parte del ciudadano
  createQuestionModal() {
    console.log('Creando comentario..');
    if (this.solicitud[0].status=='TRAMITE'){//Se va apoder crear siempre cuandor el estatus sea TRAMITE
      let create_question_modal = this.modalCtrl.create(PreguntaSeguimientoPage, { data: this.solicitud.data });
      create_question_modal.onDidDismiss(data => {
      this.getQuestions();


    });
    create_question_modal.present();

    }
    else {//Si el estatus no es trámite alertar al usuario de que no es posible crear un comentario
      let subtitle= 'No es posible generar comentario. El estatus de su trámite es: '+this.solicitud[0].status;
      this.showAlert(subtitle);

    }

  }

  ionViewWillEnter() {
    this.seguimientos=[];//igh
    this.seguimientos =JSON.parse(localStorage.getItem('seguimiento'));//igh
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//igh
    this.id_grupo=this.currentUser[0].id_grupo;
    //console.log('Grupo...'+this.id_grupo);
    //console.log(this.seguimientos);
    //this.getQuestions();
  }

  getQuestions(){//Obtiene todos los seguimientos del tramite
      let loading = this.loadingCtrl.create({
      content: 'Recuperando Datos del Servidor de SEDETUS...'
    });
    loading.present();
    this.seguimientos =JSON.parse(localStorage.getItem('seguimiento'));
    //this.seguimientoService.getSeguimientos(this.solicitud.slug)
    //this.questionService.getQuestionsBySlug(this.solicitud.slug)
    //.then(res => {
    // this.questions = res;
    //loading.dismiss();
   //})
    loading.dismiss();
  }


  listarParaEdicion(seguimiento, tramite, solicitud){//Enlista los seguimientos para su edición o eliminación
    let data_params = {
      seguimientos:seguimiento,
      tramites:tramite,
      solicitud:solicitud
    }

    this.navCtrl.push(ModrespuestaSeguimientoPage, {data: data_params });
  }


  verAdjuntos(seguimiento, tramite, solicitud){//Metod para mostrar los adjuntos
    //let subtitle= 'Ver adjuntos. Pendiente por realizar';
    //this.showAlert(subtitle);
    let params = {
      seguimientoObservaciones:seguimiento.observaciones,
      seguimientoId:seguimiento.id_seguimiento,
      tramite:tramite,
      solicitud:solicitud
    }

    this.navCtrl.push(AdjuntosSeguimientoPage, {data: params });
  }

   // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert(subtitle:string='En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>') {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

}