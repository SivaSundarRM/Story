const axios = require('axios');
const HttpError = require('../models/http-error');
require('dotenv').config(); // Load environment variables

const API_KEY = process.env.OPENCAGE_API_KEY;

async function getCoordsForAddress(address) {
  let response;

  try {
    response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,
        key: API_KEY,
        language: 'en',
        limit: 1
      }
    });
  } catch (err) {
    console.error('OpenCage request failed:', err.message || err);
    throw new HttpError('Failed to connect to geocoding service.', 500);
  }

  const data = response.data;

  if (!data || data.results.length === 0) {
    console.error('Geocoding failed with response:', data);
    throw new HttpError('Could not find location for the specified address.', 422);
  }

  const coordinates = data.results[0].geometry;

  if (!coordinates || coordinates.lat == null || coordinates.lng == null) {
    throw new HttpError('Invalid location data received.', 422);
  }

  return {
    lat: coordinates.lat,
    lng: coordinates.lng
  };
}

module.exports = getCoordsForAddress;
