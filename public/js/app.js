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
        e.preventDefault();
        console.log("clicked")
        fetch("/jobs", {
            body: JSON.stringify({
                title: this.state.title,
                company: this.state.company,
                location: this.state.location,
                salary: this.state.salary,
                description: this.state.description,
            }),
            method: "POST",
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
            body: JSON.stringify(job, index),
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
                <div className="header">
                <h1 >My Job Finder</h1>
                <img className="logo" src="https://www.hivemechanic.org/wp-content/uploads/2022/06/ApplyNow-orange.png"></img>
                </div>
                <img className="image" src="https://images.unsplash.com/photo-1575212639485-8f48c3dd7f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"></img>
                <br />
                <hr />
                {this.state.jobs.map((element) => {
                    return(
                        <div >
                            <div className="jobs">
                            <h2>Role: {element.title}</h2>
                            <br />
                            <h3>Company: {element.company}</h3>
                            <br />
                            <h4>Location: {element.location}</h4>
                            <br />
                            <h4>Salary: {element.salary}</h4>
                            <br />
                            <p><b>Description: </b>{element.description}</p>
                            <br/>
                            <b>Url:</b> <a href="" target="_blank">{element.link}</a>
                           <br />
                           <br />
                           <div>
                        {this.state.jobs.map((job, index) => {
                            return(
                                <div>
                                    <div className={"jobs.complete" ? "complete" : ""}>
                                        {job.jobs}{" "}
                                    </div>
                                     <button className="Btn"
                                    onClick={() => {
                                        return this.deleteJob(job._id, index);
                                    }}>delete</button>
                                    {" "}
                                     <button className="Btn"
                                    onClick={() => {
                                        return this.updateJob(job, index);
                                    }}
                                    >
                                    {" "}
                                   {" "}
                                    update</button>
                                </div>
                            )
                        })}
                    </div>
                          
                                    </div>
                            </div>
                    )
                })}
                    {/* <ul>
                        {this.state.jobs.map((job, index) => {
                            return(
                                <li>
                                    <div className={"jobs.complete" ? "complete" : ""}>
                                        {job.jobs}{" "}
                                    </div>
                                     <button className="Btn"
                                    onClick={() => {
                                        return this.deleteJob(job._id, index);
                                    }}>delete</button>
                                    {" "}
                                     <button className="Btn"
                                    onClick={() => {
                                        return this.updateJob(job, index);
                                    }}
                                    >
                                    {" "}
                                   {" "}
                                    update</button>
                                </li>
                            )
                        })}
                    </ul> */}
                    <div>
                    <form onSubmit={this.handleForm} className="form">
                <h2>Add new job here!</h2>
                <br />
               
                    <label htmlFor="title">Role :</label>{" "}
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
                    <textarea 
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        />
                        <br />
                        <br />
                        <label htmlFor="link">Link :</label>{" "}
                    <input 
                        type="text"
                        id="link"
                        onChange={this.handleChange}
                        value={this.state.link}
                        />
                        <br />
                        <br />
                        <input type="submit" className="Btn" />

                        
                </form>
                </div>
                <footer>
                    <h3 className="footer">Euris Gonzalez 2022©</h3>
                </footer>
            </div>
        )
    }
};

ReactDOM.render(<App />, document.querySelector(".container"));