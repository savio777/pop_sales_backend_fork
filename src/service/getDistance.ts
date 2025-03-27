import { getDistance as Getdistance } from 'geolib';

function getDistance(
  { address1, address2 }: {
    address1: { lat: string, lon: string };
    address2: { lat: string, lon: string };
  }
): number {
  const latitude1 = parseFloat(address1.lat);
  const longitude1 = parseFloat(address1.lon);
  const latitude2 = parseFloat(address2.lat);
  const longitude2 = parseFloat(address2.lon);

  return Getdistance(
    { latitude: latitude1, longitude: longitude1 },
    { latitude: latitude2, longitude: longitude2 }
  ); 
}

//como usar
// const distancia = getDistance({
//   address1: { lat: "-23.55052", lon: "-46.633308" },
//   address2: { lat: "-22.906847", lon: "-43.172897" }
// });

// console.log(`Distância: ${distancia} metros`); 
