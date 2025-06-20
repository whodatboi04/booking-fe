import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.tsx";
import BookingContextProvider from "./contexts/BookingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BookingContextProvider>
        <App />
      </BookingContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
