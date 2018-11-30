import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Vote from './Vote'
import Stats from './Stats'
import Login from './Login'
import Header from './Header'

export default class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isLoggedIn: true,
        }

        this.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogin () {
        this.setState({ isLoggedIn: true })
    }

    onLogout () {
        this.setState({ isLoggedIn: false })
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div className='app'>
                <BrowserRouter>
                    <React.Fragment>
                        <Header isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout} />
                        <Switch>
                            <Route exact path='/vote' component={Vote} />
                            <Route exact path='/stats' component={Stats} />
                            <Route path="*" render={() => (<Redirect to="/vote" />)} />          
                        </Switch>
                    </React.Fragment>   
                </BrowserRouter>
                </div>
            )
        }

        return (
            <div className='app'>
            <BrowserRouter>
                <React.Fragment>
                    <Header isLoggedIn={this.state.isLoggedIn} onLogout={this.onLogout} />
                    <Switch>
                        <Route exact path='/vote' component={Vote} />
                        <Route exact path='/login' component={() => {
                            return <Login onLogin={this.onLogin} />
                        }} />
                        <Route path="*" render={() => (<Redirect to="/vote" />)} />
                    </Switch>
                </React.Fragment>   
            </BrowserRouter>
            </div>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
