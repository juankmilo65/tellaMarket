import {
  setStatus,
  setSubcategorySuccess,
  setProductInformationSuccess,
  setMultimediaSuccess,
  setPlanSuccess,
  createItemSuccess,
  createItemError,
  SET_SUBCATEGORY,
  SET_PRODUCT_INFORMATION,
  SET_MULTIMEDIA,
  SET_PLAN,
  CREATE_ITEM
} from "../actions/controlDataItemActions";
import { getFirestore } from "redux-firestore";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import axios from "axios";

export default function controlDataItemEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(
      SET_SUBCATEGORY,
      SET_PRODUCT_INFORMATION,
      SET_MULTIMEDIA,
      CREATE_ITEM,
      SET_PLAN
    ),
    switchMap(action => {
      if (action.type === SET_SUBCATEGORY) {
        return concat(
          of(setStatus("pending")),
          of(setSubcategorySuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === SET_PRODUCT_INFORMATION) {
        return concat(
          of(setStatus("pending")),
          of(setProductInformationSuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === SET_MULTIMEDIA) {
        return concat(
          of(setStatus("pending")),
          of(setMultimediaSuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === SET_PLAN) {
        return concat(
          of(setStatus("pending")),
          of(setPlanSuccess(action.payload)),
          of(setStatus("ok"))
        );
      } else if (action.type === CREATE_ITEM) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection("items")
            .add(action.payload.productInformation)
            .then(doc => {
              let count = 1;
              action.payload.multimedia.map(file => {
                const fd = new FormData();
                fd.append("image", file.image, file.image.name);
                axios.post(
                  "https://us-central1-tellamachines.cloudfunctions.net/uploadFile",
                  fd,
                  { headers: { folderName: doc.id } }
                );
              });
              return setPlanSuccess("Ok");
            })
            .catch(err => createItemError(err))
        );
      }
    })
  );
}
