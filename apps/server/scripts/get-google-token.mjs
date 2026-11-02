/**
 * One-time helper to obtain a Google OAuth refresh token for Meet creation.
 *
 * Usage:
 *   1. In Google Cloud, create an OAuth 2.0 client (type: Web application),
 *      enable the Google Calendar API, and add
 *      http://localhost:8765/callback  as an authorised redirect URI.
 *   2. Put your client id + secret in apps/server/.env as
 *      GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (or pass them as args below).
 *   3. Run:  npm run google-token
 *   4. Open the printed URL, authorise, and this script prints the
 *      refresh token to paste into .env as GOOGLE_REFRESH_TOKEN.
 */
import http from "node:http";
import googleapis from "googleapis";

const { google } = googleapis;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.argv[2];
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || process.argv[3];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Provide GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (via .env or as args)."
  );
  process.exit(1);
}

const REDIRECT_URI = "http://localhost:8765/callback";
const oAuth2 = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oAuth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar"],
});

console.log("\nOpen this URL in your browser and authorise:\n");
console.log(authUrl);
console.log("\nWaiting for authorisation on http://localhost:8765 ...\n");

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, REDIRECT_URI).searchParams.get("code");
  if (!code) {
    res.writeHead(400);
    res.end("No code returned.");
    return;
  }
  try {
    const { tokens } = await oAuth2.getToken(code);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      "<h2>Done</h2><p>Return to your terminal — the refresh token has been printed.</p>"
    );
    console.log("\n==============================");
    console.log("REFRESH TOKEN:", tokens.refresh_token);
    console.log("==============================\n");
    console.log("Add this to apps/server/.env:");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
  } catch (err) {
    res.writeHead(500);
    res.end("Token exchange failed — see terminal.");
    console.error("Token exchange failed:", err);
  }
  server.close();
});

server.listen(8765);
