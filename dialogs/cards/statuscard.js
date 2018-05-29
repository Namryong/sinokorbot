module.exports = function createStatusCard() {
    var statuscard = {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.0',
            body: [
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Pickup (1/1)',
                            size: 'medium',
                            color: 'accent'
                        },
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: '2018-05-18 TUE 11:05',
                                            weight: 'bolder',
                                            wrap: true
                                        }
                                    ]
                                },
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'YJC Depot',
                                            weight: 'default',
                                            wrap: true,
                                            horizontalAlignment: 'left'
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'TCNU6110650',
                                            spacing: 'none',
                                            weight: 'lighter',
                                            horizontalAlignment: 'left'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Return (1/1)',
                            size: 'medium',
                            color: 'accent'
                        },
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: '2018-05-18 TUE 18:18',
                                            weight: 'bolder',
                                            wrap: true
                                        }
                                    ]
                                },
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'LCMT(AD) Container',
                                            weight: 'default',
                                            wrap: true
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'TCNU6110650',
                                            spacing: 'small',
                                            weight: 'lighter'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Surrendered',
                            size: 'medium',
                            color: 'accent'
                        },
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: '2018-05-22 TUE 18:47',
                                            weight: 'bolder',
                                            wrap: true
                                        }
                                    ]
                                },
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'N/A',
                                            weight: 'default',
                                            wrap: true
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'SNKO190180501258',
                                            spacing: 'small',
                                            weight: 'lighter'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Departure',
                            size: 'medium',
                            color: 'accent'
                        },
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: '2018-05-21 MON 07:00',
                                            weight: 'bolder',
                                            wrap: true
                                        }
                                    ]
                                },
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'LCMT(AD) Container',
                                            weight: 'default',
                                            wrap: true
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'KMCT PUSAN / 1806N',
                                            spacing: 'small',
                                            weight: 'lighter'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Arrival (Scheduled)',
                            size: 'medium',
                            color: 'accent'
                        },
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: '2018-05-28 MON 08:00',
                                            weight: 'bolder',
                                            wrap: true
                                        }
                                    ]
                                },
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'Busan Port Terminal',
                                            weight: 'default',
                                            wrap: true
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'KMCT PUSAN / 1806N',
                                            spacing: 'small',
                                            weight: 'lighter'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
    return statuscard;
};
