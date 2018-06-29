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
          if (err) { 
            console.error(err.message); 
            return; 
          } 
 
          var numRows = 10;  // number of rows to return from each call to getRows() 
          var paramstr = ''; 
          var cursor = ''; 
          for (idx = 0; idx < Object.keys(params).length; idx++) { 
            paramstr +=  ":" + Object.keys(params)[idx]; 
            if (idx < Object.keys(params).length - 1) { 
                paramstr +=  ", "; 
              } 
          } 
           
          connection.execute( 
            "BEGIN " + procedure + "(" + paramstr + "); END;", 
            // "BEGIN " + procedure + "('310002', 'ABCD', '', '', '', :i1, '', :i2, '', :i3, :i4, '', '', :ret); END;", 
            params, 
            function (err, result) { 
              if (err) { 
                console.error(err.message); 
                doRelease(connection); 
                return; 
              } 
               
              var results = fetchRowsFromRS(connection, result.outBinds['ret'], numRows, function (res) { 
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
              //else if (rows.length > 0) {   // got some rows 
              else {   // got some rows 
                rows.forEach(function (row) { 
                  var rowobj = {}; 
                  for (col = 0; col < resultSet.metaData.length; col++) { 
                    rowobj[resultSet.metaData[col].name] = row[col]; 
                  } 
                  results.push(rowobj) 
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