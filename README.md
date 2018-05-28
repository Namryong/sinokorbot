# Sinokor
This repository is for Sinokor chatbot Hackfest project.

## Develope Environment Setting
### Downloads File
* [Node (v8.11.2)](https://nodejs.org/ko/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases)
    * [Documnets for Bot Framework Emulator V4](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-3.0) 
* [ngrok](https://ngrok.com/download)
### Dev Environment Setups
1. Local Dev Environmnet Setting
2. Create Azure Bot Service on Azure Portal  
3. CI/CD pipeline setup

## Bot Framework Example
1. Create Dialog

    Link: [https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-dialog-waterfall?view=azure-bot-service-3.0](https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-dialog-waterfall?view=azure-bot-service-3.0)
```
bot.dialog('greetings', [
    // Step 1
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    // Step 2
    function (session, results) {
        session.endDialog(`Hello ${results.response}!`);
    }
]);
```

2. Using Prompts

    ![001](./images/001.png)

    [Example]
    ```
    // 1. Text Prompt
    builder.Prompts.text(session, "What is your name?");

    // 2. Confirm Prompt
    builder.Prompts.confirm(session, "Are you sure you wish to cancel your order?");

    // 3. Choice Prompt
    // ListStyle passed in as Enum
    builder.Prompts.choice(session, "Which color?", "red|green|blue", { listStyle: builder.ListStyle.button });

    // ListStyle passed in as index
    builder.Prompts.choice(session, "Which color?", "red|green|blue", { listStyle: 3 });
    ```
3. Adaptive Card
    * Adaptive Card 정의
    ```
    const adaptiveCard = {
    'contentType': 'application/vnd.microsoft.card.adaptive',
    'content': {
      '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
      'type': 'AdaptiveCard',
      'version': '1.0',
      'body': [
        {
          'type': 'TextBlock',
          'size': 'medium',
          'weight': 'bolder',
          'text': '출발 일자 선택',
          'horizontalAlignment': 'center'
        },
        {
          'type': 'Input.Date',
          'placeholder': 'Due Date',
          'id': 'DateVal',
          'value': '2018-05-16'
        },
        {
          'type': 'Input.Time',
          'placeholder': 'Start time',
          'id': 'TimeVal',
          'value': '16:59'
        }
      ],
      'actions': [
        {
          'type': 'Action.Submit',
          'title': 'Submit',
          'data': {
            'id': '1234567890'
  
          },
          'horizontalAlignment': 'center'
        }
      ]
    }  
    ```
    
    * Adaptive Card 사용
    ```
    function (session) {
      if (session.message && session.message.value) {
        console.log(session.message.value)
        session.endDialogWithResult(session.message.value)
        return
      }
      var msg = new builder.Message(session)
          .addAttachment(adaptiveCard)
      session.send(msg)
    }
    ```

4. Connect to API - QnA Maker
    ```
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
                var lQnaMakerServiceEndpoint = '<EndpointURL입력>';        
                var lQnaApi = 'generateAnswer';
                var lKnowledgeBaseId = '<KnowledgeBaseId입력>';
                var lSubscriptionKey = '<SubsriptionKey입력>';
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
    ```
