const db = require("../helper/db_connection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { useError } = require("../helper/message");
// const { register } = require("../controller/authController");

module.exports = {
    
    login: (req, res) => {
        const {email, password} = req.body;
        // console.log(req.body.password + "ini dari req.body")
        return new Promise((resolve, reject)=> {
            db.query(
                `SELECT id, password, role FROM users WHERE email='${email.toLowerCase()}'`,
              async  (err, results) => {
                    if (err) {
                        console.log(err)
                        reject({message: "ada error"});
                    } else {
                        if (!results.length) {
                            reject({message: "Email/Password Salah."})
                        } else {
                            // console.log(results[0]?.password)
                           bcrypt.compare(password, results[0].password, (errHashing, successHasing) => {
                                // console.log(password + "ini password")
                                // console.log(results + "ini result")
                                if(errHashing) {
                                    console.log(errHashing)
                                    reject({message: "Ada masalah saat login, Harap coba lagi"})} // untuk bycrpt error
                                if(successHasing) {
                                    const token = jwt.sign({user_id: results[0].id, role: results[0].role}, process.env.JWT_SECRET_KEY);
                                    console.log({user_id: results[0].id, role: results[0].role})
                                    
                                    
                                    resolve({
                                        message: "Login Succses",
                                        status: 200,
                                        data: {
                                            token,
                                            user_id: results[0].id
                                        },
                                        
                                    }) 

                                } else {reject({message: "Email/password Salah."})}
                            });
                        }
                    }
                }
            )
        })
    },

    register: (req, res) => {
        const {name, email, password, image} = req.body;
        return new Promise((resolve, reject)=> {
            bcrypt.hash(password, 10, function (err, hashedPassword){
                if (err) {
                    console.log(err);
                    reject({message: "ada error"});
                } else {
                    db.query(
                        `INSERT INTO users(name, email, password, image) VALUES('${name}', '${email}', '${hashedPassword}', '${image}')`,
                        (err, results) => {
                            if (err){
                                console.log(err)
                                reject(useError(err.code));
                            }
                            resolve({
                                message: "register succses",
                                status: 201,
                                data: results,
                            })
                        }
                    )
                    

                }
            })
        })
    }
}