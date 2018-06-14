/* tslint:disable */
var User = /** @class */ (function () {
    function User(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    User.getModelName = function () {
        return "User";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    User.factory = function (data) {
        return new User(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    User.getModelDefinition = function () {
        return {
            name: 'User',
            plural: 'Users',
            properties: {
                "realm": {
                    name: 'realm',
                    type: 'any'
                },
                "username": {
                    name: 'username',
                    type: 'any'
                },
                "password": {
                    name: 'password',
                    type: 'any'
                },
                "email": {
                    name: 'email',
                    type: 'any'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'any'
                },
                "verificationToken": {
                    name: 'verificationToken',
                    type: 'any'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: ''
                },
            }
        };
    };
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map