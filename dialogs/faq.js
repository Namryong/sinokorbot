var builder = require('botbuilder')
var request = require('request')

module.exports = [
    function (session, args) {
        if(args&&args.reprompt){
             session.send('처음으로 돌아가시려면 "그만"을 입력하시기 바랍니다!');
         }
         builder.Prompts.text(session,'qna dialog 입니다. 궁금하신 것을 입력하시기 바랍니다!');         
     },
     function (session, results) { 
         if(results.response){
             if(results.response=="그만"){
                 session.endDialog("FAQ를 종료합니다.");
             }
             else{
                 var question = results.response;
                 
                 //qna 호출
                 var lQnaMakerServiceEndpoint = 'https://eunkqna.azurewebsites.net/qnamaker/knowledgebases/';        
                 var lQnaApi = 'generateAnswer';
                 var lKnowledgeBaseId = 'ef725231-a2d6-4d35-94e2-669c16918708';
                 var lSubscriptionKey = 'EndpointKey d8072066-700d-405d-8fa7-a013ef0c4d72';
                 var lKbUri = lQnaMakerServiceEndpoint +lKnowledgeBaseId + '/' + lQnaApi;
                 request({
                     url: lKbUri,
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': lSubscriptionKey
                     },
                     body: '{"question":"' + question + '"}'
                 },
                 function (error, response, body){
                     var lResult;
                     var stopQNA;
                     if(!error){
                         lResult = JSON.parse(body);
                         
                     }else{
                         lResult.answer = "Unfortunately an error occurred. Try again.(fQnAMaker)";
                         lResult.score = 0;
                     }                    
                     session.send(lResult.answers[0].answer);        
                     session.replaceDialog('FAQ',{reprompt: true});        
                                 
                 })
             }
         }
     }
]
    