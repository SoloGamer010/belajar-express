import db from "../../koneksi.js";

export const getMahasiswa = (req, res) =>{
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (error, result) => {
        res.send(result);
    })
}

export const findMahasiswa = (req,res) => {
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`
    db.query(sql, (error, result) => {
        res.json(result)
    })
}

export const createMahasiswa = (req,res) => {
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
}


export const updateMahasiswa = (req,res) => {
    if (nim || nama_lengkap || kelas || alamat) {
        const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat = "${alamat}" WHERE nim = ${nim}`
        db.query(query, (error, result) => {
            if (error) res.status(400).send(error.message);
            res.json(result);
        })
    } else {
        res.send("Isi body nya");
    }
}

export const deleteMahasiswa = (req,res) => {
    const nim = req.query.nim;
    const sql = "DELETE FROM mahasiswa WHERE nim = ?"
    db.query(sql, [nim], (error, result) => {
        if (error) {
            res.status(400)
            res.send(error)
        }
        res.status(200);
        res.json("Data berhasil di hapus");
    });
};