import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './component/auth/signIn.jsx'
import SignUp from './component/auth/signUp.jsx'
import ResetPassword from './component/auth/resetPassword.jsx'
import Home from './component/mainpage/home.jsx'
import Members from './component/mainpage/members.jsx'
import Stuff from './component/mainpage/stuff.jsx'
import Attedence from './component/mainpage/attedence.jsx'
import Memberships from './component/mainpage/memberships.jsx'
import Payments from './component/mainpage/payments.jsx'
import Mainsettings from './component/mainpage/mainsettings.jsx'
import Account from './component/mainpage/account.jsx'
import Notification from './component/mainpage/notification.jsx'
import { ToastProvider } from './component/notification/toastProvider.jsx'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />  
          <Route path="/resetPassword" element={<ResetPassword/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/members' element={<Members/>}/>
          <Route path='/stuff' element={<Stuff/>}/>
          <Route path='/attedence' element={<Attedence/>}/>
          <Route path='/memberships' element={<Memberships/>}/>
          <Route path='/payments' element={<Payments/>}/>
          <Route path='/mainsettings' element={<Mainsettings/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/notification' element={<Notification/>}/>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App