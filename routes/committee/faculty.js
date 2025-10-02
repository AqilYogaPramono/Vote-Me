const express = require('express')
const router = express.Router()
const modelFaculties = require('../../model/faculties')

router.get('/', async (req, res) => {
    try {
        const faculties = await modelFaculties.getAllFaculties()

        res.render('committee/faculty/index', { faculties })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.get('/create', async (req, res) => {
    try {
        res.render('committee/faculty/create')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/fakultas')
    }
})

router.post('/buat', async (req, res) => {
    try {
        const { faculty_name } = req.body
        const data = {faculty_name}
        await modelFaculties.store(data)

        req.flash('success', 'Fakultas berhasil ditambahkan')
        res.redirect('/panitia/fakultas')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/fakultas')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const faculty = await modelFaculties.getById(id)

        res.render('committee/faculty/edit', { faculty })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/fakultas')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { faculty_name } = req.body
        const data = {faculty_name}
        await modelFaculties.update(id, data)

        req.flash('success', 'Fakultas berhasil diupdate')
        res.redirect('/panitia/fakultas')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/fakultas')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await modelFaculties.delete(id)

        req.flash('success', 'Fakultas berhasil dihapus')
        res.redirect('/panitia/fakultas')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/fakultas')
    }
})

module.exports = router