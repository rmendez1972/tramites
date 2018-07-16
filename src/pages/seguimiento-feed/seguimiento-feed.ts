import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { SeguimientoTramitePage } from '../seguimiento-tramite/seguimiento-tramite';
import { SeguimientoService } from '../../services/seguimiento.service';
import { CategoryModel } from '../../services/seguimiento.model';

@Component({
  selector: 'learn-feed-page',
  templateUrl: 'seguimiento-feed.html',
})
export class SeguimientoFeedPage {
  _query : string = 'all';
  data : Array<CategoryModel> = new Array<CategoryModel>();
  solicitud:Array<CategoryModel> = new Array<CategoryModel>();
  tramite:Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos=[];
  todoslosSeguimientos=[];


  private seguimiento:any[];

  private solicitudes:any[];
  private muestraToggle: boolean=false;
  private ocultaBack: boolean=false;
  id_solicitud:any;
  id_solicitante:any;
  currentUser:any;
  private status:any[];
  private metodo:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public seguimientoService: SeguimientoService,
    public alertCtrl: AlertController
  ) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'todos';

    let page = navParams.get('page');
    console.log ('valor PAGE '+page);
    this.metodo = isPresent(page) ? page.params.metodo : 'todosSeg';
    console.log ('valor de metodo '+this.metodo);

    let solicitud_param = navParams.get('sol');
    console.log('valor de SOL '+solicitud_param);
    this.id_solicitud = solicitud_param.id_solicitud;
    this.id_solicitante = solicitud_param.id_solicitante;



  }


  ionViewWillEnter() {
    this.verificaSiciudadano();


    this.seguimientoService.getData(this.id_solicitud,this.id_solicitante)
    .subscribe(
      (data) => {
        this.data = data.data;
        localStorage.setItem('data',JSON.stringify(this.data));
      },

    );

    this.seguimientoService.getSolicitudes(this.id_solicitud,this.id_solicitante)

    .subscribe(
      (solicitud) => {this.solicitud = solicitud.solicitud;
      localStorage.setItem('solicitud',JSON.stringify(this.solicitud));},

      );
    this.seguimientoService.getTramite(this.id_solicitud,this.id_solicitante)
    .subscribe(
      (tramite)=> {this.tramite =tramite.tramite;
        localStorage.setItem('tramite',JSON.stringify(this.tramite));},
      );
    this.seguimientoService.getSeguimientos(this.id_solicitud,this.id_solicitante)
    .subscribe(

      (seguimientos)=>{
        this.seguimientos = seguimientos.seguimientos;
        this.todoslosSeguimientos = seguimientos.seguimientos;
        localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));
        if (this.seguimientos.length==0){
          let subtitle='No hay seguimientos que mostrar hasta este momento.';
          this.showAlert(subtitle);
        }
      }
    );

    this.seguimientoService.getStatus()
    .subscribe(
      (status)=>{
        this.status = status.status;
        localStorage.setItem('status',JSON.stringify(this.status));

      }
    );



  }


  ionViewDidEnter(){
    if (this.metodo=='todosSeg'){
      this.todosSeg();
    }else{
      this.ultimoSeg();
    }
  }

  ultimoSeg(){
    this.seguimientos=[];

    this.todoslosSeguimientos=JSON.parse(localStorage.getItem('seguimiento'));
    console.log('el ultimo seguimiento es '+this.todoslosSeguimientos[0]);
    this.seguimientos.push(this.todoslosSeguimientos[0]);
    console.log('estoy en el ultimo seguimiento y la longitud es'+this.seguimientos.length);
  }

  todosSeg(){
    this.seguimientos=[];
    this.todoslosSeguimientos=JSON.parse(localStorage.getItem('seguimiento'));
    this.seguimientos=this.todoslosSeguimientos;
    console.log('todos los seguimiento');
  }



  openDetails(params) {
    this.navCtrl.push(SeguimientoTramitePage, params);
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

  verificaSiciudadano(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser[0].id_grupo==3){
      this.muestraToggle=false;
      this.ocultaBack=true;
    }
    if (this.currentUser[0].id_grupo==1 || this.currentUser[0].id_grupo==2){

      this.muestraToggle=true;
      this.ocultaBack=false;
    }

  }

}
