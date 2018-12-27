const express = require('express');
const router = express.Router();
const employee = require('../models').employees;
const EmployeeController = require('../controllers/employee.js');

/* GET all page. */

router.get('/', EmployeeController.get_emp);

/* GET all id. */
router.get('/:id', EmployeeController.get_id);

/*Create  a emp */
router.post('/', EmployeeController.add_emp);

/*Update data in DB */

router.put('/:id', EmployeeController.update_emp)

/*Delete data in DB */

router.delete('/:id', EmployeeController.delete_emp)

module.exports = router;