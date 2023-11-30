import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import Headers from './components/layout/Headers';
import NavScrollExample from './components/layout/Nav';

function App() {
  return (
   <>
<Router>
<Headers/>
<NavScrollExample />
</Router>
   </>
  );
}

export default App;
