const functions = require("firebase-functions");
const admin = require("firebase-admin");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

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
        .then(() => {
          res.status(200).json({
            message: "File Upload"
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    });
    busboy.end(req.rawBody);
  });
});
