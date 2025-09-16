const express = require('express');
const router = express.Router()
const events = require('../model/events')

router.get('/', async(req, res) => {
    try {
        const status = await events.getStatus()
        const endVoting = await events.getActiveEvents()
        const now = new Date()
        const votingEndTime = new Date(endVoting.voting_end_time)

        if (status.status == "Non-Active") {
            res.render('dataIncomplete/index')
        } else if (status.status == "Active" && votingEndTime > now) {
            res.render('preVoting/index')
        } else if (votingEndTime <= now) {
            res.render('postVoting/index')
        }
    } catch (err) { 
        console.log(err)
    }
})

module.exports = router;
