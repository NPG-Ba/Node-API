const express = require('express');
const router = express.Router();
const employee = require('../models').employees;
const EmployeeController = require('../controllers/employee.js');

/* GET all page. */

router.get('/:page(\\d+)', EmployeeController.get_emp);

/* GET all id. */
router.get('/emp_id/:id(\\d+)', EmployeeController.get_id);

/*Create  a emp */
router.post('/', EmployeeController.add_emp);

/*Update data in DB */

router.put('/:id(\\d+)',EmployeeController.update_emp)

/*Delete data in DB */

router.delete('/:id(\\d+)', EmployeeController.delete_emp)

module.exports = router;