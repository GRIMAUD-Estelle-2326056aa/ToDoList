import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TodoContext } from "../context/TodoContext";

const allStates = ["Reussi", "En attente", "Nouveau", "En cours", "Abandonne"]; // Liste complète des états

const colors = {
    "Reussi": "#28a745",     // Vert
    "En attente": "#ffc107", // Jaune
    "Nouveau": "#007bff",    // Bleu
    "En cours": "#17a2b8",   // Cyan
    "Abandonne": "#dc3545"      // Rouge
};

const PieChartTaches = () => {
    const { currentTodos } = useContext(TodoContext);
    const { taches } = currentTodos;

    // Transformer les données
    const data = useMemo(() => {
        const counts = taches.reduce((acc, { etat }) => {
            acc[etat] = (acc[etat] || 0) + 1;
            return acc;
        }, {});

        // Ajouter les états manquants avec une valeur de 0
        return allStates.map((etat) => ({
            name: etat,
            value: counts[etat] || 0, // Valeur réelle ou 0 si absente
            color: colors[etat] || "#6c757d" // Couleur par défaut
        }));
    }, [taches]);

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
        e</PieChart>
    );
};

export default PieChartTaches;
