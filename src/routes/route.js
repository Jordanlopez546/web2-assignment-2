const {Router} = require("express");
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/student");
const validateObjectId = require("../middleware/validate-object-id");

const router = Router();

router.get("/", getAllStudents);
router.get("/:studentId", validateObjectId, getStudentById);

router.post("/", createStudent);
router.patch("/:studentId", validateObjectId, updateStudent);
router.delete("/:studentId", validateObjectId, deleteStudent)

module.exports = router