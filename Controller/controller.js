const express = require("express")
const Data = require("../models/Datamodels")
const mongoose  = require("mongoose")



const getDataall = async (req, res) => {
    try{
     const data = await Data.find()
     res.status(200).json(data)
    }catch(err){
     console.log(err)
    }
 }

 //1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.

const getdatabm5 = async (req, res) => {
    try {    
      const data = await Data.find({
        $and: [
          { income: { $lt: "$5" } },
          { car: { $in: ["BMW", "Mercedes-Benz"] } }
        ]
      });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // 2. Male Users which have phone price greater than 10,000.


  const getDatamax = async (req, res) => {
    try {
      const phonePrices = await Data.find({
        gender: "Male",
        $expr: { $gt: [{ $toInt: "$phone_price" }, 10000] }
      }).exec();
      res.json(phonePrices);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

  //Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.


  const getDataStartmemail = async (req, res) => {
    try {
      const users = await Data.find({ 
        last_name: /^M/i,
        gender: 'Male',
        email: { $regex: /M/, $options: 'i', $expr: { $gt: [{$strLenCP: '$email'}, 15] } },
        email: { $regex: new RegExp(req.query.last_name, 'i')}
      }).exec();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  

  //Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.


  const getDatabmwaudimer = async (req, res) => {
    try {
      const users = await Data.find({ 
        car: { $in: ["BMW", "Mercedes-Benz", "Audi"] },
        email: { $not: /\d/ }
      })
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

//Show the data of top 10 cities which have the highest number of users and their average income.

const getDatatoptencities = async (req, res) => {
    try{
      const cities = await Data.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 }, users: { $push: { first_name: "$firstName", last_name: "$lastName" } }, totalIncome: { $sum: "$income" } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $group: { _id: null, cities: { $push: { city: "$_id", count: "$count", users: "$users", averageIncome: { $divide: [ "$totalIncome", "$count" ] } } } } }
      ]);
  
      const result = cities[0].cities;
  
      res.json(result);
    }catch(err){
      console.log(err);
      res.status(500).send("Server error");
    }
  };


module.exports = {
    getDataall,
    getDatamax,
    getdatabm5,
    getDataStartmemail,
    getDatabmwaudimer,
    getDatatoptencities 
}



