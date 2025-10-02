const express = require('express')
const router = express.Router()
const modelEnrollmentYears = require('../../model/enrollmentyears')

router.get('/', async (req, res) => {
    try {
        const enrollmentyears = await modelEnrollmentYears.getAllEnrollmentYears()

        res.render('committee/enrollmentYear/index', { enrollmentyears })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.get('/create', async (req, res) => {
    try {
        res.render('committee/enrollmentYear/create')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/tahun-angkatan')
    }
})

router.post('/buat', async (req, res) => {
    try {
        const { year } = req.body
        const data = {year}
        await modelEnrollmentYears.store(data)

        req.flash('success', 'Tahun ajaran berhasil ditambahkan')
        res.redirect('/panitia/tahun-angkatan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/tahun-angkatan')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const enrollmentyear = await modelEnrollmentYears.getById(id)

        res.render('committee/enrollmentYear/edit', { enrollmentyear })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/tahun-angkatan')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { year } = req.body
        const data = {year}
        await modelEnrollmentYears.update(id, data)

        req.flash('success', 'Tahun ajaran berhasil diupdate')
        res.redirect('/panitia/tahun-angkatan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/tahun-angkatan')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await modelEnrollmentYears.delete(id)

        req.flash('success', 'Tahun ajaran berhasil dihapus')
        res.redirect('/panitia/tahun-angkatan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/tahun-angkatan')
    }
})

module.exports = router