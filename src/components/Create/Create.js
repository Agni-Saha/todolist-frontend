import React, { Component } from 'react'
import Axios from "axios"
import "./Create.css"

export default class Create extends Component {
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
        this.onSubmit = this.onSubmit.bind(this)
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
    onSubmit(event) {
        event.preventDefault()
        console.log("Form Submitted")

        console.log(this.state.todo_description)
        console.log(this.state.todo_responsible)
        console.log(this.state.todo_priority)
        console.log(this.state.todo_completed)

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        Axios.post("https://todolist-backend-mern-crud.herokuapp.com/todoDB/add", newTodo)
            .then(response => console.log(response.data))

        this.setState({
            todo_description: "",
            todo_responsible: "",
            todo_priority: "",
            todo_completed: false
        })
    }

    render() {
        return (
            <div className="ToDoContainer">
                <h3>Create New To-Do</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="todoDescription">Description</label>
                        <input type="text" className="formInputTags"
                            id="todoDescription"
                            value={this.state.todo_description}
                            onChange={this.onChangeToDoDescription}
                        />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group ToDoSubmitButton">
                        <button type="submit" className="SubmitButton">
                            Create Todo
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
