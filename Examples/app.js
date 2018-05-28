var restify = require('restify')
var builder = require('botbuilder')

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3984, function () {
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
})
var Menu = {
  ShippingSchedule: '선박 스케쥴 조회',
  Reservation: '예약내역 조회',
  ShippingConfirmation: '선적확인',
  Tracking: '화물추적',
  Staff: '담당자조회',
  Declaration: '수출신고',
  FAQ: 'FAQ'
}

// Listen for messages from users
server.post('/api/messages', connector.listen())

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
  function (session) {
    builder.Prompts.choice(
      session,
      '안녕하세요! Sinokor Bot입니다.\n원하시는 항목을 선택하세요!',
      [Menu.ShippingSchedule, Menu.Reservation, Menu.ShippingConfirmation, Menu.Tracking, Menu.Staff, Menu.Declaration, Menu.FAQ],
      { listStyle: builder.ListStyle.button }
    )
  }, function (session, results, next) {
    var selection = results.response.entity

    switch (selection) {
      case Menu.ShippingSchedule:
        return session.beginDialog('ShippingSchedule')
      case Menu.Reservation:
        return session.beginDialog('Reservation')
      case Menu.ShippingConfirmation:
        return session.beginDialog('ShippingConfirmation')
      case Menu.Tracking:
        return session.beginDialog('Tracking')
      case Menu.Staff:
        return session.beginDialog('Staff')
      case Menu.FAQ:
        return session.beginDialog('FAQ')
    }
  }])

bot.on('conversationUpdate', function (message) {
  if (message.membersAdded) {
    message.membersAdded.forEach(function (identity) {
      if (identity.id === message.address.bot.id) {
        bot.beginDialog(message.address, '/')
      }
    })
  }
})

bot.dialog('ShippingSchedule', require('./dialogs/shippingSchedule'))
bot.dialog('Reservation', require('./dialogs/reservation'))
bot.dialog('ShippingConfirmation', require('./dialogs/shippingConfirmation'))
bot.dialog('Tracking', require('./dialogs/tracking'))
bot.dialog('Staff', require('./dialogs/staff'))
bot.dialog('FAQ', require('./dialogs/faq'))
bot.dialog('Card', require('./dialogs/card'))
