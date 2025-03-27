const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('kepek'))


var connection

function kapcsolat(){
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'kelettravel2024'
    })

    connection.connect()
}




app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/celok', (req, res) => {

    kapcsolat()
    connection.query('SELECT * from celok', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })

app.get('/kapcsolatok', (req, res) => {

    kapcsolat()
    connection.query('SELECT * from kapcsolatfelvetel', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
   connection.end()
   })

app.post('/kapcsolatfelvetel', (req, res)=>{
  const {nev, email, telefon, megjegyzes}= req.body;
  kapcsolat();
  connection.query('INSERT INTO kapcsolatfelvetel (nev, email, telefon, megjegyzes) VALUES (?, ?, ?, ?)', 
  [nev, email, telefon, megjegyzes], (err, results)=>{
    res.send(err?"Hiba":"Sikeres felvitel");
  });
  connection.end();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})