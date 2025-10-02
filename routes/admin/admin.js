const express = require('express')
const router = express.Router()
const modelCommittees = require('../../model/committees')
const bcrypt = require('bcryptjs')

router.get('/ubah-kata-sandi', async (req, res) => {
    try {
        res.render('admin/changePassword', {
            data: req.flash('data')[0]
        })
    } catch (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('/admin/dashboard')
    }
})

router.post('/change-password', async (req, res) => {
    try {
        const {password, newPassword, confirmNewPassword} = req.body
        const data = {password, newPassword, confirmNewPassword}
        // adminId = req.session.adminId
        const adminId = 1
        const admin = await modelCommittees.getById(adminId)

        if (!password) {
            req.flash('error', 'Password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!newPassword) {
            req.flash('error', 'Password baru tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!confirmNewPassword) {
            req.flash('error', 'Konfirmasi password tidak boleh kosong')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!(await bcrypt.compare(password, admin.password))) {
            req.flash('error', 'Password tidak cocok')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (newPassword.length < 6) {
            req.flash('error', 'Password minimal 6 karakter')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!/[A-Z]/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 huruf kapital')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!/[a-z]/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 huruf kecil')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (!/\d/.test(newPassword)) {
            req.flash('error', 'Password minimal 1 angka')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        if (newPassword != confirmNewPassword) {
            req.flash('error', 'Password baru dan konfirmasi password tidak cocok')
            req.flash('data', data)
            return res.redirect('/admin/ubah-kata-sandi')
        }

        await modelCommittees.updatePasswordAdmin(data, adminId)

        req.flash('success', 'Password berhasil diubah')
        res.redirect('/admin/dashboard')
    } catch (err) {
        console.log(err)
        req.flash('error', err.message) 
        res.redirect('/admin/dashboard')
    }
})

module.exports = router