const pg = require("pg");
const settings = require("./settings.json");

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  sl: settings.ssl
});
let query = "";
let result = [];

function getResults(name,callback){
  client.connect((err) => {
    if(err){
      return console.error("Conection Error: ", err);
    }
    client.query("SELECT * from famous_people where name = $1 or lastname = $1",[name], (err,result) => {
      console.log("searching...");
      if(err){
        console.log("Error running the Query :" ,err);
      }
      callback(result)
    });
  });
}

getResults(process.argv[2], (result) => {
  console.log(`Found ${result.rows.length} persons(s) by the name '${process.argv[2]}'`);
  for(let i=0; i<result.rows.length; i++){
    console.log(`- ${i+1} : ${result.rows[i].name} ${result.rows[i].lastname}, born '${result.rows[i].dob.getFullYear()}-${("0"+(result.rows[i].dob.getMonth()+1)).slice(-2)}-${result.rows[i].dob.getDate()}'`);
  }
  client.end();
});

