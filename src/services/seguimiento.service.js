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
    SeguimientoService.prototype.getData = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    SeguimientoService.prototype.getSolicitudes = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
        //return this.http.get('http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=59&id_solicitante=59')
    };
    SeguimientoService.prototype.getTramite = function (idSolicitud, idSolicitante) {
        return this.http.get(this.seguimientosUrl + idSolicitud + "&id_solicitante=" + idSolicitante)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
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
    //metodo para insertar un nuevo seguimiento de parte del nivel enlace
    SeguimientoService.prototype.pushSeguimiento = function (values, id_usuario, id_solicitud, id_status) {
        console.log(this.pushseguimientoURL + values + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status);
        return this.http.get(this.pushseguimientoURL + values + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status)
            .map(function (res) { return res.json(); });
    };
    //metodo para eliminar un seguimiento de nivel enlace
    SeguimientoService.prototype.deleteSeguimiento = function (id_seguimiento, id_solicitud) {
        return this.http.get(this.deleteseguimientoURL + id_seguimiento + "&id_solicitud=" + id_solicitud)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    //metodo para actualizar el seguimiento de nivel enlace
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
    SeguimientoService.prototype.getStatus = function () {
        return this.http.get(this.statusUrl)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    SeguimientoService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ServiceUrl])
    ], SeguimientoService);
    return SeguimientoService;
}());
export { SeguimientoService };
//# sourceMappingURL=seguimiento.service.js.map