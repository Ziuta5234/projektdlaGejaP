import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react'
import Sidebar from './sidebar.jsx'
import '../auth/style.css'

function Home () {

    return (
        <div className='maindiv'>
            <Sidebar/>
            <h1>Siemasz kurwo wiesz co to konswekwencja?</h1>
        </div>
    )
}

export default Home