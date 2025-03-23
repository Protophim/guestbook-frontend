import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Entries from './pages/Entries';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <Container className="flex-grow-1 mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/entries" element={<Entries />} />
                    </Routes>
                </Container>
                <footer className="bg-light py-3 mt-auto">
                    <Container className="text-center text-muted">
                        <p className="mb-0">© 2025 Gästebuch</p>
                    </Container>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
