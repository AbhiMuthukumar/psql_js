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
function getResults(name, callback){
  knex.select('*')
  .from('famous_people')
  .where(knex.raw('name = ?',[name]))
  .orWhere(knex.raw('lastname = ?',[name]))
  .then((rows) => {
    console.log("searching...");
    callback(rows);
  })
  .catch((err) => {
    console.log("error executing the query ", err);
  });
}

getResults(process.argv[2], (rows) => {
  console.log(`Found ${rows.length} persons(s) by the name '${process.argv[2]}'`);
    for(let i=0 ; i<rows.length; i++){
      console.log(`- ${i+1} : ${rows[i].name} ${rows[i].lastname}, born '${rows[i].dob.getFullYear()}-${("0"+(rows[i].dob.getMonth()+1)).slice(-2)}-${rows[i].dob.getDate()}'`);
    }
});
