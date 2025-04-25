import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewUser from './component/ViewUser'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {console.log("Working")}
            <Route path="/" element={<ViewUser />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
