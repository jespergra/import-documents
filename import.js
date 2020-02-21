const fs = require("fs");
const files = fs.readdirSync("./test_data");

const admin = require("firebase-admin");

// Add your own serviceAccount
let serviceAccount = require("./kandidatarbete-bf436-d4ddb6eee920.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const it = files.map((filePath, i) => {
  // Path to your JSON files with document data
  let fileContent = require(`./test_data/${filePath}`);

  // Add new documents in collection "articles"
  let setDoc = db
    .collection("articles")
    .doc(fileContent.uuid)
    .set(fileContent);
  console.log(`Document ${i} set.`);
});
