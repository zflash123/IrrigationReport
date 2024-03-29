import { useMap } from "react-leaflet";

export default function LocateUser({changeCoordinate}) {
  const map = useMap();
  map.attributionControl.setPrefix('');
  map.zoomControl.remove();
  map.locate({setView: true});
  map.zoomIn();

  map.on('locationfound', function(e) {
    const latitude = e.latitude;
    const longitude = e.longitude;
    changeCoordinate(latitude, longitude);
  });
  return;
}