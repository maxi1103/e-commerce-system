import { useState, useEffect, useContext } from 'react'
import { getFeaturedProducts, addFeaturedProduct, updateFeaturedProduct, deleteFeaturedProduct } from '../../api/cms.api'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'

export default function CollectionManager() {
    const { productos } = useContext(ShopContext)
    const [items, setItems] = useState([])
    const [section, setSection] = useState('latest_collection')
    const [selectedProduct, setSelectedProduct] = useState('')
    const [order, setOrder] = useState(0)

    const load = () => {
        getFeaturedProducts(section, false).then((r) => setItems(r.data)).catch(() => toast.error('Error al cargar'))
    }

    useEffect(() => { load() }, [section])

    const handleAdd = () => {
        if (!selectedProduct) return toast.error('Selecciona un producto')
        addFeaturedProduct({ productId: parseInt(selectedProduct), section, order, isActive: true })
            .then(() => {
                toast.success('Producto agregado')
                setSelectedProduct('')
                setOrder(0)
                load()
            })
            .catch((err) => {
                if (err.response?.data?.non_field_errors) toast.error('Este producto ya esta en esta seccion')
                else toast.error('Error al agregar')
            })
    }

    const handleToggle = (item) => {
        updateFeaturedProduct(item.id, { isActive: !item.isActive })
            .then(() => { toast.success('Actualizado'); load() })
            .catch(() => toast.error('Error'))
    }

    const handleDelete = (id) => {
        deleteFeaturedProduct(id).then(() => {
            toast.success('Eliminado')
            load()
        }).catch(() => toast.error('Error'))
    }

    const input = 'border rounded px-3 py-2 text-sm w-full'

    return (
        <div>
            <div className='flex gap-3 mb-4'>
                <button
                    onClick={() => setSection('latest_collection')}
                    className={`px-4 py-2 rounded text-sm font-medium ${section === 'latest_collection' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                    Ultimos Ingresos
                </button>
                <button
                    onClick={() => setSection('best_seller')}
                    className={`px-4 py-2 rounded text-sm font-medium ${section === 'best_seller' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                    Mas Vendidos
                </button>
            </div>

            <div className='bg-gray-50 p-4 rounded mb-6'>
                <h4 className='font-medium mb-3'>Agregar producto a esta coleccion</h4>
                <div className='flex gap-3 items-end'>
                    <div className='flex-1'>
                        <label className='text-sm mb-1 block'>Producto</label>
                        <select className={input} value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                            <option value=''>-- Seleccionar --</option>
                            {productos.map((p) => (
                                <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-24'>
                        <label className='text-sm mb-1 block'>Orden</label>
                        <input type='number' className={input} value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} />
                    </div>
                    <button onClick={handleAdd} className='bg-primary text-white px-4 py-2 rounded text-sm font-medium shrink-0'>
                        Agregar
                    </button>
                </div>
            </div>

            <h3 className='font-bold text-lg mb-3'>
                {section === 'latest_collection' ? 'Ultimos Ingresos' : 'Mas Vendidos'} ({items.length})
            </h3>
            <div className='space-y-2'>
                {items.map((item) => (
                    <div key={item.id} className='border rounded p-3 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            {item.product?.imagenes?.[0]?.imagen && (
                                <img src={item.product.imagenes[0].imagen} alt='' className='w-12 h-12 object-cover rounded' />
                            )}
                            <div>
                                <p className='font-medium text-sm'>{item.product?.nombre}</p>
                                <p className='text-xs text-gray-400'>Orden: {item.order} | ${item.product?.precio}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <button onClick={() => handleToggle(item)} className={`text-xs px-2 py-1 rounded ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {item.isActive ? 'Activo' : 'Inactivo'}
                            </button>
                            <button onClick={() => handleDelete(item.id)} className='text-red-500 text-sm hover:underline'>Eliminar</button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p className='text-gray-400 text-sm'>No hay productos en esta coleccion</p>}
            </div>
        </div>
    )
}
