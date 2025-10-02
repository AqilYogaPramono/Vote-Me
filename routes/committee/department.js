const express = require('express')
const router = express.Router()
const modelDepartment = require('../../model/departments')
const modelFaculties = require('../../model/faculties')

router.get('/', async (req, res) => {
    try {
        const departments = await modelDepartment.getAllDepartments()

        res.render('committee/department/index', { departments })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/dashboard')
    }
})

router.get('/create', async (req, res) => {
    try {
        const faculties = await modelFaculties.getAllFaculties()
        res.render('committee/department/create', { faculties })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/departemen')
    }
})

router.post('/buat', async (req, res) => {
    try {
        const { faculty_id, department_name } = req.body
        const data = { faculty_id, department_name }
        await modelDepartment.store(data)

        req.flash('success', 'Departemen berhasil ditambahkan')
        res.redirect('/panitia/departemen')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/departemen')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const department = await modelDepartment.getById(id)
        const faculties = await modelFaculties.getAllFaculties()

        res.render('committee/department/edit', { department, faculties })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/departemen')
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { faculty_id, department_name } = req.body
        const data = { faculty_id, department_name }
        await modelDepartment.update(id, data)

        req.flash('success', 'Departemen berhasil diupdate')
        res.redirect('/panitia/departemen')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/departemen')
    }
})

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await modelDepartment.delete(id)

        req.flash('success', 'Departemen berhasil dihapus')
        res.redirect('/panitia/departemen')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/panitia/departemen')
    }
})

module.exports = router