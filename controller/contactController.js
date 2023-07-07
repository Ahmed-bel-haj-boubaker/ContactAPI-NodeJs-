const Contact = require ('../models/contactModels');

const asyncHandler = require('express-async-handler');

const getContact = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
});

const getOneContact =asyncHandler( async (req,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if (!contacts ) {
        res.status(404);
        throw new Error ('the contact not found');
    }
    res.status(200).json(contacts)
});

const addContact = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name , phone , email} = req.body;

    if(! name || !phone || !email){
        res.status(400);
        throw new Error ('all field is mandatory');
    }
    const contacts = await Contact.create({
        name,email,phone,
        user_id:req.user.id
    })
    res.status(200).json(contacts)
});
 
const updateContact = asyncHandler( async (req,res)=>{
    let data = req.params.id;
    const contacts = await Contact.findById(data);
    if(!contacts){
        res.status(400)
        throw new Error ('Contact is not found !')
    }
     const updatedContact = await Contact.findByIdAndUpdate(
        data,
        req.body,
        {new : true}
     );
    res.status(201).json(updatedContact)
});

const deleteContact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(400)
        throw new Error ('Contact is not found !')
    }
    const deletedC = await Contact.findByIdAndDelete(
        req.params.id,
        req.body
    )
    // or 
    // await Contact.remove();

    res.status(201).json(deletedC)
});














module.exports = {getContact,getOneContact, addContact , deleteContact , updateContact}