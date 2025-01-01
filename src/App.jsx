import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUpPage from './pages/SignUp'
import LoginPage from './pages/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUpPage/>}  />
      <Route path='/login' element={<LoginPage/>}  />
    </Routes>
    </BrowserRouter>
  )
}

export default App
