import useForm from "./UseForm";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/report"; // TODO - update to the correct endpoint

const ReportForm = ({segmentId}) => {
  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useForm({
    additionalData,
  });

  if (status === "success") {
    return (
      <>
        <div>Thank you!</div>
        <div>{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak</h6>
      <input type="hidden" name="segment_id" value={segmentId}></input>
      <input type="file" id="myFile" name="photo"></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="damage_severity" value="Ringan"></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="damage_severity" value="Sedang"></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="damage_severity" value="Berat"></input>
      <label htmlFor="parah" id="dmg-radio">berat</label>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note" rows="5"></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
    </form>
  );
};

export default ReportForm;