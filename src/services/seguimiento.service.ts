import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
export class SeguimientoService {
  private seguimientosUrl: string;
  private pushseguimientoURL: string;
  private deleteseguimientoURL: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.seguimientosUrl=String(this.url.getUrl());
    this.pushseguimientoURL=String(this.url.getUrlpushSeguimiento());
    this.deleteseguimientoURL=String(this.url.getUrldeleteSeguimiento());
    
  }

  getData(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  getSolicitudes(idSolicitud: number,idSolicitante:number){

    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
       .map((res) => res.json(),(error)=>{console.log(error);});
    //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=59&id_solicitante=59')

  }

  getTramite(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }

  getSeguimientos(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //metodo para insertar un nuevo seguimiento de parte del nivel enlace
  pushSeguimiento(values, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushseguimientoURL+values+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }

  //metodo para eliminar un seguimiento de nivel enlace
  deleteSeguimiento(id_seguimiento:number, id_solicitud:number){
    return this.http.get(this.deleteseguimientoURL+id_seguimiento+"&id_solicitud="+id_solicitud)
    .map((res) => res.json(),(error)=>{console.log(error);});
   
  }

  //metodo para actualizar el seguimiento de nivel enlace
  updateSeguimiento(id_seguimiento:string, values){
    console.log("id_seguimiento dentro del service"+id_seguimiento);
    console.log("observaciones dentro del service"+values);

  }
}
