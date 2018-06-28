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
public URLstatus:String;

constructor() {}


  		getUrl():String{


<<<<<<< HEAD
	  			return this.URL='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
=======
	  			return this.URL='http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054
	  	}

	  	getUrladjuntos():String{

<<<<<<< HEAD
	  			return this.URLadjuntos='http://189.221.153.178:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://189.221.153.178:8080/tramites/adjuntos/';
=======
	  			return this.URLadjuntos='http://localhost:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://localhost:8080/tramites/adjuntos/';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054



	  	}

		getUrladjuntosupload():String{
	  			return this.URLadjuntosupload='http://189.221.153.178:3001/upload/';
	  	}

	  	getUrllogin():String{


<<<<<<< HEAD
	  			return this.URLlogin='http://189.221.153.178:8080/tramites/controladorregistro?operacion=apilogin&username=';
=======
	  			return this.URLlogin='http://localhost:8080/tramites/controladorregistro?operacion=apilogin&username=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054

	  	}


		getUrlCambiaPassword():String{


<<<<<<< HEAD
	  			return this.URLcambiapassword='http://189.221.153.178:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
=======
	  			return this.URLcambiapassword='http://localhost:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054

	  	}


		getUrlupload():String{
	  			return this.URLupload='http://189.221.153.178:3001/upload';
	  	}

		getUrlfilename():String{


<<<<<<< HEAD
	  			return this.URLupload='http://189.221.153.178:8080/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
=======
	  			return this.URLupload='http://localhost:8080/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054


		}

		//MEGH
		getUrlpushSeguimiento():String{


<<<<<<< HEAD
			return this.URLpushseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
=======
			return this.URLpushseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054


		}

		getUrlpushComentario():String{ //igh


<<<<<<< HEAD
			return this.URLpushcomentario='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';
=======
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054

			return this.URLpushcomentario='http://localhost:8080/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';

		}

		getTramite():String{

<<<<<<< HEAD
			return this.URLTramite='http://189.221.153.178:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
=======
			return this.URLTramite='http://localhost:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054

		}

		//MEGH
		getUrldeleteSeguimiento():String{


<<<<<<< HEAD
			return this.URLdeleteseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
		}

		getUrlupdateSeguimiento():String{
			return this.URLupdateseguimiento='http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
=======
			return this.URLdeleteseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
		}

		getUrlupdateSeguimiento():String{
			return this.URLupdateseguimiento='http://localhost:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054


		}

		getStatus():String{
<<<<<<< HEAD
			return this.URLstatus='http://189.221.153.178:8080/tramites/controladorregistro?operacion=statusjson';
=======
			return this.URLstatus='http://localhost:8080/tramites/controladorregistro?operacion=statusjson';
>>>>>>> 640656fbb9614b79777d9ae503952fa0dd7b9054
		}
}
