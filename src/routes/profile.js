import express from "express";
import ProfileController from '../controllers/profile'
import acl from "../middleware/acl";
import {validate} from "express-jsonschema";
import {profileSchema as schema} from '../validators/profile'

const router = express.Router()

router.get('/', acl('USER'), ProfileController.get)
router.put('/', acl('USER'), validate(schema), ProfileController.update.bind(ProfileController))

export default router