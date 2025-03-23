// main.jsx - Der Einstiegspunkt der React-Anwendung

// Importiere StrictMode von React - hilft Entwicklern, potenzielle Probleme zu finden
import { StrictMode } from 'react'

// Importiere createRoot aus react-dom/client - wird benötigt um React an die DOM anzubinden
import { createRoot } from 'react-dom/client'

// Importiere die Haupt-App-Komponente aus der App.jsx Datei
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

// Erstelle eine React-Root und binde sie an das DOM-Element mit der ID 'root'
// Das 'root' Element findest du in der index.html
createRoot(document.getElementById('root')).render(
    // StrictMode ist ein Entwicklungstool das hilft:
    // - Veraltete Methoden zu identifizieren
    // - Potenzielle Fehler früh zu erkennen
    // - Beste Praktiken sicherzustellen
    // Es wird nur während der Entwicklung ausgeführt, nicht in Produktion
    <StrictMode>
        {/* Rendere die Haupt-App-Komponente */}
        <App />
    </StrictMode>,
)
