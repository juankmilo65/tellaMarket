import {
  setStatus,
  signUpSuccess,
  signUpFailed,
  SIGNUP_EMAIL_PASSWORD
} from "../actions/signupActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";

export default function signupEpics(action$) {
  return action$.pipe(
    ofType(SIGNUP_EMAIL_PASSWORD),
    switchMap(action => {
      if (action.type === SIGNUP_EMAIL_PASSWORD) {
        return concat(
          of(setStatus("pending"))
          // action.payload.firebase
          //   .auth()
          //   .createUserWithEmailAndPassword(
          //     action.payload.newUser.email,
          //     action.payload.newUser.password
          //   )
          //   .then(resp => {
          //     return getFS
          //       .collection("users")
          //       .doc(resp.user.uid)
          //       .set({
          //         firstName: action.payload.newUser.firstName,
          //         lastName: action.payload.newUser.lastName,
          //         initials:
          //           action.payload.newUser.firstName[0] +
          //           action.payload.newUser.lastName[0]
          //       });
          //   })
          //   .then(() => signUpSuccess("User created"))
          //   .catch(err => signUpFailed(err.message))
        );
      }
    })
  );
}
