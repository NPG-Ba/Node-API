module.exports = function(app) {

    var employee = require('../controllers/employee.controller.js');

    // Create a new employee
    app.route('/api/employees').post(employee.create);

    // Retrieve all employee
    app.route('/api/employees').get(employee.findAll);

    // Retrieve a single employee by Id
    app.route('/api/employees/:id').get(employee.findOne);

    // Update a employee with Id
    app.route('/api/employees/:id').put(employee.update);

    // Delete a employee with Id
    app.route('/api/employees/:id').delete(employee.delete);

    // Update age a employee with Id
    app.route('/api/employees/:id').put(employee.updateAge);
}