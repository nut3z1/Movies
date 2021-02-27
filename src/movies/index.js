import React, { lazy, Suspense } from 'react';
import { Skeleton } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { isAuthenticated } from "./services/login";

const HomeComponent = lazy(() => import('./pages/home'));
const NewFilmComponent = lazy(() => import('./pages/new-film'));
const SearchComponent = lazy(() => import('./pages/search-film'));
const DetailMovieComponent = lazy(() => import('./pages/detail'));
const LoginComponent = lazy(() => import('./pages/login'));

const LoginRouter = ({ children, ...rest }) => {
  const isLogin = isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) => isLogin ? (
        <Redirect to={{
          pathname: "/",
          state: { from: location }
        }}
        />
      ) : (children)}
    />
  )
}

const PrivateRoute = ({ children, ...rest }) => {
  const auth = isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) => auth ? (children) : (
        <Redirect to={{
          pathname: "/login",
          state: { from: location }
        }} />
      )}
    />
  )
}

const Movies = () => {
  return(
    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Switch>
          <PrivateRoute path="/home">
            <HomeComponent />
          </PrivateRoute>
          <PrivateRoute path="/new-film">
            <NewFilmComponent />
          </PrivateRoute>
          <PrivateRoute path="/search-film">
            <SearchComponent />
          </PrivateRoute>
          {/* localhost:3000/movie/ngoi-nha-hanh-phuc~2199 */}
          <PrivateRoute path="/movie/:slug~:id">
            <DetailMovieComponent/>
          </PrivateRoute>
          <LoginRouter path="/login">
            <LoginComponent/>
          </LoginRouter>
          <PrivateRoute extract path="/">
            <HomeComponent/>
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  )
} 
export default Movies;