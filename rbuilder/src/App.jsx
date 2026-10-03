import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Langing from './pages/Langing'
import ResumeGen from './pages/ResumeGen'
import View from './pages/View'
import History from './pages/History'
import UserForm from './pages/UserForm'
import Head from './components/Head'






function App() {


  return (
    <>
<Header/>
      <Routes>
        <Route path='/' element={<Langing />} />
        <Route path='/resume' element={<ResumeGen />} />
        <Route path='/form' element={<UserForm />} />
        <Route path='/resume/:id/view' element={<View />} />
        <Route path='/history' element={<History />} />

      </Routes>




      <Footer />
    </>
  )
}

export default App
