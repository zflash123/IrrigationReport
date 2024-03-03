import useForm from "./UseForm";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/report";

const ReportForm3 = ({segmentId, count, changeCount, segmentId1, level1, note1, segmentId2, level2, note2}) => {
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
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak3</h6>
      <input type="hidden" name="segment_id1" value={segmentId1}></input>
      <input type="hidden" name="level1" value={level1}></input>
      <input type="hidden" name="note1" value={note1}></input>
      <input type="hidden" name="segment_id2" value={segmentId2}></input>
      <input type="hidden" name="level2" value={level2}></input>
      <input type="hidden" name="note2" value={note2}></input>
      <input type="hidden" name="segment_id3" value={segmentId}></input>
      <input type="file" id="myFile" name="photo"></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="level3" value="Ringan"></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="level3" value="Sedang"></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="level3" value="Berat"></input>
      <label htmlFor="parah" id="dmg-radio">berat</label>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note3" rows="5"></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
      <button onClick={() => {changeCount(count+1);}}>Laporkan lainnya</button>
    </form>
  );
};

export default ReportForm3;