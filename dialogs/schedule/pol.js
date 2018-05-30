let builder = require('botbuilder')
let schedulecard = require('../cards/schedulecard')
var connectdb = require('../../database/dbconnect')

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
             
            var queryParam = [results.inputpolval,results.inputpodval,results.DateVal.replace(/\-/g,'')]
            // query with user input
            connectdb.dbconnect('query1',queryParam, function (res) {
                console.log('final final results: ')
                console.log(res)

                session.send('Fetching your schedules...')
                let cards = []
                res.forEach(element => {
                    cards.push(schedulecard(element.VSL, element.TT, element.VSLNM+" / "+element.VYG , element.ETD + '~' +element.ETA, element.POLWNM +'->' + element.PODWNM))
                });
                //cards.push(schedulecard('KHPR', '12 days', 'Kharis Heritage / 1721S', '05-18 FRI 06:00 ~ 05-30 WED 12:00', 'BIT → WAIGAOQIAO PIER #5'))
                //cards.push(schedulecard('CIX2', '2 days', 'HYUNDAI BRAVE / 069W', '05-18 FRI 22:00 ~ 05-20 SUN 17:00', 'HPNT → WAIGAOQIAO PIER #5'))
                // TODO: Add a button linking this card to another dialog to make booking
                cards.map(function (card) {
                    var msg = new builder.Message(session)
                    .addAttachment(card)
                    session.send(msg)
                })
                session.endDialog()
                    
              }); 

            // TODO: make call to oracle
            // Show schedules
            
        }
    }
];
