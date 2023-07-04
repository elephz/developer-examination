const express = require("express");
const router = express.Router();
const { list, create, read, update} = require("../controllers/item");

router.get("/get_item", list);
router.get("/get_item_by_id/:_id", read);
router.post("/insert_item", create);
router.post("/update_item", update);


module.exports = router;
