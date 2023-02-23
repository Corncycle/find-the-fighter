import { initializeApp } from "firebase/app"
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function getCharCoords(name) {
  const char = await getDoc(doc(db, "fighter-data", name))
  return char.data()
}

export async function submitScore(name, time) {
  try {
    await addDoc(collection(db, "scores"), {
      name: name,
      time: time,
    })
  } catch (e) {
    console.error("Failed to add document: " + e)
  }
}

export async function getHighScores(amount) {
  try {
    const q = query(collection(db, "scores"), orderBy("time"), limit(amount))
    const querySnapshot = await getDocs(q)
    const scoresArr = []
    querySnapshot.forEach((doc) => {
      scoresArr.push(doc.data())
    })
    return scoresArr
  } catch (e) {
    console.error("Failed to retrieve scores: " + e)
  }
}
