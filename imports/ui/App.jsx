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
import {Accounts} from "meteor/accounts-base";
import PropTypes from 'prop-types'
import {withTracker} from "meteor/react-meteor-data";
import { UserHis } from "../api/user";

class App extends Component {

    constructor (props){
        super(props);
        this.state = {
            content: "",
            links:[],
            title:"",
            shistory:[],
            err:"",
            loged: false,
            logerr: ""

        }
    }


    handleSubmit(event){
        event.preventDefault();
        const term = document.getElementById("searchbox").value;
        this.state.shistory.push(term);
        //this.props.history.push(term);
        console.log("searching " + term);
        console.log("shistory " + this.state.shistory);
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

        /*
        //save history
        Meteor.call("history.insert", this.props.history, (error) => {
            if (error !== undefined && error !== null) {
                alert(error);
            } else {

            }
        });
        */
    }

    onLogin(e) {
        e.preventDefault();
        let username = e.target.username.value.trim();
        let password = e.target.password.value.trim();
        console.log("login");
        console.log(username);
        console.log(password);

        Meteor.loginWithPassword({username: username}, password, err => {
            if(err) {
                console.log("login error");
                console.log(Meteor.user());
                this.setState({
                    logerr: "Login Failed",
                    loged: false
                });
            } else {
                console.log("login success");
                this.setState({
                    logerr: "",
                    loged: true
                });
            }
           // this.props.history.push("/");
        });
    }

    onSignup(e) {
        e.preventDefault();
        let username = e.target.username.value.trim();
        let password = e.target.password.value.trim();
        console.log("signup");
        console.log(username);
        console.log(password);

        Accounts.createUser(
            {username: username, password: password},
            err => {
                if(err) {
                    this.setState( {
                        logerr: err.reason,
                        loged: false
                    });
                } else {
                    this.setState({
                        logerr: "",
                        loged: true
                    });
                    //this.props.history.push("/");
                }
            }
        );
    }

    renderHistory(){
        return this.state.shistory.map((h, index)=>
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
                <h1> Signup </h1>
                <Form
                    onSubmit={this.onSignup.bind(this)}
                >
                    <Input
                        placeholder="Username..."
                        id="username"
                        type="text"
                    />
                    <Input
                        placeholder="Password..."
                        id="password"
                        type="text"
                    />
                    <Button fluid size="huge" id="accountButton">
                        Signup
                    </Button>
                </Form>


                <h1> Login </h1>
                <Form
                    onSubmit={this.onLogin.bind(this)}
                >
                    <Input
                        placeholder="Username..."
                        id="username"
                        type="text"
                        //value={this.state.typing}
                        //onChange={this.onChange.bind(this)}
                        // onFocus={() => this.setState({ nameFocus: true })}
                        //onBlur={() => this.setState({ nameFocus: false })}
                    />
                    <Input
                        placeholder="Password..."
                        id="password"
                        type="text"
                        //value={this.state.typing}
                        //onChange={this.onChange.bind(this)}
                        // onFocus={() => this.setState({ nameFocus: true })}
                        //onBlur={() => this.setState({ nameFocus: false })}
                    />

                    <Button fluid size="huge" id="accountButton">
                        Login
                    </Button>
                </Form>
                <div>
                    {this.state.logerr}
                </div>
            </div>
        );
    }

    render()
    {
        return (
            <div>
                {this.state.loged === false ? this.renderLogin() : this.renderWiki() }
            </div>
        )
    }

}

App.propTypes = {
    history: PropTypes.array,
    ready: PropTypes.bool,
};

export default withTracker(()=>{
    const userId = Meteor.userId();
    const userHisHandler = Meteor.subscribe("userhistory", userId);
    const ready = userHisHandler.ready();
    return {
        history: UserHis.findOne({_id: userId}),
        ready: ready,
    };
})(App);