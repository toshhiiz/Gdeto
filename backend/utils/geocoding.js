// City coordinates mapping for fallback
const cityCoordinates = {
  'Астана': [51.1694, 71.4702],
  'Nur-Sultan': [51.1694, 71.4702],
  'Алматы': [43.2381, 76.9453],
  'Almaty': [43.2381, 76.9453],
  'Шымкент': [42.2977, 69.6047],
  'Shymkent': [42.2977, 69.6047],
  'Караганда': [49.8047, 73.1033],
  'Karaganda': [49.8047, 73.1033],
  'Павлодар': [52.2835, 76.9367],
  'Pavlodar': [52.2835, 76.9367],
  'Усть-Каменогорск': [49.9961, 82.6053],
  'Osu': [49.9961, 82.6053],
  'Актау': [43.6453, 51.1694],
  'Актобе': [50.2839, 57.1700],
  'Атырау': [43.7033, 51.3747],
  'Костанай': [53.2142, 63.6318],
  'Практический': [50.4501, 80.2693],
  'Семей': [50.4101, 80.2534],
};

// Geocode address to coordinates using OpenStreetMap Nominatim API
async function geocodeAddress(address, city) {
  try {
    // Format the full address for better geocoding accuracy
    const fullAddress = `${address}, ${city}, Kazakhstan`;
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&limit=1&countrycodes=KZ`,
      {
        headers: {
          'User-Agent': 'GdetoApp/1.0' // Nominatim requires User-Agent header
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding service error');
    }

    const results = await response.json();
    
    if (results.length > 0) {
      const { lat, lon } = results[0];
      const coords = [parseFloat(lat), parseFloat(lon)];
      console.log(`✓ Geocoded "${address}, ${city}" to [${coords[0]}, ${coords[1]}]`);
      return coords;
    }
    
    // If no results found, try to geocode just the city
    console.warn(`Could not geocode specific address "${address}", using city: ${city}`);
    const cityResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}, Kazakhstan&format=json&limit=1&countrycodes=KZ`,
      {
        headers: {
          'User-Agent': 'GdetoApp/1.0'
        }
      }
    );

    const cityResults = await cityResponse.json();
    if (cityResults.length > 0) {
      const { lat, lon } = cityResults[0];
      const coords = [parseFloat(lat), parseFloat(lon)];
      console.log(`✓ Geocoded city "${city}" to [${coords[0]}, ${coords[1]}]`);
      return coords;
    }

    // Use predefined city coordinates if available
    if (cityCoordinates[city]) {
      console.warn(`Using predefined coordinates for city: ${city}`);
      return cityCoordinates[city];
    }

    // Default to Astana center if geocoding completely fails
    console.warn(`Geocoding failed for "${city}", using Astana as default`);
    return [51.1694, 71.4702];
  } catch (error) {
    console.error('Geocoding error:', error.message);
    // Try to use predefined city coordinates
    if (cityCoordinates[city]) {
      console.warn(`Using predefined coordinates for city: ${city} (error fallback)`);
      return cityCoordinates[city];
    }
    // Return Astana coordinates as final fallback
    return [51.1694, 71.4702];
  }
}

module.exports = { geocodeAddress };
