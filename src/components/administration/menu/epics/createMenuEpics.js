import { getFirestore } from "redux-firestore";
import {
  CREATE_MENU,
  EDIT_MENU,
  setStatus,
  editMenuSuccess,
  editMenuFailed,
  createMenuSuccess,
  createMenuFailed
} from "../actions/createMenuActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function createMenuEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(CREATE_MENU, EDIT_MENU),
    switchMap(action => {
      if (action.type === CREATE_MENU) {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection(action.payload.language + "_" + "MachinesAndEquipment")
            .add(action.payload.myCatalog)
            .then(() => createMenuSuccess("Ok"))
            .catch(err => createMenuFailed(err))
        );
      } else if(action.type === EDIT_MENU)
      {
        return concat(
          of(setStatus("pending")),
          getFS
            .collection(action.payload.language + "_" + "MachinesAndEquipment")
            .doc(action.payload.fsId)
            .updateRef(action.payload.myCatalog)
            .then(() => editMenuSuccess("Ok"))
            .catch(err => editMenuFailed(err))
        );
      }
    })
  );
}
