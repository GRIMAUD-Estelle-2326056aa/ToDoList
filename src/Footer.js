import React, { useContext, useState } from 'react';
import { TodoContext } from "./Context/TodoContext";

import './styles/Footer.css'

const Footer = () => {
    const { currentTodos, setCurrentTodos, currentView, setCurrentView } = useContext(TodoContext);

    const { taches, categories, relations } = currentTodos; // Destructure currentTodos

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [nouvelleTache, setNouvelleTache] = useState({
        id: Date.now(),
        title: '',
        description: '',
        date_creation: new Date().toISOString().split('T')[0],
        date_echeance: '',
        etat: 'Nouveau',
        urgent: false,
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNouvelleTache((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ajouter la nouvelle tâche au contexte
        setCurrentTodos((prevTodos) => ({
            ...prevTodos,
            taches: [...prevTodos.taches, nouvelleTache]
        }));

        closeModal();
    };

    const handleViewChange = (view) => {
        console.log("Changement de vue vers :", view);
        setCurrentView(view);
    };

    return (
        <div className="footer">

            <button className="add-task-btn" onClick={openModal}>
                Ajouter
            </button>
            <div className="view-btn">
                <button className={`task-view-btn ${currentView === 'tasks' ? 'active' : ''}`}
                        onClick={() => handleViewChange('tasks')}>
                    Tâches
                </button>
                <button className={`category-view-btn ${currentView === 'categories' ? 'active' : ''}`}
                        onClick={() => handleViewChange('categories')}>
                    Catégories
                </button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Ajouter une nouvelle tâche</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title">Titre * :</label>
                                <input type="text" id="title" name="title" value={nouvelleTache.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="description">Description :</label>
                                <textarea id="description" name="description" value={nouvelleTache.description} onChange={handleChange}></textarea>
                            </div>
                            <div>
                                <label htmlFor="date_echeance">Date d'échéance * :</label>
                                <input type="date" id="date_echeance" name="date_echeance" value={nouvelleTache.date_echeance} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>
                                    Urgent :
                                    <input type="checkbox" name="urgent" checked={nouvelleTache.urgent} onChange={handleChange} />
                                </label>
                            </div>
                            <button type="submit">Ajouter la tâche</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Footer;