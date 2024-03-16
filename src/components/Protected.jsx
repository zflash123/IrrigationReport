import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Protected() {
  const [statusCode, setStatusCode] = useState("");
  useEffect(() => {
    const cookies = new Cookies();
    fetch(`http://127.0.0.1:8000/api/check-valid-cookie`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        if(res.status===403){
          setStatusCode(res.status)
        }
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
  }
  return <Outlet/>;
}