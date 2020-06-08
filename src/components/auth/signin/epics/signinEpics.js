import {
  setStatus,
  signInSuccess,
  signInFailed,
  cleanMessage,
  SIGNIN_EMAIL_PASSWORD,
  SIGNIN_SOCIAL
} from "../actions/signinActions";
import { switchMap, catchError, filter } from "rxjs/operators";
import { ofType } from "redux-observable";
import { concat, of } from "rxjs";
import { apiServices } from "../../../../config/constants";

export default function signinEpics(action$) {
  return action$.pipe(
    ofType(SIGNIN_EMAIL_PASSWORD, SIGNIN_SOCIAL),
    switchMap(action => {
      if (action.type === SIGNIN_EMAIL_PASSWORD) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/singinEmail", {
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
                return signInFailed("Failed");
              }
            })
            .then(data => {
              if (data === "PasswordError" || data === "UserDoesNotExist") {
                return signInFailed(data);
              } else {
                var profile = {
                  Name: data[0].Name,
                  Provider: "E-Mail",
                  ProviderId: data[0].ProviderId,
                  Photo: data[0].Photo,
                  LastLogin: data[0].LastLogin,
                  Country: data[0].Country,
                  Email: data[0].Email,
                  User: data[0].User,
                  AccessToken: data[0].AccessToken,
                  Id: data[0].Id,
                  Initials:
                    data[0].Name.split(" ")[0].charAt(0) +
                    data[0].Name.split(" ")[1].charAt(0)
                };
                return signInSuccess(profile);
              }
            })
        );
      } else if (action.type === SIGNIN_SOCIAL) {
        return concat(
          of(setStatus("pending")),
          fetch(apiServices + "/singinSocal", {
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
                return signInFailed("Failed");
              }
            })
            .then(data => {
              var profile = {
                Name: data[0].Name,
                Provider: data[0].Provider,
                ProviderId: data[0].ProviderId,
                Photo: data[0].Photo,
                LastLogin: data[0].LastLogin,
                Country: data[0].Country,
                Email: data[0].Email,
                User: data[0].User,
                AccessToken: data[0].AccessToken,
                Id: data[0].Id,
                Initials:
                  data[0].Name.split(" ")[0].charAt(0) +
                  data[0].Name.split(" ")[1].charAt(0)
              };

              return signInSuccess(profile);
            })

          // of(signInSuccess(action.payload))
        );
      }
    })
  );
}
