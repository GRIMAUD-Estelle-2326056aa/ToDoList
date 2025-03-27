import React, { useContext, useState, useMemo } from 'react';
import { TodoContext } from "./Context/TodoContext";
import './styles/Tableau.css';

const TableauTaches = () => {

    const { currentTodos } = useContext(TodoContext);
    const { taches, categories, relations } = currentTodos;

    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });
    const [filters, setFilters] = useState({
        categorie: 'Tous',
        etat: 'Tous',
        urgent: 'Tous',
        fait: 'Tous'
    });

    // Fonction pour avoir les catégories d'une tâche
    const getCategoriesForTask = useMemo(() => {
        const categoriesMap = new Map(categories.map(cat => [cat.id, cat]));
        return (taskId) => {
            return relations
                .filter(relation => relation.tache === taskId)
                .map(relation => categoriesMap.get(relation.categorie))
                .filter(Boolean);
        };
    }, [categories, relations]);

    // Fonction de tri
    const sortedTasks = useMemo(() => {
        if (!sortConfig.key) return taches;

        return [...taches].sort((a, b) => {
            let comparison = 0;
            switch(sortConfig.key) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'date_creation':
                    comparison = new Date(a.date_creation) - new Date(b.date_creation);
                    break;
                case 'date_echeance':
                    comparison = new Date(a.date_echeance) - new Date(b.date_echeance);
                    break;
                default:
                    return 0;
            }

            return sortConfig.direction === 'ascending' ? comparison : -comparison;
        });
    }, [taches, sortConfig]);

    // Function de filtre
    const filteredAndSortedTasks = useMemo(() => {
        return sortedTasks.filter(tache => {
            // Filtre catégorie
            const taskCategories = getCategoriesForTask(tache.id);
            if (filters.categorie !== 'Tous' &&
                !taskCategories.some(cat => cat.title === filters.categorie)) {
                return false;
            }

            // Filtre état
            if (filters.etat !== 'Tous' && tache.etat !== filters.etat) {
                return false;
            }

            // Filtre urgent
            if (filters.urgent !== 'Tous') {
                const urgentFilter = filters.urgent === 'true';
                if (tache.urgent !== urgentFilter) {
                    return false;
                }
            }

            // Filtre fait / pas fait
            if (filters.fait !== 'Tous') {
                const isDone = tache.etat === 'Reussi';
                if (filters.fait === 'fait' && !isDone) return false;
                if (filters.fait === 'pasfait' && isDone) return false;
            }

            return true;
        });
    }, [sortedTasks, filters, getCategoriesForTask]);

    // Handler du tri
    const handleSortChange = (e) => {
        const selectedKey = e.target.value;

        // Si sélectionné plusieurs fois : change de direction de tri
        if (selectedKey === sortConfig.key) {
            setSortConfig(prev => ({
                key: selectedKey,
                direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
            }));
        } else {
            // Par défaut en tri ascendant
            setSortConfig({
                key: selectedKey,
                direction: 'ascending'
            });
        }
    };

    // Fonction générique pour faire les menus déroulants des filtres
    const renderFilterDropdown = (label, value, options, onChange) => (
        <div>
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="table-section">

            {/* Sélecteur tri/filtre */}
            <div className="sort-filter-section">

                {/* Sélecteur pour le tri */}
                <div className="sort-dropdown">
                    <label htmlFor="sort-select">Trier par :</label>
                    <select
                        id="sort-select"
                        value={sortConfig.key || ''}
                        onChange={handleSortChange}
                    >
                        <option value="">Aucun tri</option>
                        <option value="title">Nom</option>
                        <option value="date_creation">Date de création</option>
                        <option value="date_echeance">Date d'échéance</option>
                    </select>
                </div>

                {/* Sélecteurs des filtres */}
                <div className="filter-dropdown">
                    {renderFilterDropdown(
                        'Catégorie',
                        filters.categorie,
                        [
                            { value: 'Tous', label: 'Tous' },
                            ...categories.map(cat => ({ value: cat.title, label: cat.title }))
                        ],
                        (e) => setFilters(prev => ({ ...prev, categorie: e.target.value }))
                    )}

                    {renderFilterDropdown(
                        'État',
                        filters.etat,
                        [
                            { value: 'Tous', label: 'Tous' },
                            { value: 'Reussi', label: 'Reussi' },
                            { value: 'En attente', label: 'En attente' },
                            { value: 'Nouveau', label: 'Nouveau' }
                        ],
                        (e) => setFilters(prev => ({ ...prev, etat: e.target.value }))
                    )}

                    {renderFilterDropdown(
                        'Urgent',
                        filters.urgent,
                        [
                            { value: 'Tous', label: 'Tous' },
                            { value: 'true', label: 'Oui' },
                            { value: 'false', label: 'Non' }
                        ],
                        (e) => setFilters(prev => ({ ...prev, urgent: e.target.value }))
                    )}

                    {renderFilterDropdown(
                        'Fait',
                        filters.fait,
                        [
                            { value: 'Tous', label: 'Tous' },
                            { value: 'fait', label: 'Fait' },
                            { value: 'pasfait', label: 'Pas fait' }
                        ],
                        (e) => setFilters(prev => ({ ...prev, fait: e.target.value }))
                    )}
                </div>
            </div>


            {/* Tableau */}
            {filteredAndSortedTasks.length === 0 ? (
                <p>Aucune tâche à afficher</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>État</th>
                        <th>Date d'échéance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAndSortedTasks.map((tache) => (
                        <React.Fragment key={tache.id}>
                            <tr
                                className={`task-row ${tache.urgent ? 'urgent' : ''} ${tache.etat === 'Reussi' ? 'done' : ''}`}
                                onClick={() => setExpandedTaskId(expandedTaskId === tache.id ? null : tache.id)}
                            >
                                <td>{tache.title}</td>
                                <td>{tache.etat}</td>
                                <td>{new Date(tache.date_echeance).toLocaleDateString()}</td>
                            </tr>

                            {expandedTaskId === tache.id && (
                                <tr className="task-detail-row">
                                    <td colSpan="3">
                                        <div className="task-details">
                                            <p><strong>Date de création :</strong> {new Date(tache.date_creation).toLocaleDateString()}</p>
                                            <p><strong>Description :</strong> {tache.description || 'Pas de description disponible'}</p>
                                            <p><strong>Urgent :</strong> {tache.urgent ? 'Oui' : 'Non'}</p>

                                            <div className="task-categories">
                                                {getCategoriesForTask(tache.id).map((categorie) => (
                                                    <p
                                                        className="category-detail"
                                                        key={categorie.id}
                                                        style={{ color: categorie.color }}
                                                    >
                                                        {categorie.title}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TableauTaches;