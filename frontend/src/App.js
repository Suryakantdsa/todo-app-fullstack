import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoApp from './TodoApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <TodoApp/>}/>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
