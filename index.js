import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public", {
  setHeaders: (res, path) =>{
      if(path.endsWith(".css")){
          res.set("Content-Type", "text/css")
      }
  }
}))

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "transacao",
    password: "12345",
    port: "5432"
  
})

db.connect

let transacoes = []

app.get("/", async (req, res) =>{
    const result = await db.query(
        "SELECT * FROM transacao"
    )
})

app.listen(port, () =>{
    console.log(`Server running http://localhost:${port}`)
})