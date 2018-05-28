var builder = require('botbuilder')
var request = require('request')
const adaptiveCard = {
    'contentType': 'application/vnd.microsoft.card.adaptive',
    'content': {
      '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
      'type': 'AdaptiveCard',
      'version': '1.0',
      'body': [
        {
          'type': 'TextBlock',
          'size': 'medium',
          'weight': 'bolder',
          'text': '출발 일자 선택',
          'horizontalAlignment': 'center'
        },
        {
          'type': 'Input.Date',
          'placeholder': 'Due Date',
          'id': 'DateVal',
          'value': '2018-05-16'
        },
        {
          'type': 'Input.Time',
          'placeholder': 'Start time',
          'id': 'TimeVal',
          'value': '16:59'
        }
      ],
      'actions': [
        {
          'type': 'Action.Submit',
          'title': 'Submit',
          'data': {
            'id': '1234567890'
  
          },
          'horizontalAlignment': 'center'
        }
      ]
    }
  }
  
  module.exports = [ 
    function (session) {
      if (session.message && session.message.value) {
        console.log(session.message.value)
        session.endDialogWithResult(session.message.value)
        return
      }
      var msg = new builder.Message(session)
          .addAttachment(adaptiveCard)
      session.send(msg)
    }
]
  