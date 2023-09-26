import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'
import List from './components/main/List'
import Header from './components/header/Header'

import Footer from './components/footer/Footer'

function App() {
  const [editedMessage, setMessage] = useState(0)
  const handleChange = (message) =>{
    setMessage(message)
  }
  return (
    
    <div className='containerLayout'>
    <Header/>
      <List changeMessage={handleChange}/>
      <Footer editedMessage ={editedMessage} setMessage={setMessage}/>
    </div>

  )
}

export default App
