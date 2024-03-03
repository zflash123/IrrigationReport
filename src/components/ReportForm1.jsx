import useForm from "./UseForm";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/report";

const ReportForm1 = ({count, changeCount, changeLevel1, changeNote1, segmentId1}) => {
  const { handleSubmit, status, message } = useForm({
    changeCount
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
    <>
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak 1</h6>
      <input type="hidden" name="segment_id1" value={segmentId1}></input>
      <input type="file" id="myFile" name="photo"></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="level1" value="Ringan" onChange={e => changeLevel1(e.target.value)}></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="level1" value="Sedang" onChange={e => changeLevel1(e.target.value)}></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="level1" value="Berat" onChange={e => changeLevel1(e.target.value)}></input>
      <label htmlFor="parah" id="dmg-radio">berat</label>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note1" rows="5" onChange={e => changeNote1(e.target.value)}></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
    </form>
    <button onClick={() => {changeCount(count+1);}}>Laporkan lainnya</button>
    </>
  );
};

export default ReportForm1;