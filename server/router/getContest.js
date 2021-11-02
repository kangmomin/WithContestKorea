const app = require('express').Router()
const mysqli = require('../admin/conn')

app.get('*', async (req, res) => {
    const id = req.params.id
    try {
        const data = await getContest(id)
        res.status(200).json({
            data
        })
    } catch(err) {
        let code = 400
        let message = ""
        
        if(err == 404) {
            code = err
        }
        
        res.status(code).json({
            error: message
        })
    }
})

async function getContest(id) {
    return new Promise((resolve, reject) => {
        mysqli.query('SELECT * FROM contestInfo WHERE id=?', [id], (err, data) => {
            if(err) return reject(err.code)
            if(data.length < 1) return reject(404)
            resolve(data)
        })
    })
}
module.exports = app