import React, { useEffect, useState } from 'react'
import "./template.css"
import picture from "../../assets/img/picture.png"
import axios from 'axios'
import VideoElement from './VideoElement'
import { useNavigate } from 'react-router-dom'
import { Box, Modal } from '@mui/material'

const Index = () => {

    const navigate = useNavigate()

    const [openPreview, setOpenPreview] = useState('')
    const [templates, setTemplates] = useState([])

    const getData = () => {
        axios.get('http://192.168.1.180:5000/templates').then(res => {
            setTemplates(res.data?.data)
        }).catch(err => {
            console.log('err', err)
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className='main-preview'>
                <div className='categories'>
                    <div className='heading'>
                        <span>Browse By Category  </span>
                        <span>View All (10)  </span>
                    </div>
                    <div className='cards'>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>WEDDINGS</span>
                        </div>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>SAVE THE DATE</span>
                        </div>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>BAT MITZVAH</span>
                        </div>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>BIRTHDAY BLESSING</span>
                        </div>
                    </div>
                    {/* <div className='pager'>
                    <div>
                        1
                    </div>
                    <div>
                        2
                    </div>
                    <div>
                        3
                    </div>
                    <div>
                        4
                    </div>
                </div> */}
                </div>
                <div className='invitation'>
                    <div className='heading'>
                        <span>Popular Invitation  </span>
                        <span>View All (10)  </span>
                    </div>
                    <div className='cards'>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>LOREM IPSUM RESORT</span>
                        </div>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>LOREM IPSUM RESORT</span>
                        </div>
                        <div className='child'>
                            {templates[0]?.data ? <VideoElement videoclass="card" base64Video={templates[0]?.data} /> : <></>}
                            <div className='btnsdiv'>
                                <button className='previewBtn' onClick={() => setOpenPreview(templates[0].data)}>See Preview</button>
                                <button className='useTemplateBtn' onClick={() => navigate(`/${templates[0].id}`)}>Use this template</button>
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>LOREM IPSUM RESORT</span>
                        </div>
                        <div className='child'>
                            <div className='card'>
                                <img className='dummy-img' src={picture} alt='' />
                            </div>
                            <span style={{
                                float: 'left', marginLeft: "10px",
                                fontSize: "18px",
                                fontWeight: 500
                            }}>LOREM IPSUM RESORT</span>
                        </div>
                    </div>
                    {/* <div className='pager'>
                    <div>
                        1
                    </div>
                    <div>
                        2
                    </div>
                    <div>
                        3
                    </div>
                    <div>
                        4
                    </div>
                </div> */}
                </div>
            </div>
            {
                openPreview && <Modal
                    open={openPreview}
                    onClose={() => setOpenPreview(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '1px solid #ACACAC',
                        boxShadow: 10,
                        p: 4,
                        borderRadius:5
                    }}>
                        <VideoElement videoclass="videoPreviewcard" base64Video={templates[0]?.data} />
                    </Box>
                </Modal>
            }
        </>
    )
}

export default Index