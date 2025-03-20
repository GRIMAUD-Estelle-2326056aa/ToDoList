const Header = ({taches = []}) => {
    const nbTaches = taches.length;

    return (
        <div>
            <div>
                {nbTaches} Taches
            </div>
            <div>
                To Do List
            </div>
            <div>
                chart
            </div>
        </div>
    )
}

export default Header;