import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
export class SeguimientoService {
	private seguimientosUrl: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.seguimientosUrl=String(this.url.getUrl());
  }

  getFeedCategories(idSolicitud: number,idSolicitante:number){
    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
  }
  getSolicitudes(idSolicitud: number,idSolicitante:number){

    return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
      .map((res) => res.json());
    //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=59&id_solicitante=59')
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
}
