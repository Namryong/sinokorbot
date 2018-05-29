module.exports = [
    function(session) {
        session.beginDialog('Card');
    },
    function(session, results) {
        if (!results.inputpolval) {
            session.send('No POL entered. Please enter a POL.')
            // TODO: populate with existing values
            session.message.value = null;
            session.clearDialogStack();
            session.beginDialog('POL/POD Inquiry')
        } else {
            // Handle results
            console.log(results);
            session.endDialog('입력해주셔서 감사합니다. 홈 화면으로 돌아갑니다');
        }
    }
];