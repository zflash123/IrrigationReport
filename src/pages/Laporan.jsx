import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import TopNavBar from "../components/TopNavBar";
import BottomBar from "../components/BottomBar";
import LocateUser from '../components/LocateUser';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

export default function Laporan(){
	const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpActive, setPopUpActive] = useState(false);
	const [segments, setSegments] = useState([]);
	const [segment, setSegment] = useState();

	function showPopUp() {
		setPopUpActive(true);
	}
	function hidePopUp() {
		setPopUpActive(false);
	}
	function changeSegments(data) {
    setSegments(data);
    changeIsLoading(false);
  }
	function changeSegment(data) {
		setSegment(data);
	}
	function changeCoordinate(latitude, longitude) {
    setLatitude(latitude);
    setLongitude(longitude);
  }
	function changeIsLoading(value) {
    if(isLoading!=value){
      setIsLoading(value);
    }
  }
	return(
		<div className="page">
			<TopNavBar />
			<div className="leaflet-container">
				<MapContainer
					className="full-height-map"
					center={[-7.87074500384173, 112.52647830035404]}
					zoom={18}
					minZoom={18}
					maxZoom={19}
					maxBounds={[[-85.06, -180], [85.06, 180]]}
					scrollWheelZoom={true}>
					<TileLayer
						url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga"
					/>
					<LocateUser changeCoordinate={changeCoordinate}/>
					<Segments segments={segments} latitude={latitude} longitude={longitude} showPopUp={showPopUp} changeSegments={changeSegments} changeSegment={changeSegment} changeIsLoading={changeIsLoading}/>
				</MapContainer>
			</div>
			{isPopUpActive?<ShowPopUp segment={segment} hidePopUp={hidePopUp}/>:<></>}
			<BottomBar activeIcon={"laporan"}/>
		</div>
	);
}

function Segments({segments, showPopUp, latitude, longitude, changeIsLoading, changeSegments, changeSegment}) {
  const map = useMap();
  
	useEffect(() => {
    changeIsLoading(true);
    const cookies = new Cookies();
    fetch('http://127.0.0.1:8000/api/segments-by-user-id?' + new URLSearchParams({
      lat: `${latitude}`,
      long: `${longitude}`,
    }), {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        changeSegments(data);
      })
      .catch((err) => {
        changeIsLoading(false);
        toast.error("Gagal mengambil data");
        console.log(err.toString());
      });
  }, [latitude, longitude]);

	segments.map((segment) => {
		const geojson = JSON.parse(segment.geojson)
		var pointA = new L.LatLng(geojson.coordinates[0][1], geojson.coordinates[0][0]);
		var pointB = new L.LatLng(geojson.coordinates[1][1], geojson.coordinates[1][0]);
		var pointList = [pointA, pointB];
	
		var segmentLine = new L.Polyline(pointList, {
			color: 'aqua',
			weight: 5,
			opacity: 0.5,
			smoothFactor: 1
		});
		segmentLine.on("click", function() {
			changeSegment(segment);
			showPopUp();
		})
		segmentLine.addTo(map);
	})
}
function ShowPopUp({segment, hidePopUp}) {
	return(
		<>
			<div className="popup-bg" onClick={() => hidePopUp()}>
			</div>
			<div className="popup">
				<h3 className="h-info">Informasi Laporan</h3>
				<h5>Nama Irigasi: {segment.irrigation}</h5>
				<h5>Saluran: {segment.canal}</h5>
				<h5>Status: {segment.status}</h5>
				<h5>Tingkat Kerusakan: {segment.level}</h5>
			</div>
		</>
	)
}