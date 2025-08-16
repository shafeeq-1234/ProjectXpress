import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/ui/floating-whatsapp";
import FloatingParticles from "@/components/ui/floating-particles";
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects-new";
import Order from "@/pages/order";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects/:category" component={Projects} />
      <Route path="/projects" component={Projects} />
      <Route path="/order" component={Order} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-space-dark text-white font-inter overflow-x-hidden relative">
          <FloatingParticles />
          <Header />
          <main className="relative z-10">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
