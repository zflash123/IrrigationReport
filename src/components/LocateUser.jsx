import { useMap } from "react-leaflet";

export default function LocateUser() {
  const map = useMap();
  map.attributionControl.setPrefix('');
  map.zoomControl.remove();
  map.locate({setView: true, maxZoom: 18});

  return;
}