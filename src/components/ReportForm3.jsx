import useForm from "./UseForm";
import { useState } from "react";

const FORM_ENDPOINT = "http://127.0.0.1:8000/api/report";

const ReportForm3 = ({segmentId, changeCount, segmentId1, image1, level1, note1, segmentId2, image2, level2, note2, image3, changeImage3}) => {
  const { handleSubmit } = useForm({
    changeCount
  });
  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(image) {
      changeImage3(image.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  const [level3, setLevel3] = useState("");

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <h3 className="h-info">Informasi Laporan 3</h3>
      <h6 className="h-irrigation-photo">Foto Irigasi yang Rusak</h6>
      <input type="hidden" name="segment_id1" value={segmentId1}></input>
      <input type="hidden" name="image1" value={image1}></input>
      <input type="hidden" name="level1" value={level1}></input>
      <input type="hidden" name="note1" value={note1}></input>
      <input type="hidden" name="segment_id2" value={segmentId2}></input>
      <input type="hidden" name="image2" value={image2}></input>
      <input type="hidden" name="level2" value={level2}></input>
      <input type="hidden" name="note2" value={note2}></input>
      <input type="hidden" name="segment_id3" value={segmentId}></input>
      <input type="file" id="myFile" name="photo" accept="image/*" onChange={(e)=>handleImage(e)} required></input>
      <input type="hidden" name="image3" value={image3}></input>
      <h6 className="h-irrigation-dmg">Tingkat Kerusakan Irigasi</h6>
      <input type="radio" name="level3" value="Ringan" onChange={e => setLevel3(e.target.value)} required></input>
      <label htmlFor="html" id="dmg-radio">ringan</label>
      <input type="radio" name="level3" value="Sedang" onChange={e => setLevel3(e.target.value)} required></input>
      <label htmlFor="css" id="dmg-radio">sedang</label>
      <input type="radio" name="level3" value="Berat" onChange={e => setLevel3(e.target.value)} required></input>
      <label htmlFor="parah" id="dmg-radio">berat</label>
      <input type="hidden" name="level3" value={level3}></input>
      <h6 className="h-ad-info">Keterangan Tambahan</h6>
      <textarea className="ad-info" name="note3" rows="5"></textarea>
      <div className="div-submit-report">
        <button className="submit-report" type="submit">Kumpulkan Laporan</button>
      </div>
    </form>
  );
};

export default ReportForm3;