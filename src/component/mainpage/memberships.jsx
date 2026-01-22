import '../auth/style.css'
import Sidebar from "./sidebar.jsx"
import './memberships.css'
import { FiSearch } from 'react-icons/fi'
import { ChevronDown } from 'lucide-react'  //npm install lucide-react
import { useState, useEffect } from 'react'
import ShowAddMemberships from './addMembership.jsx'

function Memberships () {

    const [billingFrequencies, setBillingFrequencies] = useState('payments')
    const [statuses, setStatuses] = useState('statuses')
    const [ranges, setRanges] = useState('ranges')
    const [userData, setUserData] = useState([])
    const [search, setSearch] = useState("")
    const [deleteSuccess, setDeleteSuccess] = useState("")
    const [deleteError, setDeleteError] = useState("")


    // filtry wyszukiwania: okresy płatności, stan karnetu, zakresy cen
    const [filterPayment, setFilterPayment] = useState('all')
    const [filterStatues, setFilterStatues] = useState('all')
    const [filterPrice, setFilterPrice] = useState('all')

    //useState do wyświetlania menu dodania nowego karnetu
    const [newPlanBtn, setNewPlanBtn] = useState(false)

    const [page, setPage] = useState(1)
    const pageSize = 5

    useEffect(() => {
        setPage(1)
    }, [search, billingFrequencies, statuses, ranges])


    useEffect(() => {
        fetch("http://localhost/backend/memberships.php")
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [])

    useEffect(() => {
        console.log(userData)
    }, [userData])

    function ActiveFilters() {
        const filtersobj = [];

        if(filterPayment !== 'all') filtersobj.push(`Okres: ${filterPayment}`)
        if(filterPrice !== 'all') filtersobj.push(`Cena: ${filterPrice}`)
        if(filterStatues !== 'all') filtersobj.push(`Status: ${filterStatues}`)

        return filtersobj
    }

    const deleteThis = async (id) => {
        if(!window.confirm("Na pewno chcesz usunąć to pole?")) return;

        const responseDelete = await fetch("http://localhost/backend/memberships_delete.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })

        const dataDelete = await responseDelete.json()

        if (!dataDelete.error) {
            setUserData(prev => prev.filter(x => Number(x.ID) !== Number(id)))
            setDeleteSuccess("Rekord został poprawnie usunięty")
        } else {
            setDeleteError("Wystąpił błąd w usuwaniu:" + (responseDelete.error ?? "Nieznany error"))
        }
    }

    const filtered = userData
        .filter(memberships =>
            `${memberships.rodzaj_karnetu}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter(memberships => 
            filterPayment == 'all' ? true : memberships.okres == filterPayment &&
            filterPrice == 'all' ? true : memberships.cena == filterPrice &&
            filterStatues == 'all' ? true : memberships.status == filterStatues
        )

    const totalPage = Math.max(1, Math.ceil(filtered.length / pageSize))
    const start = (page - 1) * pageSize
    const pageData = filtered.slice(start, start + pageSize)

    const from = filtered.length === 0 ? 0 : start + 1
    const to = Math.min(start + pageSize, filtered.length)

    return (
        <div className="maindiv">
            {newPlanBtn && <ShowAddMemberships/>}
            <Sidebar/>
            <div className='mainContainer-memberships'>
                <div className='header-of-memberships'>
                    <div>
                        <h1>Rodzaje karnetów</h1>
                        <p>Zarządzaj karnetami, dodawaj, usuwaj, cutomizuj!</p>
                    </div>
                    <button className='AddButton' onClick={() => setNewPlanBtn(prev => !prev)}>Dodaj nowy plan</button>
                </div>
                <div className='filter-of-memberships'>
                    <div className='filter-of-selectFilter'>
                        <div className="select-wrapper">
                            <select className="custom-select" value={filterPayment} onChange={(e) => (setFilterPayment(e.target.value))}>
                                <option value="all">Okresy płatności</option>
                                <option value="Miesięczny">Miesięczne</option>
                                <option value="Roczny">Roczne</option>
                                <option value="Dozywotni">LifeTime</option>
                            </select>
                            <ChevronDown className="select-icon" size={18} />
                        </div>

                        <div className="select-wrapper">
                            <select className="custom-select" value={filterStatues} onChange={(e) => (setFilterStatues(e.target.value))}>
                                <option value="all">Stan karnetu</option>
                                <option value="Dostępny">Dostępny</option>
                                <option value="Niedostępny">Niedostępny</option>
                                <option value="Wersja robocza">Wersja robocza</option>
                            </select>
                            <ChevronDown className="select-icon" size={18} />
                        </div>

                        <div className="select-wrapper">
                            <select className="custom-select" value={filterPrice} onChange={(e) => (setFilterPrice(e.target.value))}>
                                <option value="all">Zakresy cen</option>
                                <option value="$0-$99">$0-$99</option>
                                <option value="$100-$200">$100-$200</option>
                                <option value="<$200">&lt; $200</option>
                            </select>
                            <ChevronDown className="select-icon" size={18} />
                        </div>
                    </div>

                    <div className="filter-input-div">
                        <FiSearch className="iconSearch"/>
                        <input placeholder='Wyszukaj karnet...' type="text" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
                <div className='second-row-filter'>
                    {ActiveFilters().length === 0 ? (
                        <p>Brak filtrów</p>
                    ) : (
                        <p>Filtry: {ActiveFilters().join(', ')}</p>
                    )}
                </div>
                <div className='planComponent'>
                    <div className='plans-row plans-row-header'>
                        <div>Rodzaje karnetu</div>
                        <div>Okres</div>
                        <div>Cena</div>
                        <div>Uprzywilejowania</div>
                        <div>Aktywni klienci</div>
                        <div>Status</div>
                        <div>Zarządzanie</div>
                    </div>

                    {pageData.map((users) => (
                        <div className='plans-row' key={users.ID}>
                            <div>
                                <div className='plan-title'>{users.rodzaj_karnetu}</div>
                                <div className='plan-subtitle'>Opis</div>
                            </div>
                            <div>
                                <span className={`badge badge-billing badge-billing badge-billing-${users.okres}`}>
                                    {users.okres}
                                </span>
                            </div>
                            <div>
                            <div className='plan-price'>
                                    <span className='price-currency'>PLN</span>
                                    <span className='price-main'>
                                        {users.cena.toFixed(2).replace(".", ",")}
                                    </span>
                                </div>
                            </div>
                            <div className='plan-features'>
                                {users.uprzywilejowania}
                            </div>
                            <div className='plan-members'>
                                {users.aktywni_klienci}
                            </div>
                            <div>
                                <span className={`badge badge-status badge-status-${users.status}`}>
                                    {users.status === "aktywny" && "Aktywny"}
                                    {users.status === "disactive" && "Nieaktywny"}
                                </span>
                            </div>
                            <div className='plan-actions'>
                                <button onClick={() => deleteThis(users.ID)} className='icon-btn icon-btn-danger' aria-label='Usuń'>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4h8v2" />
                                        <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className='plans-footer'>
                        <div className='plans-info'>
                            Wyświetlenie <span>{from}</span>–<span>{to}</span> z <span>{filtered.length}</span> karnetów
                        </div>
                        <div className="plans-pagination">
                            <button className='page-btn' onClick={() => setPage(prev => Math.max(1 - prev, 1))} disabled={page === 1}>
                                <svg viewBox="0 0 24 24">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPage}, (_, i) => i + 1).map(n => (
                                <button key={n} className={`page-btn ${page === n ? "page-btn-active" : ""}`} onClick={() => setPage(n)}>
                                    {n}
                                </button>
                            ))}
                            <button className='page-btn' onClick={() => setPage(prev => Math.min(totalPage, prev + 1))} disabled={page === totalPage}>
                                <svg viewBox="0 0 24 24">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Memberships