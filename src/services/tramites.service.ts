import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

@Injectable()
/**
*class SeguimientoService()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Angel Lara
* @return {export} export class 
*/
export class TramiteService {
  private tramiteUrl: string;
  private statusUrl: string;

	constructor(public http: Http,
    private url:ServiceUrl,
    ){
    this.tramiteUrl=String(this.url.getTramite());
    this.statusUrl =String(this.url.getStatus());
    
  }
  /**
  * getUnidadAdministrativa()
  * Este Metodo es para obtener datos de las solicitudes del Back End
  * @author: Angel Lara
  * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
  * @return {json, error} res, error 
  */
  getSolicitudes(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getUnidadAdministrativa()
  * Este Metodo es para obtener datos de la unidad del Back End
  * @author: Angel Lara
  * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
  * @return {json, error} res, error 
  */
  getUnidadAdministrativa(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getDireccion()
  * Este Metodo es para obtener datos de la direccion del Back End
  * @author: Angel Lara
  * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
  * @return {json, error} res, error 
  */
  getDireccion(id_usuario: number,id_grupo:number,id_unidadadministrativa:number,id_direccion:number){
    //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
    return this.http.get(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion)
      .map((res) => res.json(),(error)=>{console.log(error);});
  }
  /**
  * getStatus()
  * Este Metodo es para obtener datos del status del Back End
  * @author: Angel Lara
  * @param {void } 
  * @param {get} this.statusUrl
  * @return {json, error} res, error 
  */
  getStatus(){
    return this.http.get(this.statusUrl)
    .map((res) => res.json(),(error)=>{console.log(error);});
  }
}
