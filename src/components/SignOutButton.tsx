import { signOut, getAuth } from "firebase/auth";
import { app } from "@/api/firebase.config"; // Your Firebase config
import { useAuth } from "@/context/AuthContext";

export const SignOutButton = () => {
  const auth = getAuth(app);
  const { signOutUser, loading } = useAuth(); // If using context

  return (
    <button
      onClick={signOutUser}
      disabled={loading}
      className="whitespace-nowrap"
    >
      Sign Out
    </button>
  );
};
