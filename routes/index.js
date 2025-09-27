const express = require('express');
const router = express.Router()
const eventIndex = require('../model/eventIndex')

router.get('/', async(req, res) => {
    try {
        const status = await eventIndex.getStatus()
        const endVoting = await eventIndex.getActiveEvents()
        const now = new Date()
        const votingEndTime = new Date(endVoting.voting_end_time)

        if (votingEndTime <= now && status.status == "Active") {
            return res.render('postVoting/index');
        } 

        if (status.status == "Non-Active") {
            return res.render('dataIncomplete/index');
        }

        if (status.status == "Active") {
            return res.render('preVoting/index');
        }
    } catch (err) { 
        console.log(err)
    }
})

module.exports = router;
