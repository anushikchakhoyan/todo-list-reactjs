import React from "react";

import AppHeader from "./components/AppHeader";
import ToDo from "./components/ToDo";

const App = () => (
    <main className="app-layout">
        <AppHeader/>
        <section className="app-container">
            <ToDo />
        </section>
    </main>
)

export default App;
