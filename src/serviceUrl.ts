import { Injectable } from '@angular/core';

@Injectable()
export class ServiceUrl {
public URL: String;
public URLadjuntos: String;
public URLadjuntosdescarga: String;
public URLadjuntosupload: String;
public URLbuscarsolicitud: String;
public URLlogin: String;
public URLcambiapassword: String;
public URLupload: String;
public URLfilename: String;
public URLpushseguimiento: String;
public URLpushcomentario: String;//igh
public URLTramite:String;

constructor() {}


  		getUrl():String{
	  			return this.URL='http://localhost:8083/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
	  	}

	  	getUrladjuntos():String{
	  			return this.URLadjuntos='http://189.221.153.178:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://189.221.153.178:8080/tramites/adjuntos/';
	  	}

		getUrladjuntosupload():String{
	  			return this.URLadjuntosupload='http://189.221.153.178:3001/upload/';
	  	}

	  	getUrllogin():String{
	  			return this.URLlogin='http://189.221.153.178:8080/tramites/controladorregistro?operacion=apilogin&username=';
	  	}

		getUrlCambiaPassword():String{
	  			return this.URLcambiapassword='http://189.221.153.178:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
	  	}

		getUrlupload():String{
	  			return this.URLupload='http://189.221.153.178:3001/upload';
	  	}

		getUrlfilename():String{
	  			return this.URLupload='http://189.221.153.178:8080/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
		}
		  
		getUrlpushSeguimiento():String{
			return this.URLpushseguimiento='http://localhost:8083/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
		}

		getUrlpushComentario():String{ //igh
			return this.URLpushcomentario='http://localhost:8083/tramites/controladorseguimiento?operacion=grabarjson&comentario=';
		}
		getTramite():String{
			return this.URLTramite='http://localhost:8083/tramites/controladorregistro?operacion=listarjson&id_usuario=';
		}
}
