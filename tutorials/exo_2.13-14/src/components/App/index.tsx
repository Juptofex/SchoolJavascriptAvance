import { useEffect, useState } from 'react'
import RandomDog from '../RandomDog'
import Joke from '../Joke';
import './App.css'

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = (e: React.FormEvent) => {
    e.preventDefault();
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className='page'>
        <div>
          <h1>Random Joke</h1>
          <Joke />
        </div>

        <div>
          <h1>Here's three random dog :</h1>
          <div id='random-dogs'>
            <RandomDog refresh={refresh} />
            <RandomDog refresh={refresh} />
            <RandomDog refresh={refresh} />
          </div>
          <form onSubmit={handleRefresh}>
            <button name='refresh'>Get 3 more dogs</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
