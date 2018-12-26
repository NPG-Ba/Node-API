const Emp = require('../models/employee.js');


// POST a Emp
exports.create = (req, res) => {
    // Create a Emp
    const employee = new Emp({
        name: req.body.name,
        age: req.body.age,
		comment: req.body.comment
    });

    // Save a Emp in the MySQL
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FETCH all Emp
exports.findAll = (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    Emp.findAll()
    .then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Emp
exports.findOne = (req, res) => {
    Emp.findById(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Emp with id " + req.params.id
        });
    });
};

// UPDATE a Emp
exports.update = (req, res) => {
    // Find customer and update it
    Emp.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
		comment: req.body.comment
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.id
        });
    });
};

// DELETE a Emp
exports.delete = (req, res) => {
    Emp.findByIdAndRemove(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });
        }
        res.send({message: "Emp deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.id
        });
    });
};


// UPDATE AGE
exports.updateAge = (req, res) => {
    // Find EMP and update it
    Emp.findByIdAndUpdate(req.params.id, {
        age: age + 1
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Emp not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.id
        });
    });
};



// var ip =    req.headers['x-forwarded-for'] ||
// req.connection.remoteAddress ||
// req.socket.remoteAddress ||
// req.connection.socket.remoteAddress;
// if (ip.substr(0, 7) == "::ffff:") {
// ip = ip.substr(7)
// }
// console.log(req.connection.remoteAddress);
// console.log("client IP is ********************* " + ip);