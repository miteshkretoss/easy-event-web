import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VideoElement from './VideoElement';
import { CircularProgress } from '@mui/material';

const Preview = () => {
  const [loading, setloading] = useState(true)
  const [templateData, setTemplateData] = useState([])
  const [renderedData, setRenderedData] = useState({})
  const [videoObjectURL, setVideoObjectURL] = useState('')
  let { template } = useParams();
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    console.log('data', location.state?.data)
    if (location?.state?.data && location?.state?.data?.length) setTemplateData(location?.state?.data)
    else navigate(-1, { state: { data: [] } })
  }, [location])

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoObjectURL;
    a.download = 'video.mp4'; // Change this to the desired file name and extension
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(videoObjectURL);
    document.body.removeChild(a);

  }


  useEffect(() => {
    if (templateData.length)
      axios.post(`http://192.168.1.180:5000/templates/${template}`, templateData).then(res => {
        setRenderedData(res.data)
        console.log('🚀🚀🚀 ~ file: preview.js:52 ~ axios.post ~ res.data:-', res.data);
        setloading(false)
      }).catch(err => {
        console.log('err', err)
      })
  }, [templateData])

  return (
    <div className='preview-template-main'>
      <div className='preview-content'>
        {
          loading ?
            <CircularProgress />
            :
            <div>
              <h2>Download your video</h2>
              <div className='child'>
                {renderedData?.data?.fileData ? <VideoElement videoclass="card" base64Video={renderedData?.data?.fileData} getBackURL={setVideoObjectURL} /> : <></>}
              </div>
              <h2>{renderedData?.massage}</h2>
              <h3 onClick={() => downloadVideo(renderedData?.data?.fileData)}>(Download File)</h3>
              <h3>(send to Email)</h3>
              {/* <div className='previewbtnsdiv'>
                <button className='downloadBtn'>See Preview</button>
                <button className='emailBtn' onClick={() => navigate(`/${renderedData[0].id}`)}>Use this template</button>
              </div> */}
            </div>
        }
      </div>
    </div>
  )
}

export default Preview