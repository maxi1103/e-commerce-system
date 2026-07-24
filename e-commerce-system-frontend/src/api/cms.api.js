import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/cms'
const API_BASE = 'http://127.0.0.1:8000/api'

export const getBanners = (activeOnly = false) => {
    const params = activeOnly ? '?active=true' : ''
    return axios.get(`${API_URL}/banners/${params}`)
}

export const getBanner = (id) => {
    return axios.get(`${API_URL}/banners/${id}/`)
}

export const createBanner = (data) => {
    return axios.post(`${API_URL}/banners/`, data)
}

export const updateBanner = (id, data) => {
    return axios.put(`${API_URL}/banners/${id}/`, data)
}

export const deleteBanner = (id) => {
    return axios.delete(`${API_URL}/banners/${id}/`)
}

export const getFeaturedProducts = (section = null, activeOnly = false) => {
    const params = new URLSearchParams()
    if (section) params.append('section', section)
    if (activeOnly) params.append('active', 'true')
    const qs = params.toString()
    return axios.get(`${API_URL}/featured-products/${qs ? '?' + qs : ''}`)
}

export const addFeaturedProduct = (data) => {
    return axios.post(`${API_URL}/featured-products/`, data)
}

export const updateFeaturedProduct = (id, data) => {
    return axios.put(`${API_URL}/featured-products/${id}/`, data)
}

export const deleteFeaturedProduct = (id) => {
    return axios.delete(`${API_URL}/featured-products/${id}/`)
}

export const getSiteSettings = () => {
    return axios.get(`${API_URL}/site-settings/`)
}

export const updateSiteSettings = (data) => {
    return axios.put(`${API_URL}/site-settings/1/`, data)
}

export const getProductos = () => {
    return axios.get(`${API_BASE}/productos/`)
}

export const createProducto = (data) => {
    return axios.post(`${API_BASE}/productos/`, data)
}

export const updateProducto = (id, data) => {
    return axios.put(`${API_BASE}/productos/${id}/`, data)
}

export const deleteProducto = (id) => {
    return axios.delete(`${API_BASE}/productos/${id}/`)
}

export const getCategorias = () => {
    return axios.get(`${API_BASE}/categorias/`)
}

export const getSubCategorias = () => {
    return axios.get(`${API_BASE}/subcategorias/`)
}

export const getMedidas = () => {
    return axios.get(`${API_BASE}/medidas/`)
}

export const createCategoria = (data) => {
    return axios.post(`${API_BASE}/categorias/`, data)
}

export const createSubCategoria = (data) => {
    return axios.post(`${API_BASE}/subcategorias/`, data)
}

export const createMedida = (data) => {
    return axios.post(`${API_BASE}/medidas/`, data)
}
