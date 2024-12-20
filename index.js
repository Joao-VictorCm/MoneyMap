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

app.post("/add", async (req, res) =>{
    const tipo = req.body.newTipo
    const descricao = req.body.newDescricao
    const valor = req.body.newValor
    const categoria = req.body.newCategoria
    const data = req.body.newData

    console.log(tipo, descricao, valor, categoria)

    await db.query(
        "INSERT INTO transacao (tipo, descricao, valor, categoria, data) VALUES ($1, $2, $3, $4, $5);",
        [tipo, descricao, valor, categoria, data]
    )
    res.redirect("/")
})

app.listen(port, () =>{
    console.log(`Server running http://localhost:${port}`)
})