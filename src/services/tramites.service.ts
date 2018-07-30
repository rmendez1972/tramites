import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';

/**
* Component()
* Este es el Injectable de la clase
* @author: Angel Lara
* @return {Injectable} Injectable
*/
@Injectable()
/**
*class SeguimientoService()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Angel Lara
* @return {class}  class 
*/
export class TramiteService {
  /**
  * Variables local
  * @param {string} tramiteUrl
  */
  private tramiteUrl: string;
  /**
  * Variables local
  * @param {string} statusUrl
  */
  private statusUrl: string;

  /**
  * class constructor()
  * Constructor de la clase
  * @author: Angel Lara
  * @return {constructor} constructor
  */
	constructor(
    /**
    * Variables local
    * @param {Http} http
    */
    public http: Http, 
    /**
    * Variables local
    * @param {ServiceUrl} url
    */
    private url:ServiceUrl,
    ){
    /**
    * Variables local
    * @param {String} tramiteUrl
    */
    this.tramiteUrl=String(this.url.getTramite());
    /**
    * Variables local
    * @param {String} statusUrl
    */
    this.statusUrl =String(this.url.getStatus());
    
  }
  /**
  * getUnidadAdministrativa()
  * Este Metodo es para obtener datos de las solicitudes del Back End
  * @author: Angel Lara
  * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
  * @return {any} 
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
  * @return {any}
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
  * @return {any} 
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
  * @return {any} 
  */
  getStatus(){
    return this.http.get(this.statusUrl)
    .map((res) => res.json(),(error)=>{console.log(error);});
  }
}
