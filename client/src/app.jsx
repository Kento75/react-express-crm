import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';
import history from './history';
import Navbar from './containers/Navbar.jsx';
import routes from './routes';

if (process.env.NODE_ENV === 'development') {
    window.store = store; // lets us access the store in the browser console
}

const App = () => (
        <Provider store={store}>
            <Router history={history}>
                <Navbar>
                    {routes}
                </Navbar>
            </Router>
        </Provider>
);

ReactDom.render(<App/>, document.getElementById('react-app'));
