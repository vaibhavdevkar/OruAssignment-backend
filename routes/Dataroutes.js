const express = require("express")
const Data = require("../models/Datamodels")
const mongoose  = require("mongoose")
const { getDataall, getDatamax, getdatabm5, getDataStartmemail, getDatabmwaudimer, getDatatoptencities } = require("../Controller/controller")

const router = express()

router.get("/api/data", getDataall)
router.get('/api/bm5', getdatabm5);
router.get("/api/max", getDatamax);
router.get('/api/start-m-email', getDataStartmemail );
router.get('/api/bmwaudimer', getDatabmwaudimer);
router.get("/api/top-ten-cities", getDatatoptencities);

module.exports = router;