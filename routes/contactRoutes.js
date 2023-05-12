const express = require("express");
const router = express.Router();
const { getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact } = require("../Controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getAllContact)

router.route("/").post(createContact)

router.route("/:id").get(getContact)

router.route("/:id").patch(updateContact)

router.route("/:id").delete(deleteContact)

module.exports = router;