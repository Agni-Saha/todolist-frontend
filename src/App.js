import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/src/collapse.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ToDos from './components/ToDos/ToDos'
import Edit from './components/Edit/Edit'
import Create from './components/Create/Create'
import Navbar from './components/Navbar/Navbar'

export default function App() {
    return (
        <Router>
            <div className="App container">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ToDos} />
                    <Route path="/edit/:id" component={Edit} />
                    <Route path="/create" component={Create} />
                </Switch>
            </div>
        </Router>
    )
}
