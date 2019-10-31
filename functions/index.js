const functions = require("firebase-functions");
const admin = require("firebase-admin");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const axios = require("axios");
const { Storage } = require("@google-cloud/storage");
const algoliasearch = require("algoliasearch");
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("dev_tellamarket");

const gcconfig = {
  projectId: "tellamachines",
  keyFilename: "tellamachines-firebase-adminsdk-qtbb9-5b1e9c3f5e.json"
};

const gcs = new Storage(gcconfig);

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("Notification added", doc));
};

exports.itemCreated = functions.firestore
  .document("items/{itemId}")
  .onCreate(doc => {
    const item = doc.data();
    const notification = {
      content: "Added a new Item",
      user: `${item.ownerName} ${item.ownerLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "User Created",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };
      return createNotification(notification);
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }

    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    busboy.on("file", (filedname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = {
        file: filepath,
        type: mimetype,
        folderName: req.headers.foldername,
        fileName: filename
      };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      const bucket = gcs.bucket("tellamachines.appspot.com");
      bucket
        .upload(uploadData.file, {
          destination: `${uploadData.folderName}/${uploadData.fileName}`,
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(data => {
          getScpecificInfo(data[0].id).then(response => {
            res.status(200).json({
              downloadURL:
                "https://firebasestorage.googleapis.com/v0/b/tellamachines.appspot.com/o/" +
                data[0].id +
                "?alt=media&token=" +
                response
            });
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    });
    busboy.end(req.rawBody);
  });
});

exports.addToIndex = functions.firestore
  .document("items/{itemId}")

  .onCreate(snapshot => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.addObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document("items/{itemId}")

  .onUpdate(change => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("items/{itemId}")

  .onDelete(snapshot => index.deleteObject(snapshot.id));

async function getScpecificInfo(id) {
  return await axios
    .get(
      "https://firebasestorage.googleapis.com/v0/b/tellamachines.appspot.com/o/" +
        id
    )
    .then(data2 => {
      return data2.data.downloadTokens;
    });
}
