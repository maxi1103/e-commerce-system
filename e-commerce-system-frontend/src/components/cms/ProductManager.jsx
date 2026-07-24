import { useState, useEffect } from 'react'
import {
    getProductos, createProducto, updateProducto, deleteProducto,
    getCategorias, getSubCategorias, getMedidas
} from '../../api/cms.api'
import { toast } from 'react-toastify'

const emptyForm = {
    nombre: '', descripcion: '', precio: '', stock: 0,
    categoria: '', subCategoria: '', medida_ids: [], masvendido: false,
    imagen_url: ''
}

export default function ProductManager() {
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [subCategorias, setSubCategorias] = useState([])
    const [medidas, setMedidas] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [search, setSearch] = useState('')
    const [showForm, setShowForm] = useState(false)

    const load = () => {
        Promise.all([getProductos(), getCategorias(), getSubCategorias(), getMedidas()])
            .then(([p, c, s, m]) => {
                setProductos(p.data)
                setCategorias(c.data)
                setSubCategorias(s.data)
                setMedidas(m.data)
            })
            .catch(() => toast.error('Error al cargar datos'))
    }

    useEffect(() => { load() }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: form.precio,
            stock: form.stock,
            categoria: form.categoria || null,
            subCategoria: form.subCategoria || null,
            masvendido: form.masvendido,
            medidas: form.medida_ids,
        }
        if (form.imagen_url) payload.imagen_url = form.imagen_url

        const req = editingId ? updateProducto(editingId, payload) : createProducto(payload)
        req.then(() => {
            toast.success(editingId ? 'Producto actualizado' : 'Producto creado')
            resetForm()
            load()
        }).catch((err) => {
            const msg = err.response?.data?.detail || 'Error al guardar'
            toast.error(msg)
        })
    }

    const handleEdit = (p) => {
        setForm({
            nombre: p.nombre,
            descripcion: p.descripcion || '',
            precio: p.precio,
            stock: p.stock,
            categoria: p.categoria || '',
            subCategoria: p.subCategoria || '',
            medida_ids: p.medidas ? p.medidas.map((m) => m.id) : [],
            masvendido: p.masvendido,
            imagen_url: p.imagenes?.[0]?.imagen || '',
        })
        setEditingId(p.id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = (id) => {
        if (!confirm('Eliminar este producto?')) return
        deleteProducto(id).then(() => {
            toast.success('Producto eliminado')
            load()
        }).catch(() => toast.error('Error al eliminar'))
    }

    const resetForm = () => {
        setForm(emptyForm)
        setEditingId(null)
        setShowForm(false)
    }

    const toggleMedida = (id) => {
        setForm((prev) => {
            const ids = prev.medida_ids.includes(id)
                ? prev.medida_ids.filter((m) => m !== id)
                : [...prev.medida_ids, id]
            return { ...prev, medida_ids: ids }
        })
    }

    const filtered = productos.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
    )

    const input = 'border rounded px-3 py-2 text-sm w-full'
    const label = 'text-sm font-medium mb-1 block'

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='font-bold text-lg'>Productos ({productos.length})</h3>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className='bg-primary text-white px-4 py-2 rounded text-sm font-medium'>
                        + Nuevo Producto
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className='bg-gray-50 p-4 rounded mb-6 space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h4 className='font-medium'>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h4>
                        <button type='button' onClick={resetForm} className='text-gray-500 text-sm hover:underline'>Cancelar</button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className={label}>Nombre *</label>
                            <input className={input} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required maxLength={30} />
                            <p className='text-xs text-gray-400 mt-1'>{form.nombre.length}/30</p>
                        </div>
                        <div>
                            <label className={label}>Precio *</label>
                            <input type='number' step='0.01' className={input} value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
                        </div>
                        <div>
                            <label className={label}>Stock</label>
                            <input type='number' className={input} value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div>
                            <label className={label}>Categoria</label>
                            <select className={input} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                                <option value=''>-- Sin categoria --</option>
                                {categorias.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={label}>Subcategoria</label>
                            <select className={input} value={form.subCategoria} onChange={(e) => setForm({ ...form, subCategoria: e.target.value })}>
                                <option value=''>-- Sin subcategoria --</option>
                                {subCategorias.map((s) => (
                                    <option key={s.id} value={s.id}>{s.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex items-center gap-2 pt-6'>
                            <input type='checkbox' checked={form.masvendido} onChange={(e) => setForm({ ...form, masvendido: e.target.checked })} className='w-4 h-4' />
                            <label className='text-sm'>Marcar como mas vendido</label>
                        </div>
                    </div>

                    <div>
                        <label className={label}>Descripcion</label>
                        <textarea className={input} rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                    </div>

                    <div>
                        <label className={label}>Medidas / Talles</label>
                        <div className='flex flex-wrap gap-2'>
                            {medidas.map((m) => (
                                <button
                                    key={m.id}
                                    type='button'
                                    onClick={() => toggleMedida(m.id)}
                                    className={`px-3 py-1 rounded text-sm border ${
                                        form.medida_ids.includes(m.id)
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white border-gray-300 hover:border-primary'
                                    }`}
                                >
                                    {m.nombre}
                                </button>
                            ))}
                            {medidas.length === 0 && <p className='text-xs text-gray-400'>No hay medidas creadas</p>}
                        </div>
                    </div>

                    <div>
                        <label className={label}>URL de imagen</label>
                        <input
                            type='url'
                            placeholder='https://ejemplo.com/imagen.jpg'
                            className={input}
                            value={form.imagen_url}
                            onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
                        />
                        {form.imagen_url && (
                            <img
                                src={form.imagen_url}
                                alt='Preview'
                                className='w-24 h-24 object-cover rounded mt-2 border'
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        )}
                    </div>

                    <button type='submit' className='bg-primary text-white px-6 py-2 rounded text-sm font-medium'>
                        {editingId ? 'Actualizar Producto' : 'Crear Producto'}
                    </button>
                </form>
            )}

            <div className='mb-4'>
                <input
                    type='text'
                    placeholder='Buscar producto...'
                    className={input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className='space-y-2'>
                {filtered.map((p) => (
                    <div key={p.id} className='border rounded p-3 flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                            {p.imagenes?.[0]?.imagen ? (
                                <img src={p.imagenes[0].imagen} alt='' className='w-12 h-12 object-cover rounded shrink-0' />
                            ) : (
                                <div className='w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs shrink-0'>Sin img</div>
                            )}
                            <div className='min-w-0'>
                                <p className='font-medium text-sm truncate'>{p.nombre}</p>
                                <p className='text-xs text-gray-400'>
                                    ${p.precio} | Stock: {p.stock}
                                    {p.masvendido ? ' | Mas vendido' : ''}
                                    {p.medidas?.length > 0 ? ` | ${p.medidas.map((m) => m.nombre).join(', ')}` : ''}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2 shrink-0'>
                            <button onClick={() => handleEdit(p)} className='text-blue-500 text-sm hover:underline'>Editar</button>
                            <button onClick={() => handleDelete(p.id)} className='text-red-500 text-sm hover:underline'>Eliminar</button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <p className='text-gray-400 text-sm'>No se encontraron productos</p>}
            </div>
        </div>
    )
}
