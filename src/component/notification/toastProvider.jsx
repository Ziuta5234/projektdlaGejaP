import { useState, useContext, createContext, useCallback, useMemo } from 'react'
import ToastNotification from './notification.jsx'

const ToastContext = createContext(null)

export function ToastProvider ({children}) {
    const [toast, setToast] = useState(null)

    const show = useCallback((type, message, title = "Powiadomienie", duration = 2500) => {
        setToast({type, message, title})
        window.setTimeout(() => setToast(null), duration)
    }, [])

    const api = useMemo(() => ({
        success: (msg, title, dur) => show("success", msg, title ?? "Sukces", dur),
        error: (msg, title, dur) => show("error", msg, title ?? "Błąd", dur),
        info: (msg, title, dur) => show("info", msg, title ?? "Info", dur),
        hide: () => setToast(null)
    }), [])

    return (
        <ToastContext.Provider value={api}>
            {children}

            <div>
                <ToastNotification type={toast?.type} title={toast?.title} message={toast?.message} onClose={() => setToast(null)} />
            </div>
        </ToastContext.Provider>
    )
}

export function useToast () {
    const context = useContext(ToastContext)
    if (!context) throw new Error("Błąd!")
    return context
}