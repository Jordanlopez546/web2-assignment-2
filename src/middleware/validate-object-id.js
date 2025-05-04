const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    return res.status(400).json({
      message: "Student ID is required"
    })
  }

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({
      message: "Invalid student ID format"
    })
  }

  next();
}