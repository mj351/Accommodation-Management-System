const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('room');
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new student
router.post('/', async (req, res) => {
    const { firstName, lastName, studentId } = req.body;

    try {
        const newStudent = new Student({
            firstName,
            lastName,
            studentId,
        });

        const student = await newStudent.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { firstName, lastName, studentId } = req.body;

    const studentFields = { firstName, lastName, studentId };

    try {
        let student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        student = await Student.findByIdAndUpdate(req.params.id, { $set: studentFields }, { new: true });

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        let student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        await Student.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
