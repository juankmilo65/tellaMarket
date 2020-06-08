import {
  SET_FILE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_ITEM,
  setStatus,
  uploadImageSuccess,
  uploadImageError,
  uploadImageItemSuccess,
  uploadImageItemError,
  setFileSuccess,
} from "../actions/fileUploadActions";
import axios from "axios";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function fileUploadEpics(action$) {
  return action$.pipe(
    ofType(SET_FILE, UPLOAD_IMAGE, UPLOAD_IMAGE_ITEM),
    switchMap((action) => {
      if (action.type === SET_FILE) {
        return concat(
          of(setStatus("pending")),
          of(setFileSuccess(action.payload))
        );
      } else if (action.type === UPLOAD_IMAGE) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/CreateImages", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify({
              StartDate: action.payload.StartDate,
              Image: action.payload.Image,
              TableName: action.payload.TableName,
              EndDate: action.payload.EndDate,
              IdPlan: action.payload.IdPlan,
              IdItem: action.payload.IdItem,
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return uploadImageError("Failed");
              }
            })
            .then((data) => {
              return uploadImageSuccess(data);
            })
        );
      } else if (action.type === UPLOAD_IMAGE_ITEM) {
        const form = new FormData();
        form.append("file", action.payload.Image);
        form.append("idItem", action.payload.IdItem);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            idItem: action.payload.IdItem,
          },
        };

        return concat(
          of(setStatus("pending")),
          axios
            .post(apiServices + "/createImagesItems", form, config)
            // fetch(apiServices + "/createImagesItems", {
            //   mode: "cors",
            //   method: "POST",
            //   headers: new Headers({
            //     Accept: "application/json",
            //     "Content-Type": "form-data",
            //   }),
            //   body: JSON.stringify({
            //     Image: action.payload.Image,
            //     IdItem: action.payload.IdItem,
            //   }),
            // })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return uploadImageItemError("Failed");
              }
            })
            .then((data) => {
              return uploadImageItemSuccess(data);
            })
        );
      }
    })
  );
}
