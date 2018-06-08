var oracledb = require('oracledb');
oracledb.autoCommit = true;

exports.dbconnect = function (procedure, params, callback) {
    // procedure - procedure name
    // params - arguements to query
    
    oracledb.getConnection(
        {
          user          : process.env.dbuser,
          password      : process.env.dbpassword,
          connectString : process.env.connstr
        },
        function (err, connection) {
          if (err) { console.error(err.message); return; }
      
          var bindvars = {
            i1: params[0],  // Bind type is determined from the data.  Default direction is BIND_IN
            i2: params[1],
            i3: params[2],
            ret:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
          };
          var numRows = 10;  // number of rows to return from each call to getRows()
          connection.execute(
            "BEGIN "+procedure+"('310002', 'ABCD', '', '', '', :i1, '', :i2, '', :i3, :i3, '', '', :ret); END;",
            //  "BEGIN skrapp.app_pkg_schedule.GET_SCHEDULE_APP('310002', 'ABCD', '', '', '', :i1, '', :i2, '', :i3, :i3, '', '', :ret); END;",
             //"BEGIN skrbot.PKG_test.sp_GetTest(:i1, :i2, :i3, :ret); END;",
             bindvars,
            function (err, result) {
              if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
              }
              //console.log(result.outBinds);
              var results = fetchRowsFromRS(connection, result.outBinds.ret, numRows, function (res) {
                doRelease(connection);
                callback(res);
              });      
            });
        });
        
        var results = []
        function fetchRowsFromRS(connection, resultSet, numRows, callback) {
            console.log('run fetch rows')
          resultSet.getRows( // get numRows rows
            numRows,
            function (err, rows) {
              if (err) {
                console.error(err.message);
                return; // close the result set and release the connection
              } 
              else if (rows.length == 0) { // no rows, or no more rows
                console.log('No more rows'); // close the result set and release the connection
              }
              else if (rows.length > 0) {   // got some rows
                console.log(rows);            // process rows    // process rows
                rows.forEach(function (row) {
                  console.log(row);


                  var rowobj = {};

                  rowobj.SVC = row[1]
                  rowobj.VSL = row[2]
                  rowobj.TT = row[32]
                  rowobj.VSLNM = row[3]
                  rowobj.VYG = row[4]
                  rowobj.ETD= row[18]
                  rowobj.ETA = row[30]
                  rowobj.POL = row[7]
                  rowobj.POLW = row[8]
                  rowobj.POLWNM = row[9]
                  rowobj.POD = row[13]
                  rowobj.PODW = row[14]
                  rowobj.PODWNM = row[15]

                  results.push(rowobj)

                  // need to put value to resultset.json obj 
                  
                  
                });
                callback(results)
                // fetchRowsFromRS(connection, resultSet, numRows); // get next set of rows
              }
             
            });
        }
      
    function doRelease(connection) {
        connection.close(
        function(err) {
            if (err) {
            console.error(err.message);
            }
        })
        };

};
