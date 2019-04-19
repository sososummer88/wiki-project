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
            Meteor.call("wikiexplore", search (err, data)=>{
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
    render () {
        return (
            <div>
                <div>
                    <h1>Wiki Explorer</h1>
                    <label htmlFor="wikiExplorer">Search</label>

                    <input type ="text" name = {"wikiExplorer"} value = {this.state.wikiExplorer} onChange={(e) => this.handleSearch(e)}/>
                </div>

                <div>
                    <h2>History</h2>
                    {this.state.data.length >0 ?
                        <div>
                            <h1>{this.state.data[0]}</h1>
                            {this.state.data[1].map((value, index) => {
                                return (
                                    <div key={index} style={{border: "1px solid #111111"}}>
                                        <p>Title: {value}</p><br/>
                                        <p>Description: {this.state.data[2][index]}</p><br/>
                                        <p>Link: <a href={this.state.data[3][index]}>{this.state.data[3][index]}</a></p><br/>
                                    </div>
                                );
                            })}
                        </div>
                        : ""}
                </div>
                <div>
                    {/*<h2>Content</h2>*/}
                    {/*<span dangerouslySetInnerHTML={{__html: this.state.content["*"]}}></span>*/}
                </div>
            </div>
        );
    }
}