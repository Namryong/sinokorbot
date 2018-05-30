var restify = require('restify')
var builder = require('botbuilder')
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})
var bot = new builder.UniversalBot(connector)

var Destination = {
  BLPRINT: 'B/L Print',
  SUR: 'SUR/SWB',
  FREEDAY: 'Freeday',
  BKCONFIRM: 'B/K Confirm Print',
  DELAY: 'Delay Notice',
  INVOICE: 'Invoice',
  GOBACK: 'Go Back'
}

module.exports = [
  // 선박 스케쥴 조회 시나리오 구성
  // 1. 출발지 선택
  // 2. 도착지 선택
  // 출발일자 입력
  // 조회결과 출력
  function (session) {
    // session.send('Shipping schedule is not implemented and is instead being used to show Bot error handling')
    builder.Prompts.choice(
      session,
      'Select Menu!',
      [Destination.BLPRINT, Destination.SUR, Destination.FREEDAY, Destination.BKCONFIRM, Destination.DELAY, Destination.INVOICE, Destination.GOBACK],
      { listStyle: builder.ListStyle.button, maxRetries: 0 }
    )
  },
  function (session, results) {
    console.log('bl second step')
    var selection = results.response.entity
    switch (selection) {
      case Destination.BLPRINT:
        return session.beginDialog('B/L Print')
      case Destination.SUR:
        return session.beginDialog('SUR/SWB')
      case Destination.FREEDAY:
        return session.beginDialog('B/K Confirm Print')
      case Destination.BKCONFIRM:
        return session.beginDialog('Freeday')
      case Destination.DELAY:
        return session.beginDialog('Delay Notice')
      case Destination.INVOICE:
        return session.beginDialog('Invoice')
      case Destination.GOBACK:
        return session.beginDialog('/')
    }
  }, function (session, results) {
    // var msg = new builder.Message(session)
    //   .addAttachment(adaptiveCard);
    // session.send(msg);
    // session.endDialog('입력 후 처음으로 돌아갑니다');
    return session.beginDialog('Card')
  }, function (session, results) {
    // var input = results.response;
    console.log(results)
    session.send(results.inputpolval)
    session.endDialog('입력해주셔서 감사합니다. 홈 화면으로 돌아갑니다')
  }

]

// bot.dialog('pod', require('./shippingschedule/pod'))
// bot.dialog('vsl', require('./shippingschedule/vsl'))
