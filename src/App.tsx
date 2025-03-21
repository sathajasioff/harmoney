import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the Navbar
import Navbar from "@/components/Navbar";

// Import the pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import BranchDetails from "./pages/BranchDetails";
import Admin from "./pages/Admin";
import Adminuser from "./pages/adminuser";
import Admincontactus from "./pages/admincontactus";
import Adminbranch from "./pages/adminbranch";
import Adminevent from "./pages/adminevent";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Import the Login page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Include Navbar on all pages except /admin */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Index />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route
            path="/branches/:location"
            element={
              <>
                <Navbar />
                <BranchDetails />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} /> {/* Admin route without Navbar */}
          <Route path="/adminuser" element={<Adminuser />} />
          <Route path="/admincontactus" element={<Admincontactus />} />
          <Route path="/adminbranch" element={<Adminbranch />} />
          <Route path="/adminevent" element={<Adminevent />} />
          
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
