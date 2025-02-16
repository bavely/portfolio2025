    "use server";
    import { db } from "@/lib/firebaseConfig";
    import { collection, getDocs } from "firebase/firestore";
import { Contacts } from "./columns";
    export async function getData() {
        const querySnapshot = await getDocs(collection(db, "contacts"));

        return querySnapshot.docs.map((doc) => ({id : doc.id, ...doc.data() } as Contacts));
    }

