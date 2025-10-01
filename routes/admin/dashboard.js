const express = require('express')
const router = express.Router()
const committees = require('../../model/committees')

router.get('/', async (req, res) => {
    try {
        const committeesProcess = await committees.getCountCommittesProcess()
        const committeesActive = await committees.getCountCommittesActive()

        console.log(committeesProcess)
        console.log(committeesActive)

        res.render('admin/dashboard', { committeesProcess, committeesActive })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/')
    }
})

module.exports = router