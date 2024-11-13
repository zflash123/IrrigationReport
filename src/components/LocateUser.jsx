import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { toast } from "react-toastify";
import L from 'leaflet';

export default function LocateUser({changeCoordinate}) {
  const map = useMap();
  map.attributionControl.setPrefix('');
  useEffect(() => {
    map.locate({setView: true});
  }, [])

  map.on('locationfound', function(e) {
    const latitude = e.latitude;
    const longitude = e.longitude;
    changeCoordinate(latitude, longitude);
    var userPoint = new L.Circle([latitude, longitude], {
      color: 'white',
      fillColor: 'blue',
      fillOpacity: 1,
      radius: 2,
    })
    var circleAround = new L.Circle([latitude, longitude], {
      stroke: false,
      fillColor: '#00aaff',
      fillOpacity: 0.35,
      radius: 7,
    })
    circleAround.addTo(map);
    userPoint.addTo(map);
  });
  map.on('locationerror', function() {
    toast.error("Mohon izinkan akses ke lokasi", {autoClose: 10000})
  })
  return;
}