module.exports = [
    function(session) {
        builder.Prompts.choice(session, 'What would you like to do next?', ['Exit', 'Return to menu'], {
            listStyle: builder.ListStyle.button
        });
    },
    function(session, results) {
        var selection = results.response.entity;
        switch (selection) {
            case 'Exit':
                session.endDialog('Ok. Bye!');
            case 'Return to menu':
                session.clearDialogStack();
                session.beginDialog('/');
        }
    }
];
