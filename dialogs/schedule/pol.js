let builder = require('botbuilder')
let schedulecard = require('../cards/schedulecard')

module.exports = [
    function(session) {
        session.beginDialog('Card');
    },
    function(session, results) {
        if (!results.inputpolval) {
            session.send('No POL entered. Please enter a POL.')
            // TODO: populate with existing values
            session.message.value = null;
            session.clearDialogStack();
            session.beginDialog('POL/POD Inquiry')
        } else {
            // TODO: make call to oracle
            // Show schedules
            session.send('Fetching your schedules...')
            let cards = []
            cards.push(schedulecard('KHPR', '12 days', 'Kharis Heritage / 1721S', '05-18 FRI 06:00 ~ 05-30 WED 12:00', 'BIT → WAIGAOQIAO PIER #5'))
            cards.push(schedulecard('CIX2', '2 days', 'HYUNDAI BRAVE / 069W', '05-18 FRI 22:00 ~ 05-20 SUN 17:00', 'HPNT → WAIGAOQIAO PIER #5'))
            // TODO: Add a button linking this card to another dialog to make booking
            cards.map(function (card) {
                var msg = new builder.Message(session)
                .addAttachment(card)
                session.send(msg)
            })
            session.endDialog()
        }
    }
];