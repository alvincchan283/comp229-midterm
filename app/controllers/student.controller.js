const { Student, StudentSchema } = require('../models/student.model');
const requiredAttributes = Object.keys(StudentSchema.paths).filter(key => StudentSchema.paths[key].isRequired);

exports.createStudent = async (req, res) => {
    // Check whether all the required attributes are included in the request.
    for (let requiredAttr of requiredAttributes) {
        if (!req.body[requiredAttr]) {
            return res.status(400).send({
                message: `Student\'s ${requiredAttr} cannot be empty.`
            });
        }
    }

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        major: req.body.major
    });

    try {
        await student.save();  
    } catch (err) {
        return res.status(500).send(err);
    }

    res.status(200).send(student);
}

exports.getAllStudents = async (req, res) => {
    let students;
    try {
        students = await Student.find({});
    } catch (err) {
        return res.status(500).send({ message: 'Error occurred when getting student from database.' })
    }

    res.status(200).send(students);
}

exports.getStudentById = async (req, res) => {
    // Check whether a student ID is provided for the request.
    const studentId = req.params.id;
    if (!studentId) res.status(400).send({ message: 'No Student ID supplied.'});

    let student;
    try {
        student = await Student.findById(studentId);
    } catch (err) {
        return res.status(500).send({ message: 'Error occurred when getting student from database.' })
    }

    if (!student) return res.status(404).send({ message: 'Student not found.'});
    res.status(200).send(student);
}

exports.updateStudent = async (req, res) => {
    // Check whether a student ID is provided for the request.
    const studentId = req.params.id;
    if (!studentId) return res.status(400).send({ message: 'No Student ID supplied.'});

    // Check whether all the required attributes are included in the request.
    for (let requiredAttr of requiredAttributes) {
        if (!req.body[requiredAttr]) {
            return res.status(400).send({
                message: `Student\'s ${requiredAttr} cannot be empty.`
            });
        }
    }

    let student;
    try {
        student = await Student.findByIdAndUpdate(studentId, {
            $set: {
                name: req.body.name,
                age: req.body.age,
                major: req.body.major
            }
        }, { new: true });
    } catch (err) {
        return res.status(500).send({ message: 'Error occurred when updating student from database.' })
    }

    if (!student) return res.status(404).send({ message: 'Student not found.'});
    res.status(200).send(student);
}

exports.deleteStudent = async (req, res) => {
    // Check whether a student ID is provided for the request.
    const studentId = req.params.id;
    if (!studentId) return res.status(400).send({ message: 'No Student ID supplied.'});

    let student;
    try {
        student = await Student.findByIdAndDelete(studentId);
    } catch (err) {
        return res.status(500).send({ message: 'Error occurred when deleting student from database.' })
    }

    if (!student) return res.status(404).send({ message: 'Student not found.'});
    res.status(200).send({ message: 'The student has been deleted.' });
}
