import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";
import accessSlice from "./AccessSlice";
import historySlice from "./HistoryInfoSlide";
import predictionSlice from "./PredictionSlice";
import loginSlice from "./loginSlice";
import HIstoryDatesSlice from "./HIstoryDatesSlice";
import PredictionDatesSlice from "./PredictionDatesSlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    access: accessSlice,
    header: headerSlice,
    historyInformation: historySlice,
    predictionInformation: predictionSlice,
    historyDate: HIstoryDatesSlice,
    predictionDate: PredictionDatesSlice,
  },
});
