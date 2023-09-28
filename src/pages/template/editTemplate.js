import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import T11 from '../../assets/img/T11.png'
import T12 from '../../assets/img/T12.png'
import T13 from '../../assets/img/T13.png'
import T14 from '../../assets/img/T14.png'
import { Button, TextField } from '@mui/material';

const EditTemplate = () => {
    const [filds, setFilds] = useState([])
    let { template } = useParams();
    const navigate = useNavigate();
    const getData = () => {
        axios.get(`http://localhost:5000/templates/${template}`).then(res => {
            setFilds(res.data?.data)
        }).catch(err => {
            console.log('err', err)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const onchange = (e, name) => {
        console.log('e', e)
        let temp = [...filds]
        let newData = temp.map(el => {
            if (el?.layerName === name) {
                return {
                    ...el,
                    value: e.target.value
                }
            } else {
                return el
            }
        })
        setFilds(newData)
    }

    const onsave = () => {
        navigate(`/download/${template}`, { state: { data: filds } })
    }

    const groupedData = filds.reduce((groups, obj, index) => {
        const key = obj?.screen;

        // Find the group with the current key or create a new one
        const group = groups.find(item => item[0] === key);

        if (group) {
            group.push(obj);
        } else {
            groups.push([key, obj]);
        }

        return groups;
    }, []);
    return (
        <div className='edit-template-main'>
            {
                groupedData.length ? groupedData.map((item, index) => (
                    <div key={index} className='steps'>
                        <div style={{ width: "70%", textAlign: "end" }}>
                            {
                                item?.length ? item?.map((el, i) =>
                                    i !== 0 ? <TextField
                                        key={i}
                                        style={{ width: "70%", margin: "20px 10px" }}
                                        id="standard-basic"
                                        placeholder={el.layerName}
                                        label={el.layerName}
                                        value={el.value}
                                        variant="standard"
                                        onChange={(e) => onchange(e, el?.layerName)}
                                    />
                                        : <></>
                                ) :
                                    <></>

                            }
                        </div>
                        <div className='stepCount'>{item[0]}</div>
                        <div className='card'>
                            <img src={T11} alt='img' />
                        </div>
                    </div>
                ))
                    :
                    <></>
            }

            <Button style={{ width: "15%", height: "45px" }} onClick={() => onsave()} variant="contained">SAVE</Button>
        </div>
    )
}

export default EditTemplate