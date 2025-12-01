import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Habitats from "./pages/Habitats";
import AnimalDetail from "./pages/AnimalDetail";
import HologramViewer from "./pages/HologramViewer";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ui/protectedRoute.js"; // <-- import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          
          {/* ----------- PUBLIC ROUTES ----------- */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ----------- PROTECTED ROUTES ----------- */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />

          <Route
            path="/habitats"
            element={
              <ProtectedRoute>
                <Habitats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/animal/:habitat/:animalId"
            element={
              <ProtectedRoute>
                <AnimalDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hologram/:habitat/:animalId"
            element={
              <ProtectedRoute>
                <HologramViewer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quiz/:habitat"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
