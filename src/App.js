import React from "react";

import AppHeader from "./components/AppHeader";
import Routes from "./components/Routes";

const App = () => (
    <main className="app-layout">
        <AppHeader/>
        <section className="app-container">
            <Routes/>
        </section>
    </main>
)

export default App;
