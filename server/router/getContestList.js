const app = require('express')()
const mysqli = require('../admin/conn')

app.get('*', async (req, res) => {
    const page = (req.params.page - 1) * 30 //페이지 수로 n번부터 30개를 가져올때 필요한 n의 값
    
    try {
        const db = await getData(page)
        res.status(200).json(db)
    } catch(err) {
        let errCode = 400
        let errMessage = ""
        
        //error information setting`
        if(err == 404) {
            errCode = 404
            errMessage = ''
        } else if(err == 'ER_BAD_FIELD_ERROR') {
            errCode = 400
            errMessage = "please check the readme again"
        } else if(err == "ER_PARSE_ERROR") {
            errMessage = "query String Error"
        } else if(err == "Not a Number") {
            errMessage = "please check the readme again about page"
        }
        
        throwErr(res, errCode, errMessage)
    }
})

function throwErr(res, errData) {
    res.status(errData.status).json({
        message: errData.message
    })
}

async function getData(page) {
    return new Promise ((resolve, reject) => {
        if(typeof req.params.page == Number) return reject("Not a Number")
        mysqli.query(`SELECT * FROM contests LIMIT ${page}, 30`, (err, data) => {
            if(err) reject(err.code)
            if(db.length < 1) reject(404)
            else resolve(data)
        })
    })
}

module.exports = app