// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
var moment = require('moment'); // require
const fs = require('fs')
moment().format();

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      // const offset = (req.query.page -1)* req.query.limit;
      const { tittle = '', relaese_date = '' } = req.query
      const sql = `SELECT * FROM movie ${tittle ? `WHERE tittle LIKE '%${tittle}%'` : tittle && relaese_date ?
        `WHERE tittle LIKE '%${tittle}%' AND relaese_date LIKE '${relaese_date}%'` : ''} ORDER BY relaese_date ASC `
        // 
        // LIMIT ${req.query.limit}
        // OFFSET ${offset} `
      // const sql = `SELECT * FROM movie`
      

      db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: "ada error" })
        }
        resolve({
          message: "get all from movies success",
          status: 200,
          data: results
        })
      })
    })
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { tittle, cover, relaese_date, director, description, casts, categories } = req.body

      console.log(req.body, 'isi req.body')
      db.query(`INSERT INTO movie(tittle, cover, relaese_date, director, description, casts, categories) VALUES('${tittle}', '${cover}','${relaese_date}','${director}','${description}','${casts}','${categories}')`, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: "ada error Mas" })
        }
        resolve({
          message: "add new movies success",
          status: 200,
          data: {
            id: results.insertId,
            ...req.body,
          }
        })
      })
    })
  },
  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      db.query(`SELECT * FROM movie where id=${id}`, (err, results) => {
        if (err) { res.send({ message: "ada error" }) }

        const previousData = {
          ...results[0],
          relaese_date: moment(results[0].relaese_date.toISOString().split('T')[0]).format('YYYY-MM-DD'),
          ...req.body
        }
        const { tittle, cover, relaese_date, director, description, casts, categories } = previousData

        const tempImg = results[0].cover;
          if (req.body.cover) {
            fs.unlink(`uploads/${tempImg}`, function (err) {
              if (err) {
                console.log(err);
                reject({
                  message: "Something wrong",
                });
              }
            });
          }

        // release_date: results[0].release_date.toISOString().split('T')[0],

        // let date = moment(relaese_date).format('YYYY-MM-DD');

        db.query(`UPDATE movie SET tittle='${tittle}', cover='${cover}', relaese_date='${relaese_date}', director='${director}', 
          description='${description}', casts='${casts}', categories='${categories}' WHERE id='${id}' `, (err, results) => {
          if (err) {
            console.log(err)
            reject({ message: "ada error" })
          }
          resolve({
            message: "update movies success",
            status: 200,
            data: results
          })
        })

      })
    })
  },



  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      db.query(`SELECT cover FROM movie WHERE id=${id}`, (err, resultData) => {
        if (err) {
          console.log(err)
        } if (!resultData.length) {
          reject({ message: "id tidak ditemukan" })
        } else {
          let cover = resultData[0].cover

          db.query(`DELETE FROM movie where id=${id}`, (err, results) => {
            if (err) {
              // console.log(err)
              reject({message: "ada error"})
            }
            fs.unlink(`./uploads/${cover}`, function (err) {
              if (err) resolve({
                message: "delete movies success",
                status: 200,
                data: results
              })
            })
            resolve({
              message: "delete movies success",
              status: 200,
              data: results
            })
          })


        }

      })

    })
  }
}