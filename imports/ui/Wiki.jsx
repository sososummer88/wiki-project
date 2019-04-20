import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import {
    Button,
    Container,
    Badge,
    Card,
    CardTitle,
    CardText,
    Row,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem
} from "reactstrap";

export default class Wiki extends Component {

    constructor (props){
        super(props);
        this.state = {
            content: "",
            links:[],
            title:"",
            history:[],
            err:""
        }
    }

    handleChangeSearch(event) {
        console.log("changed");
        Meteor.call("wikiexplore", (err, data)=>{
            this.setState({
                title: res.title,
                content: res.text,
                links: res.links,
            })
        });
        /*
        this.setState({
            content: event.target.value,
        })
        */
    }

    handleSubmit(event){
        event.preventDefault();
        const term = document.getElementById("searchbox").value;
        this.state.history.push(term);
        console.log("searching " + term);
        console.log("history " + this.state.history);
        Meteor.call("wikiexplore", term, (err, res)=>{
            console.log(res);
            if(err){
                this.setState({err});
                return;
            }
            if (res) {
                this.setState({
                    title: res.title,
                    content: res.text,
                    links: res.links
                })
            }
        })
    }

    onLogin(e) {
        e.preventDefault();
    }

    handleSearch(event) {
        event.preventDefault();
        if(this.state.wikiSearch !==""){
            Meteor.call("wikiexplore", (err, data)=>{
                if(err){
                    this.setState({err});
                    return;
                }
                this.setState({
                    title: res.title,
                    content: res.text,
                    links: res.links,
                })
            })
        }
    }

    onKeyPress(event) {
        if(event.key == "enter"){
            this.setState({
                history: [this.input.value]
            });
            this.wikiexplore(this.input.value);
            this.input.value ="";
        }
    }
    renderHistory(){
        return this.state.history.map((h, index)=>
            <div key ={index}>
                {h}
            </div>
        );
    }

    renderLinks(){
        return this.state.links.map((l, index) =>
            <div key={index}>
                {l["*"]}
            </div>
        );
    }

    renderContent() {
        return <span dangerouslySetInnerHTML={{__html: this.state.content["*"]}}></span>;
    }

    renderWiki() {
        return (
            <div>
                <div>
                    <h1>Wiki Explorer</h1>
                    <Input
                        placeholder="Search..."
                        id="searchbox"
                        type="text"
                        //value={this.state.typing}
                        //onChange={this.onChange.bind(this)}
                        // onFocus={() => this.setState({ nameFocus: true })}
                        //onBlur={() => this.setState({ nameFocus: false })}
                    />
                    <div className="text-center">
                        <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            //disabled={this.state.typing == ""}
                            onClick={this.handleSubmit.bind(this)}
                        >
                            Search
                        </Button>
                    </div>

                </div>

                <div>
                    <h2>History</h2>
                    {this.renderHistory()}

                </div>

                <div>
                    <h2>Title</h2>
                    {this.state.title}
                </div>

                <h2>Content</h2>
                {this.renderContent()}

                <div>
                    <h2>Links</h2>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }

    renderLogin() {
        return (
            <div>
                <h1> Login </h1>
                <Form
                    onSubmit={this.onLogin.bind(this)}
                >
                    <label htmlFor="username">Username</label>
                    <Form.Input
                        id={"username"}
                        fluid
                        icon="user"
                        iconPosition="left"
                        type="text"
                        name="username"
                        placeholder="username"
                        size="small"
                    />
                    <label htmlFor="password">Password</label>
                    <Form.Input
                        id={"password"}
                        fluid
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        name="password"
                        placeholder="password"
                        size="small"
                    />
                    <Button fluid size="huge" id="accountButton">
                        Login
                    </Button>
                </Form>

            </div>
        );
    }

    render()
    {
        return (
            <div>
                {Meteor.user() === undefined || Meteor.user() === null ? this.renderLogin() : this.renderWiki() }
            </div>
        )
    }

}
