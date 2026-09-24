// Server-only Firestore access via the Firebase Admin SDK.
//
// Previously this project reached Firestore with the *client* SDK
// (`firebase/firestore`) from server actions. That SDK authenticates as an
// anonymous browser user, so the `contacts` collection had to be readable and
// writable by anyone for the app to work at all — and the project id is public
// by design, so anyone could read and write it straight through Firestore's
// REST API, bypassing this site entirely.
//
// The Admin SDK authenticates as a service account and bypasses security rules,
// which lets `firestore.rules` deny all direct client access.
import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const APP_NAME = "portfolio-admin";

const SETUP_HINT =
  "Set FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + " +
  "FIREBASE_PRIVATE_KEY. Create a service account key in the Firebase console under " +
  "Project settings > Service accounts. See README.md > Environment Variables.";

type Credentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function readCredentials(): Credentials {
  // Single-variable form: convenient for hosts where multi-line values are awkward.
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(serviceAccountJson);
    } catch {
      throw new Error(`FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON. ${SETUP_HINT}`);
    }

    const projectId = parsed.project_id ?? parsed.projectId;
    const clientEmail = parsed.client_email ?? parsed.clientEmail;
    const privateKey = parsed.private_key ?? parsed.privateKey;

    if (
      typeof projectId !== "string" ||
      typeof clientEmail !== "string" ||
      typeof privateKey !== "string"
    ) {
      throw new Error(
        `FIREBASE_SERVICE_ACCOUNT_JSON is missing project_id, client_email or private_key. ${SETUP_HINT}`
      );
    }

    return { projectId, clientEmail, privateKey };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(`Firebase Admin credentials are not configured. ${SETUP_HINT}`);
  }

  return { projectId, clientEmail, privateKey };
}

function initialise(): App {
  const existing = getApps().find((app) => app.name === APP_NAME);
  if (existing) return getApp(APP_NAME);

  const { projectId, clientEmail, privateKey } = readCredentials();

  return initializeApp(
    {
      credential: cert({
        projectId,
        clientEmail,
        // Env files store the PEM newlines escaped; the SDK needs them real.
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
      projectId,
    },
    APP_NAME
  );
}

let cachedDb: Firestore | null = null;

/**
 * Lazily initialised so that importing this module never throws — a
 * misconfiguration surfaces when Firestore is actually used, with a message
 * that says what to set.
 */
export function getAdminDb(): Firestore {
  if (!cachedDb) {
    cachedDb = getFirestore(initialise());
  }
  return cachedDb;
}
