    "use server";
    import { db } from "@/lib/firebaseConfig";
    import { collection, getDocs } from "firebase/firestore";
import { Contacts } from "./columns";

    export async function getData() {
        try {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            return querySnapshot.docs.map((doc) => ({id : doc.id, ...doc.data() } as Contacts));
        } catch (error) {
            console.error("Error fetching contact data:", error);
            throw new Error("Failed to fetch contact data");
        }
    }
