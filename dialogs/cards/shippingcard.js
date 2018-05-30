module.exports = function createShippingCard() {
    var shipcard = {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                { 
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Schedule",
                            "size": "large",
                            "weight": "bolder",
                            "color":"darker"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "2018-05-21 07:00",
                                            "wrap": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://i.imgur.com/mu5wBKU.png",
                                            "size": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "2018-05-28 12:00",
                                            "horizontalAlignment": "right",
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "spacing": "medium",
                    "items": [
                        {
                            "type": "TextBlock",
                            "size": "medium",
                            "text": "KMCT PUSAN / 1806N",
                            "weight": "bolder"
                        },
                        {
                            "type": "FactSet",
                            "separator": true,
                            "spacing": "medium",
                            "facts": [
                                {
                                    "title": "Receipt",
                                    "value": "LAEM CHABANG, THAILAND"
                                },
                                {
                                    "title": "Loading",
                                    "value": "LAEM CHABANG, THAILAND. LCMT(A0) container terminal"
                                },
                                {
                                    "title": "Discharging",
                                    "value": "BUSAN, KOREA. BUSAN PORT TERMINAL"
                                },
                                {
                                    "title": "Delivery",
                                    "value": "BUSAN, KOREA"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "spacing": "medium",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "CNTR CLOSE",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "2018-05-18 09:00",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "DOC CLOSE",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "2018-05-19 17:00",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "ColumnSet",
                            "spacing": "medium",
                            "columns": [
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "EDI CLOSE",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "00:00",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "TERMINAL VESSEL",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "KKPS (09)",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "ColumnSet",
                            "spacing": "medium",
                            "columns": [
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "SEOUL P.I.C",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "00:00",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "PORT P.I.C",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "TBD",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "column",
                                    "width": "1",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "SALES",
                                            "weight": "bolder",
                                            "horizontalAlignment": "center"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "TBD",
                                            "separator": "true",
                                            "spacing": "medium",
                                            "horizontalAlignment": "center"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    return shipcard;
};

// var shipcard = {
// 	"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
// 	"type": "AdaptiveCard",
// 	"version": "1.0",
// 	"body": [
//         {
//             "type": "Container",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "text": "Schedule",
//                     "size": "large",
//                     "weight": "bolder",
//                     "color":"darker"
//                 },
//                 {
//                     "type": "ColumnSet",
//                     "columns": [
//                         {
//                             "type": "Column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "2018-05-21 07:00"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "Column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "Image",
//                                     "url": "https://i.imgur.com/mu5wBKU.png",
//                                     "size": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "Column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "2018-05-28 12:00",
//                                     "horizontalAlignment": "right"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "Container",
//             "spacing": "medium",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "size": "medium",
//                     "text": "KMCT PUSAN / 1806N",
//                     "weight": "bolder"
//                 },
//                 {
//                     "type": "FactSet",
//                     "separator": true,
//                     "spacing": "medium",
//                     "facts": [
//                         {
//                             "title": "Receipt",
//                             "value": "LAEM CHABANG, THAILAND"
//                         },
//                         {
//                             "title": "Loading",
//                             "value": "LAEM CHABANG, THAILAND. LCMT(A0) container terminal"
//                         },
//                         {
//                             "title": "Discharging",
//                             "value": "BUSAN, KOREA. BUSAN PORT TERMINAL"
//                         },
//                         {
//                             "title": "Delivery",
//                             "value": "BUSAN, KOREA"
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "type": "Container",
//             "spacing": "medium",
//             "items": [
//                 {
//                     "type": "ColumnSet",
//                     "columns": [
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "CNTR CLOSE",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "2018-05-18 09:00",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "DOC CLOSE",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "2018-05-19 17:00",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "type": "ColumnSet",
//                     "spacing": "medium",
//                     "columns": [
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "EDI CLOSE",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "00:00",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "TERMINAL VESSEL",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "KKPS (09)",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "type": "ColumnSet",
//                     "spacing": "medium",
//                     "columns": [
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "SEOUL P.I.C",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "00:00",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "PORT P.I.C",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "TBD",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "column",
//                             "width": "1",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "SALES",
//                                     "weight": "bolder",
//                                     "horizontalAlignment": "center"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "TBD",
//                                     "separator": "true",
//                                     "spacing": "medium",
//                                     "horizontalAlignment": "center"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
// 	]
// }
