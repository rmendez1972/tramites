import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
export class SeguimientoService {
  private seguimientosUrl: string;
  private adjuntosUrl: string;
  private pushseguimientoURL: string;
  private deleteseguimientoURL: string;
  private updateseguimientoURL: string;
  private pushcomentarioURL: string;//igh
  private statusUrl: string;

  private statusURL: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.seguimientosUrl=String(this.url.getUrl());
    this.adjuntosUrl=String(this.url.getUrladjuntos());
    this.pushseguimientoURL=String(this.url.getUrlpushSeguimiento());
    this.pushcomentarioURL=String(this.url.getUrlpushComentario());
    this.deleteseguimientoURL=String(this.url.getUrldeleteSeguimiento());
    this.updateseguimientoURL=String(this.url.getUrlupdateSeguimiento());
    this.statusUrl =String(this.url.getStatus());


  }

  //Metodo para obtener datos del solicitante del Back End
  getData(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //Metodo para obtener datos de las solicitudes del Back End
  getSolicitudes(idSolicitud: number,idSolicitante:number){

    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
       .map((res) => res.json(),(error)=>{console.log(error);});
    //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=59&id_solicitante=59')

  }
  //Metodo para obtener datos del tramite del Back End
  getTramite(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //Metodo para obtener datos del seguimiento del Back End
  getSeguimientos(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }

  getAdjuntos(idSeguimiento: number){
    console.log('valor de idSeguimiento antes de URL '+idSeguimiento);
    console.log('url para conseguir adjuntos '+this.adjuntosUrl+idSeguimiento);
    return this.http.get(this.adjuntosUrl+idSeguimiento)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }

  /**
  *  pushSeguimiento()  llamado al backend para insertar un seguimiento
  *  
  *  @param {Object}  observaciones
  *  @param {Number}  id_usuario
  *  @param {Number}  id_solicitud
  *  @param {Number}  id_status
  *
  *  @return {Json}   res
  */
  pushSeguimiento(observaciones, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushseguimientoURL+observaciones+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }


  /**
  *  deleteSeguimiento()  llamado al backend para eliminar un seguimiento
  *  
  *  @param {Number}  id_seguimiento
  *  @param {Number}  id_solicitud
  *
  *  @return {Json}   res
  */
  deleteSeguimiento(id_seguimiento:number, id_solicitud:number){
    return this.http.get(this.deleteseguimientoURL+id_seguimiento+"&id_solicitud="+id_solicitud)
    .map((res) => res.json(),(error)=>{console.log(error);});

  }

  /** 
  *  updateSeguimiento()  llamado al backend para actualizar un seguimiento
  *  
  *  @param {Number}  id_seguimiento
  *  @param {Object}  values
  *  @param {Number}  id_solicitud
  *  @param {Number}  id_status
  *  @param {Number}  adjunto
  *
  *  @return {Json}   res
  */
  updateSeguimiento(id_seguimiento:number, values, id_solicitud:number, id_usuario:number, id_status:number,adjunto:number){
    return this.http.get(this.updateseguimientoURL+id_seguimiento+"&id_solicitud="+id_solicitud+'&observaciones='+values+'&id_usuario='+id_usuario+'&id_status='+id_status+'&adjunto='+adjunto)
    .map((res) => res.json(),(error)=>{console.log(error);});

  }
  //igh metodo para insertar comentario como ciudadano
  pushComentario(observaciones, id_usuario:number,id_solicitud:number,id_status:number){
    console.log('Dentro del service del simio2');
    console.log(observaciones,id_usuario,id_solicitud,id_status);
    return this.http.get(this.pushcomentarioURL+observaciones+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }

  //Metodo para obtener datos de los status del Back End
  getStatus(){
    return this.http.get(this.statusUrl)
    .map((res) => res.json(),(error)=>{console.log(error);});
  }
}
