import { useState } from "react";
import { Cookies } from "react-cookie";

function useForm({ changeCount }) {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    changeCount(1);

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
        const data = response.json();
        console.log(data);
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return null;
      })
      .then(() => {
        setMessage("We'll be in touch soon.");
        setStatus('success');
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
      });
  };

  return { handleSubmit, status, message };
}

export default useForm;