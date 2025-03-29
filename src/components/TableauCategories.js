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
            <table>
                <thead>
                <tr>
                    <th>Catégorie</th>
                    <th>Statut</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((categorie) => (
                    <React.Fragment key={categorie.id}>
                        <tr
                            className={`category-row ${!categorie.actif ? 'inactive' : ''}`}
                            onClick={() => setExpandedCategoryId(
                                expandedCategoryId === categorie.id ? null : categorie.id
                            )}
                        >
                            <td style={{ color: categorie.color }}>{categorie.title}</td>
                            <td>{categorie.actif ? 'Actif' : 'Inactif'}</td>
                        </tr>
                        {expandedCategoryId === categorie.id && (
                            <tr className="category-detail-row">
                                <td colSpan={2}>
                                    <div className="category-details">
                                        <h3>Tâches associées :</h3>
                                        {getTasksForCategory(categorie.id).length > 0 ? (
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Tâche</th>
                                                    <th>État</th>
                                                    <th>Échéance</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {getTasksForCategory(categorie.id).map((tache) => (
                                                    <tr
                                                        key={tache.id}
                                                        className={`task-row ${tache.urgent ? 'urgent' : ''} ${tache.etat === 'Reussi' ? 'done' : ''} ${tache.urgent && tache.etat === 'Reussi' ? 'urgent done' : ''}`}
                                                    >
                                                        <td>{tache.title}</td>
                                                        <td>{tache.etat}</td>
                                                        <td>{new Date(tache.date_echeance).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Aucune tâche associée</p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableauCategories;
