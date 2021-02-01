import React from "react";

import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

function App() {
    return (
        <main className="app-layout">
            <AppHeader />
            <AppContent description="Components let you split the UI into independent, reusable pieces, and think about each piece in isolation."/>
            <AppFooter />
        </main>
    );
}

export default App;
