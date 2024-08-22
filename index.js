import express, { query } from "express";
import db from "./koneksi.js";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/", router)
app.listen(PORT, () => {
    console.log("Server berjalan di http://localhost:3000:" + PORT);
})


//http://localhost:3000
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM mahasiswa"
//     db.query(sql, (error, result) => {
//         res.json(result)
//     })
// })

//http://localhost:3000/find?nim=1
app.get("/find", (req, res) => {
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`
    db.query(sql, (error, result) => {
        res.json(result)
    })
})

app.post("/create", (req, res) => {
    const { nama_lengkap, kelas, nim, alamat } = req.body;
    const sql = "INSERT INTO mahasiswa (nama_lengkap, kelas, nim, alamat) VALUES (?,?,?,?)"
    db.query(sql, [nama_lengkap, kelas, nim, alamat], (error, result) => {
        if (error) {
            res.status(400)
            res.send(error)
        }
        res.status(201);
        res.json(result);
    })
})

//http://localhost:3000/delete?nim=10
app.delete("/delete", (req, res) => {
    const nim = req.query.nim;
    const sql = "DELETE FROM mahasiswa WHERE nim = ?"
    db.query(sql, [nim], (error, result) => {
        if (error) {
            res.status(400)
            res.send(error)
        }
        res.status(200);
        res.json("Data berhasil di hapus");
    })
})

app.put("/update", (req, res) => {
    const nim = req.query.nim;
    const { nama_lengkap, kelas, alamat } = req.body

    // res.send(req.body)
    if (nim || nama_lengkap || kelas || alamat) {
        const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat = "${alamat}" WHERE nim = ${nim}`
        db.query(query, (error, result) => {
            if (error) res.status(400).send(error.message);
            res.json(result);
        })
    } else {
        res.send("Isi body nya");
    }
})
