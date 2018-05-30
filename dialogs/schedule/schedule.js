var restify = require('restify')
var builder = require('botbuilder')
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})
var bot = new builder.UniversalBot(connector);

let schedulecard = require('../cards/schedulecard')

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
  },function(session,results){
    // query oracle db and get results, display with schedulecard.js
      // session.send('Fetching your schedules...')
      // let cards = []
      // cards.push(schedulecard('KHPR', '12 days', 'Kharis Heritage / 1721S', '05-18 FRI 06:00 ~ 05-30 WED 12:00', 'BIT → WAIGAOQIAO PIER #5'))
      // cards.push(schedulecard('CIX2', '2 days', 'HYUNDAI BRAVE / 069W', '05-18 FRI 22:00 ~ 05-20 SUN 17:00', 'HPNT → WAIGAOQIAO PIER #5'))
      // // TODO: Add a button linking this card to another dialog to make booking
      // cards.map(function (card) {
      //     var msg = new builder.Message(session)
      //     .addAttachment(card)
      //     session.send(msg)
      // })
      session.send('계속 진행하시려면 아무말이나 입력해주세요')
      //session.endDialog()
  }
  
]

// bot.dialog('pod', require('./shippingschedule/pod'))  
// bot.dialog('vsl', require('./shippingschedule/vsl'))
