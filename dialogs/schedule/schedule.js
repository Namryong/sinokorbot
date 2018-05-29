var restify = require('restify')
var builder = require('botbuilder')
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})
var bot = new builder.UniversalBot(connector);

var Destination = {
  POL: 'POL/POD Inquiry',
  SERVICE: 'Service Inquiry',
  VESSEL: 'Vessel/Voyage Inquiry',
  GOBACK: 'Go Back'
}

module.exports = [
  // 선박 스케쥴 조회 시나리오 구성
  // 1. 출발지 선택
  // 2. 도착지 선택
  // 출발일자 입력
  // 조회결과 출력
  function (session) {
    //session.send('Shipping schedule is not implemented and is instead being used to show Bot error handling')
    builder.Prompts.choice(
      session,
      'Select Menu!',
      [Destination.POL, Destination.SERVICE, Destination.VESSEL, Destination.GOBACK],
      { listStyle: builder.ListStyle.button }
    )
  },
  function(session, results){
    var selection = results.response.entity
    switch (selection)
      {
        case Destination.POL:
          return session.beginDialog('POL/POD Inquiry')
        case Destination.SERVICE:
          return session.beginDialog('Service Inquiry')
        case Destination.VESSEL:
          return session.beginDialog('Vessel/Voyage Inquiry')
        case Destination.GOBACK:
          return session.beginDialog('/')
      }
  }
  
]

// bot.dialog('pod', require('./shippingschedule/pod'))  
// bot.dialog('vsl', require('./shippingschedule/vsl'))
