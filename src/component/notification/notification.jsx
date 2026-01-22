import './notification.css'
import { useState } from 'react'
import { FaBell } from 'react-icons/fa'

function ToastNotification ({title = "Powiadomienie", message, type="info", when="now", onClose}) {
    if (!message) return null

    return (
        <div className='main-Container-Toast'>
            <div className='left-Toast'>
                <div className='toast-Inside'>
                    <FaBell />
                    <h2>{title}</h2>
                </div>
                <h3>{message}</h3>
            </div>
            <div className='right-Toast'>
                <div className='text-when'>
                    <p>{when}</p>
                </div>
            </div>
        </div>
    )
}

export default ToastNotification