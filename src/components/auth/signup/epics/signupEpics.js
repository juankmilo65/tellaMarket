import {
  setStatus,
  signUpSuccess,
  signUpFailed,
  SIGNUP_EMAIL_PASSWORD
} from "../actions/signupActions";
import { signInSuccess } from "../../signin/actions/signinActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function signupEpics(action$) {
  return action$.pipe(
    ofType(SIGNUP_EMAIL_PASSWORD),
    switchMap(action => {
      if (action.type === SIGNUP_EMAIL_PASSWORD) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/createUserEmail", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json; charset=UTF-8"
            }),
            body: JSON.stringify(action.payload)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return signUpFailed("Failed");
              }
            })
            .then(() => {
              signInSuccess(action.payload);
              return signUpSuccess();
            })
        );
      }
    })
  );
}
