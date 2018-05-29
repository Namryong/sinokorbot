
module.exports = function createScheduleCard(code, duration, title, details, pier) {
    var schedulecard = {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.0',
            body: [
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 1,
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: code,
                                    weight: 'bolder',
                                    color: 'accent'
                                },
                                {
                                    type: 'TextBlock',
                                    text: duration,
                                    weight: 'bolder',
                                    spacing: 'none',
                                    color: 'accent'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 4,
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: title,
                                    spacing: 'none'
                                },
                                {
                                    type: 'TextBlock',
                                    text: details,
                                    spacing: 'none'
                                },
                                {
                                    type: 'TextBlock',
                                    text: pier,
                                    size: 'small',
                                    color: 'warning'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
    return schedulecard;
};
