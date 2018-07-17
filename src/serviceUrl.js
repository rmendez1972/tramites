var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/**
* Component()
* Este es el Injectable de la clase
* @author: Angel Lara
* @return {Injectable} Injectable
*/
var ServiceUrl = /** @class */ (function () {
    /**
    * class constructor()
    * Constructor de la clase
    * @author: Angel Lara
    * @return {constructor} constructor
    */
    function ServiceUrl() {
    }
    /**
    * getUrl()
    * Metodo para obtener Json de seguimientos
    * @param {String} getUrl
    * @return {String}
    */
    ServiceUrl.prototype.getUrl = function () {
        return this.URL = 'http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
    };
    /**
    * getUrladjuntos()
    * Metodo para obtener lista de Json adjuntos
    * @param {String} getUrladjuntos()
    * @return {String}
    */
    ServiceUrl.prototype.getUrladjuntos = function () {
        return this.URLadjuntos = 'http://189.221.153.178:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
    };
    /**
    * getUrladjuntosdescarga()
    * Metodo para obtener Json de adjuntos descarga
    * @param {String} getUrladjuntosdescarga()
    * @return {String}
    */
    ServiceUrl.prototype.getUrladjuntosdescarga = function () {
        return this.URLadjuntosdescarga = 'http://189.221.153.178:8080/tramites/adjuntos/';
    };
    /**
    * getUrladjuntosupload()
    * Metodo para subir archivos
    * @param {String} getUrladjuntosupload()
    * @return {String}
    */
    ServiceUrl.prototype.getUrladjuntosupload = function () {
        return this.URLadjuntosupload = 'http://189.221.153.178:3001/upload/';
    };
    /**
    * getUrllogin()
    * Metodo para iniciar sesion
    * @param {String} getUrllogin()
    * @return {String}
    */
    ServiceUrl.prototype.getUrllogin = function () {
        return this.URLlogin = 'http://189.221.153.178:8080/tramites/controladorregistro?operacion=apilogin&username=';
    };
    /**
    * getUrlpushSeguimiento()
    * Metodo para insertar comentario pregunta por usuario seguimiento
    * @param {String} getUrlpushSeguimiento()
    * @return {String}
    */
    ServiceUrl.prototype.getUrlpushSeguimiento = function () {
        return this.URLpushseguimiento = 'http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
    };
    /**
    * getUrlpushComentario()
    * Metodo para insertar comentario pregunta por usuario ciudadano
    * @author: Angel Lara
    * @param {String} getUrladjuntos
    * @return {String}
    */
    ServiceUrl.prototype.getUrlpushComentario = function () {
        return this.URLpushcomentario = 'http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=grabarcomentariojson&observaciones=';
    };
    /**
    * getTramite()
    * Metodo para listar Json de tramites
    * @author: Angel Lara
    * @param {String} getUrladjuntos
    * @return {String}
    */
    ServiceUrl.prototype.getTramite = function () {
        return this.URLTramite = 'http://189.221.153.178:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
    };
    /**
    * getUrldeleteSeguimiento()
    * Metodo para borrar seguimiento por usuario seguimiento
    * @param {String} getUrladjuntos
    * @return {String}
    */
    ServiceUrl.prototype.getUrldeleteSeguimiento = function () {
        return this.URLdeleteseguimiento = 'http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=borrarjson&id_seguimiento=';
    };
    /**
    * getUrlupdateSeguimiento()
    * Constructor de la clase
    * @author: Angel Lara
    * @param {String} getUrladjuntos
    * @return {String}
    */
    ServiceUrl.prototype.getUrlupdateSeguimiento = function () {
        return this.URLupdateseguimiento = 'http://189.221.153.178:8080/tramites/controladorseguimiento?operacion=actualizarjson&id_seguimiento=';
    };
    /**
    * class constructor()
    * Constructor de la clase
    * @author: Angel Lara
    * @param {String} getUrladjuntos
    * @return {String}
    */
    ServiceUrl.prototype.getStatus = function () {
        return this.URLstatus = 'http://189.221.153.178:8080/tramites/controladorregistro?operacion=statusjson';
    };
    ServiceUrl = __decorate([
        Injectable()
        /**
        * class ServiceUrl()
        * Esta clase se usa para conectar con el Back End
        * @author: Angel Lara
        * @return {class} ServiceUrl
        */
        ,
        __metadata("design:paramtypes", [])
    ], ServiceUrl);
    return ServiceUrl;
}());
export { ServiceUrl };
//# sourceMappingURL=serviceUrl.js.map