// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {tittle=''} = req.query
        // const sql = `SELECT * FROM booking ${tittle ? `WHERE tittle LIKE '%${tittle}%'`: tittle ? `WHERE tittle LIKE '%${tittle}%' ORDER BY relaese_date DESC`
        const sql = `SELECT * FROM schedule`
        db.query(sql,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from schedule success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {tittle,location,dateStart,dateEnd,price} = req.body

        db.query(`INSERT INTO schedule(tittle,location, dateStart, dateEnd, price) VALUES('${tittle}','${location}','${dateStart}','${dateEnd}', ${price})`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error sayang"})
          }
          resolve({
            message: "add new booking success",
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
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM schedule where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {tittle, location, dateStart, dateEnd, price} = previousData
      
          db.query(`UPDATE schedule SET tittle='${tittle}', location='${location}', dateStart='${dateStart}', dateEnd='${dateEnd}', price='${price}' WHERE id='${id}' ` ,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error sayangku"})
            }
            resolve({
              message: "update booking success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    

    
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`DELETE FROM schedule where id=${id}`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({
            message: "ada error"
        })}
          resolve({
            message: "delete schedule success",
            status: 200,
            data: results
          })
        })
      })
    }
}