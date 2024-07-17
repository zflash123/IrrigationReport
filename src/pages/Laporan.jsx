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
					center={[-7.87074500384173, 112.52647830035404]}
					minZoom={19}
					maxZoom={22}
					scrollWheelZoom={true}>
					<TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={22}
            subdomains={['mt0','mt1','mt2','mt3']}
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
    fetch('https://laporirigasi.my.id/api/segments-by-user-id?' + new URLSearchParams({
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
			color: 'blue',
			weight: 6,
			opacity: 1,
			smoothFactor: 1,
			className: 'segment-line'
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