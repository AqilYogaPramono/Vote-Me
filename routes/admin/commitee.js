const express = require('express')
const router = express.Router()
const modelCommittees = require('../../model/committees')

router.get('/', async (req, res) => {
    try {
        const committees = await modelCommittees.getCommitees()
        res.render('admin/committee', { committees })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/panitia')
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {status} = req.body
        const data = {status}

        await modelCommittees.updateStatusCommittee(id, data)

        req.flash('success', 'Status panitia berhasil diubah')
        res.redirect('/admin/panitia')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/panitia')
    }
})

module.exports = router