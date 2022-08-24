const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})


const filterFilter = (req,file, cn) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg'){
        return cn (new Error("beda file kaka, file harus jpg, png"))
    }else {
        return cn(null, true)
    }
}

// limit
const limits = {
    fileSize: 1*1024*1024
}

const uploadMovies = multer({
    storage: storage,
    fileFilter: filterFilter,
    limits: limits
}).single('cover')

const upload = (req, res, next)=> {
    uploadMovies(req, res, (error)=>{
        if (error instanceof multer.MulterError){
            return res.json({
                success: false,
                message : error.message, 
                
                
            })
        } else if (error){
            return res.json({
                success: false,
                message: "file not image",
                
            
            })
        } next()
    })
}
 


module.exports = upload

