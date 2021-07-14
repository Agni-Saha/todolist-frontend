import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Axios from "axios"
import "./ToDo.css"

const Todo = (props) => (
    <tr>
        <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_description}
        </td>
        <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_responsible}
        </td>
        <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_priority}
        </td>
        <td>
            <Link className="todoEditLink" to={"/edit/" + props.todo._id} >Edit</Link>
        </td>
    </tr>
)


export default class ToDos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        this.cancelTokenSource = Axios.CancelToken.source();

        Axios.get("https://todolist-backend-mern-crud.herokuapp.com/todoDB/", {
            cancelToken: this.cancelTokenSource.token
        })
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(error => console.log(error))
    }

    todoListBody() {
        return this.state.todos.map((item, index) => {
            return (
                <Todo todo={item} key={index} />
            )
        })
    }

    render() {
        return (
            <div className="TodosListContainer">
                <h3 className="TodosHeader">Todos List</h3>
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th className="tableHeader">Description</th>
                            <th className="tableHeader">Responsible</th>
                            <th className="tableHeader">Priority</th>
                            <th className="tableHeader">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.todoListBody()
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
