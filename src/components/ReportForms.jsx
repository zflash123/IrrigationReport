import { useEffect } from "react";
import ReportForm1 from "./ReportForm1";
import ReportForm2 from "./ReportForm2";
import ReportForm3 from "./ReportForm3";

export default function ReportForms({segmentId, count, changeCount, segmentId1, image1, level1, note1, changeSegmentId1, changeImage1, changeLevel1, changeNote1, segmentId2, image2, level2, note2, changeSegmentId2, changeImage2, changeLevel2, changeNote2, image3, changeImage3}) {
  useEffect(() => {
    if (count === 1) {
      changeSegmentId1(segmentId);
    } else if(count === 2) {
      changeSegmentId2(segmentId);
    }
  }, [segmentId, count, changeSegmentId1, changeSegmentId2]);
  if(count===1) {
    // console.log("segmentId1 = "+segmentId1);
    return <ReportForm1 segmentId1={segmentId1} changeImage1={changeImage1} changeLevel1={changeLevel1} changeNote1={changeNote1} count={count} changeCount={changeCount} image1={image1}/>
  } else if(count===2) {
    console.log("segmentId2 = "+segmentId2);
    return <ReportForm2 segmentId={segmentId} count={count} changeCount={changeCount} segmentId1={segmentId1} image1={image1} level1={level1} note1={note1} image2={image2} changeImage2={changeImage2} changeLevel2={changeLevel2} changeNote2={changeNote2}/>
  } else if(count===3) {
    console.log("segmentId3 = "+segmentId);
    return <ReportForm3 segmentId={segmentId} changeCount={changeCount} segmentId1={segmentId1} image1={image1} level1={level1} note1={note1} segmentId2={segmentId2} image2={image2} level2={level2} note2={note2} image3={image3} changeImage3={changeImage3}/>
  }
}