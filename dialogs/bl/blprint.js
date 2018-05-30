let builder = require('botbuilder')
let shipcard = require('../cards/shippingcard')
module.exports = function(session) {
    var card = shipcard();
    var msg = new builder.Message(session)
                .addAttachment(card)
    session.send(msg)
    session.clearDialogStack();
    session.endDialog();
}