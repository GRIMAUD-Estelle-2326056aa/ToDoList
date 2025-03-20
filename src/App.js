import { useState } from 'react';

import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';

import todos from './todos.json';

function App() {
    const [currentTodos, setCurrentTodos] = useState(todos)
    const taches = currentTodos.taches

    const ajoutTache = () => {
        const tache = {
            id: 111, title: 'Nouvelle tache'
        }
        const newTodos = {
            ...currentTodos,
            taches: [
                ...currentTodos.taches,
                tache
            ]
        }
        setCurrentTodos(newTodos)
    }

    return (
    <div className="App">
        <Header taches={taches} />
        <br/>
        {taches && taches.map(t => <div>{t.title}</div>)}
        <br/>
        <Footer />
    </div>
    );
}

export default App;
