import Logo from '../assets/logo.svg'
import { ITodo } from '../Models'

interface INavBarProps {
    onTodos([]: ITodo[]): void
    todos: ITodo[]
}


export const NavBar: React.FC<INavBarProps> = ({ onTodos, todos }) => {

    const removeAll = () => {
        const shoudRemove = window.confirm('Delete all tasks?')
        if (shoudRemove) {
            onTodos([])
        }
    }
    return (
        <>
            <header>
                <div className="Logo">
                    <img src={Logo} alt="" />
                    <h1>React App</h1>
                </div>
                <nav>
                    <button onClick={() => removeAll()}>Dellete all tasks</button>
                </nav>
            </header>

        </>
    )
}