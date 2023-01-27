import { Router, Routes, Router } from 'react-router-dom'

import Navbar from './componentes/layout/Navbar'
import Home from './componentes/pages/Home';

function App() {
    return(
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;