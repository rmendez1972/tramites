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
var ServiceUrl = /** @class */ (function () {
    function ServiceUrl() {
    }
    ServiceUrl.prototype.getUrl = function () {
        return this.URL = 'http://localhost:8080/tramites/controladorseguimiento?operacion=listarjson&id_solicitud=';
    };
    ServiceUrl.prototype.getUrladjuntos = function () {
        return this.URLadjuntos = 'http://189.221.153.178:8080/tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
    };
    ServiceUrl.prototype.getUrladjuntosdescarga = function () {
        return this.URLadjuntosdescarga = 'http://189.221.153.178:8080/tramites/adjuntos/';
    };
    ServiceUrl.prototype.getUrladjuntosupload = function () {
        return this.URLadjuntosupload = 'http://189.221.153.178:3001/upload/';
    };
    ServiceUrl.prototype.getUrllogin = function () {
        return this.URLlogin = 'http://189.221.153.178:8080/tramites/controladorregistro?operacion=apilogin&username=';
    };
    ServiceUrl.prototype.getUrlCambiaPassword = function () {
        return this.URLcambiapassword = 'http://189.221.153.178:8080/tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
    };
    ServiceUrl.prototype.getUrlupload = function () {
        return this.URLupload = 'http://189.221.153.178:3001/upload';
    };
    ServiceUrl.prototype.getUrlfilename = function () {
        return this.URLupload = 'http://189.221.153.178:8080/tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
    };
    ServiceUrl.prototype.getUrlpushSeguimiento = function () {
        return this.URLpushseguimiento = 'http://localhost:8080/tramites/controladorseguimiento?operacion=grabarjson&observaciones=';
    };
    ServiceUrl.prototype.getUrlpushComentario = function () {
        return this.URLpushcomentario = 'http://localhost:8080/tramites/controladorseguimiento?operacion=grabarjson&comentario=';
    };
    ServiceUrl.prototype.getTramite = function () {
        return this.URLTramite = 'http://localhost:8080/tramites/controladorregistro?operacion=listarjson&id_usuario=';
    };
    ServiceUrl = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ServiceUrl);
    return ServiceUrl;
}());
export { ServiceUrl };
//# sourceMappingURL=serviceUrl.js.map