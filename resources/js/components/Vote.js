import React, { Component } from 'react';
import axios from 'axios'
import { AlertList } from "react-bs-notifier";

export default class Vote extends Component {

    constructor () {
        super()

        this.state = {
            alerts: []
        }

        this.renderOption = this.renderOption.bind(this)
    }

    onAlertDismissed(alert) {
		const alerts = this.state.alerts;

		const idx = alerts.indexOf(alert);
		if (idx >= 0) {
			this.setState({
				alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
			});
		}
	}

    vote(voteOption) {
        axios.post('/api/votes', voteOption)
          .then(response => {
            this.setState({
                alerts: [...this.state.alerts, {
                    id: new Date().getTime(),
                    type: 'success',
                    message: 'Vote successfully sent!',
                }],
            })
          })
          .catch(error => {
            console.error(error)
          })
    }

    renderOption (voteOption) {
        return (
            <div key={voteOption.vote} 
            className={`vote__option vote__option--${voteOption.vote}`} 
            onClick={() => this.vote(voteOption)}
            >
                <span>{voteOption.label}</span>
            </div>
        )
    }

    render() {
        const voteOptions = [
            {vote: 'positive', label: ':-)' },
            {vote: 'neutral', label: ':-|' },
            {vote: 'negative', label: ':-(' },
        ]
        return (
            <div className='vote'>
                <div className='vote__options d-flex'>
                    { 
                        voteOptions.map((voteOption) => {
                            return this.renderOption(voteOption)
                        })
                    }   
                </div>
                <AlertList alerts={this.state.alerts} timeout={2000} onDismiss={this.onAlertDismissed.bind(this)}/>
            </div>
        )
    }
}
