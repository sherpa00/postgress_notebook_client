
import './App.css';
import AddNote from './components/addNote';
import ShowNotes from './components/showNote';

function App() {
  return (
    <div className="App">
      <h2>PERN NOTEBOOK</h2>
      <p>A simple notebook app powered by PERN stack.</p>
      <br></br>
      <AddNote />
      <br></br>
      <ShowNotes />
    </div>
  );
}

export default App;
