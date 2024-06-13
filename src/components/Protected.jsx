import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingPopUp from "./LoadingPopUp";

export default function Protected() {
  const [statusCode, setStatusCode] = useState("");
  useEffect(() => {
    const cookies = new Cookies();
    fetch(`http://laporirigasi.my.id/api/check-valid-cookie`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        setStatusCode(res.status);
        return null;
      });
  }, []);
  useEffect(()=>{
    if(statusCode===403){
      toast.error("Harap Login terlebih dahulu");
    }
  }, [statusCode])
  if(statusCode===403){
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  } else if(statusCode===200){
    return <Outlet/>;
  } else if(statusCode===500){
    return <h1>500 Internal Server Error</h1>
  } else if(statusCode===""){
    return <LoadingPopUp/>
  }else{
    return <h1>Terdapat error dengan status code: {statusCode}</h1>
  }
}