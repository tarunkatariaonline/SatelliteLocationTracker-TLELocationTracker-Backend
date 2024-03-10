// this file consist some functions which we have applied on index.js file

// const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");

// const tle = `ISS (ZARYA)             
// 1 25544U 98067A   24070.00668122  .00013507  00000+0  24605-3 0  9993
// 2 25544  51.6414  86.9442 0006208 348.6858  50.3911 15.49777058443175`;



// const latLonObj = getLatLngObj(tle);
// console.log(latLonObj);


// const date1 = new Date();
// const satellites = await Satellite.find();

// if(satellites.length===0){
//     let data=  await getAllSateliteData()
 
//     // const newSatellite = await Satellite.create(...data);

//  return res.json(newSatellite);
// }

// const minDiff = minuteDiffrance(date1,satellites[0].createdAt);


// if(minDiff>180){
//     await Satellite.deleteMany();
//   let data=  await getAllSateliteData()
 
//  const newSatellite = await Satellite.create(...data);

//  return res.json(newSatellite);
// }



// console.log("Difference in minutes:", minDiff);
// console.log(satellites)



//   res.json(satellites)