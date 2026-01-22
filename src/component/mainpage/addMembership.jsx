import react from 'react'
import '../auth/style.css'
import './memberships.css'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'  //npm install lucide-react

function ShowAddMemberships() {
    
    //use State do formularza, przechowują one dane z formularza

    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "",
        visibility: "",
        freeTrial: false,
        freeTrialDays: 0,
        autoRenew: false,
        sendRenewalNotifi: false,
        features: [],
        featuresLimits: 0
    })

    // useState do dodania inputa dynamicznego w form jesli uzytkownik zaznaczy powiadomienia o odnowieniu karnetu

    const [annoucment, setAnnoucment] = useState(false)

    return (
        <div className='addPlan-Container'>
            <div className='addPlan-header'>
                <h2>Dodaj nowy plan</h2>
                <p>emotka X</p>
            </div>
            <div className='addPlan-form'>
                <h2 className='section-header-addMemberplan'>Detale planu</h2>

                <label htmlFor="input-PlanName">Nazwa planu</label>
                <input type="text" id='input-PlanName'/>

                <label htmlFor="input-PlanDescription">Opis</label>
                <textarea rows={10} id="input-PlanDescription"></textarea>

                <div className='addPlan-BillingFrequencies'>
                    <label>Okres płatności</label>
                    <p>rozwijana custom lista</p>
                    <label htmlFor="addPlan-Price">Cena</label>
                    <input type="number" id='addPlan-Price'/>
                </div>

                <div>
                    <p>Status</p>
                    <label htmlFor="activeCheckbox">Aktywny</label>
                    <input type="radio" name='status' value='Aktywny' checked={form.status === "Aktywny"} id='activeCheckbox' />

                    <label htmlFor="unactiveCheckbox">Nieaktywny</label>
                    <input type="radio" name='status' value='Nieaktywny' checked={form.status === "Nieaktywny"} id='unactiveCheckbox' />

                    <label htmlFor="draftCheckbox">Zamrozony</label>
                    <input type="radio" name='status' value='Zamrozony' checked={form.status === "Zamrozony"} id='draftCheckbox' />
                </div>

                <div>
                    <p>Widoczność</p>
                    <label htmlFor="publicCheckbox">Publiczny</label>
                    <input type="radio" name='visibility' value='Publiczny' checked={form.visibility === "Publiczny"} id='publicCheckbox' />

                    <label htmlFor="privateCheckbox">Prywatny</label>
                    <input type="radio" name='visibility' value='Prywatny' checked={form.visibility === "Prywatny"} id='privateCheckbox' />
                </div>
            </div>
            <div className='addPlan-middle'>
                <h2 className='section-header-addMemberplan'>Okres próbny i odnowienie</h2>
                <div>
                    <p>trial period</p>
                </div>
                <div>
                    <p>Odnowienia</p>
                    <label htmlFor="Checkbox-autoRenewal">Auto odnawianie</label>
                    <input type="checkbox" id='Checkbox-autoRenewal' name='autoRenewal' value='autoRenewal'/>
                    <label htmlFor="Checkbox-Annoucment">Wyślij przypomnienie o odnowieniu</label>
                    <input type="checkbox" id='Checkbox-Annoucment' name='annoucmentRenewal' value='annoucmentRenewal' checked={annoucment} onClick={(e) => setAnnoucment(e.target.checked)} />

                    {annoucment && (
                        <div>
                            <select name="timeAnnoucmentSelect">
                                <option value="7days">7 dni</option>
                                <option value="3days">3 dni</option>
                                <option value="24hours">24 godziny</option>
                            </select>

                            <ChevronDown className="select-icon" size={18} />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h2 className='section-header-addMemberplan'>Dostęp i przynalezności</h2>
                <label htmlFor="accessLimitSelect">Limity dodatków</label>
                <div>
                    <select name="accessLimit" id='accessLimitSelect'>
                        <option value="unlimited">Nielimitowany</option>
                        <option value="10times">10 razy</option>
                        <option value="5times">5 razy</option>
                    </select>

                    <ChevronDown className="select-icon" size={18} />
                </div>
                {/* ogarnij custom tego dodawania extra przynaleności by mozna było wpisac co sie chce i to usunac ewentualnie edytowac itp. ma byc to taki sam input jak wyszukiwanie filtrów!!*/}



            </div>
            <div className='footerForm'>
                    <button>delete</button>

                    <div>
                        <button>cancel</button>
                        <button>save changes</button>
                    </div>
            </div>
        </div>
    )
}

export default ShowAddMemberships