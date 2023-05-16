const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//get ALL contacts
const getAllContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contact)
})

//get single Contact
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404);
        throw new Error("Could not Find")
    }
    res.status(200).json(contact)
})

//create contact
const createContact = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body
    if (!name || !phone || !email) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contacts = await Contact.create({
        name,
        phone,
        email
    })
    res.status(200).json(contacts)
})

//update contact
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Could not Find")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.status(200).json(updatedContact);
})

//delete contact
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Could not Find")
    }
    await Contact.findOneAndRemove(req.params.id)
    res.status(200).json({ message: `delete contact ${req.params.id}` })
})

module.exports = {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}