import { TodoContext, TodoProvider } from "./Context/TodoContext";
import Header from './Header';
import TableauTaches from "./TableauTaches";
import TableauCategories from "./TableauCategories";
import Footer from './Footer';
import './styles/App.css';
import todos from './todos.json';
import {useContext} from "react";

function AppContent() {
    const { currentView } = useContext(TodoContext);
    console.log("Vue actuelle :", currentView);

    return (
        <div className="app-container">
            <Header />
            <br />
            {currentView === 'tasks' ? <TableauTaches /> : <TableauCategories />}
            <br/>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <TodoProvider initialTodos={todos}>
            <AppContent />
        </TodoProvider>
    );
}

export default App;
