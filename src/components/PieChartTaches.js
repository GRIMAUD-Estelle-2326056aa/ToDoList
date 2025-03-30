import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TodoContext } from "../context/TodoContext";

const colors = {
    "Réussi": "#28a745",     // Vert
    "En attente": "#ffc107", // Jaune
    "Nouveau": "#007bff",    // Bleu
    "En cours": "#17a2b8",   // Cyan
    "Abandonné": "#dc3545"    // Rouge
};

const PieChartTaches = () => {
    const { currentTodos, ETATS } = useContext(TodoContext);
    const { taches } = currentTodos;

    // Transformer les données
    const data = useMemo(() => {
        const counts = taches.reduce((acc, { etat }) => {
            acc[etat] = (acc[etat] || 0) + 1;
            return acc;
        }, {});

        // Ajouter les états manquants avec une valeur de 0
        return Object.values(ETATS).map((etat) => ({
            name: etat,
            value: counts[etat] || 0, // Valeur réelle ou 0 si absente
            color: colors[etat] || "#6c757d" // Couleur par défaut
        }));
    }, [taches, ETATS]);

    return (
        <PieChart width={300} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={30}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
    );
};

export default PieChartTaches;
