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
        this.pushseguimientoURL = String(this.url.getUrlpushSeguimiento());
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
    SeguimientoService.prototype.pushSeguimiento = function (values, id_usuario, id_solicitud, id_status) {
        return this.http.get(this.pushseguimientoURL + values + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status)
            .map(function (res) { return res.json(); });
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