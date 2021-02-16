import React from "react";

import AppHeader from "./components/AppHeader";
import ToDo from "./components/ToDo";

const App = () => (
    <main className="app-layout">
        <AppHeader/>
        <section className="app-container">
            {/*<AppContent description="Exploring our complicated relationship with technology — from the phone's we are glued to morning until night, to the prized cameras we've got displayed around the house."/>*/}
            {/*<Counter />*/}
            <ToDo />
        </section>
        {/*<AppFooter/>*/}
    </main>
)

export default App;
