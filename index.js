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
    database: "RMF",
    password: "12345",
    port: "5432"
  
})

db.connect()

let items = []

app.get("/", async (req, res) =>{
    const result = await db.query(
        "SELECT * FROM transacao"
    )
    items = result.rows
    console.log(items)
    res.render("index.ejs", {
        listTitle: "MoneyMap",
        listItems: items
    })
})

app.listen(port, () =>{
    console.log(`Server running http://localhost:${port}`)
})