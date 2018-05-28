var restify = require('restify')
var builder = require('botbuilder')
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})
var bot = new builder.UniversalBot(connector);



var Destination = {
  POL: 'POL/POD',
  POD: 'POD',
  VSL: 'Vessel Schedule',
}

module.exports = [
  // 선박 스케쥴 조회 시나리오 구성
  // 1. 출발지 선택
  // 2. 도착지 선택
  // 출발일자 입력
  // 조회결과 출력
  function (session) {
    //session.send('Shipping Schedule is not implemented and is instead being used to show Bot error handling')
    builder.Prompts.choice(
      session,
      'Select Menu!',
      [Destination.POL, Destination.POD, Destination.VSL],
      { listStyle: builder.ListStyle.button }
    )
  },
  function(session, results){
    var selection = results.response.entity
    switch (selection)
      {
        case Destination.POL:
        return session.beginDialog('pol')
        case Destination.POD:
        return session.beginDialog('pod')
        case Destination.VSL:
        return session.beginDialog('vsl')
      }
  },function(session, results){
    // var msg = new builder.Message(session)
    //   .addAttachment(adaptiveCard);
    // session.send(msg);
    // session.endDialog('입력 후 처음으로 돌아갑니다');
    return session.beginDialog('Card');
  },function(session, results){
    //var input = results.response;
    console.log(results);
    session.endDialog("입력해주셔서 감사합니다. 홈 화면으로 돌아갑니다");
  }    

  
]

// bot.dialog('pod', require('./shippingschedule/pod'))  
// bot.dialog('vsl', require('./shippingschedule/vsl'))
