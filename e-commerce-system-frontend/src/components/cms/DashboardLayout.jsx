import { NavLink, Outlet } from 'react-router-dom'

const links = [
    { to: '/dashboard', label: 'General', end: true },
    { to: '/dashboard/productos', label: 'Productos' },
    { to: '/dashboard/banners', label: 'Banners' },
    { to: '/dashboard/collection', label: 'Colecciones' },
    { to: '/dashboard/settings', label: 'Configuracion' },
]

export default function DashboardLayout() {
    return (
        <div className='flex min-h-[70vh] gap-4'>
            <aside className='w-56 shrink-0 border-r pr-4 pt-2'>
                <h2 className='font-bold text-lg mb-4'>CMS Panel</h2>
                <nav className='flex flex-col gap-1'>
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded text-sm ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className='flex-1 pt-2'>
                <Outlet />
            </main>
        </div>
    )
}
