import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Note: StrictMode is intentionally not used. Its dev-only double-invocation of
// effects creates and disposes the WebGL contexts (character scene + tech stack
// canvas) twice on mount, which thrashes/leaks GPU contexts and can make the
// browser block WebGL entirely. Effects already run once in production.
createRoot(document.getElementById("root")!).render(<App />);
