import React from "react";

import Routes from "./components/Routes";
import AppHeader from "./components/AppHeader";
import CounterWithRedux from "./components/CounterWithRedux";

const App = () => (
    <main className="app-layout">
        <AppHeader/>
        <section className="app-container">
            <Routes/>
            <CounterWithRedux />
        </section>
    </main>
)

export default App;
