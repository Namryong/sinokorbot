var builder = require('botbuilder');
var request = require('request');

module.exports = [function(session, args) {
    builder.Prompts.text(session, "Please leave your feedback: ");
}, function(session, results) {
    session.endDialog("Your feedback has been sent. Thanks for using the Sinokor bot.")
}];
