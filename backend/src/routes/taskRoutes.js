const express = require("express");
const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { taskValidation } = require("../utils/validators");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.use(protect);

router.post("/", taskValidation, validate, createTask);
router.get("/", getTasks);
router.put("/:id", taskValidation, validate, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
