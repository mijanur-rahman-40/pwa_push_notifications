import express from "express";
import webPush from "web-push";
import bodyParser from "body-parser";
import path from "path";

const app = express();

// Set static path
app.use(express.static(path.join("client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webPush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (request, response) => {

  // Get pushSubscription object
  const subscription = request.body;
  console.log(subscription);
  // Send 201 - resource created
  response.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test", url: 'http://umediad.com' });

  // Pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

// Subscribe Route
app.get("/post-notification", (request, response) => {
  // Get pushSubscription object
  const subscription = {
    endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABhAa_RtK8AOw7yPnaIBVJ9g62sGHxmtZF4s2b46FYxAPwXu2H3YMERQ90jig9fhwehNOyAxLlo1PvJPGKfgSro7rb9N288uJ9xf0xEpn19Pfm-HuE49fGQUbzqaovGAyBMDjFsk5w3dDjdXGGtqQv_9k0s0dsNYvTAq-Wudg6pgLUDXbk',
    keys: {
      auth: 'ainSGfJLdq-27ejkkrogtw',
      p256dh: 'BCkf4tvCHEjZYES8vS8ENY6NmButj112mALyNxqZETEq5Xd0PPuy2wGSHpN6H1VgBdm_-bw2KOacEcr576Q2Rys'
    }
  }
  const payload = JSON.stringify({ title: "Push Original", url: 'http://umediad.com' });

  response.status(201).json({});

  // Pass object into sendNotification
  webPush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

const port = 4005;

app.listen(port, () => console.log(`Server started on port ${port}`));
