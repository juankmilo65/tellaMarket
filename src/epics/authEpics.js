import {
  setStatus,
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signOutFailed,
  signUpSuccess,
  signUpFailed,
  SIGNIN_EMAL_PASSWORD,
  SIGNUP_EMAL_PASSWORD,
  SIGNOUT
} from "../store/actions/authActions";
import { switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { getFirestore } from "redux-firestore";

export default function authEpics(action$, state$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(SIGNIN_EMAL_PASSWORD, SIGNUP_EMAL_PASSWORD, SIGNOUT),
    switchMap(action => {
      if (action.type === SIGNIN_EMAL_PASSWORD) {
        return concat(
          of(setStatus("pending")),
          action.payload.firebase
            .auth()
            .signInWithEmailAndPassword(
              action.payload.credentials.email,
              action.payload.credentials.password
            )
            .then(() => signInSuccess("Loging Success"))
            .catch(err => signInFailed(err.message))
        );
      } else if (action.type === SIGNOUT) {
        return concat(
          of(setStatus("pending")),
          action.payload.firebase
            .auth()
            .signOut()
            .then(() => signOutSuccess("SignOut Success"))
            .catch(err => signOutFailed(err.message))
        );
      } else if (action.type === SIGNUP_EMAL_PASSWORD) {
        return concat(
          of(setStatus("pending")),
          action.payload.firebase
            .auth()
            .createUserWithEmailAndPassword(
              action.payload.newUser.email,
              action.payload.newUser.password
            )
            .then(resp => {
              return getFS
                .collection("users")
                .doc(resp.user.uid)
                .set({
                  firstName: action.payload.newUser.firstName,
                  lastName: action.payload.newUser.lastName,
                  initials:
                    action.payload.newUser.firstName[0] +
                    action.payload.newUser.lastName[0]
                });
            })
            .then(doc => signUpSuccess(doc.id))
            .catch(err => signUpFailed(err))
        );
      }
    })
  );
}
