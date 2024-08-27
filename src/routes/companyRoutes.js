const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, companyController.getAllCompanies);
router.post('/', authenticateToken,companyController.createCompany);
router.put('/', authenticateToken, companyController.updatedCompany);
// router.delete('/', authenticateToken, companyController.deleteCompany);

module.exports = router;