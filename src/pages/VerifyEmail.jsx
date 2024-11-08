import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const [statusCode, setStatusCode] = useState("");
  let { id } = useParams();
  let { hash } = useParams();

  useEffect(() => {
    const cookies = new Cookies();
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/email/verify/${id}/${hash}`, {
      headers: {Authorization: 'Bearer '+cookies.get('user_session')}
    })
      .then((res) => {
        setStatusCode(res.status);
        return null;
      });
  }, []);
  useEffect(()=>{
    if(statusCode!=""){
      if(statusCode===200){
        toast.success("Verifikasi email berhasil")
        console.log("statusCode = "+statusCode)
        return;
      }else{
        toast.error("Verifikasi email gagal")
        return;
      }
    }
  }, [statusCode])
  if(statusCode!=""){
    if(statusCode===200){
      return (
        <>
          <Navigate to="/laporkan" />
        </>
      );
    }else{
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    }
  }
}