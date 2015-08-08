// code
import React from 'react';
import Router, {DefaultRoute, Route} from 'react-router';
import App from './app/app';
import Intro from './pages/intro';
import Main from './pages/main';

const routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={Intro} />
        <Route name="main" handler={Main} />
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
});
