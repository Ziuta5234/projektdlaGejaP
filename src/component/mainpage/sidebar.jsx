import './sidebar.css'
import { Link } from 'react-router-dom'
import logo from '../auth/logo.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../notification/toastProvider'

function Sidebar() {

  const [user, setUser] = useState(null)
  const [logout, setLogout] = useState(false)
  const navigate = useNavigate()

  const toast = useToast()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.log("Stary jakiś kurde error tu jest: ", e)
      }
    }
  }, [])

  const userName = user?.name || "Nieznane"
  const initials = userName.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase()

  const handleShowMenu = () => {
    setLogout(prev => !prev)
  }

  const logOutBtn = () => {
    localStorage.removeItem('user')
    navigate("/signin")
    toast.success("Zostałeś wylogowany!")
  }

  return (
    <div className="main-sidebar">
      <div className="sidebar__header">
        <div className="logo-circle"><img src={logo} alt="" /></div>
        <div className="logo-text">
          <span className="logo-title">ManageGym</span>
          <span className="logo-subtitle">MENU</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <p className="nav-section-title">Kategorie</p>
        <button className="nav-item mg-nav-item--active">
          <Link to={"/home"}>Główna</Link>
        </button>
        <button className="nav-item">
          <Link to={"/members"}>Uzytkownicy</Link>
        </button>
        <button className="nav-item">
          <Link to={"/stuff"}>Trenerzy &amp; pracownicy</Link>
        </button>
        <button className="nav-item">
          <Link to={"/memberships"}>Karnety</Link>
        </button>
        <button className="nav-item">
          <Link to={"/payments"}>Płatności &amp; przychody</Link>
        </button>
        <button className="nav-item">
          <Link to={"/attedence"}>Frekwencja</Link>
        </button>

        <p className="nav-section-title mg-nav-section-title--spaced">
          Ustawienia
        </p>
        <button className="nav-item">
          <Link to={"/mainsettings"}>Główne ustawienia</Link>
        </button>
        <button className="nav-item">
          <Link to={"/account"}>Konto</Link>
        </button>
        <button className="nav-item">
          <Link to={"/notification"}>Powiadomienia</Link>
        </button>
      </nav>

      <div className="sidebar__footer">
        <div className="user-avatar">{initials}</div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-role">Administrator siłowni</span>
        </div>
        <button onClick={handleShowMenu} className="user-menu-btn">⋮</button>
        {logout && (
          <button onClick={logOutBtn} className='logout-menu'>Wyloguj się</button>
        )}
      </div>
    </div>
  )
}

export default Sidebar