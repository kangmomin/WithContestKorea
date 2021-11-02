const app = require('express').Router()

app.post('*', async (req, res) => {
    const data = req.body.data
    
    let mainParams = []
    let listParams = [data.contestName, data.mainPoster, data.startDay, endDay, description]
    try {
        mainParams = escaping(mainParams)
        listParams = escaping(listParams)
        let mainId = await addContestInfo(listParams)
        listParams.push(mainId) //main contest id push
        let listId = await addContestListInfo(mainParams)
        
        res.status(201).json({
            contestId: mainId,
            contestListId: listId
        })
    } catch(err) {
        let code = 400
        let message = ''
        
        res.status(code).json(message)
    }
})

function escaping(params) {
    let newParams = [...params]
    newParams.map(val => {
        if(typeof val == String) return val.replace('script>', 'div>')
    })
    return newParams
}

async function addContestListInfo(data) {
    return new Promise((resolve, reject) => {
        mysqli.query(
        'INSERT INTO contestListInfo (contestName, mainPoster, startDay, endDay, description) VALUES (?, ?, ?, ?, ?)',
        data, (err, data) => {
            if(err) reject(err.code)
            else resolve(data.insertId)
        })
    })
}

async function addContestInfo(data) {
    return new Promise((resolve, reject) => {
        mysqli.query('INSERT INTO contestInfo ')
    })
}

module.exports = app