/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Route } from 'react-router-dom';
import Forget from './components/Forget/Forget';
import Layout, {Statement, PrivateRoute, Home, _Login, _Signup} from './components/Layout/Layout';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={_Signup} />
          <Route exact path="/login" component={_Login} />
          <Route exact path="/forget" component={Forget} />

          <PrivateRoute path='/statement' >
            <Statement/>
          </PrivateRoute>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
        </Layout>
      
    </>
  );
};
// 
export default  App;
