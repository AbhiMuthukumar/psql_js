var settings = require("./settings.json");
var knex = require("knex")({
  client: "pg",
  connection : {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
    sl: settings.ssl
  }
});

function insertRecords(fname, lname, dob,callback){
  knex('famous_people')
  .insert([{name:fname, lastname:lname,dob:dob}])
  .then(() => {
    callback(null);
  })
  .catch((err) => {
    callback(err);
  });
}

insertRecords(process.argv[2], process.argv[3], process.argv[4], (err) => {
  if(err){
    console.error("Error while inserting " ,err);
    return;
  }
  console.log("1 row inserted.");
});