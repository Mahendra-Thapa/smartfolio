import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Templates from "./pages/Templates";
import CreatePortfolio from "./pages/CreatePortfolio";
import MyPortfolios from "./pages/MyPortfolios";
import ViewPortfolio from "./pages/ViewPortfolio";
import { Component } from "lucide-react";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import CreateAccount from "./pages/createAccount";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/templates"} component={Templates} />
      <Route path={"/create-portfolio"} component={CreatePortfolio} />
      <Route path={"/my-portfolios"} component={MyPortfolios} />
      <Route path={"/view-portfolio/:id"} component={ViewPortfolio} />
      <Route path={"/signin"} component={Login} />
      <Route path={"/signup"} component={CreateAccount} />
      {/* Admin Route */}
      <Route path={"/admin/dashboard"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
