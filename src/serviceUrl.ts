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
public URLdeleteseguimiento: String;
public URLpushcomentario: String;//igh
public URLTramite:String;
public URLupdateseguimiento: String;

constructor() {}


  		getUrl():String{
	  			return this.URL='http://localhost:8080/Tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';

	  	}

	  	getUrladjuntos():String{
	  			return this.URLadjuntos='http://localhost:8080/Tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://localhost:8080/Tramites/adjuntos/';
	  	}

		getUrladjuntosupload():String{
	  			return this.URLadjuntosupload='http://localhost:3001/upload/';
	  	}

	  	getUrllogin():String{
	  			return this.URLlogin='http://localhost:8080/Tramites/controladorregistro?operacion=apilogin&username=';
	  	}

		getUrlCambiaPassword():String{
<<<<<<< HEAD
	  			return this.URLcambiapassword='http://localhost:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
	  			
=======
	  			return this.URLcambiapassword='http://localhost:8080/Tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
>>>>>>> dea58f3de59011431965e25285015226f5fd09e7
	  	}


		getUrlupload():String{
	  			return this.URLupload='http://localhost:3001/upload';
	  	}

		getUrlfilename():String{
	  			return this.URLupload='http://localhost:8080/Tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
		}

		//MEGH
		getUrlpushSeguimiento():String{
			return this.URLpushseguimiento='http://localhost:8080/Tramites/controladorseguimiento?operacion=grabarjson&observaciones=';

		}

		getUrlpushComentario():String{ //igh
			return this.URLpushcomentario='http://localhost:8080/Tramites/controladorseguimiento?operacion=grabarjson&comentario=';
		}
		
		getTramite():String{
			return this.URLTramite='http://localhost:8080/Tramites/controladorregistro?operacion=listarjson&id_usuario=';
		}

		//MEGH
		getUrldeleteSeguimiento():String{
			return this.URLdeleteseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
		}

		getUrlupdateSeguimiento():String{
			return this.URLupdateseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';

		}
}
