// import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  // Temporarily disabled auth
  // const { user, isLoading } = useAuth();
  const isLoading = false;
  const user = { id: 1, username: "tempuser" }; // Temporary mock user

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  // Always render the component for now
  return (
    <Route path={path}>
      <Component />
    </Route>
  )
}
