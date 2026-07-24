import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../components/cms/DashboardLayout'
import DashboardHome from '../components/cms/DashboardHome'
import BannerManager from '../components/cms/BannerManager'
import CollectionManager from '../components/cms/CollectionManager'
import SettingsManager from '../components/cms/SettingsManager'
import ProductManager from '../components/cms/ProductManager'

export default function Dashboard() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path='productos' element={<ProductManager />} />
                <Route path='banners' element={<BannerManager />} />
                <Route path='collection' element={<CollectionManager />} />
                <Route path='settings' element={<SettingsManager />} />
            </Route>
        </Routes>
    )
}
