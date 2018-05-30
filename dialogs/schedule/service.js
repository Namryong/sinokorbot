module.exports = function (session, args) {
  return session.beginDialog('card', {param: args})
}
