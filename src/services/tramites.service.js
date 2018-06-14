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
var TramiteService = /** @class */ (function () {
    function TramiteService(http, url) {
        this.http = http;
        this.url = url;
        this.tramiteUrl = String(this.url.getTramite());
    }
    TramiteService.prototype.getSolicitudes = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    TramiteService.prototype.getUnidadAdministrativa = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    TramiteService.prototype.getDireccion = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    TramiteService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ServiceUrl])
    ], TramiteService);
    return TramiteService;
}());
export { TramiteService };
//# sourceMappingURL=tramites.service.js.map