const express = require("express")
const scheduleController = require('../controller/scheduleController')
const router = express.Router()

router.get('/', scheduleController.getAllSchedule)
router.post('/', scheduleController.addNewSchedule)
router.patch('/:id', scheduleController.updateSchedule)
router.delete('/:id', scheduleController.deleteSchedule)




module.exports = router