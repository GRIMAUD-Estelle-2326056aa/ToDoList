import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TodoContext } from "../context/TodoContext";

const colors = {
    "Reussi": "#28a745",     // Vert
    "En attente": "#ffc107", // Jaune
    "Nouveau": "#007bff",    // Bleu
    "En cours": "#17a2b8",   // Cyan
    "Annulé": "#dc3545"      // Rouge
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

        return Object.entries(counts).map(([etat, count]) => ({
            name: etat,
            value: count,
            color: colors[etat] || "#6c757d" // Gris par défaut si l'état est inconnu
        }));
    }, [taches]);

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
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
