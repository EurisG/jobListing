class App extends React.Component {
    state = {
        jobs: [],
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
    };

    componentDidMount() {
        fetch("/jobs")
        .then((res) => {
            return res.json();
        })
        .then((jobs) => {
            this.setState({ jobs: jobs.data.jobs });
        })
        .catch((error) => {
            console.error(error.message);
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };


    handleForm = (e) => {
        e.preventDeafult();
        fetch("/jobs", {
            body: JSON.stringify({
                title: this.state.title,
                company: this.state.company,
                location: this.state.location,
                salary: this.state.salary,
                description: this.state.description,
            }),
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            //      Accept: "application/json, text/plain, */*",
            // },
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                jobs: [...this.state.jobs],
            });
        })
        .catch((error) => {
            console.error(error.message);
        });
    };

    deleteJob = (id, index) => {
        fetch(`/jobs/${id}`, { method: "DELETE" }).then(() => {
            this.setState({
                jobs: [
                    ...this.state.jobs.slice(0, index),
                    ...this.state.jobs.slice(index + 1),
                ],
            });
        });
    };

    updateJob = (job, index) => {
        job.complete = !job.complete;
        console.log(job);
        fetch(`jobs/${job._id}`, {
            body: JSON.stringify(job),
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                jobs: [...this.state.jobs],
            });
        })
        .catch((error) => {
            console.error(error.message);
        })
    }
    render() {
        return(
            <div>
                <h1>My Job Listings</h1>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="title">Role</label>{" "}
                    <input 
                        type="text"
                        id="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        />
                        <br />
                        <br />
                    <label htmlFor="company">Company Name :</label>{" "}
                    <input 
                        type="text"
                        id="company"
                        onChange={this.handleChange}
                        value={this.state.company}
                        />
                        <br />
                        <br />
                    <label htmlFor="location">location :</label>{" "}
                    <input 
                        type="text"
                        id="location"
                        onChange={this.handleChange}
                        value={this.state.location}
                        />
                        <br />
                        <br />
                    <label htmlFor="salary">Salary :</label>{" "}
                    <input 
                        type="text"
                        id="salary"
                        onChange={this.handleChange}
                        value={this.state.salary}
                        />
                        <br />
                        <br />
                    <label htmlFor="description">Job description :</label>{" "}
                    <input 
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        />
                        <br />
                        <br />
                        <input type="submit" />
                </form>
                <h2>{this.state.title}</h2>
                <hr />
                    <ul>
                        {this.state.jobs.map((job, index) => {
                            return(
                                <li>
                                    <div className={"job.complete" ? "complete" : ""}>
                                        {job.jobs}{" "}
                                    </div>
                                    <button 
                                    onClick={() => {
                                        return this.deleteJob(todo._id, index);
                                    }}></button>
                                     <button
                                    onClick={() => {
                                        return this.updateTodo(todo, index);
                                    }}
                                    >
                                    {" "}
                                    Complete{" "}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
            </div>
        )
    }
};

ReactDOM.render(<App />, document.querySelector(".container"));