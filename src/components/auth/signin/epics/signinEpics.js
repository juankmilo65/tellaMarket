import {
  setStatus,
  signInSuccess,
  signInFailed,
  SIGNIN_EMAIL_PASSWORD,
  SIGNIN_GMAIL
} from "../actions/signinActions";
import { switchMap, catchError, filter } from "rxjs/operators";
import { ofType } from "redux-observable";
import { getFirestore } from "redux-firestore";
import { concat, of, from } from "rxjs";

export default function signinEpics(action$) {
  const getFS = getFirestore();
  return action$.pipe(
    ofType(SIGNIN_EMAIL_PASSWORD, SIGNIN_GMAIL),
    switchMap(action => {
      if (action.type === SIGNIN_EMAIL_PASSWORD) {
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
      } else if (action.type === SIGNIN_GMAIL) {
        const googleProvider = new action.payload.firebase.auth.GoogleAuthProvider();
        return concat(
          of(setStatus("pending")),
          from(
            action.payload.firebase.auth().signInWithPopup(googleProvider)
          ).pipe(
            filter(user => {
              if (
                user !== null &&
                user !== undefined &&
                user.user !== undefined
              ) {
                of(
                  createUserDocument(
                    getFS,
                    user.additionalUserInfo.profile.given_name,
                    user.additionalUserInfo.profile.family_name,
                    user.user.uid,
                    "Google",
                    user.additionalUserInfo.profile.email
                  )
                );
              }
            }),

            catchError(err => {
              return of(signInFailed(err.code));
            })
          ),
          of(signInSuccess("Loging Success")) // ojo ajustar
        );
      }
    })
  );
}

const createUserDocument = (
  getFirestore,
  name,
  lastName,
  userId,
  provider,
  email
) => {
  getFirestore
    .collection("users")
    .doc(userId)
    .set({
      firstName: name,
      lastName: lastName,
      initials: name[0] + lastName[0],
      userId: userId,
      provider: provider,
      email: email
    });
};
