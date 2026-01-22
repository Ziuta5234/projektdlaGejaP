import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './sidebar.jsx'
import '../auth/style.css'
import { useEffect } from 'react'
import './members.css'
import { FiSearch } from 'react-icons/fi'
import { FiChevronDown } from "react-icons/fi";
import { useToast } from '../notification/toastProvider'

function Members () {

    const [filters, setFilters] = useState('all')
    const [members, setMembers] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const toast = useToast()

    const pageSize = 5

    useEffect( () => {
        setPage(1)
    }, [search, filters])

    useEffect( () => {
        fetch("http://localhost/backend/members.php")
            .then(response => response.json())
            .then(data => setMembers(data))
    }, [])

    const filtered = members
        .filter(member =>
        `${member.imie} ${member.nazwisko}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(member =>
        filters === 'all' ? true : member.status === filters
    );

    const totalPage = Math.max(1, Math.ceil(filtered.length / pageSize))
    const start = (page - 1) * pageSize
    const pageData = filtered.slice(start, start + pageSize)

    const from = filtered.length === 0 ? 0 : start + 1
    const to = Math.min(start + pageSize, filtered.length)

    const handleExport = () => {
        if (members.length !== 0) {
            const headers = [
                "imie",
                "nazwisko",
                "email",
                "id_karnetu",
                "data_kupna",
                "data_odnowienia",
                "status",
                "trener",
                "stan_konta",
                "ostatnie_wejscie"
            ]

            const rows = members.map(m => [
                m.imie, m.nazwisko, m.email, m.id_karnetu, m.data_kupna, m.data_odnowienia, m.status, m.trener, m.stan_konta, m.ostatnie_wejscie
            ])

            const csvFile = [
                headers.join(";"),
                ...rows.map(r => r.join(";"))
            ].join("\n")

            const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" })
            const url = URL.createObjectURL(blob)

            const link = document.createElement("a");
            link.href = url;
            link.download = "uzytkownicy.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("Export udany!")
        }

    }

    function lack () {
        if (filters == 'all') {
            return "Brak filtrów"
        } else {
            return `Filtr: ${filters}`
        }
    }

    return(
        <div className='maindiv'>
            <Sidebar/>
            <div className="mainContainer-members">
                <div className="header-of-members">
                    <h1>Użytkownicy</h1>
                    <p>Zarządzaj swoimi klientami siłowni, wyświetlaj profile i śledź karnety</p>
                </div>
                <div className="filter-of-members">
                    <div className="first-row-filter">
                        <div className="filter-input-div">
                            <FiSearch className="iconSearch"/>
                            <input placeholder='Wyszukaj uzytkownika...' type="text" onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <div className="right-row-filter">
                            <div className="select-wrapper">
                                <select className='custom-select' value={filters} onChange={(e) => setFilters(e.target.value)}>
                                    <option value="all">Wybierz Filtr</option>
                                    <option value="Nieaktywny">Nieaktywne</option>
                                    <option value="Aktywny">Aktywne</option>
                                    <option value="Zamrożony">Zamrozone</option>
                                </select>
                                <FiChevronDown className="select-icon" size={18} />
                            </div>
                            <button onClick={handleExport}>Export</button>
                        </div>
                    </div>
                    <hr />
                    <div className="second-row-filter">
                        <p>{lack()}</p>
                    </div>
                </div>
                <div className="usersComponent">
                    <div className="dataClients dataClients-header">
                        <p className="cell">UŻYTKOWNIK</p>
                        <p className="cell">ID KARNETU</p>
                        <p className="cell">KUPNO</p>
                        <p className="cell">ODNOWIENIE</p>
                        <p className="cell">STATUS</p>
                        <p className="cell">TRENER</p>
                        <p className="cell">STAN KONTA</p>
                        <p className="cell">OSTATNIE WEJŚCIE</p>
                    </div>
                    {pageData.map((name) => (
                        <div className="partnershipsValue-div" key={name.ID}>
                            <div className="dataClients">
                                <div className="cell firstDatas">
                                    <input type="checkbox" className="user-checkbox" />
                                    <div className="user-avatar">
                                        {name.imie?.[0]}{name.nazwisko?.[0]}
                                    </div>
                                    <div className="user-main">
                                         <h1>
                                            {name.imie} <span>{name.nazwisko}</span>
                                        </h1>
                                        <p className="user-email">{name.email}</p>
                                    </div>
                                </div>
                                <p className="cell cell-id">{name.id_karnetu}</p>
                                <p className="cell">{name.data_kupna}</p>
                                <p className="cell">{name.data_odnowienia}</p>
                                <p className="cell">
                                    {/* <span className={`status-badge ${getStatusClass(name.status)}`}>
                                        {name.status}
                                    </span> */}
                                </p>
                                <p className="cell">{name.trener || "-"}</p>

                                <p className="cell">
                                    <span className="balance">
                                        {Number(name.stan_konta).toFixed(2)} zł
                                    </span>
                                </p>
                                <p className="cell last-login">
                                    {name.ostatnie_wejscie}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="users-footer">
                        <div className="users-info">
                            Wyświetlanie <span>{from}</span>–<span>{to}</span> z{" "}
                            <span>{filtered.length}</span> użytkowników
                        </div>
                        <div className="users-pagination">
                            <button className="page-btn" onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
                                <svg viewBox="0 0 24 24">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPage }, (_, i) => i + 1).map(n => (
                                <button key={n} className={`page-btn ${page === n ? "page-btn-active" : ""}`} onClick={() => setPage(n)}>
                                    {n}
                                </button>
                            ))}

                            <button className="page-btn" onClick={() => setPage(prev => Math.min(totalPage, prev + 1))} disabled={page === totalPage}>
                                <svg viewBox="0 0 24 24">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Members