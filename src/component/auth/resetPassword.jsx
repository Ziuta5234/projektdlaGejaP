import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import firstImage from './first.png'
import { useToast } from '../notification/toastProvider'

// do zmiany emailu nie rob walidacji po stronie serwera paweł by hacker nie wiedzial czy taki email istnieje czy nie, zawsze musi byc powiadomienie ze wyslalo sie

function ResetPassword () {
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState("")

    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("", { // do nawiasow daj sciezke do twojego pliku php piekny pawle goniaku...
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({email})
            })

            const data = await response.json()
            if (data.status === "ok") {
                setSuccess("Wysłano pomyślnie reset na email!")
                toast.success("Sprawdź email!")
            }
        } catch (error) {
            console.log(error.message)
            toast.success("Sprawdź email!")
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
                            <h1>ZMIEŃ HASŁO</h1>
                            <p>Witamy ponownie w twoim ulubionym miejscu!</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='inputEmail'>Email: </label>
                            <input onChange={(e) => setEmail(e.target.value)} name='inputEmail' type="email" required/>
                            <button className='submitbuttonForm' type="submit">Zresetuj hasło</button>
                        </form>
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

export default ResetPassword