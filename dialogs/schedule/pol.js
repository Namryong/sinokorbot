let builder = require('botbuilder')
let schedulecard = require('../cards/schedulecard')
var connectdb = require('../../database/dbconnect')

module.exports = [
    function(session, args, next) {
        console.log(args)

        session.dialogData.scheduleinq = {};
        session.dialogData.scheduleinq.loadingPortCode = ''
        session.dialogData.scheduleinq.dischargingPortCode = ''

        var loadingPortCode = '';
        var dischargingPortCode = '';
        if (args != undefined && args.intent != undefined) {
            var intent = args.intent;
            // Has roles
            var ports = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port_pattern');
            // Has codes
            var codes = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port');

            var loadingPort = ports.find(function(port) {
                return port.role === 'ofLoading';
            });
            var dischargePort = ports.find(function(port) {
                return port.role === 'ofDischarging';
            });

            if (loadingPort) {
                loadingPortCode = codes.find(function(code) {
                    code = code.entity.replace(/ /g, '');
                    _loadingPort = loadingPort.entity.replace(/ /g, '');
                    return _loadingPort.includes(code);
                }).resolution.values[0];
                session.dialogData.scheduleinq.loadingPortCode = loadingPortCode
            }
            if (dischargePort) {
                dischargingPortCode = codes.find(function(code) {
                    code = code.entity.replace(/ /g, '');
                    _dischargePort = dischargePort.entity.replace(/ /g, '');
                    return _dischargePort.includes(code);
                }).resolution.values[0];
                session.dialogData.scheduleinq.dischargingPortCode = dischargingPortCode
                
            }
        }
        // console.log("1:"+session.dialogData.scheduleinq.loadingPortCode)
        if (session.dialogData.scheduleinq.loadingPortCode == '' || session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.beginDialog('Card', args);
        } else {
            next();
        }
        // Check the entities
        
    },
    function(session, results, next) {

        // card  결과 - results
        // LUIS 결과는 session.dialogData.scheduleinq
        if (session.dialogData.scheduleinq.loadingPortCode == '') {
            session.dialogData.scheduleinq.loadingPortCode = results.inputpolval;
        }
        if (session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.dialogData.scheduleinq.dischargingPortCode = results.inputpodval;
        }

        

        if (session.dialogData.scheduleinq.loadingPortCode == '' || session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.send('No POL entered. Please enter a POL.')
            // TODO: populate with existing values
            session.message.value = null;
            session.clearDialogStack();
            session.beginDialog('POL/POD Inquiry')
        } else {
             //results.StartDateVal.replace(/\-/g,'')
             console.log(session.dialogData.scheduleinq.loadingPortCode)
            console.log(session.dialogData.scheduleinq.dischargingPortCode)
            var queryParam = [session.dialogData.scheduleinq.loadingPortCode,session.dialogData.scheduleinq.dischargingPortCode,'20180516']
            
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
