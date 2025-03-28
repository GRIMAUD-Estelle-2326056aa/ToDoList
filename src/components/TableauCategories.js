import React, { useContext, useState, useMemo } from 'react';
import { TodoContext } from "../context/TodoContext";
import '../styles/Tableau.css';

const TableauCategories = () => {
    const { currentTodos } = useContext(TodoContext);
    const { taches, categories, relations } = currentTodos;

    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    // Memoized function to get tasks for a specific category
    const getTasksForCategory = useMemo(() => {
        const tachesMap = new Map(taches.map(tache => [tache.id, tache]));
        return (categoryId) => {
            return relations
                .filter(relation => relation.categorie === categoryId)
                .map(relation => tachesMap.get(relation.tache))
                .filter(Boolean);
        };
    }, [taches, relations]);

    return (
        <div className="table-section">
            <h2>Catégories</h2>
            {categories.map((categorie) => (
                <div
                    key={categorie.id}
                    className={`category-item ${!categorie.actif ? 'inactive' : ''}`}
                    onClick={() => setExpandedCategoryId(
                        expandedCategoryId === categorie.id ? null : categorie.id
                    )}
                >
                    <div
                        className="category-header"
                        style={{
                            backgroundColor: categorie.color,
                            color: 'white',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <span>{categorie.title}</span>
                        <span>{categorie.actif ? 'Actif' : 'Inactif'}</span>
                    </div>

                    {expandedCategoryId === categorie.id && (
                        <div className="category-details">
                            <div className="related-tasks">
                                <h3>Tâches associées:</h3>
                                {getTasksForCategory(categorie.id).length > 0 ? (
                                    <ul>
                                        {getTasksForCategory(categorie.id).map((tache) => (
                                            <li
                                                key={tache.id}
                                                className={`task-item ${tache.urgent ? 'urgent' : ''} ${tache.etat === 'Reussi' ? 'done' : ''}`}
                                            >
                                                <div className="task-title">{tache.title}</div>
                                                <div className="task-details">
                                                    <span>État: {tache.etat}</span>
                                                    <span>Échéance: {new Date(tache.date_echeance).toLocaleDateString()}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Aucune tâche associée</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableauCategories;