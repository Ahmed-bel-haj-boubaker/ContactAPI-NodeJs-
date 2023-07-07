const express = require('express');

const router = express.Router();
const {getContact,getOneContact, addContact,updateContact, deleteContact} = require('../controller/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContact).post(addContact);
router.route('/:id').get(getOneContact).delete(deleteContact).put(updateContact);


















module.exports = router;