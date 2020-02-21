const filesDir = process.argv.slice(2)[0];
const fs = require("fs");
const files = fs.readdirSync(`./${filesDir}`);

const admin = require("firebase-admin");

// Add your own serviceAccount
let serviceAccount = require("./kandidatarbete-bf436-d4ddb6eee920.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const it = files.map((fileName, i) => {
  // Path to your JSON files with document data
  let fileContent = require(`./${filesDir}/${fileName}`);

  // Add new documents in collection "articles"
  let setDoc = db
    .collection("articles")
    .doc(fileContent.uuid)
    .set(fileContent);
  console.log(`Document ${i} set. \x1b[36m (file: ${fileName}) \x1b[0m`);
});
