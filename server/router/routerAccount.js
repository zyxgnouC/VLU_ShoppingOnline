// import express from 'express';
const express = require('express')
const router = express.Router();
const AccountModel = require('../model/account.js')

// get dùng để lấy dữ liệu
router.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(300).json('lỗi server')
    })
})

// lấy 1 phần tử
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    AccountModel.findById(id)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(300).json('lỗi server')
    })
})

// post thêm mới dữ liệu
router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    AccountModel.findOne({
      username: username
    })
    .then(data => {
      if(data) {
        res.json("tên đã tồn tại")
      } else {
        return AccountModel.create({
          username: username,
          password: password
        })
      }
    })
    .then(data => {
      res.json("tạo tài khoản thành công")
    })
    .catch(err => {
      res.status(500).json("tạo tài khoản thất bại")
    })
})

// put chỉnh sửa( update ) dữ liệu
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const newpassword = req.body.newpassword;
    AccountModel.findByIdAndUpdate(id,
        {password: newpassword}
    )
    .then(data => {
        res.json("update thành công")
    })
    .catch(err => {
        res.status(500).json("update thất bại")
    })
})

// delete xóa dữ liệu
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    const newpassword = req.body.newpassword;

    // 2 hàm đều dùng được
    // AccountModel.deleteOne({
    //     _id: id
    // })
    AccountModel.findByIdAndDelete(id)
    .then(data => {
        res.json("delete thành công")
    })
    .catch(err => {
        res.status(500).json("delete thất bại")
    })
})

module.exports = router;


