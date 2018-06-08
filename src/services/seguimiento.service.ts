import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
export class SeguimientoService {
  private seguimientosUrl: string;
  private pushseguimientoURL: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.seguimientosUrl=String(this.url.getUrl());
    this.pushseguimientoURL=String(this.url.getUrlpushSeguimiento());
    
  }

  getFeedCategories(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
  }
  getSolicitudes(idSolicitud: number,idSolicitante:number){

    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
    //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=70&id_solicitante=70')
    //;
  }

  getTramite(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
  }

  getSeguimientos(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
  }

  pushSeguimiento(values, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushseguimientoURL+values+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }
}
