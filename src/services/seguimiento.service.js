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
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { ServiceUrl } from '../serviceUrl';
var SeguimientoService = /** @class */ (function () {
    function SeguimientoService(http, url) {
        this.http = http;
        this.url = url;
        this.seguimientosUrl = String(this.url.getUrl());
        this.adjuntosUrl = String(this.url.getUrladjuntos());
        this.pushseguimientoURL = String(this.url.getUrlpushSeguimiento());
        this.pushcomentarioURL = String(this.url.getUrlpushComentario());
        this.deleteseguimientoURL = String(this.url.getUrldeleteSeguimiento());
        this.updateseguimientoURL = String(this.url.getUrlupdateSeguimiento());
        this.statusUrl = String(this.url.getStatus());
    }
    /**
    * Este Metodo es para obtener datos del solicitante del Back End
    * @author: Angel Lara
    * @param {number,number } idSolicitud, idSolicitante
    * @return {json, error} res, error
    */
    SeguimientoService.prototype.getData = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getSolicitudes()
    * Este Metodo es para obtener datos de las solicitudes del Back End
    * @author: Angel Lara
    * @param {number,number } idSolicitud, idSolicitante
    * @return {json, error} res, error
    */
    SeguimientoService.prototype.getSolicitudes = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getTramite()
    * Metodo para obtener datos del tramite del Back End
    * @author: Angel Lara
    * @param {number,number } idSolicitud, idSolicitante
    * @return {json, error} res, error
    */
    SeguimientoService.prototype.getTramite = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getSeguimientos()
    * Metodo para obtener datos del seguimiento del Back End
    * @author: Angel Lara
    * @param {number,number } idSolicitud, idSolicitante
    * @return {json, error} res, error
    */
    SeguimientoService.prototype.getSeguimientos = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    SeguimientoService.prototype.getAdjuntos = function (idSeguimiento) {
        console.log('valor de idSeguimiento antes de URL ' + idSeguimiento);
        console.log('url para conseguir adjuntos ' + this.adjuntosUrl + idSeguimiento);
        return this.http.get(this.adjuntosUrl + idSeguimiento)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    *  pushSeguimiento()  llamado al backend para insertar un seguimiento
    *  @author: Marlon Gomez
    *  @param {Object, Number, Number, Number}  observaciones, id_usuario, id_solicitud, id_status
    *
    *  @return {json, error} res, error
    */
    SeguimientoService.prototype.pushSeguimiento = function (observaciones, id_usuario, id_solicitud, id_status) {
        return this.http.get(this.pushseguimientoURL + observaciones + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status)
            .map(function (res) { return res.json(); });
    };
    /**
    *  deleteSeguimiento()  llamado al backend para eliminar un seguimiento
    *  @author: Marlon Gomez
    *  @param {Number, Number}  id_seguimiento, id_solicitud
    *
    *  @return {json, error}   res,error
    */
    SeguimientoService.prototype.deleteSeguimiento = function (id_seguimiento, id_solicitud) {
        return this.http.get(this.deleteseguimientoURL + id_seguimiento + "&id_solicitud=" + id_solicitud)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    *  updateSeguimiento()  llamado al backend para actualizar un seguimiento
    *  @author: Marlon Gomez
    *  @param {Number, Object, Number, Number, Number}  id_seguimiento, values, id_solicitud, id_status, adjunto
    *
    *  @return {json, error}   res,error
    */
    SeguimientoService.prototype.updateSeguimiento = function (id_seguimiento, values, id_solicitud, id_usuario, id_status, adjunto) {
        return this.http.get(this.updateseguimientoURL + id_seguimiento + "&id_solicitud=" + id_solicitud + '&observaciones=' + values + '&id_usuario=' + id_usuario + '&id_status=' + id_status + '&adjunto=' + adjunto)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    //igh metodo para insertar comentario como ciudadano
    SeguimientoService.prototype.pushComentario = function (observaciones, id_usuario, id_solicitud, id_status) {
        console.log('Dentro del service del simio2');
        console.log(observaciones, id_usuario, id_solicitud, id_status);
        return this.http.get(this.pushcomentarioURL + observaciones + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status)
            .map(function (res) { return res.json(); });
    };
    /**
    * getStatus()
    * Metodo para obtener datos de los status del Back End
    * @author: Angel Lara
    * @param {void } void
    * @param {get} this.statusUrl
    * @return {json, error} res, error
    */
    SeguimientoService.prototype.getStatus = function () {
        return this.http.get(this.statusUrl)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    SeguimientoService = __decorate([
        Injectable()
        /**
        * class SeguimientoService()
        * Esta clase se usa para conectar con el Back End y obtener los datos a usar.
        * @author: Angel Lara
        * @return {export} export class
        */
        ,
        __metadata("design:paramtypes", [Http,
            ServiceUrl])
    ], SeguimientoService);
    return SeguimientoService;
}());
export { SeguimientoService };
//# sourceMappingURL=seguimiento.service.js.map