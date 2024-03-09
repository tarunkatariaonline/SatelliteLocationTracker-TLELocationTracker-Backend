let alldata =[];
const tleData = `ISS (ZARYA)             
1 25544U 98067A   24069.04009860  .00014426  00000+0  26242-3 0  9993
2 25544  51.6424  91.7331 0006291 345.4283  57.3819 15.49752749443024
ISS DEB [SPX-28 IPA FSE]
1 57212U 98067VP  24068.30146823  .00103818  00000+0  63726-3 0  9991
2 57212  51.6297  74.8243 0004787  25.9463 334.1776 15.76439454 40117
ISS DEB                 
1 58174U 98067WA  24068.75749315  .00366733  00000+0  14393-2 0  9995
2 58174  51.6286  80.1330 0007226  47.9589 312.2029 15.85372997 21131
ISS DEB                 
1 58229U 98067WC  24068.75079814  .00068407  00000+0  70380-3 0  9992
2 58229  51.6348  86.9053 0003167  21.8075 338.3054 15.64222061 19832
BEAK                    
1 58612U 98067WD  24068.77868117  .00070114  00000+0  80658-3 0  9999
2 58612  51.6365  89.3472 0004405 358.7491   1.3490 15.61343255 12750
CLARK SAT-1 (AMBITIOUS) 
1 58613U 98067WE  24068.89524168  .00202002  00000+0  14732-2 0  9990
2 58613  51.6328  86.3577 0009172  25.9076 334.2379 15.72071585 12773`;

const tleDataArray = [];

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

for(let i =0;i<tleDataArray.length;i++){
    // console.log(tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2 );
    
    const tle = tleDataArray[i].satelliteName+'\n' +tleDataArray[i].line1+'\n'+tleDataArray[i].line2
    const optionalTimestampMS = 1502342329860;
const latLonObj = getLatLngObj(tle, optionalTimestampMS);
var d = TLE.parse( tleDataArray[i].satelliteName+'\n'+tleDataArray[i].line1+'\n'+tleDataArray[i].line2 )
const obj = {...d,...latLonObj}
// console.log(obj)
alldata.push(obj);
// console.log(latLonObj)

}


console.log(alldata)



console.log(d)
console.log(tleDataArray);
