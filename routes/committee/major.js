const express = require('express')
const router = express.Router()
const modelMajor = require('../../model/majors')
const modelDepartment = require('../../model/departments')

router.get('/', async (req, res) => {
    try {
        const majors = await modelMajor.getAllMajors()
        res.render('committee/major/index', { majors })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.get('/create', async (req, res) => {
    try {
        const departments = await modelDepartment.getAllDepartments()
        res.render('committee/major/create', { departments })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/jurusan')
    }
})

router.post('/buat', async (req, res) => {
    try {
        const { department_id, major_name } = req.body
        const data = { department_id, major_name }
        await modelMajor.store(data)

        req.flash('success', 'Jurusan berhasil ditambahkan')
        res.redirect('/panitia/jurusan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/jurusan')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const major = await modelMajor.getById(id)
        const departments = await modelDepartment.getAllDepartments()

        res.render('committee/major/edit', { major, departments })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/jurusan')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { department_id, major_name } = req.body
        const data = { department_id, major_name }
        await modelMajor.update(id, data)

        req.flash('success', 'Jurusan berhasil diupdate')
        res.redirect('/panitia/jurusan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/jurusan')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await modelMajor.delete(id)

        req.flash('success', 'Jurusan berhasil dihapus')
        res.redirect('/panitia/jurusan')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/jurusan')
    }
})


module.exports = router