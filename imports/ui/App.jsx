import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

export default class App extends Component {

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

    renderHistory(){
        return this.state.history.map(p=>
            <div>
                {p.res.history}
            </div>
        );
    }
    renderLinks(){
        return this.state.links.map(p=>
            <div>
                {p.res.links}
            </div>
        );
    }
    render () {
        return (
            <div>
                <div>
                    <h1>Wiki Explorer</h1>
                    <label >Search: <input type ="text" ref = {this.state.data} onChange={(e) => this.handleSearch(e)}/></label>


                </div>

                <div>
                    <h2>History</h2>
                    {this.renderHistory()}

                </div>

                <div>
                   <h2>Links</h2>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}