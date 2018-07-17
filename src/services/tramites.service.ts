import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
export class TramiteService {
  private tramiteUrl: string;
  private statusUrl: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.tramiteUrl=String(this.url.getTramite());
    this.statusUrl =String(this.url.getStatus());
    
  }
  //Obteniendo datos de las solicitudes del Back End
  getSolicitudes(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //Obteniendo datos de la unidad del Back End
  getUnidadAdministrativa(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //Obteniendo datos de la direccion del Back End
  getDireccion(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  //Obteniendo datos del status del Back End
  getStatus(){
    return this.http.get(this.statusUrl)
    .map((res) => res.json(),(error)=>{console.log(error);});
  }
}
