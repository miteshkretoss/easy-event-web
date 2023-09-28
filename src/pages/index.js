import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Template from './template'
import EditTemplate from './template/editTemplate'
import Preview from './template/preview'
const Index = () => {
    return (
        <Routes>
            <Route path='' element={<Template />} />
            <Route path='/:template' element={<EditTemplate />} />
            <Route path='download/:template' element={<Preview />} />
        </Routes>
    )
}

export default Index