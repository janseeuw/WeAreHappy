import React, { Component } from 'react'
import Moment from 'moment'

export default class Stats extends Component {
    constructor (props) {
        super()

        this.state = {
            votes: [],
            filteredVotes: [],
            filter: 'Day'
        }
    }

    setFilter (filter) {
        this.setState( {
            filteredVotes: this.filterVotes(this.state.votes, filter),
            filter: filter,
        })
    }

    filterVotes (votes, filter) {
        return _.chain(votes)
            .filter((vote) => {
                return Moment(vote['dateAdded']).startOf(filter).toISOString() === Moment(new Date()).startOf(filter).toISOString()
            })
            .groupBy((vote) => {
                return vote['vote']
            })
            .value()
    }

    componentDidMount () {
        axios.get('/api/votes').then(response => {
            if (!response && !response.data) {
                return
            }

            this.setState({ 
                votes: response.data,
                filteredVotes: this.filterVotes(response.data, 'Day'),
            })
        }).catch((error) => console.error(error))
    }

    renderFilters () {
        const filters = ['Day', 'Week', 'Month']

        return (
            <div className="nav nav-pills card-header-pills">
            { filters.map( (filter) => {
                return <a href='javascript:;' 
                    className={`nav-item nav-link ${this.state.filter === filter? 'active' : null}`} 
                    key={filter} 
                    onClick={() => this.setFilter(filter)}>{filter}
                </a>
            })}
            </div>
        )
    }

    renderDate () {
        const { filter } = this.state 

        return (
            <div className='stats__date'>
                <span>Votes since <strong>{Moment(new Date()).startOf(filter).format('LL')}</strong></span>
            </div>
        )
    }

    renderStats () {
        const { filteredVotes } = this.state

        return (
            <div className='list-group list-group-flush'>
                { filteredVotes && Object.keys(filteredVotes).map((vote) => {
                    return <div className='list-group-item stats__item' key={vote}>
                        <span>{vote}</span>
                        <span>{filteredVotes[vote].length}</span>
                    </div>
                })}
            </div>
        )
    }

    renderTable () {
        return (
            <div className='card'>
                  <div className='card-header'>
                    {this.renderFilters()}
                    {this.renderDate()}
                  </div>
                  <div className='card-body'>
                    {this.renderStats()}
                  </div>
            </div>
        )
    }

    render () {
        return (
            <div className='.stats container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        {this.renderTable()}
                    </div>
                </div>
            </div>
        )
    }
}
