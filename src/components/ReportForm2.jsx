import useForm from "./UseForm";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/report";

const ReportForm2 = ({segmentId, count, changeCount, segmentId1, level1, note1, image1, image2, changeImage2, changeLevel2, changeNote2}) => {
  const { handleSubmit } = useForm({
    changeCount
  });
  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(image) {
      changeImage2(image.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak2</h6>
      <input type="hidden" name="segment_id1" value={segmentId1}></input>
      <input type="hidden" name="level1" value={level1}></input>
      <input type="hidden" name="note1" value={note1}></input>
      <input type="hidden" name="image1" value={image1}></input>
      <input type="hidden" name="segment_id2" value={segmentId}></input>
      <input type="file" id="myFile" name="photo2" accept="image/*" onChange={(e)=>handleImage(e)}></input>
      <input type="hidden" name="image2" value={image2}></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="level2" value="Ringan" onChange={e => changeLevel2(e.target.value)}></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="level2" value="Sedang" onChange={e => changeLevel2(e.target.value)}></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="level2" value="Berat" onChange={e => changeLevel2(e.target.value)}></input>
      <label htmlFor="parah" id="dmg-radio">berat</label>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note2" rows="5" onChange={e => changeNote2(e.target.value)}></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
      <button onClick={() => {changeCount(count+1);}}>Laporkan lainnya</button>
    </form>
  );
};

export default ReportForm2;