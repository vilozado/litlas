import './Map.css';
import 'leaflet/dist/leaflet.css';
import type { Feature } from 'geojson';
import { MapContainer, GeoJSON } from 'react-leaflet';
import worldGeoJSON from '../../assets/worldGeoJSON.json';
import countryLiteratureMap from '../../countryLiteratureMap';


export default function Map() {
  const getCountryStyle = (feature?: Feature) => {
    const countryName = feature?.properties?.name;
    const isMapped = countryName && countryLiteratureMap[countryName];
    return {
      fillColor: isMapped ? '#1F5E57' : '#9d9f9f',
      fillOpacity: 0.8,
      color: '#f5f5f5',
      weight: 1
    }
  }

  return (
    <div>
      <MapContainer className='map-container' center={[30, 10]} zoom={2} scrollWheelZoom={false} zoomControl={false} keyboard={true} style={{ height: '600px', width: '100%', backgroundColor: '#F8F7F4' }}>
        <GeoJSON data={worldGeoJSON as any} style={getCountryStyle} />
      </MapContainer>
    </div>
  )
}
