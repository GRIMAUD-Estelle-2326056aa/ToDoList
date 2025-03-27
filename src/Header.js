import './styles/Header.css'

import { TodoContext } from "./Context/TodoContext";
import {useContext, useMemo} from "react";
import PieChartTaches from "./PieChartTaches";

const Header = () => {

    const { currentTodos } = useContext(TodoContext);
    const taches = currentTodos.taches;

    const nbTaches = taches.length;

    
    return (
        <div className="header">
            <div className="task-count">
                {nbTaches} Taches
            </div>
            <div>
                To Do List
            </div>
            <div className="diagram">
                <PieChartTaches />
            </div>
        </div>
    )
}

export default Header;