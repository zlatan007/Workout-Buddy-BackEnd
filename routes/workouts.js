const express = require("express");
const mongoose = require("mongoose");

const workoutModel = require("../models/Workout");
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

router.get("/", getWorkouts);

router.post("/", createWorkout);

router.get("/:id", getWorkoutById);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
