var builder = require('botbuilder')

var lib = new builder.Library('settings')
lib.dialog('/', builder.DialogAction.endDialog('settings'))

// Export createLibrary() function
module.exports.createLibrary = function () {
  return lib.clone()
}
