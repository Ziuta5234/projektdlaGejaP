import './style.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from './logo.png'
import firstImage from './first.png'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../notification/toastProvider'

function SignIn() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const toast = useToast()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost/backend/SingIn.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, pass})
            })

            const data = await response.json()

            if (data.status === "ok") {
                setSuccess("Zalogowano pomyślnie")
                localStorage.setItem('user', JSON.stringify(data.user))
                toast.success("Zalogowano pomyślnie")
                
                setTimeout(() => {
                    navigate("/home")
                }, 1000)
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError("Błąd połączenia z serwerem")
            toast.error(data.message ?? "Błąd logowania")
        }
    }

    return (
        <div className='bodydiv'>
            <div className='mainContainerFirstPage'>
                <div className='nameOfCompanyDiv'>
                    <img src={logo} alt="" />
                    <h2>ManageGym.pl</h2>
                </div>
                <div className='mainSigninCard'>
                    <div className='welcomeBackCard'>
                        <div className='welcomeTexts'>
                            <h2 className='h2ManageGym'>Zarządzanie siłownią</h2>
                            <h1>WITAMY PONOWNIE</h1>
                            <p>Witamy ponownie w twoim ulubionym miejscu!</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor='inputEmail'>Email: </label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                name='inputEmail' 
                                type="email" 
                                required 
                            />
                            <label htmlFor='inputPassword'>Hasło: </label>
                            <input 
                                value={pass}
                                onChange={(e) => setPass(e.target.value)} 
                                name='inputPassword' 
                                type="password" 
                                required 
                            />
                            <div className='inputCheckDiv'>
                                <div>
                                    <input name='inputCheck' type="checkbox"/>
                                    <label htmlFor="inputCheck">Zapamietaj mnie</label>
                                </div>
                                <p><Link to="/resetPassword">Zapomniałeś hasła?</Link></p>
                            </div>
                            <button type="submit">Zaloguj się</button>
                            <hr/>
                        </form>
                        <p>Zaloguj się przy pomocy:</p>
                        <div className='divButtonsWithLogs'>
                            <button type="button">Google</button>
                            <button type="button">Apple</button>
                        </div>
                    </div>
                    <div className='divToSwitch'>
                        <p>Nie masz konta? <Link to="/">Zarejestruj się</Link></p>
                    </div>
                    <div className='DivCopyrights'>
                        <p>&copy; 2025 Olaf Puchała</p>
                    </div>
                </div>
                <div className='divPng'>
                    <img src={firstImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignIn