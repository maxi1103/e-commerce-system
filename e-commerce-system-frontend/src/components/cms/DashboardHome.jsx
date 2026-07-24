import { useState, useEffect } from 'react'
import { getBanners, getFeaturedProducts, getSiteSettings, getProductos } from '../../api/cms.api'

export default function DashboardHome() {
    const [siteName, setSiteName] = useState('Mi Tienda')
    const [productos, setProductos] = useState([])
    const [bannersCount, setBannersCount] = useState(0)
    const [collectionCount, setCollectionCount] = useState(0)
    const [bestSellersCount, setBestSellersCount] = useState(0)

    useEffect(() => {
        Promise.all([
            getProductos(),
            getBanners(),
            getFeaturedProducts('latest_collection'),
            getFeaturedProducts('best_seller'),
            getSiteSettings(),
        ]).then(([p, b, c, bs, s]) => {
            setProductos(p.data)
            setBannersCount(b.data.length)
            setCollectionCount(c.data.length)
            setBestSellersCount(bs.data.length)
            setSiteName(s.data.siteName || 'Mi Tienda')
        }).catch(() => {})
    }, [])

    const totalProducts = productos.length
    const totalStock = productos.reduce((sum, p) => sum + (p.stock || 0), 0)
    const ingresosPotenciales = productos.reduce((sum, p) => sum + (parseFloat(p.precio) || 0) * (p.stock || 0), 0)
    const lowStock = productos.filter((p) => p.stock > 0 && p.stock <= 5)
    const sinStock = productos.filter((p) => p.stock === 0)
    const masVendidos = productos.filter((p) => p.masvendido)

    const formatCurrency = (n) => '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

    return (
        <div>
            <h3 className='font-bold text-lg mb-1'>Bienvenido al CMS</h3>
            <p className='text-gray-500 text-sm mb-6'>Resumen de <strong>{siteName}</strong></p>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Productos</p>
                    <p className='text-3xl font-bold'>{totalProducts}</p>
                </div>
                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Stock Total</p>
                    <p className='text-3xl font-bold'>{totalStock}</p>
                </div>
                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Ingresos Potenciales</p>
                    <p className='text-3xl font-bold text-green-600'>{formatCurrency(ingresosPotenciales)}</p>
                </div>
                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Mas Vendidos</p>
                    <p className='text-3xl font-bold text-primary'>{masVendidos.length}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-2'>Contenido CMS</p>
                    <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'><span>Banners activos</span><span className='font-medium'>{bannersCount}</span></div>
                        <div className='flex justify-between'><span>Productos en coleccion</span><span className='font-medium'>{collectionCount}</span></div>
                        <div className='flex justify-between'><span>Best sellers destacados</span><span className='font-medium'>{bestSellersCount}</span></div>
                    </div>
                </div>

                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-2'>Alertas de Stock</p>
                    <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                            <span>Sin stock</span>
                            <span className={`font-medium ${sinStock.length > 0 ? 'text-red-500' : 'text-green-500'}`}>{sinStock.length}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Stock bajo (1-5)</span>
                            <span className={`font-medium ${lowStock.length > 0 ? 'text-yellow-500' : 'text-green-500'}`}>{lowStock.length}</span>
                        </div>
                    </div>
                    {sinStock.length > 0 && (
                        <div className='mt-3 pt-3 border-t'>
                            <p className='text-xs text-red-400 mb-1'>Sin stock:</p>
                            <div className='flex flex-wrap gap-1'>
                                {sinStock.slice(0, 5).map((p) => (
                                    <span key={p.id} className='text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded'>{p.nombre}</span>
                                ))}
                                {sinStock.length > 5 && <span className='text-xs text-gray-400'>+{sinStock.length - 5}</span>}
                            </div>
                        </div>
                    )}
                </div>

                <div className='border rounded p-4'>
                    <p className='text-xs text-gray-400 uppercase tracking-wide mb-2'>Inventario por Producto</p>
                    <div className='space-y-1 text-sm max-h-40 overflow-y-auto'>
                        {productos.slice(0, 10).map((p) => (
                            <div key={p.id} className='flex justify-between items-center'>
                                <span className='truncate mr-2'>{p.nombre}</span>
                                <span className='text-xs text-gray-400 shrink-0'>x{p.stock} &middot; {formatCurrency(parseFloat(p.precio) * p.stock)}</span>
                            </div>
                        ))}
                        {productos.length === 0 && <p className='text-gray-400 text-xs'>No hay productos</p>}
                    </div>
                </div>
            </div>

            <div className='bg-gray-50 rounded p-4'>
                <h4 className='font-medium mb-2'>Acciones rapidas</h4>
                <ul className='text-sm text-gray-600 space-y-1'>
                    <li>- Ve a <strong>Productos</strong> para crear, editar o eliminar productos</li>
                    <li>- Ve a <strong>Banners</strong> para crear o modificar el banner principal</li>
                    <li>- Ve a <strong>Colecciones</strong> para elegir que productos aparecen en la pagina principal</li>
                    <li>- Ve a <strong>Configuracion</strong> para cambiar nombre, contacto y redes sociales</li>
                </ul>
            </div>
        </div>
    )
}
