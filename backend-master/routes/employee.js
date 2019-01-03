import * as Express from 'express';
import * as EmployeeController from '../controllers/employee';

const router = Express.Router();
/* GET all page. */

router.get('/:page(\\d+)', EmployeeController.getAllEmployee);

/* GET all id. */
router.get('/emp_id/:id(\\d+)', EmployeeController.getByIdEmployee);

/*Create  a emp */
router.post('/', EmployeeController.addNewEmployee);

/*Update data in DB */

router.put('/:id(\\d+)',EmployeeController.updateEmployee)

/*Delete data in DB */

router.delete('/:id(\\d+)', EmployeeController.deleteEmployee)


router.put('/age/:id(\\d+)', EmployeeController.updateAgeEmployee)


module.exports = router;