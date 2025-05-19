import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import MindMap from "@/pages/MindMap";
import Profile from "@/pages/Profile";
import { AuthContext } from "@/lib/authContext";

// Protected route component
function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any>, path?: string }) {
  const [location, setLocation] = useLocation();
  const token = localStorage.getItem('overmind-token');
  
  useEffect(() => {
    if (!token) {
      setLocation('/login');
    }
  }, [token, setLocation]);
  
  if (!token) return null;
  
  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard">
        {(params) => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/mindmap">
        {(params) => <ProtectedRoute component={MindMap} />}
      </Route>
      <Route path="/profile">
        {(params) => <ProtectedRoute component={Profile} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('overmind-token');
    const userData = localStorage.getItem('overmind-user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);
  
  // Auth functions
  const login = (userData: any, token: string) => {
    localStorage.setItem('overmind-token', token);
    localStorage.setItem('overmind-user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('overmind-token');
    localStorage.removeItem('overmind-user');
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear(); // Clear any cached queries when logging out
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider 
        value={{ 
          user, 
          isAuthenticated, 
          loading,
          login,
          logout
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
