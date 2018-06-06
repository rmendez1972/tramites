import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';


@Injectable()
export class LearnService {
	private seguimientosUrl: string;

	constructor(public http: Http,
    ){
  }

  getFeedCategories(){
    return this.http.get("./assets/categories/categories.json")
      .map((res) => res.json());
  }
  getSolicitudes(){

    return this.http.get("./assets/categories/categories.json")
      .map((res) => res.json());
    //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=59&id_solicitante=59')
    //;
  }

  getTramite(){
    return this.http.get("./assets/categories/categories.json")
      .map((res) => res.json());
  }

  getSeguimientos(){
    return this.http.get("./assets/categories/categories.json")
      .map((res) => res.json());
  }
}
