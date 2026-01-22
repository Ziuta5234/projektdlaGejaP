import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from './logo.png'
import firstImage from './first.png'
import { useToast } from '../notification/toastProvider'
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [success, setSuccess] = useState("")
    const [errorLog, setError] = useState("")

    const toast = useToast()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('pass', pass)
        formData.append('repeatPass', repeatPass)

        try {
            const response = await fetch("http://localhost/backend/SingUp.php", {
                method: "POST",
                body: formData 
            })

            const data = await response.json()

            if(data.status === "ok") {
                setSuccess(data.message)
                setName("")
                setEmail("")
                setPass("")
                setRepeatPass("")
                
                // DODAJ PRZEKIEROWANIE PO 2 SEKUNDACH
                setTimeout(() => navigate("/signin"), 2000);
                toast.success("Zarejestrowałeś się!")
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError("Błąd połączenia z serwerem");
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
                            <h1>ZAREJESTRUJ SIĘ</h1>
                            <p>Witamy w nowym ulubionym miejscu</p>
                        </div>

                        {/* DODAJ WYŚWIETLANIE KOMUNIKATÓW */}
                        {/* {success && (
                            <div style={{ 
                                color: 'green', 
                                padding: '10px', 
                                margin: '10px 0', 
                                border: '1px solid green',
                                borderRadius: '5px',
                               backgroundColor: '#f0fff0'
                            }}>
                                ✅ {success}
                            </div>
                        )} */}
                    
                        {/* {error && (
                            <div style={{ 
                                color: 'red', 
                                padding: '10px', 
                                margin: '10px 0', 
                                border: '1px solid red',
                                borderRadius: '5px',
                                backgroundColor: '#fff0f0'
                            }}>
                                ❌ {error}
                            </div>
                        )} */}

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="inputNameRegister">Imię: </label>
                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                                name="inputNameRegister" 
                                required 
                            />
                        
                            <label htmlFor="inputEmailRegister">Email: </label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                name='inputEmailRegister' 
                                type="email" 
                                required 
                            />
                        
                            <label htmlFor="inputPasswordRegister">Hasło: </label>
                            <input 
                                value={pass}
                                onChange={(e) => setPass(e.target.value)} 
                                name='inputPasswordRegister' 
                                type="password" 
                                required 
                            />
                        
                            <label htmlFor="inputRepeatPasswordRegister">Powtórz hasło: </label>
                            <input 
                                value={repeatPass}
                                onChange={(e) => setRepeatPass(e.target.value)} 
                                type="password" 
                                name="inputRepeatRegister" 
                                required
                            />
                        
                            <div className='inputCheckDiv'>
                                <div>
                                    <input name='inputCheckRegister' type="checkbox"/>
                                    <label htmlFor="inputCheckRegister">Zapamietaj mnie</label>
                                </div>
                            </div>
                        
                            <button type="submit">Zarejestruj się</button>
                            <hr/>
                        </form>
                    
                        <p>Zarejestruj się przy pomocy:</p>
                        <div className='divButtonsWithLogs'>
                            <button type="button">Google</button>
                            <button type="button">Apple</button>
                        </div>
                    
                        <div className='divToSwitch'>
                            {/* POPRAW LINK - ma iść do /signin a nie / */}
                            <p>Jednak masz konto? <Link to="/signin">Kliknij tutaj</Link></p>
                        </div>
                    </div>
                
                    <div className="DivCopyrights">
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

export default SignUp