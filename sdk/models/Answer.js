var Answer = /** @class */ (function () {
    function Answer(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Answer`.
     */
    Answer.getModelName = function () {
        return "Answer";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Answer for dynamic purposes.
    **/
    Answer.factory = function (data) {
        return new Answer(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Answer.getModelDefinition = function () {
        return {
            name: 'Answer',
            plural: 'Answers',
            properties: {
                "answer": {
                    name: 'answer',
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
                "questionId": {
                    name: 'questionId',
                    type: 'any'
                },
            },
            relations: {
                question: {
                    name: 'question',
                    type: 'Question',
                    model: 'Question'
                },
            }
        };
    };
    return Answer;
}());
export { Answer };
//# sourceMappingURL=Answer.js.map