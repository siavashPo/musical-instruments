import express from "express";
import {home} from "../controllers/general";
import SearchController from "../controllers/search";
import {validate} from "express-jsonschema";
import {searchSchema as schema} from "../validators/search";

const router = express.Router()

router.get('/', home)
router.post('/', validate(schema), SearchController.search)

export default router