import { useState, useEffect } from 'react'
import { getBanners, createBanner, updateBanner, deleteBanner } from '../../api/cms.api'
import { toast } from 'react-toastify'

export default function BannerManager() {
    const [banners, setBanners] = useState([])
    const [form, setForm] = useState({ title: '', subtitle: '', image: '', buttonText: 'Compra Ahora', buttonLink: '/collection', isActive: true, order: 0 })
    const [editingId, setEditingId] = useState(null)

    const load = () => {
        getBanners().then((r) => setBanners(r.data)).catch(() => toast.error('Error al cargar banners'))
    }

    useEffect(() => { load() }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const req = editingId ? updateBanner(editingId, form) : createBanner(form)
        req.then(() => {
            toast.success(editingId ? 'Banner actualizado' : 'Banner creado')
            resetForm()
            load()
        }).catch(() => toast.error('Error al guardar'))
    }

    const handleEdit = (b) => {
        setForm({ title: b.title, subtitle: b.subtitle, image: b.image, buttonText: b.buttonText, buttonLink: b.buttonLink, isActive: b.isActive, order: b.order })
        setEditingId(b.id)
    }

    const handleDelete = (id) => {
        deleteBanner(id).then(() => {
            toast.success('Banner eliminado')
            load()
        }).catch(() => toast.error('Error al eliminar'))
    }

    const resetForm = () => {
        setForm({ title: '', subtitle: '', image: '', buttonText: 'Compra Ahora', buttonLink: '/collection', isActive: true, order: 0 })
        setEditingId(null)
    }

    const input = 'border rounded px-3 py-2 text-sm w-full'
    const label = 'text-sm font-medium mb-1 block'

    return (
        <div>
            <h3 className='font-bold text-lg mb-4'>{editingId ? 'Editar Banner' : 'Crear Banner'}</h3>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 bg-gray-50 p-4 rounded'>
                <div>
                    <label className={label}>Titulo</label>
                    <input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                    <label className={label}>Subtitulo</label>
                    <input className={input} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
                </div>
                <div>
                    <label className={label}>URL de imagen</label>
                    <input className={input} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder='https://...' />
                </div>
                <div>
                    <label className={label}>Texto del boton</label>
                    <input className={input} value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} />
                </div>
                <div>
                    <label className={label}>Link del boton</label>
                    <input className={input} value={form.buttonLink} onChange={(e) => setForm({ ...form, buttonLink: e.target.value })} />
                </div>
                <div>
                    <label className={label}>Orden</label>
                    <input type='number' className={input} value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className='w-4 h-4' />
                    <label className='text-sm'>Activo</label>
                </div>
                <div className='flex gap-2 items-end'>
                    <button type='submit' className='bg-primary text-white px-4 py-2 rounded text-sm font-medium'>
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingId && (
                        <button type='button' onClick={resetForm} className='bg-gray-300 px-4 py-2 rounded text-sm'>Cancelar</button>
                    )}
                </div>
            </form>

            <h3 className='font-bold text-lg mb-3'>Banners existentes</h3>
            <div className='space-y-3'>
                {banners.map((b) => (
                    <div key={b.id} className='border rounded p-4 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            {b.image && <img src={b.image} alt={b.title} className='w-20 h-12 object-cover rounded' />}
                            <div>
                                <p className='font-medium'>{b.title}</p>
                                <p className='text-sm text-gray-500'>{b.subtitle}</p>
                                <p className='text-xs text-gray-400'>Orden: {b.order} | {b.isActive ? 'Activo' : 'Inactivo'}</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={() => handleEdit(b)} className='text-blue-500 text-sm hover:underline'>Editar</button>
                            <button onClick={() => handleDelete(b.id)} className='text-red-500 text-sm hover:underline'>Eliminar</button>
                        </div>
                    </div>
                ))}
                {banners.length === 0 && <p className='text-gray-400 text-sm'>No hay banners creados</p>}
            </div>
        </div>
    )
}
