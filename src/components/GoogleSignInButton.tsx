import { useAuth } from "@/context/AuthContext"; // Or your state management solution

export const GoogleSignInButton = () => {
  const { signInWithGoogle, loading } = useAuth(); // If using context

  return (
    <button onClick={signInWithGoogle} className="whitespace-nowrap">
      Sign in with Google
    </button>
  );
};
