const Users = require('../Model/userModel');
const getAllUser = async (req,res)=>{
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const getUser = async (req,res)=>{
    try{
        const user = await Users.findOne({email: req.params.email});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const createUser = async (req,res)=>{
    const {name,email,password,role} = req.body;
    const user = new Users({name,email,password,role});
    try{
        const newUser = await user.save();
        res.status(201).json({newUser});
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const editUser = async (req,res)=>{
    try{
        const email = req.params.email;
        const {name,password,role} = req.body;
        const updatedUser = await Users.findOneAndUpdate({email}, {name,password,role}, {new: true});   
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

const deleteUser = async (req,res)=>{
    try{
        const _email = req.params.email;
        const deletedUser = await Users.deleteOne({email:_email});
        res.status(200).json({message: 'User deleted successfully',user: deletedUser});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllUser, getUser, createUser, editUser, deleteUser};