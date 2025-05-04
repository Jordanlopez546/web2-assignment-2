const Student = require("../models/Student")

const createStudent = async (req, res) => {
  try {
    const {email, name, course, age} = req.body;

    if (!email || !name || !course || !age) {
      return res.status(400).json({
        message: "Please fill up the inputs"
      })
    }

    const existingStudent = await Student.findOne({
      email
    })

    if (existingStudent) {
      return res.status(409).json({
        message: `Student with the email ${email} already exists.`
      })
    }

    const student = await Student.create({
      email,
      name,
      course,
      age
    })

    return res.status(201).json(student)
  } catch (error) {
    return res.status(500).json({message: error.message })
  }
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json(students)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      })
    }

    return res.status(200).json(student)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const {name, course, email, age} = req.body;

    const student = await Student.findByIdAndUpdate(studentId, {
      name,
      age, 
      email,
      course
    }, {
      new: true
    })

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      })
    }

    return res.status(200).json(student)
  } catch (error) {
    if (error.code === 11000 || error.message.includes("E11000")) {
      return res.status(409).json({
        message: `Student with the email already exists.`
      })
    }
    return res.status(500).json({
      message: error.message
    })
  }
}

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findByIdAndDelete(studentId)

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      })
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  deleteStudent,
  updateStudent,
  createStudent,
  getAllStudents,
  getStudentById
}