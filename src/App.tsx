import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {BoardPage, Dashboard} from '@mt/pages'
import {Template} from '@mt/ui'

export const App: React.FC = () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route path="/board/:id">
          <BoardPage />
        </Route>
        <Route path="/boards">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Redirect to="/boards" />
        </Route>
      </Switch>
    </Template>
  </BrowserRouter>
)
