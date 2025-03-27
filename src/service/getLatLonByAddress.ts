import axios from 'axios';
import { env } from "@/env";
import { GeocodeError } from '@/error/geocode.error';

interface LatLon {
  lat: string;
  lon: string;
}

interface GeocodeResponse {
  status: string;
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}


export async function GetLatLonByAddress(address: string): Promise<LatLon> {
  const API_KEY = env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

  const response = await axios.get<GeocodeResponse>(url);
  const data = response.data;

  if (data.status === 'OK') {
    const result = data.results[0];
    const lat = result.geometry.location.lat.toString();
    const lon = result.geometry.location.lng.toString();
    return { lat, lon };
  }

  throw new GeocodeError('Endereço não encontrado');
}
