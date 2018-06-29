var oracledb = require('oracledb'); 
let builder = require('botbuilder')
let schedulecard = require('../cards/schedulecard')
var connectdb = require('../../database/dbconnect')
let moment = require('moment')

const formatDate = (pMonth) => {
    var tmpDt = ''

    tmpDt = pMonth.replace('월','').replace('일','')
    if (tmpDt.length == 1) tmpDt = '0' + tmpDt
    return tmpDt
    
}

module.exports = [
    function(session, args, next) {
        console.log(args)

        session.dialogData.scheduleinq = {};
        session.dialogData.scheduleinq.loadingPortCode = ''
        session.dialogData.scheduleinq.dischargingPortCode = ''
        session.dialogData.scheduleinq.dateOption = ''
        session.dialogData.scheduleinq.startDate = ''
        session.dialogData.scheduleinq.endDate = ''
        session.dialogData.scheduleinq.date= ''
        session.dialogData.scheduleinq.day= ''
        
        var loadingPortCode = '';
        var dischargingPortCode = '';
        if (args != undefined && args.intent != undefined) {
            var intent = args.intent;
            // Has port roles : pol / pod 구분
            var ports = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port_pattern');
            // Has port codes : 포트코드
            var codes = builder.EntityRecognizer.findAllEntities(intent.entities, 'Port');
            // Date Option : 지난/이번/다음 - 일/주/월/년(지난주, 다음달 등)
            var dateOpt = builder.EntityRecognizer.findAllEntities(intent.entities, 'DateOption');
            // 요일 
            var days = builder.EntityRecognizer.findAllEntities(intent.entities, 'Day');
            // 일
            var dates = builder.EntityRecognizer.findAllEntities(intent.entities, 'Date');
            // 월
            var months = builder.EntityRecognizer.findAllEntities(intent.entities, 'Month');

            //월 일이 있으면 해당 일자로 조회
            if (months.length != 0) {
                var tmpYear = ''
                var tmpFrMonth = ''
                var tmpToMonth = ''
                var tmpDate = ''
                
                tmpYear = moment().format("YYYY")
                switch (months.lenth) {
                    case 0 :
                        tmpFrMonth = moment().format("MM")
                        tmpToMonth = moment().format("MM")
                    case 1 :
                        tmpFrMonth = formatDate(months[0].entity.replace(/ /g, ''))
                        tmpToMonth = formatDate(months[0].entity.replace(/ /g, ''))
                    case 2 :
                        tmpFrMonth = formatDate(months[0].entity.replace(/ /g, ''))
                        tmpToMonth = formatDate(months[1].entity.replace(/ /g, ''))
                }

                switch (dates.length) {
                    case 0 :
                        //일자가 없는 경우 지정 월 1일부터 말일까지.
                        session.dialogData.scheduleinq.startDate = tmpYear + tmpFrMonth + '01'
                        session.dialogData.scheduleinq.endDate = moment(tmpYear + tmpToMonth + '01').endOf("month").format("YYYYMMDD")
                        break;
                    case 1 : 
                        //일자가 하나만 있는 경우 월이 두 개 들어오는 경우는 없을거라 시작일로 보고 시작일 +2주
                        session.dialogData.scheduleinq.startDate = tmpYear + tmpFrMonth + formatDate(dates[0].entity.replace(/ /g, ''))
                        session.dialogData.scheduleinq.endDate = moment(session.dialogData.scheduleinq.startDate,"YYYYMMDD").add(2,"weeks").format("YYYYMMDD")
                        break;
                    case 2 :
                        //일자가 두개면 지정된 월에 일자 두개 붙여서 From To
                        session.dialogData.scheduleinq.startDate = tmpYear + tmpFrMonth + formatDate(dates[0].entity.replace(/ /g, ''))
                        session.dialogData.scheduleinq.endDate = tmpYear + tmpToMonth + formatDate(dates[1].entity.replace(/ /g, ''))
                        break;
                }
            }
            
            if (dateOpt.length != 0) {
                var tmpDateOpt = ''
                var startdate
                var enddate

                tmpDateOpt = dateOpt[0].resolution.values[0].replace(/ /g, '')

                switch (tmpDateOpt) {
                    case 'TODAY':
                        startdate = moment().format("YYYYMMDD");
                        break;
                    case 'TOMORROW':
                        startdate = moment().add(1,"day").format("YYYYMMDD");
                        break;
                    case 'DAYAFTERTOMORROW':
                        startdate = moment().add(2,"day").format("YYYYMMDD");
                        break;
                    case 'THISWEEK':
                        startdate = moment().startOf("isoWeek").format("YYYYMMDD");
                        enddate = moment().endOf("isoWeek").format("YYYYMMDD");
                        break;
                    case 'LASTWEEK':
                        startdate = moment().subtract(1, "weeks").startOf("isoWeek").format("YYYYMMDD");
                        enddate = moment().subtract(1, "weeks").endOf("isoWeek").format("YYYYMMDD");
                        break;
                    case 'NEXTWEEK':
                        startdate = moment().add(1, "weeks").startOf("isoWeek").format("YYYYMMDD");
                        enddate = moment().add(1, "weeks").endOf("isoWeek").format("YYYYMMDD");
                        break;
                    case 'THISMONTH':
                        startdate = moment().startOf("month").format("YYYYMMDD");
                        enddate = moment().endOf("month").format("YYYYMMDD");
                        break;
                    case 'LASTMONTH':
                        startdate = moment().subtract(1, "month").startOf("month").format("YYYYMMDD");
                        enddate = moment().subtract(1, "month").endOf("month").format("YYYYMMDD");
                        break;
                    case 'NEXTMONTH':
                        startdate = moment().add(1, "month").startOf("month").format("YYYYMMDD");
                        enddate = moment().add(1, "month").endOf("month").format("YYYYMMDD");
                        break;
                }
                
                if (startdate == '') startdate = moment().format("YYYYMMDD")
                if (enddate == '') enddate = moment(startdate,"YYYYMMDD").add(2,"weeks").format("YYYYMMDD")

                session.dialogData.scheduleinq.startDate = startdate
                session.dialogData.scheduleinq.endDate = enddate
                
                /*
                var today = moment().format("YYYYMMDD")
                var tomorrow = moment().add(1,"day").format("YYYYMMDD")
                var dayAfterTomorrow = moment().add(2,"day").format("YYYYMMDD")
                var yesterday = moment().subtract(1,"day").format("YYYYMMDD")
                var dayBeforeYesterday = moment().subtract(2,"day").format("YYYYMMDD")
                var thisweekfr = moment().startOf("isoWeek").format("YYYYMMDD")
                var thisweekfr = moment().endOf("isoWeek").format("YYYYMMDD")
                var nextWeekFr = moment().add(1, "weeks").startOf("isoWeek").format("YYYYMMDD")
                var nextWeekTo = moment().add(1, "weeks").endOf("isoWeek").format("YYYYMMDD")
                var lastWeekFr = moment().subtract(1, "weeks").startOf("isoWeek").format("YYYYMMDD")
                var lastWeekTo = moment().subtract(1, "weeks").endOf("isoWeek").format("YYYYMMDD")
                var thisMonthFr = moment().startOf("month").format("YYYYMMDD")
                var thisMonthTo = moment().endOf("month").format("YYYYMMDD")
                var nextMonthFr = moment().add(1,"month").startOf("month").format("YYYYMMDD")
                var nextMonthTo = moment().add(1,"month").endOf("month").format("YYYYMMDD")
                var lastMonthFr = moment().subtract(1,"month").startOf("month").format("YYYYMMDD")
                var lastMonthTo = moment().subtract(1,"month").endOf("month").format("YYYYMMDD")
                */
            }
            
            var loadingPort = ports.find(function(port) {
                return port.role === 'ofLoading';
            });
            var dischargePort = ports.find(function(port) {
                return port.role === 'ofDischarging';
            });
            
            if (loadingPort) {
                loadingPortCode = codes.find(function(code) {
                    code = code.entity.replace(/ /g, '');
                    _loadingPort = loadingPort.entity.replace(/ /g, '');
                    return _loadingPort.includes(code);
                }).resolution.values[0];
                
                session.dialogData.scheduleinq.loadingPortCode = loadingPortCode
    
                //POL role을 잡으면 나머지 포트는 POD로 한다.
                //POD role을 못잡는 경우 처리를 위해 추가
                for (let index = 0;index <= codes.length-1; index++ ) {
                    if (codes[index].resolution.values[0] != loadingPortCode) {
                        dischargingPortCode = codes[index].resolution.values[0]
                        session.dialogData.scheduleinq.dischargingPortCode = dischargingPortCode
                    }
                }
            }
            
            //POD role이 있으면 인식한 POD를 다시 ASSIGN
            if (dischargePort) {
                dischargingPortCode = codes.find(function(code) {
                    code = code.entity.replace(/ /g, '');
                    _dischargePort = dischargePort.entity.replace(/ /g, '');
                    return _dischargePort.includes(code);
                }).resolution.values[0];
            
                session.dialogData.scheduleinq.dischargingPortCode = dischargingPortCode
                
            }

        }

        // POL이나 POD가 없으면 POL,POD스캐줄 조회 카드를 보여줌.
        if (session.dialogData.scheduleinq.loadingPortCode == '' || session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.beginDialog('Card', args);
        } else {
            next();
        }
        // Check the entities
        
    },
    function(session, results, next) {
        
        // card  결과 - results
        // LUIS 결과는 session.dialogData.scheduleinq
        if (session.dialogData.scheduleinq.loadingPortCode == '') {
            session.dialogData.scheduleinq.loadingPortCode = results.inputpolval;
        }
        if (session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.dialogData.scheduleinq.dischargingPortCode = results.inputpodval;
        }

        if (session.dialogData.scheduleinq.loadingPortCode == '' || session.dialogData.scheduleinq.dischargingPortCode == '') {
            session.send('No POL entered. Please enter a POL.')
            // TODO: populate with existing values
            session.message.value = null;
            session.clearDialogStack();
            session.beginDialog('POL/POD Inquiry')
        } else {
             //results.StartDateVal.replace(/\-/g,'')
             if (session.dialogData.scheduleinq.startDate == '') session.dialogData.scheduleinq.startDate = moment().format("YYYYMMDD")
             if (session.dialogData.scheduleinq.endDate == '') session.dialogData.scheduleinq.endDate = moment(session.dialogData.scheduleinq.startDate,"YYYYMMDD").add(2,"weeks").format("YYYYMMDD")
             
            console.log(session.dialogData.scheduleinq.loadingPortCode)
            console.log(session.dialogData.scheduleinq.dischargingPortCode)
            console.log(session.dialogData.scheduleinq.startDate)
            console.log(session.dialogData.scheduleinq.endDate)
             
            var params = { 
                p1: '310002'    // Bind type is determined from the data.  Default direction is BIND_IN 
                , p2: 'ABCD' 
                , p3: '' 
                , p4: '' 
                , p5: '' 
                , p6: session.dialogData.scheduleinq.loadingPortCode   
                , p7: '' 
                , p8: session.dialogData.scheduleinq.dischargingPortCode 
                , p9: '' 
                , p10: session.dialogData.scheduleinq.startDate 
                , p11: session.dialogData.scheduleinq.endDate 
                , p12: '' 
                , p13: '' 
                , ret:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
              }; 

              // query with user input
            connectdb.dbconnect('skrapp.app_pkg_schedule.GET_SCHEDULE_APP', params, function (res) {
                
                let cards = []
                if (res.length == 0) {
                    var args = {}
                    
                    session.send('스캐줄이 없습니다. 다른 날짜 또는 포트를 입력해주세요.')
                    args.pol = session.dialogData.scheduleinq.loadingPortCode
                    args.pod = session.dialogData.scheduleinq.dischargingPortCode
                    args.frDt = session.dialogData.scheduleinq.startDate
                    args.toDt = session.dialogData.scheduleinq.endDate
                    session.beginDialog('Card', args);
                }
                res.forEach(element => {
                    cards.push(schedulecard(element.SVC, element.TT, element.VSLNM+" / "+element.VYG , element.ETD + '~' +element.ETA, element.POLWNM +'->' + element.PODWNM))
                });
                //cards.push(schedulecard('KHPR', '12 days', 'Kharis Heritage / 1721S', '05-18 FRI 06:00 ~ 05-30 WED 12:00', 'BIT → WAIGAOQIAO PIER #5'))
                //cards.push(schedulecard('CIX2', '2 days', 'HYUNDAI BRAVE / 069W', '05-18 FRI 22:00 ~ 05-20 SUN 17:00', 'HPNT → WAIGAOQIAO PIER #5'))
                // TODO: Add a button linking this card to another dialog to make booking
                cards.map(function (card) {
                    var msg = new builder.Message(session)
                    .addAttachment(card)
                    session.send(msg)
                })
                session.endDialog()
                    
              }); 
              
            // TODO: make call to oracle
            // Show schedules
            
        }
    },
    function () {
        var tmp;
        tmp = 111
    }
];
