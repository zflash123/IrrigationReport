import useForm from "./UseForm";

const API_URL = import.meta.env.VITE_API_URL;
const FORM_ENDPOINT = `${API_URL}/api/report`;

const ReportForm1 = ({count, segmentId1, level1, image1, changeCount, changeImage1, changeLevel1, changeNote1}) => {
  const { handleSubmit } = useForm({
    changeCount
  });

  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(image) {
      changeImage1(image.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <>
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h3 className="h-info">Informasi Laporan 1</h3>
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak</h6>
      <input type="hidden" name="segment_id1" value={segmentId1}></input>
      <input type="file" className="r-img" accept="image/*" title="Pilih file" onChange={(e)=>handleImage(e)} required></input>
      <input type="hidden" name="image1" value={image1}></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="level1" value="Ringan" onChange={e => changeLevel1(e.target.value)} required></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="level1" value="Sedang" onChange={e => changeLevel1(e.target.value)} required></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="level1" value="Berat" onChange={e => changeLevel1(e.target.value)} required></input>
      <label htmlFor="parah" id="dmg-radio3">berat</label>
      <input type="hidden" name="level1" value={level1}></input>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note1" rows="5" onChange={e => changeNote1(e.target.value)}></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
    </form>
    <div className="div-report-other">
      <button className="report-other" onClick={() => {changeCount(count+1);}}>Laporkan lainnya</button>
    </div>
    </>
  );
};

export default ReportForm1;