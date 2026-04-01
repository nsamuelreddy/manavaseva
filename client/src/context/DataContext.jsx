import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import api from '../services/api'

const DataContext = createContext(null)

const STATIC_GALLERY = [
    { _id: 'static-1', image: '/assets/download (3).jpeg', category: 'education', caption: 'Learning pod' },
    { _id: 'static-2', image: '/assets/download (4).jpeg', category: 'events', caption: 'Awareness drive' },
    { _id: 'static-3', image: '/assets/download (5).jpeg', category: 'health', caption: 'Health camp' },
    { _id: 'static-4', image: '/assets/download (8).jpeg', category: 'community', caption: 'Community action' }
]

const STATIC_PROJECTS = [
    {
        _id: 'static-project-1',
        title: 'Education for All',
        description: 'Supporting rural education through learning materials, tuition support, and digital access.',
        image: '/assets/download (3).jpeg',
        category: 'education',
        status: 'Ongoing'
    },
    {
        _id: 'static-project-2',
        title: 'Clean Water Initiative',
        description: 'Installing water filters and improving access to safe drinking water in underserved communities.',
        image: '/assets/download (4).jpeg',
        category: 'health',
        status: 'Ongoing'
    },
    {
        _id: 'static-project-3',
        title: 'Women Empowerment',
        description: 'Skill training, microloans, and livelihood support for women-led self-help groups.',
        image: '/assets/download (5).jpeg',
        category: 'community',
        status: 'Planned'
    }
]

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    const [galleryUploads, setGalleryUploads] = useState([])
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [loadingGallery, setLoadingGallery] = useState(false)

    const fetchProjects = useCallback(async () => {
        setLoadingProjects(true)
        try {
            const res = await api.get('/projects')
            setProjects(res.data)
        } catch {
            setProjects(STATIC_PROJECTS)
        } finally {
            setLoadingProjects(false)
        }
    }, [])

    const fetchGallery = useCallback(async () => {
        setLoadingGallery(true)
        try {
            const res = await api.get('/gallery')
            setGalleryUploads(res.data)
        } finally {
            setLoadingGallery(false)
        }
    }, [])

    useEffect(() => {
        fetchProjects()
        fetchGallery()
    }, [fetchProjects, fetchGallery])

    const addProject = async (payload) => {
        const res = await api.post('/projects', payload)
        setProjects(prev => [res.data, ...prev])
        return res.data
    }

    const addPhoto = async (payload) => {
        const res = await api.post('/gallery', payload)
        setGalleryUploads(prev => [res.data, ...prev])
        return res.data
    }

    const gallery = useMemo(() => {
        const combined = [...galleryUploads]
        STATIC_GALLERY.forEach(item => {
            if (!combined.find(upload => upload.image === item.image)) {
                combined.push(item)
            }
        })
        return combined
    }, [galleryUploads])

    return (
        <DataContext.Provider value={{
            projects,
            gallery,
            loadingProjects,
            loadingGallery,
            fetchProjects,
            fetchGallery,
            addProject,
            addPhoto
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
