import React, { Component } from 'react'
import * as api from './api'
import Event from './Event'

export default class Events extends Component {
    state = {
        events: [],
        pagination: {},
        location: {}
    }

    componentDidMount(){
        api.getEvents().then(({events, pagination, location}) => {
            this.setState({events, pagination, location}, () => {
                console.dir(this.state.events)
            })
        })
    }

    render() {
        const {events} = this.state;
        return (
            <div>
                {events.map(event => {
                    return <Event event={event}/>
                })}
            </div>
        )
    }
}
