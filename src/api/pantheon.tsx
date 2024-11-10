import { db } from "./firebase.config";
import { ref, get } from "firebase/database";
import { Person } from "@/components/types";

const getPantheon = async (): Promise<[Person | null, number]> => {
  try {
    const pantheonRef = ref(db, "pantheonCharacter");
    const snapshot = await get(pantheonRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const characters = Object.values(data); // Convert object to array
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex] as Person;

      return [randomCharacter as Person, randomIndex];
    } else {
      console.log("No data available");
      return [null, -1]; // Or handle the no-data case as needed
    }
  } catch (error) {
    console.error("Error fetching pantheon data:", error);
    return [null, -1]; // Or handle the error as needed
  }
};

export default getPantheon;
