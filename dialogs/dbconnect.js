var oracledb = require('oracledb');
oracledb.getConnection(
  {
    user          : "skrbot",
    password      : "skrbottest",
    connectString : "SKRBOT"
  },
//   function (err, connection) {
//     if (err) { console.error(err.message); return; }

//     var bindvars = {
//       i:  'Chris',  // Bind type is determined from the data.  Default direction is BIND_IN
//       io: { val: 'Jones', dir: oracledb.BIND_INOUT },
//       o:  { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
//     };
//     connection.execute(
//       "BEGIN testproc(:i, :io, :o); END;",
//       // The equivalent call with PL/SQL named parameter syntax is:
//       // "BEGIN testproc(p_in => :i, p_inout => :io, p_out => :o); END;",
//       bindvars,
//       function (err, result) {
//         if (err) {
//           console.error(err.message);
//           doRelease(connection);
//           return;
//         }
//         console.log(result.outBinds);
//         doRelease(connection);
//       });
//   });

// function doRelease(connection) {
//   connection.close(
//     function(err) {
//       if (err) {
//         console.error(err.message);
//       }
//     });




  function(err, connection)
  {
    if (err) { console.error(err); return; }
    connection.execute(
      
        
      "select colvar, colnum, colvar2, colvar3 "
    + "from t_test "
    + "where rownum = 1 ",    
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });