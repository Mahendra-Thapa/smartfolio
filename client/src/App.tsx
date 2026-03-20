import React from "react";
import { Switch, Route } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Templates from "./pages/Templates";
import CreatePortfolio from "./pages/CreatePortfolio";
import MyPortfolios from "./pages/MyPortfolios";
import ViewPortfolio from "./pages/ViewPortfolio";
import Login from "./pages/Login";
import CreateAccount from "./pages/createAccount";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import RoleProtectedRoute from "./utils/RoleProtectedRoute";
import AdminLayout from "./components/admin/layouts/AdminLayout";
import UserList from "./pages/admin/UserList";
import Test from "./pages/Test";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <RoleProtectedRoute publicRoute>
          <Home />
        </RoleProtectedRoute>
      </Route>
      <Route path="/test">
        <RoleProtectedRoute publicRoute>
          <Test />
        </RoleProtectedRoute>
      </Route>
      <Route path="/about">
        <RoleProtectedRoute publicRoute>
          <About />
        </RoleProtectedRoute>
      </Route>
      <Route path="/contact">
        <RoleProtectedRoute publicRoute>
          <Contact />
        </RoleProtectedRoute>
      </Route>
      <Route path="/templates">
        <RoleProtectedRoute publicRoute>
          <Templates />
        </RoleProtectedRoute>
      </Route>
      <Route path="/signin">
        <RoleProtectedRoute publicRoute>
          <Login />
        </RoleProtectedRoute>
      </Route>
      <Route path="/signup">
        <RoleProtectedRoute publicRoute>
          <CreateAccount />
        </RoleProtectedRoute>
      </Route>

      {/* User Routes */}
      <Route path="/create-portfolio">
        <RoleProtectedRoute>
          <CreatePortfolio />
        </RoleProtectedRoute>
      </Route>
      <Route path="/my-portfolios">
        <RoleProtectedRoute>
          <MyPortfolios />
        </RoleProtectedRoute>
      </Route>
      <Route path="/view-portfolio/:id">
        <RoleProtectedRoute>
          <ViewPortfolio />
        </RoleProtectedRoute>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        <RoleProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </RoleProtectedRoute>
      </Route>
      <Route path="/admin/users">
        <RoleProtectedRoute>
          <AdminLayout>
            <UserList />
          </AdminLayout>
        </RoleProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route path="/404">
        <RoleProtectedRoute publicRoute>
          <NotFound />
        </RoleProtectedRoute>
      </Route>
      <Route>
        <RoleProtectedRoute publicRoute>
          <NotFound />
        </RoleProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
