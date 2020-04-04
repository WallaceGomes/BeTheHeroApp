import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Switch: Renderiza apenas a Route que der match no path
//Se não usar consegue renderizar todas as rotas

import Logon from './pages/Logon';
import Resgister from './pages/Register';
import Profile from './pages/Profile';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Logon} />
                <Route path= "/register" component={Resgister} />
                <Route path= "/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    );
}

