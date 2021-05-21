//step 1: import express and create an instance
const express = require("express");
const mongoose = require("mongoose");

const fs = require("fs");
const router = express.Router();
const FoodModel = require("../models/food");

const folderPath = `${__dirname}/data`;

router.get("/foods", (req, res) => {
  fs.readFile(`${folderPath}/product.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const dataFromFile = JSON.parse(data);
      console.log(dataFromFile);
      res.send({ results: dataFromFile });
    }
  });
});

router.get("/cartData", (req, res) => {
  FoodModel.find({}, { __v: 0 }, function (err, data) {
    if (err) {
      console.log("err", err);
      res.send(400).send({
        message: err,
      });
    } else {
      res.send({ results: data });
    }
  });
});

router.post("/addItems", (req, res) => {
  const foodData = req.body;
  console.log(foodData);
  const foodItem = new FoodModel(req.body);
  foodItem.save(function (err) {
    if (err) {
      console.log("err", err);
      res.status(400).send({
        message: err,
      });
    } else {
      //get db_id for remove item
      FoodModel.find({}, { __v: 0 }, function (err, data) {
        if (err) {
          console.log("err", err);
          res.send(400).send({
            message: err,
          });
        } else {
          res.send({ results: data });
        }
      });
    }
  });
});

router.delete("/deleteFoodItem", function (req, res) {
  const foodItemId = req.body._id;
  FoodModel.remove({ _id: foodItemId }, function (err) {
    if (err) {
      console.log("err", err);
      res.status(400).send({
        message: err,
      });
    } else {
      res.send({ result: "Food Item removed successfully" });
    }
  });
});

router.post("/clear", (req, res) => {
  const orgData = [];

  mongoose.connection.dropCollection("FoodItems", function (err, result) {
    console.log("Collection droped");
    res.send("deleted succesfully");
  });
});

//step 3 : export Router
module.exports = router;
