import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
/**
* class SeguimientoService()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Angel Lara
* @return {export} export class 
*/

export class SeguimientoService {
  /**
  * Variables locales
  */
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

  /**
  * Este Metodo es para obtener datos del solicitante del Back End
  * @author: Angel Lara
  * @param {number,number } idSolicitud, idSolicitante
  * @return {json, error} res, error 
  */
  getData(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getSolicitudes()
  * Este Metodo es para obtener datos de las solicitudes del Back End
  * @author: Angel Lara
  * @param {number,number } idSolicitud, idSolicitante
  * @return {json, error} res, error 
  */
  getSolicitudes(idSolicitud: number,idSolicitante:number){

    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
       .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getTramite()
  * Metodo para obtener datos del tramite del Back End
  * @author: Angel Lara
  * @param {number,number } idSolicitud, idSolicitante
  * @return {json, error} res, error 
  */

  getTramite(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getSeguimientos()
  * Metodo para obtener datos del seguimiento del Back End
  * @author: Angel Lara
  * @param {number,number } idSolicitud, idSolicitante
  * @return {json, error} res, error 
  */
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
  *  @author: Marlon Gomez
  *  @param {Object, Number, Number, Number}  observaciones, id_usuario, id_solicitud, id_status
  *
  *  @return {json, error} res, error
  */
  pushSeguimiento(observaciones, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushseguimientoURL+observaciones+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }


  /**
  *  deleteSeguimiento()  llamado al backend para eliminar un seguimiento
  *  @author: Marlon Gomez
  *  @param {Number, Number}  id_seguimiento, id_solicitud
  *
  *  @return {json, error}   res,error
  */
  deleteSeguimiento(id_seguimiento:number, id_solicitud:number){
    return this.http.get(this.deleteseguimientoURL+id_seguimiento+"&id_solicitud="+id_solicitud)
    .map((res) => res.json(),(error)=>{console.log(error);});

  }

  /** 
  *  updateSeguimiento()  llamado al backend para actualizar un seguimiento
  *  @author: Marlon Gomez
  *  @param {Number, Object, Number, Number, Number}  id_seguimiento, values, id_solicitud, id_status, adjunto
  *
  *  @return {json, error}   res,error
  */
  updateSeguimiento(id_seguimiento:number, values, id_solicitud:number, id_usuario:number, id_status:number,adjunto:number){
    return this.http.get(this.updateseguimientoURL+id_seguimiento+"&id_solicitud="+id_solicitud+'&observaciones='+values+'&id_usuario='+id_usuario+'&id_status='+id_status+'&adjunto='+adjunto)
    .map((res) => res.json(),(error)=>{console.log(error);});

  }
  
  /**
  *  pushComentario()  llamado al backend para insertar un comentario
  *  @param {Object, Number, Number, Number}  observaciones, id_usuario, id_solicitud, id_status
  *
  *  @return {json, error} res, error
   */
  pushComentario(observaciones, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushcomentarioURL+observaciones+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }
  /**
  * getStatus()
  * Metodo para obtener datos de los status del Back End
  * @author: Angel Lara
  * @param {void } void
  * @param {get} this.statusUrl
  * @return {json, error} res, error 
  */
  getStatus(){
    return this.http.get(this.statusUrl)
    .map((res) => res.json(),(error)=>{console.log(error);});
  }
}
