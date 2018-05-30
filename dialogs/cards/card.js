var builder = require('botbuilder');
var request = require('request');

function createCard(pol, pod, date) {
    const adaptiveCard = {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.0',
            body: [
                {
                    type: 'Input.Text',
                    placeholder: 'POL',
                    style: 'text',
                    maxlength: 10,
                    id: 'inputpolval',
                    value: pol
                },
                {
                    type: 'Input.Text',
                    placeholder: 'POD',
                    style: 'text',
                    maxlength: 10,
                    id: 'inputpodval',
                    value: pod
                },
                {
                    type: 'Input.Date',
                    placeholder: 'Due Date',
                    id: 'DateVal',
                    value: date
                }
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: 'Inquiry',
                    data: {
                        id: '1234567890'
                    },
                    horizontalAlignment: 'center'
                }
            ]
        }
    };
    return adaptiveCard;
}

module.exports = [
    function(session, args) {
        if (session.message && session.message.value) {
            console.log(session.message.value);
            session.endDialogWithResult(session.message.value);
            return;
        }

        // TODO: match ports to codes
        if (args != undefined && args.intent != undefined) {
            var intent = args.intent;
            // Has roles
            var ports = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port_pattern');
            // Has codes
            var codes = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port');
        }

        var loadingPort = ports.find(function(port) {
            return port.role === 'ofLoading';
        });
        var dischargePort = ports.find(function(port) {
            return port.role === 'ofDischarging';
        });

        var loadingPortCode = '';
        var dischargingPortCode = '';
        if (loadingPort) {
            loadingPortCode = codes.find(function(code) {
              code = code.entity.replace(/ /g, '');
              _loadingPort = loadingPort.entity.replace(/ /g, '');
              return _loadingPort.includes(code);
            }).resolution.values[0];
        }
        if (dischargePort) {
            dischargingPortCode = codes.find(function(code) {
                code = code.entity.replace(/ /g, '');
                _dischargePort = dischargePort.entity.replace(/ /g, '');
                return _dischargePort.includes(code);
            }).resolution.values[0];
        }

        var card = createCard(loadingPortCode, dischargingPortCode, '2018-04-12');
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
    }
];
