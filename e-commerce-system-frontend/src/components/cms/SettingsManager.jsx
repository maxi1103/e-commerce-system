import { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings } from '../../api/cms.api'
import { toast } from 'react-toastify'

export default function SettingsManager() {
    const [form, setForm] = useState({
        siteName: '', logo: '', footerText: '', contactEmail: '', contactPhone: '',
        facebook: '', instagram: '', twitter: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSiteSettings().then((r) => {
            setForm(r.data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateSiteSettings(form)
            .then(() => toast.success('Configuracion guardada'))
            .catch(() => toast.error('Error al guardar'))
    }

    const input = 'border rounded px-3 py-2 text-sm w-full'
    const label = 'text-sm font-medium mb-1 block'

    if (loading) return <p className='text-gray-400'>Cargando...</p>

    return (
        <div>
            <h3 className='font-bold text-lg mb-4'>Configuracion del Sitio</h3>
            <form onSubmit={handleSubmit} className='space-y-4 bg-gray-50 p-4 rounded max-w-2xl'>
                <div>
                    <label className={label}>Nombre del sitio</label>
                    <input className={input} value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
                </div>
                <div>
                    <label className={label}>Logo (URL)</label>
                    <input className={input} value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder='https://...' />
                </div>
                <div>
                    <label className={label}>Texto del footer</label>
                    <textarea className={input} rows={2} value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label className={label}>Email de contacto</label>
                        <input className={input} value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
                    </div>
                    <div>
                        <label className={label}>Telefono de contacto</label>
                        <input className={input} value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
                    </div>
                </div>
                <hr />
                <p className='text-sm font-medium'>Redes Sociales</p>
                <div className='grid grid-cols-3 gap-3'>
                    <div>
                        <label className={label}>Facebook</label>
                        <input className={input} value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} placeholder='https://facebook.com/...' />
                    </div>
                    <div>
                        <label className={label}>Instagram</label>
                        <input className={input} value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder='https://instagram.com/...' />
                    </div>
                    <div>
                        <label className={label}>Twitter</label>
                        <input className={input} value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} placeholder='https://twitter.com/...' />
                    </div>
                </div>
                <button type='submit' className='bg-primary text-white px-6 py-2 rounded text-sm font-medium'>
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}
