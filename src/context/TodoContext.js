import React, { createContext, useState } from 'react';

export const ETATS = {
    NOUVEAU: 'Nouveau',
    EN_COURS: 'En cours',
    REUSSI: 'Réussi',
    EN_ATTENTE: 'En attente',
    ABANDONNE: 'Abandonné'
};

export const ETAT_TERMINE = [
    ETATS.REUSSI,
    ETATS.ABANDONNE
];

export const TodoContext = createContext({
    currentTodos: {},
    setCurrentTodos: () => {},
    currentView: 'tasks',
    setCurrentView: () => {},
    ETATS,
    ETAT_TERMINE,
});

export const TodoProvider = ({ children, initialTodos }) => {
    const [currentTodos, setCurrentTodos] = useState(initialTodos);
    const [currentView, setCurrentView] = useState('tasks');

    return (
        <TodoContext.Provider value={{ currentTodos, setCurrentTodos, currentView, setCurrentView, ETATS, ETAT_TERMINE }}>
            {children}
        </TodoContext.Provider>
    );
};
