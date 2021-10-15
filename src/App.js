import Header from 'components/Header/Header';
import Album from 'feature/Album/Album';
import CartFeature from 'feature/Cart/CartFeature';
import Home from 'feature/Home/Home';
import ProductFeature from 'feature/Products/ProductFeature';
import Todo from 'feature/Todo/Todo';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  const loginState = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginState.id;

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
        {isLoggedIn && (
          <>
            <Route path="/todo" component={Todo} />
            <Route path="/album" component={Album} />
          </>
        )}
        <Route path="*" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
