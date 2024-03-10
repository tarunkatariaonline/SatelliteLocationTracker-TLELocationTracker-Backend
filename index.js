const axios = require('axios');
const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");
var TLE = require( 'tle' )
const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config({
    path:'./config.env'
})

const app = express()

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    
}))
// console.log(process.env.PORT)

const port = process.env.PORT



mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Connected!'));


  const satelliteSchema = new mongoose.Schema({
    satelliteName: String,
    line1: String,
    line2: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model
const Satellite = mongoose.model('Satellite', satelliteSchema);


async function fetchTLEData() {
    try {
        const response = await axios.get('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle');
        return response.data;
    } catch (error) {
        console.error('Error fetching TLE data:', error);
        return null;
    }
}

const getAllSateliteData  = async()=>{

   const dbSatellites = await Satellite.find();
   if(dbSatellites.length===0){

  
    const tleData = await fetchTLEData();

// const tempData = await fetchTLEData();
// console.log(tempData)
const tleDataArray = [];
const alldata = []

let satelliteName = '';
let line1 = '';
let line2 = '';

const lines = tleData.split('\n');

for (let line of lines) {
    // Skip empty lines and lines that don't start with alphanumeric characters
    if (!line.trim() || !/^[A-Za-z0-9]/.test(line)) {
        continue;
    }
    
    // If line starts with alphanumeric characters, it's a satellite name
    if (satelliteName === '') {
        satelliteName = line.trim();
    } else if (line1 === '') {
        line1 = line.trim();
    } else if (line2 === '') {
        line2 = line.trim();
    }
    
    // If we have all three lines, push the data and reset the variables
    if (satelliteName && line1 && line2) {
        tleDataArray.push({ satelliteName, line1, line2 });
        satelliteName = '';
        line1 = '';
        line2 = '';
    }
}


const satelliteData = await Satellite.create(...tleDataArray);
for(let i =0;i<tleDataArray.length;i++){
    // console.log(tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2 );
    
    const tle = tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2
    const optionalTimestampMS = Date.now();
const latLonObj = getLatLngObj(tle, optionalTimestampMS);
var d = TLE.parse( tleDataArray[i].satelliteName+'\n'+tleDataArray[i].line1+'\n'+tleDataArray[i].line2 )
const obj = {...d,...latLonObj}
// console.log(obj)
alldata.push(obj);
// console.log(latLonObj)

}

return alldata;

   }else{
    
    const minDiff = minuteDiffrance(Date.now(),dbSatellites[0].createdAt);
    if(minDiff>180){
        await Satellite.deleteMany();
        await getAllSateliteData();
    }
    const tleDataArray = dbSatellites;
    let alldata = [];
    for(let i =0;i<tleDataArray.length;i++){
        // console.log(tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2 );
        
        const tle = tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2
        const optionalTimestampMS = Date.now();
    const latLonObj = getLatLngObj(tle, optionalTimestampMS);
    var d = TLE.parse( tleDataArray[i].satelliteName+'\n'+tleDataArray[i].line1+'\n'+tleDataArray[i].line2 )
    const obj = {...d,...latLonObj}
    // console.log(obj)
    alldata.push(obj);
    // console.log(latLonObj)
    
    }
    
    return alldata;
    
   }
}

const minuteDiffrance = (date1,date2)=>{
    const diffInMilliseconds = Math.abs(date2 - date1);
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    return diffInMinutes;
}

app.get('/', async(req, res) => {
    
const satellites = await getAllSateliteData();

 
res.json(satellites);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})