import { getFirestore } from "redux-firestore";
import {
  CREATE_MENU,
  setStatus,
  createMenuSuccess,
  createMenuFailed
} from "../actions/createMenuActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createMenuEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(CREATE_MENU),
    switchMap(action => {
      if (action.type === CREATE_MENU) {
        return concat(
          of(setStatus("pending")),
          // getFS
          //   .collection(action.payload.language)
          //   .doc("MachinesAndEquipment")
          //   .collection(action.payload.categoryName)
          //   .doc(action.payload.subCategoryName)
          //   .set(action.payload.items)
          //   .then(() => createMenuSuccess("saved"))
          //   .catch(err => createMenuFailed(err))
          getFS
            .collection(action.payload.language + "_" + "MachinesAndEquipment")
            .add(action.payload.myCatalog)
        );
      }
    })
  );
}
