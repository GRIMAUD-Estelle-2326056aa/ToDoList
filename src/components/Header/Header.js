import './Header.css';
import { TodoContext } from "../../context/TodoContext";
import { useContext, useMemo } from "react";
import PieChartTaches from "../PieChartTaches";

const Header = () => {
    const { currentTodos, ETAT_TERMINE } = useContext(TodoContext);
    const { taches } = currentTodos;

    const nbTaches = taches.length;

    const nbTachesTerminees = useMemo(() =>
            taches.filter(tache => ETAT_TERMINE.includes(tache.etat)).length,
        [taches, ETAT_TERMINE]
    );

    return (
        <div className="header">
            <div className="task-count">
                Total : {nbTaches} tâches
                (dont {nbTachesTerminees} terminée(s))
            </div>
            <div>
                <h1>To Do List</h1>
            </div>
            <div className="diagram">
                <PieChartTaches />
            </div>
        </div>
    );
}

export default Header;
