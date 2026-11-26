import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import "@workspace/ui/globals.css"
import { SuspendedApp } from "./App"
import {
  applyDocumentTheme,
  getCachedUiTheme,
  installDevChromeMock,
} from "@/lib/chrome"

export function mountSuspendedApp() {
  installDevChromeMock()
  applyDocumentTheme(getCachedUiTheme())

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <TooltipProvider>
        <SuspendedApp />
      </TooltipProvider>
    </StrictMode>
  )
}
