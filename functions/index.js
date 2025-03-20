/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
//require("dotenv").config();

// Inicializa Firebase Admin SDK
admin.initializeApp();

/**
 * Función para asignar un claim personalizado a un usuario
 */
exports.setRole = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { uid, role, local } = req.body;

    if (!uid || !role || !local) {
      return res.status(400).json({ error: "Faltan datos (uid, role o local)" });
    }

    try {
      await admin.auth().setCustomUserClaims(uid, { role, local });
      res.json({ success: true, message: `Rol '${role}' y local '${local}' asignado a UID: ${uid}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Función para verificar el token y obtener los custom claims
 */
exports.getClaims = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const role = decodedToken.role;
      const local = decodedToken.local;

      if (!role || !local) {
        return res.status(403).json({ error: "El usuario no tiene los claims necesarios" });
      }

      res.json({ success: true, role, local });
    } catch (error) {
      res.status(500).json({ error: "Token inválido o error al verificar", message: error.message });
    }
  });
});

/**
 * Función para asignar un claim personalizado solo al SUPERUSER
 */
exports.setSuperRole = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ error: "Faltan datos (uid o role)" });
    }

    try {
      await admin.auth().setCustomUserClaims(uid, { role });
      res.json({ success: true, message: `Rol '${role}' asignado a UID: ${uid}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Función para verificar el token y obtener los custom claims solo del super user
 */
exports.getClaimsSuper = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const role = decodedToken.role;

      if (!role) {
        return res.status(403).json({ error: "El usuario no tiene los claims necesarios" });
      }

      res.json({ success: true, role });
    } catch (error) {
      res.status(500).json({ error: "Token inválido o error al verificar", message: error.message });
    }
  });
});

/**
 * Función para eliminar un usuario de Firebase Authentication
 */
exports.eliminarUsuario = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const uid = req.params.uid;

    if (!uid) {
      return res.status(400).json({ error: "UID no proporcionado" });
    }

    try {
      await admin.auth().deleteUser(uid);
      res.json({ success: true, message: `Usuario con UID ${uid} eliminado con éxito` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Función de prueba de conexión
 */
exports.testConnection = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.json({ message: "Conexión exitosa" });
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
