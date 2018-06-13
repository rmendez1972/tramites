var Question = /** @class */ (function () {
    function Question(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Question`.
     */
    Question.getModelName = function () {
        return "Question";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Question for dynamic purposes.
    **/
    Question.factory = function (data) {
        return new Question(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Question.getModelDefinition = function () {
        return {
            name: 'Question',
            plural: 'Questions',
            properties: {
                "questionSlug": {
                    name: 'questionSlug',
                    type: 'any'
                },
                "question": {
                    name: 'question',
                    type: 'any'
                },
                "negativeVotes": {
                    name: 'negativeVotes',
                    type: 'any',
                    default: 0
                },
                "positiveVotes": {
                    name: 'positiveVotes',
                    type: 'any',
                    default: 0
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
            },
            relations: {
                answers: {
                    name: 'answers',
                    type: 'Answer[]',
                    model: 'Answer'
                },
            }
        };
    };
    return Question;
}());
export { Question };
//# sourceMappingURL=Question.js.map