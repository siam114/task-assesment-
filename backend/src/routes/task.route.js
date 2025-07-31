const express = require("express");
const { body, param, query } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.request");
const taskController = require("../controllers/task.controller");

const router = express.Router();
router.use(authMiddleware);

router.post(
  "/",
  [
    body("category").notEmpty().withMessage("Category is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status")
      .optional()
      .isIn(["PENDING", "IN_PROGRESS", "COLLABORATIVE", "DONE"])
      .withMessage("Invalid status"),
    body("endDate")
      .isISO8601()
      .toDate()
      .withMessage("End Date must be a valid date"),
    validate,
  ],
  taskController.createTask
);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("category").optional().notEmpty(),
    body("description").optional().notEmpty(),
    body("status")
      .optional()
      .isIn(["PENDING", "IN_PROGRESS", "COLLABORATIVE", "DONE"])
      .withMessage("Invalid status"),
    body("endDate").optional().isISO8601().toDate(),
    validate,
  ],
  taskController.updateTask
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task ID"), validate],
  taskController.deleteTask
);

router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["PENDING", "IN_PROGRESS", "COLLABORATIVE", "DONE"]),
    query("category").optional().isString(),
    query("startDate").optional().isISO8601().toDate(),
    query("endDate").optional().isISO8601().toDate(),
    validate,
  ],
  taskController.getTasks
);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task ID"), validate],
  taskController.getTaskById
);

module.exports = router;
