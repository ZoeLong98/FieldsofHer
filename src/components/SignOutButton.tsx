import { useAuth } from "@/context/AuthContext";

export const SignOutButton = () => {
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
