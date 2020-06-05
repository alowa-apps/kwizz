export const schema = {
    "models": {
        "Quiz": {
            "name": "Quiz",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "seconds": {
                    "name": "seconds",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "currentQuestion": {
                    "name": "currentQuestion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "questionOrder": {
                    "name": "questionOrder",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "started": {
                    "name": "started",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "questionTime": {
                    "name": "questionTime",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "view": {
                    "name": "view",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Quizzes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Questions": {
            "name": "Questions",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "youtube": {
                    "name": "youtube",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "question": {
                    "name": "question",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "answerOne": {
                    "name": "answerOne",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerOneCorrect": {
                    "name": "answerOneCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerTwo": {
                    "name": "answerTwo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerTwoCorrect": {
                    "name": "answerTwoCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerThree": {
                    "name": "answerThree",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerThreeCorrect": {
                    "name": "answerThreeCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerFour": {
                    "name": "answerFour",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerFourCorrect": {
                    "name": "answerFourCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "quizID": {
                    "name": "quizID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "order": {
                    "name": "order",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "public": {
                    "name": "public",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "fromLibrary": {
                    "name": "fromLibrary",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Questions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "QuestionsDB": {
            "name": "QuestionsDB",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "youtube": {
                    "name": "youtube",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "question": {
                    "name": "question",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "answerOne": {
                    "name": "answerOne",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerOneCorrect": {
                    "name": "answerOneCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerTwo": {
                    "name": "answerTwo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerTwoCorrect": {
                    "name": "answerTwoCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerThree": {
                    "name": "answerThree",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerThreeCorrect": {
                    "name": "answerThreeCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "answerFour": {
                    "name": "answerFour",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "answerFourCorrect": {
                    "name": "answerFourCorrect",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "relatedQuestion": {
                    "name": "relatedQuestion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "public": {
                    "name": "public",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "language": {
                    "name": "language",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "QuestionsDBS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Subscribers": {
            "name": "Subscribers",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "score": {
                    "name": "score",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "quizID": {
                    "name": "quizID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Subscribers",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Responses": {
            "name": "Responses",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "quiz": {
                    "name": "quiz",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "subscriber": {
                    "name": "subscriber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "question": {
                    "name": "question",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Responses",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Languages": {
            "name": "Languages",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "code": {
                    "name": "code",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Languages",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "ByCode",
                        "fields": [
                            "type",
                            "code"
                        ],
                        "queryField": "getLangByCode"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "83d849d345846534e3ecfb02c0557746"
};