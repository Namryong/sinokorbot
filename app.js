/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
//bot.set('storage', tableStorage);

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
}  


bot.dialog('/', [
    //1.text
    function (session) {
        session.send('안녕하세요 만나서 반갑습니다!');
        builder.Prompts.text(session, '이름이 뭐에요?');
    },
    //2.confirm
    function (session, results) {
        session.send(`${results.response}님, 만나서 반갑습니다!`);
        builder.Prompts.confirm(session, "Are you sure you wish to cancel your order?");
    },
    //3.choice
    function (session, results) {
        session.send(`${results.response}님, 선택해주세요!`);
        builder.Prompts.choice(session, "Which color?", "red|green|blue", { listStyle: builder.ListStyle.button });
    },
    //ListStyle passed in as index
    function (session, results) {
        session.send(`${results.choice}님, 네?`);
        builder.Prompts.choice(session, "Which color?", "red|green|blue", { listStyle: 3 });
    },
    function (session, results) {
        var msg = new builder.Message(session)
            .addAttachment(adaptiveCard)
        session.send(msg)
        session.endDialog(`${results.response}님, 알려주셔서 감사합니다! 끗!!`);
    }
    
]);