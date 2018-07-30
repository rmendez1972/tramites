import { Injectable } from '@angular/core';
/**
* Component()
* Este es el Injectable de la clase
* @author: Angel Lara
* @return {Injectable} Injectable
*/
@Injectable()

/**
* class ServiceUrl()
* Esta clase se usa para conectar con el Back End
* @author: Angel Lara
* @return {class} ServiceUrl
*/
export class ServiceUrl {
	/**
    * Variables local
    * @param {String} URL
    */
	public URL: String;
	/**
    * Variables local
    * @param {String} URLadjuntos
    */
	public URLadjuntos: String;
	/**
    * Variables local
    * @param {String} URLadjuntosdescarga
    */
	public URLadjuntosdescarga: String;
	/**
    * Variables local
    * @param {String} URLadjuntosupload
    */
	public URLadjuntosupload: String;
	/**
    * Variables local
    * @param {String}  URLbuscarsolicitud
    */
	public URLbuscarsolicitud: String;
	/**
    * Variables local
    * @param {String} URLlogin
    */
	public URLlogin: String;
	/**
    * Variables local
    * @param {String} URLpushseguimiento
    */
	public URLpushseguimiento: String;
	/**
    * Variables local
    * @param {String} URLadjuntos
    */
	public URLdeleteseguimiento: String;
	/**
    * Variables local
    * @param {String} URLpushcomentario
    */
	public URLpushcomentario: String;//igh
	/**
    * Variables local
    * @param {String} URLTramite
    */
	public URLTramite:String;
	/**
    * Variables local
    * @param {String} URLupdateseguimiento
    */
	public URLupdateseguimiento: String;
	/**
    * Variables local
    * @param {String} URLstatus
    */
	public URLstatus:String;

	/**
	* class constructor()
	* Constructor de la clase
	* @author: Angel Lara
	* @return {constructor} constructor
	*/
	constructor() {}
	/**
	* getUrl()
	* Metodo para obtener Json de seguimientos
	* @param {String} getUrl
	* @return {String} 
	*/
	getUrl():String{
		return this.URL='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
	}
	/**
	* getUrladjuntos()
	* Metodo para obtener lista de Json adjuntos
	* @param {String} getUrladjuntos()
	* @return {String} 
	*/
	getUrladjuntos():String{
		return this.URLadjuntos='http://189.221.153.178:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	}
	/**
	* getUrladjuntosdescarga()
	* Metodo para obtener Json de adjuntos descarga
	* @param {String} getUrladjuntosdescarga()
	* @return {String} 
	*/
	getUrladjuntosdescarga():String{
		return this.URLadjuntosdescarga='http://189.221.153.178:8080/tramites/adjuntos/';
	}
	/**
	* getUrladjuntosupload()
	* Metodo para subir archivos
	* @param {String} getUrladjuntosupload()
	* @return {String} 
	*/
	getUrladjuntosupload():String{
		return this.URLadjuntosupload='http://189.221.153.178:3001/upload/';
	}
	/**
	* getUrllogin()
	* Metodo para iniciar sesion
	* @param {String} getUrllogin()
	* @return {String} 
	*/
	getUrllogin():String{
		return this.URLlogin='http://189.221.153.178:8080/tramites/controladorregistro?operacion=apilogin&username=';
	}
	/**
	* getUrlpushSeguimiento()
	* Metodo para insertar comentario pregunta por usuario seguimiento
	* @param {String} getUrlpushSeguimiento()
	* @return {String} 
	*/
	getUrlpushSeguimiento():String{
		return this.URLpushseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
	}
	/**
	* getUrlpushComentario()
	* Metodo para insertar comentario pregunta por usuario ciudadano
	* @author: Angel Lara
	* @param {String} getUrladjuntos
	* @return {String} 
	*/
	getUrlpushComentario():String{ //igh
		return this.URLpushcomentario='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';
	}
	/**
	* getTramite()
	* Metodo para listar Json de tramites
	* @author: Angel Lara
	* @param {String} getUrladjuntos
	* @return {String} 
	*/
	getTramite():String{
		return this.URLTramite='http://189.221.153.178:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
	}
	/**
	* getUrldeleteSeguimiento()
	* Metodo para borrar seguimiento por usuario seguimiento
	* @param {String} getUrladjuntos
	* @return {String} 
	*/
	getUrldeleteSeguimiento():String{
		return this.URLdeleteseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
	}
	/**
	* getUrlupdateSeguimiento()
	* Metodo para actualizar seguimiento por usuario seguimiento
	* @param {String} getUrladjuntos
	* @return {String} 
	*/
	getUrlupdateSeguimiento():String{
		return this.URLupdateseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
	}
	/**
	* getStatus()
	* Metodo para listar status de la solicitud
	* @author: Angel Lara
	* @param {String} getUrladjuntos
	* @return {String} 
	*/
	getStatus():String{
		return this.URLstatus='http://189.221.153.178:8080/tramites/controladorregistro?operacion=statusjson';
	}
}