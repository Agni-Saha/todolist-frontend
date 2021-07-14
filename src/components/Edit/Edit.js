import React, { Component } from 'react'
import "./Edit.css"
import Axios from 'axios'

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo_description: "",
            todo_responsible: "",
            todo_priority: "",
            todo_completed: false
        }
        this.onChangeToDoDescription = this.onChangeToDoDescription.bind(this)
        this.onChangeToDoResponsible = this.onChangeToDoResponsible.bind(this)
        this.onChangeToDoPriority = this.onChangeToDoPriority.bind(this)
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        Axios.get("https://todolist-backend-mern-crud.herokuapp.com/todoDB/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    onChangeToDoDescription(event) {
        this.setState({
            todo_description: event.target.value
        })
    }

    onChangeToDoResponsible(event) {
        this.setState({
            todo_responsible: event.target.value
        })
    }

    onChangeToDoPriority(event) {
        this.setState({
            todo_priority: event.target.value
        })
    }

    onChangeTodoCompleted(event) {
        this.setState({
            todo_completed: !this.state.todo_completed
        })
    }

    onSubmit(event) {
        event.preventDefault()
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        Axios.post("https://todolist-backend-mern-crud.herokuapp.com/todoDB/update/" + this.props.match.params.id, obj)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/')
            })
            .catch(error => console.log(error))
    }

    onDelete(event) {
        event.preventDefault()

        Axios.delete("https://todolist-backend-mern-crud.herokuapp.com/todoDB/delete/" + this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/')
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="EditListContainer">
                <h3 className="EditTodoHeader">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group InputField">
                        <label htmlFor="todoDescription">Description</label>
                        <input type="text" className="formInputTags"
                            id="todoDescription"
                            value={this.state.todo_description}
                            onChange={this.onChangeToDoDescription}
                        />
                    </div>
                    <div className="form-group InputField">
                        <label htmlFor="todoResponsible">Responsible</label>
                        <input type="text" className="formInputTags"
                            id="todoResponsible"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeToDoResponsible}
                        />
                    </div>
                    <div className="form-group priorityList">
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                id="priorityLow"
                                name="priorityOptions"
                                value="Low"
                                checked={this.state.todo_priority === "Low"}
                                onChange={this.onChangeToDoPriority}
                            />
                            <label htmlFor="priorityLow"
                                className="form-check-label">
                                Low
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                id="priorityMedium"
                                name="priorityOptions"
                                value="Medium"
                                checked={this.state.todo_priority === "Medium"}
                                onChange={this.onChangeToDoPriority}
                            />
                            <label htmlFor="priorityMedium"
                                className="form-check-label">
                                Medium
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                id="priorityHigh"
                                name="priorityOptions"
                                value="High"
                                checked={this.state.todo_priority === "High"}
                                onChange={this.onChangeToDoPriority}
                            />
                            <label htmlFor="priorityHigh"
                                className="form-check-label">
                                High
                            </label>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="completedCheckBox"
                                id="completedCheckBox"
                                value={this.state.todo_completed}
                                className="form-check-input"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                            />
                            <label htmlFor="completedCheckBox"
                                className="form-check-label">
                                Completed
                            </label>
                        </div>
                    </div>
                    <div className="form-group ToDoSubmitButton">
                        <button type="submit" className="SubmitButton">
                            Update Todo
                        </button>
                        <button className="DeleteButton ml-2"
                            onClick={this.onDelete}>
                            Delete Todo
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
