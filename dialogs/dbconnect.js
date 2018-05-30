var oracledb = require('oracledb');
oracledb.autoCommit = true;

oracledb.getConnection(
  {
    user          : "skrbot",
    password      : "skrbottest",
    connectString : "SKRBOT"
  },
  function (err, connection) {
    if (err) { console.error(err.message); return; }

    var bindvars = {
      i1: 'a',  // Bind type is determined from the data.  Default direction is BIND_IN
      i2: '',
      i3: '', 
      ret:  { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };
    var numRows = 10;  // number of rows to return from each call to getRows()
    connection.execute(
       "BEGIN skrbot.PKG_test.sp_GetTest(:i1, :i2, :i3, :ret); END;",
      //"select colvar, colvar2 from t_test where colvar = 'a'",
      // The equivalent call with PL/SQL named parameter syntax is:
      //  "BEGIN testproc(p_in => :i, p_inout => :io, p_out => :o); END;",
      bindvars,
      function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.outBinds);
        fetchRowsFromRS(connection, result.outBinds.ret, numRows);
        doRelease(connection);
      });
  });
  
  function fetchRowsFromRS(connection, resultSet, numRows) {
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
            // res.send(JSON.stringify(row));
          });
  
          fetchRowsFromRS(connection, resultSet, numRows); // get next set of rows
        }
        // console.log('Total Rows %s', rowCount);
        
        //   if (rows.length === numRows)  // might be more rows
        //     fetchRowsFromRS(connection, resultSet, numRows);
        //   else                          // got fewer rows than requested so must be at end
        //     . . .                       // close the ResultSet and release the connection
        // } else {                        // else no rows
        //     . . .                       // close the ResultSet and release the connection
        // }
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




  // function(err, connection)
  // {
  //   if (err) { console.error(err); return; }
  //   connection.execute(
      
        
  //     "select colvar, colnum, colvar2, colvar3 "
  //   + "from t_test "
  //   + "where rownum = 1 ",    
  //     function(err, result)
  //     {
  //       if (err) { console.error(err); return; }
  //       console.log(result.rows);
  //     });
  // });