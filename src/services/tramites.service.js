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
/**
* Component()
* Este es el Injectable de la clase
* @author: Angel Lara
* @return {Injectable} Injectable
*/
var TramiteService = /** @class */ (function () {
    /**
    * class constructor()
    * Constructor de la clase
    * @author: Angel Lara
    * @return {constructor} constructor
    */
    function TramiteService(
    /**
    * Variables local
    * @param {Http} http
    */
    http, 
    /**
    * Variables local
    * @param {ServiceUrl} url
    */
    url) {
        this.http = http;
        this.url = url;
        /**
        * Variables local
        * @param {String} tramiteUrl
        */
        this.tramiteUrl = String(this.url.getTramite());
        /**
        * Variables local
        * @param {String} statusUrl
        */
        this.statusUrl = String(this.url.getStatus());
    }
    /**
    * getUnidadAdministrativa()
    * Este Metodo es para obtener datos de las solicitudes del Back End
    * @author: Angel Lara
    * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
    * @return {any}
    */
    TramiteService.prototype.getSolicitudes = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getUnidadAdministrativa()
    * Este Metodo es para obtener datos de la unidad del Back End
    * @author: Angel Lara
    * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
    * @return {any}
    */
    TramiteService.prototype.getUnidadAdministrativa = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getDireccion()
    * Este Metodo es para obtener datos de la direccion del Back End
    * @author: Angel Lara
    * @param {number,number,number,number } id_usuario,id_grupo,id_unidadadministrativa,id_direccion
    * @return {any}
    */
    TramiteService.prototype.getDireccion = function (id_usuario, id_grupo, id_unidadadministrativa, id_direccion) {
        //console.log(this.tramiteUrl+id_usuario+"&id_grupo="+id_grupo+'&id_unidadadministrativa='+id_unidadadministrativa+'&id_direccion='+id_direccion);
        return this.http.get(this.tramiteUrl + id_usuario + "&id_grupo=" + id_grupo + '&id_unidadadministrativa=' + id_unidadadministrativa + '&id_direccion=' + id_direccion)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    /**
    * getStatus()
    * Este Metodo es para obtener datos del status del Back End
    * @author: Angel Lara
    * @param {void }
    * @param {get} this.statusUrl
    * @return {any}
    */
    TramiteService.prototype.getStatus = function () {
        return this.http.get(this.statusUrl)
            .map(function (res) { return res.json(); }, function (error) { console.log(error); });
    };
    TramiteService = __decorate([
        Injectable()
        /**
        *class SeguimientoService()
        * Esta clase se usa para conectar con el Back End y obtener los datos a usar.
        * @author: Angel Lara
        * @return {class}  class
        */
        ,
        __metadata("design:paramtypes", [Http,
            ServiceUrl])
    ], TramiteService);
    return TramiteService;
}());
export { TramiteService };
//# sourceMappingURL=tramites.service.js.map