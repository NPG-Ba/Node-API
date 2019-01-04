import * as Express from 'express';
import * as PersonController from '../controllers/person';

const router = Express.Router();
/* GET all person in DB */
router.get('/', PersonController.getAllPerson);

/* GET all person in DB */
router.get('/:page(\\d+)', PersonController.getAllPerson);

/*Get person where id in DB */
//router.get('/:person(\\d+)', PersonController.getAllPersonByWhere);

/* GET id. */
router.get('/personid/:id(\\d+)', PersonController.getByIdPerson);

/*Create  a emp */
router.post('/', PersonController.addNewPerson);

/*Update data in DB */
router.put('/:id(\\d+)',PersonController.updatePerson)

/*Delete data in DB */
router.delete('/:id(\\d+)', PersonController.deletePerson)

/*Update age person in DB */
router.put('/:id(\\d+)/age', PersonController.updateAgePerson)


module.exports = router;