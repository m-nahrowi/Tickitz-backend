// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT * FROM booking`
        db.query(sql,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "get all from booking success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {tittle, YourSeat, price} = req.body

        db.query(`INSERT INTO booking(tittle, YourSeat, price) VALUES('${tittle}', '${YourSeat}','${price}')`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
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
        db.query(`SELECT * FROM booking where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {tittle, YourSeat, price} = previousData
      
          db.query(`UPDATE movie SET tittle='${tittle}', YourSeat='${YourSeat}', price='${price}' WHERE id='${id}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
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
        db.query(`DELETE FROM booking where id=${id}`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({
            message: "ada error"
        })}
          resolve({
            message: "delete booking success",
            status: 200,
            data: results
          })
        })
      })
    }
}