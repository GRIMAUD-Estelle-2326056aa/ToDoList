import React, { useContext, useState } from 'react';
import { TodoContext } from "../context/TodoContext";
import '../styles/Footer.css';

const Footer = () => {
    const { currentTodos, setCurrentTodos, currentView, setCurrentView } = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isCategoryView = currentView === 'categories';

    const [nouvelleEntree, setNouvelleEntree] = useState({
        id: Date.now(),
        title: '',
        description: isCategoryView ? undefined : '',
        date_creation: new Date().toISOString().split('T')[0],
        date_echeance: isCategoryView ? undefined : '',
        etat: isCategoryView ? undefined : 'Nouveau',
        urgent: isCategoryView ? undefined : false,
        color: isCategoryView ? '#000000' : undefined,
        actif: isCategoryView ? true : undefined
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNouvelleEntree(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentTodos(prevTodos => ({
            ...prevTodos,
            [isCategoryView ? 'categories' : 'taches']: [...prevTodos[isCategoryView ? 'categories' : 'taches'], nouvelleEntree]
        }));
        setNouvelleEntree({
            id: Date.now(),
            title: '',
            description: isCategoryView ? undefined : '',
            date_creation: new Date().toISOString().split('T')[0],
            date_echeance: isCategoryView ? undefined : '',
            etat: isCategoryView ? undefined : 'Nouveau',
            urgent: isCategoryView ? undefined : false,
            color: isCategoryView ? '#000000' : undefined,
            actif: isCategoryView ? true : undefined
        });
        closeModal();
    };

    return (
        <div className="footer">
            <button className="add-task-btn" onClick={openModal}>Ajouter</button>
            <div className="view-btn">
                <button className={`task-view-btn ${!isCategoryView ? 'active' : ''}`} onClick={() => setCurrentView('tasks')}>Tâches</button>
                <button className={`category-view-btn ${isCategoryView ? 'active' : ''}`} onClick={() => setCurrentView('categories')}>Catégories</button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{isCategoryView ? 'Ajouter une nouvelle catégorie' : 'Ajouter une nouvelle tâche'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title">Titre * :</label>
                                <input type="text" id="title" name="title" value={nouvelleEntree.title} onChange={handleChange} required />
                            </div>
                            {isCategoryView ? (
                                <div>
                                    <label htmlFor="color">Couleur :</label>
                                    <input type="color" id="color" name="color" value={nouvelleEntree.color} onChange={handleChange} />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="description">Description :</label>
                                        <textarea id="description" name="description" value={nouvelleEntree.description} onChange={handleChange}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="date_echeance">Date d'échéance * :</label>
                                        <input type="date" id="date_echeance" name="date_echeance" value={nouvelleEntree.date_echeance} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>
                                            Urgent :
                                            <input type="checkbox" name="urgent" checked={nouvelleEntree.urgent} onChange={handleChange} />
                                        </label>
                                    </div>
                                </>
                            )}
                            <button type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Footer;
