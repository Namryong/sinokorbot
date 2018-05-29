const builder = require('botbuilder')
const statuscard = require('./cards/statuscard')
module.exports = [
  function (session) {
    builder.Prompts.text(session, 'What is your tracking number?');
  }, 
  function (session, results) {
    // TODO: make call to oracle db to get info
    let card = statuscard();
    let msg = new builder.Message(session)
                .addAttachment(card)
    session.send(msg);
    session.endDialog();
  }
]
  