declare global {
  interface Window {
    __suspendedFaviconOnly?: boolean
  }
}

// Favicon refreshes use a tiny document and never import React, the component
// library, screenshots, theme state, or the full suspended-page stylesheet.
async function startSuspendedPage() {
  try {
    const { mountSuspendedApp } = await import("./mount")
    mountSuspendedApp()
  } catch (error) {
    console.error("[TabHibernate] suspended page failed to start", error)
  }
}

if (!window.__suspendedFaviconOnly) {
  void startSuspendedPage()
}

export {}
