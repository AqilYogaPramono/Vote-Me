const express = require('express')
const router = express.Router()
const modelUsers = require('../../model/users')

router.get('/', async (req, res) => {
    try {
        const participants = await modelUsers.getparticipants()
        res.render('committee/participant/index', { participants })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.post('/update-status/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        await modelUsers.updateStatus(id, status)
        
        req.flash('success', 'Status berhasil diperbarui')
        res.redirect('/panitia/peserta')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/peserta')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        await modelUsers.delete(id)
        
        req.flash('success', 'Peserta berhasil dihapus')
        res.redirect('/panitia/peserta')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/peserta')
    }
})

module.exports = router