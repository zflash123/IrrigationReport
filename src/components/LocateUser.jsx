import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { toast } from "react-toastify";

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
  });
  map.on('locationerror', function() {
    toast.error("Mohon izinkan akses ke lokasi", {autoClose: 10000})
  })
  useEffect(() => {
  }, [])
  return;
}