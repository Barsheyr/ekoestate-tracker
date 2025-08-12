import { Router } from "express";
const router = Router();
import {
  getAllProperty,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  showStats,
} from "../controllers/propertyController.js";
import {
  validatePropertyInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllProperty)
  .post(checkForTestUser, validatePropertyInput, createProperty);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getProperty)
  .patch(
    checkForTestUser,
    validateIdParam,
    validatePropertyInput,
    updateProperty
  )
  .delete(checkForTestUser, validateIdParam, deleteProperty);

export default router;
