import {
  setStatus,
  phoneAuthenticationSuccess,
  phoneAuthenticationFailed,
  codeAuthenticationSuccess,
  codeAuthenticationFailed,
  PHONE_AUTHENTICATION,
  CODE_AUTHENTICATION
} from "../actions/phoneAuthenticationActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function phoneAuthenticationEpics(action$) {
  return action$.pipe(
    ofType(PHONE_AUTHENTICATION, CODE_AUTHENTICATION),
    switchMap(action => {
      if (action.type === PHONE_AUTHENTICATION) {
        return concat(
          of(setStatus("pending")),
          action.payload.firebase
            .auth()
            .signInWithPhoneNumber(
              action.payload.data.phoneNumber,
              action.payload.appVerifier
            )
            .then(confirmResult => {
              return phoneAuthenticationSuccess({ result: confirmResult });
            })
            .catch(err => {
              phoneAuthenticationFailed(err.message);
            })
        );
      } else if (action.type === CODE_AUTHENTICATION) {
        return concat(
          of(setStatus("pending")),
          action.payload.confirmResult.result
            .confirm(action.payload.data.codeInput)
            .then(() => codeAuthenticationSuccess("Loging Succes"))
            .catch(err => codeAuthenticationFailed(err.message))
        );
      }
    })
  );
}
