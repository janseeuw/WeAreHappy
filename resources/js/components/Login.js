import React, { Component } from 'react'

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            password: '',
            errors: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.login = this.login.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleInputChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    login (event) {
        event.preventDefault()

        const { password } = this.state

        axios.post('/api/login', { password })
            .then(response => {
                    this.props.onLogin()
                })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor (field) {
        return !!this.state.errors[field]
      }

      renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }

    render () {
        return (
            <React.Fragment>
                <div className='container py-4'>
                    <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                        <div className='card-header'>Login</div>
                        <div className='card-body'>
                            <form onSubmit={this.login}>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='text'
                                    className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                {this.renderErrorFor('password')}
                            </div>
                            <button className='btn btn-primary'>Login</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>   
        )
    }
}

