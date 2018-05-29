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
  Schedule: 'Schedule Inquiry',
  Bl: 'B/L, B/K Inquiry',
  Tracking: 'Track Cargo',
  Contact: 'Contact',
  Price: 'Price',
  Faq: 'FAQ',
  Feedback: 'Feedback'
}

// Listen for messages from users
server.post('/api/messages', connector.listen())

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
  function (session) {
    builder.Prompts.choice(
      session,
      '안녕하세요! Sinokor Bot입니다.\n원하시는 항목을 선택하세요!',
      [Menu.Schedule, Menu.Bl, Menu.Tracking, Menu.Contact, Menu.Price, Menu.Faq, Menu.Feedback],
      { listStyle: builder.ListStyle.button }
    )
  }, function (session, results, next) {
    var selection = results.response.entity

    switch (selection) {
      case Menu.Schedule:
        return session.beginDialog('Schedule')
      case Menu.Bl:
        return session.beginDialog('Bl')
      case Menu.Tracking:
        return session.beginDialog('Tracking')
      case Menu.Contact:
        return session.beginDialog('Contact')
      case Menu.Price:
        return session.beginDialog('Price')
      case Menu.Faq:
        return session.beginDialog('Faq')
      case Menu.Feedback:
        return session.beginDialog('Feedback')
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

bot.dialog('Schedule', require('./dialogs/schedule/schedule'))
bot.dialog('POL/POD Inquiry', require('./dialogs/schedule/pol'))
bot.dialog('Service Inquiry', require('./dialogs/schedule/service'))
bot.dialog('Vessel/Voyage Inquiry', require('./dialogs/schedule/vessel'))

bot.dialog('Bl', require('./dialogs/bl/bl'))
bot.dialog('B/L Print', require('./dialogs/bl/blprint'))
bot.dialog('SUR/SWB', require('./dialogs/bl/sur'))
bot.dialog('B/K Confirm Print', require('./dialogs/bl/bkconfirm'))
bot.dialog('Freeday', require('./dialogs/bl/freeday'))
bot.dialog('Delay Notice', require('./dialogs/bl/delay'))
bot.dialog('Invoice', require('./dialogs/bl/invoice'))

bot.dialog('Tracking', require('./dialogs/tracking'))
bot.dialog('Contact', require('./dialogs/contact'))
bot.dialog('Price', require('./dialogs/price'))
bot.dialog('Faq', require('./dialogs/faq'))
bot.dialog('Feedback', require('./dialogs/feedback'))

bot.dialog('card', require('./dialogs/card'))

bot.dialog('dbconnect', require('./dialogs/dbconnect'))