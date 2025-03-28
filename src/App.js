import { TodoContext, TodoProvider } from "./context/TodoContext";
import Header from './components/Header';
import TableauTaches from "./components/TableauTaches";
import TableauCategories from "./components/TableauCategories";
import Footer from './components/Footer';
import './styles/App.css';
import todos from './json/todos.json';
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
