import React, { createContext, useState } from 'react';

export const TodoContext = createContext({
    currentTodos: {},
    setCurrentTodos: () => {},
    currentView: 'tasks',
    setCurrentView: () => {},
});

export const TodoProvider = ({ children, initialTodos }) => {
    const [currentTodos, setCurrentTodos] = useState(initialTodos);
    const [currentView, setCurrentView] = useState('tasks');

    return (
        <TodoContext.Provider value={{ currentTodos, setCurrentTodos, currentView, setCurrentView }}>
            {children}
        </TodoContext.Provider>
    );
};
