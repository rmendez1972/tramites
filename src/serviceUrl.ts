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

<<<<<<< HEAD
	  			return this.URL='http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
=======
	  			return this.URL='http://localhost:8083/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10


	  	}

	  	getUrladjuntos():String{

<<<<<<< HEAD
	  			return this.URLadjuntos='http://localhost:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://localhost:8080/tramites/adjuntos/';
=======
	  			return this.URLadjuntos='http://localhost:8083/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://localhost:8083/tramites/adjuntos/';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

	  	}

		getUrladjuntosupload():String{
	  			return this.URLadjuntosupload='http://localhost:3001/upload/';
	  	}

	  	getUrllogin():String{

<<<<<<< HEAD
	  			return this.URLlogin='http://localhost:8080/tramites/controladorregistro?operacion=apilogin&username=';
=======
	  			return this.URLlogin='http://localhost:8083/tramites/controladorregistro?operacion=apilogin&username=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

	  	}


		getUrlCambiaPassword():String{

<<<<<<< HEAD
	  			return this.URLcambiapassword='http://localhost:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
=======
	  			return this.URLcambiapassword='http://localhost:8083/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

	  	}


		getUrlupload():String{
	  			return this.URLupload='http://localhost:3001/upload';
	  	}

		getUrlfilename():String{

<<<<<<< HEAD
	  			return this.URLupload='http://localhost:8080/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
=======
	  			return this.URLupload='http://localhost:8083/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

		}

		//MEGH
		getUrlpushSeguimiento():String{

<<<<<<< HEAD
			return this.URLpushseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
=======
			return this.URLpushseguimiento='http://localhost:8083/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10


		}

		getUrlpushComentario():String{ //igh



<<<<<<< HEAD
			return this.URLpushcomentario='http://localhost:8080/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';
=======
			return this.URLpushcomentario='http://localhost:8083/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

		}

		getTramite():String{
<<<<<<< HEAD
			return this.URLTramite='http://localhost:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
=======
			return this.URLTramite='http://localhost:8083/tramites/controladorregistro?operacion=listarjson&id_usuario=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10

		}

		//MEGH
		getUrldeleteSeguimiento():String{

<<<<<<< HEAD
			return this.URLdeleteseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
		}

		getUrlupdateSeguimiento():String{
			return this.URLupdateseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
=======
			return this.URLdeleteseguimiento='http://localhost:8083/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
		}

		getUrlupdateSeguimiento():String{
			return this.URLupdateseguimiento='http://localhost:8083/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
>>>>>>> 713a0dc02cb856f273a1e167b9e017983d75cf10


		}
}
