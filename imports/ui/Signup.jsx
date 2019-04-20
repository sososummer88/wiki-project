import React from "react";
import { Accounts } from "meteor/accounts-base";
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

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let username = e.target.username.value.trim();
        let password = e.target.password.value.trim();

        Accounts.createUser(
            {username: username, password: password},
            err => {
                if (err) {
                    this.setState({
                        error: err.reason
                    });
                } else {
                    this.setState({
                        error: ""
                    });
                    this.props.history.push("/");
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Header> Sign Up </Header>
                <Form
                    onSubmit={this.onSubmit.bind(this)}
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
                        Create Account
                    </Button>
                </Form>

            </div>
        );
    }
}

