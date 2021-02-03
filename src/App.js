import React from "react";

import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const App = () => (
    <main className="app-layout">
        <AppHeader/>
        <AppContent
            description="Exploring our complicated relationship with technology — from the phone's we are glued to morning until night, to the prized cameras we've got displayed around the house."/>
        <AppFooter/>
    </main>
)

export default App;
