import { TodoContext, TodoProvider } from "../context/TodoContext";
import Header from '../components/Header/Header';
import TableauTaches from "../components/Tableau/TableauTaches";
import TableauCategories from "../components/Tableau/TableauCategories";
import Footer from '../components/Footer/Footer';
import './App.css';
import todos from '../json/todos.json';
import {useContext, useState} from "react";

function AppContent() {
    const [showPopup, setShowPopup] = useState(true);

    const { currentView, setCurrentTodos } = useContext(TodoContext);
    console.log("Vue actuelle :", currentView);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    setCurrentTodos(jsonData);
                } catch (error) {
                    alert("Erreur lors du chargement du fichier JSON.");
                }
            };
            reader.readAsText(file);
        }
        setShowPopup(false);
    };

    const handleStartFresh = () => {
        setCurrentTodos({ taches: [], categories: [], relations: [] });
        setShowPopup(false);
    };

    return (
        <div className="app-container">
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Charger un fichier ou commencer de zéro</h2>
                        <input type="file" accept=".json" onChange={handleFileUpload} />
                        <button onClick={handleStartFresh}>Commencer de zéro</button>
                    </div>
                </div>
            )}
            <Header />
            <br />
            {currentView === 'tasks' ? <TableauTaches /> : <TableauCategories />}
            <br />
            <Footer />
        </div>
    );
}

function App() {
    return (
        <TodoProvider initialTodos={todos}>
            <AppContent />
        </TodoProvider>
    );
}

export default App;
