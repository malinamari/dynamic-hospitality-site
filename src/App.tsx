
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Cases from "./pages/Cases";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Quiz from "./pages/Quiz";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import ARRURRULogin from "./pages/arrurru/ARRURRULogin";
import ARRURRURegister from "./pages/arrurru/ARRURRURegister";
import ARRURRURequestInvite from "./pages/arrurru/ARRURRURequestInvite";
import ARRURRUProjectSelect from "./pages/arrurru/ARRURRUProjectSelect";
import ARRURRUDashboard from "./pages/arrurru/ARRURRUDashboard";
import ARRURRUCodeice from "./pages/arrurru/ARRURRUCodeice";
import ARRURRUTrainingHall from "./pages/arrurru/ARRURRUTrainingHall";
import ARRURRUTrainings from "./pages/arrurru/ARRURRUTrainings";
import ARRURRUStandards from "./pages/arrurru/ARRURRUStandards";
import ARRURRUAdmin from "./pages/arrurru/ARRURRUAdmin";
import { initializeDemoData } from "./lib/arrurru-users";

const queryClient = new QueryClient();

initializeDemoData();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/city/:citySlug" element={<CityPage />} />
              <Route path="/arrurru/login" element={<ARRURRULogin />} />
              <Route path="/arrurru/register" element={<ARRURRURegister />} />
              <Route path="/arrurru/request-invite" element={<ARRURRURequestInvite />} />
              <Route path="/arrurru/project-select" element={<ARRURRUProjectSelect />} />
              <Route path="/arrurru/dashboard" element={<ARRURRUDashboard />} />
              <Route path="/arrurru/codice" element={<ARRURRUCodeice />} />
              <Route path="/arrurru/training-hall" element={<ARRURRUTrainingHall />} />
              <Route path="/arrurru/trainings" element={<ARRURRUTrainings />} />
              <Route path="/arrurru/standards" element={<ARRURRUStandards />} />
              <Route path="/arrurru/admin" element={<ARRURRUAdmin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;