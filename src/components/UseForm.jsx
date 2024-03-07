import { Cookies } from "react-cookie";
import { toast } from 'react-toastify';

function useForm({ changeCount }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = toast.loading("Mohon tunggu sebentar...", {
      position: "top-center"
    });

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});
    const cookies = new Cookies();
    fetch(finalFormEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+cookies.get('user_session')
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return null;
      })
      .then(() => {
        toast.update(id, { render: "Data Laporanmu Berhasil Terkirim", type: "success", isLoading: false, autoClose: 4000 });
      })
      .catch((err) => {
        toast.update(id, { render: "Data Laporanmu Gagal Terkirim", type: "error", isLoading: false, autoClose: 4000 });
        console.log(err.toString());
      });
    changeCount(1);
  };

  return { handleSubmit };
}

export default useForm;