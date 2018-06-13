/* tslint:disable */
var AccessToken = /** @class */ (function () {
    function AccessToken(data) {
        this.id = '';
        this.ttl = 1209600;
        this.created = new Date(0);
        this.userId = 0;
        this.user = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    AccessToken.getModelName = function () {
        return "AccessToken";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    AccessToken.factory = function (data) {
        return new AccessToken(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    AccessToken.getModelDefinition = function () {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            properties: {
                id: {
                    name: 'id',
                    type: 'string'
                },
                ttl: {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                created: {
                    name: 'created',
                    type: 'Date',
                    default: new Date(0)
                },
                userId: {
                    name: 'userId',
                    type: 'number'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    };
    return AccessToken;
}());
export { AccessToken };
var SDKToken = /** @class */ (function () {
    function SDKToken(data) {
        this.id = null;
        this.ttl = null;
        this.issuedAt = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
    return SDKToken;
}());
export { SDKToken };
//# sourceMappingURL=BaseModels.js.map