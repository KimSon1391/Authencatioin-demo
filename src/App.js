import Header from 'components/Header/Header';
import Album from 'feature/Album/Album';
import Home from 'feature/Home/Home';
import Todo from 'feature/Todo/Todo';
import { Route, Switch } from 'react-router';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/todo" component={Todo} />
        <Route path="/album" component={Album} />
        <Route path="*" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
