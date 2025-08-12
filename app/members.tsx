import { useAuth } from "@clerk/nextjs";

export default function MembersOnly() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {true ? (
        <h1>Welcome to the Members Only Page!</h1>
      ) : (
        <h1>Please sign in to access this page.</h1>
      )}
    </div>
  );
}