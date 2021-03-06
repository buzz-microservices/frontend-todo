import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';


const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_timezone}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};

    }

    componentDidMount() {
        this._isMounted = true;
        axios.get(process.env.REACT_APP_BACKEND_TODO_CRUD_URL)
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps) {
        axios.get(process.env.REACT_APP_BACKEND_TODO_CRUD_URL)
        .then(response => {
            if(this.props.todos !== prevProps.todos){
            this.setState({todos: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        if(!this.state.todos.length)
        return( 
            <ReactLoading type="bars" color="#485087" delay={0} /> 
        )
        
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Time Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
