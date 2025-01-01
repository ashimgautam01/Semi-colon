import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp'
import LoginPage from './pages/Login'
import Home from "./pages/Home"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/signup' element={<SignUpPage/>}  />
      <Route path='/login' element={<LoginPage/>}  />
    </Routes>
    </BrowserRouter>
  )
}

export default App
