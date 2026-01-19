import express from "express";
import  {Forgetpsd, login}  from '../../auth_controller/auth_controller.js'

const router = express.Router()
router.post('/login', login)
router.put('/forgetpsd',Forgetpsd)

// module.exports=router
export default router;