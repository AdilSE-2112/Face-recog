import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import { useSearch } from '../../context/searchContext';

import mockPhoto from './1000.jpg';

import { FiUpload } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { useAuth } from '../../context/authContext';

function Home() {
    const searchContext = useSearch();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [iin, setIIN] = useState('');
    const { auth_user_id, token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState(null);

    const handleSearch = () => {
        searchContext.setFile(file);
        searchContext.setIIN(iin);

        const search = async () => {
            const data = new FormData();
            data.append('image', file);
            data.append('limit', 10);
            data.append('auth_user_id', 2);
    
            await axios.post(
                'http://192.168.122.101:8000/api/v1/search/', 
                data,
                {
                    headers: { 'Authorization': 'Bearer ' + token },
                },
            ).then((response) => {
                searchContext.setLastRequest(response.data);
                navigate('/search/result');
            }).catch((error) => {
                console.log(error);
            });
        }

        search();
    }

    useEffect(() => {
        axios.post(
            'http://192.168.122.101:8000/api/v1/getUserInfo/',
            {
                'auth_user_id': `${auth_user_id}` || `${localStorage.getItem('auth_user_id')}`
            },
            {
                headers: {
                  'Authorization': 'Bearer ' + token 
                },
            }
        ).then(res => {
            setHistory(res.data.history);
            console.log(res.data);

            setLoading(false);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return ( 
        <Layout>

            <div className="home-page">
                    <div className="container">
                        <div className="recent-search">
                            <div className="title">Недавние запросы</div>
                            <div className="cards">
                                {
                                    !loading 
                                        ? (<>
                                            <Search_Card history={history[0]} />
                                            <Search_Card history={history[1]} />
                                            <Search_Card history={history[2]} />
                                        </>) : (<>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </>)
                                }
                            </div>
                        </div>

                        <div className="search-input">
                            <div className="file-input">
                                {
                                    // file != null 
                                        // ? <img src={URL.createObjectURL(file)} />
                                        // : (
                                            <>
                                            <input 
                                                type="file" 
                                                accept="image/png, image/jpeg"
                                                onChange={e => {
                                                    console.log("File")
                                                    setFile(e.target.files[0]);
                                                }}
                                            />
                                            <div>
                                                <FiUpload className='icon'/>
                                                <p>
                                                    { 
                                                        file === null 
                                                            ? 'Загрузите или выберите изображение для поиска'
                                                            : 'Изображение выбрано '
                                                    }
                                                </p>
                                            </div>
                                            </>
                                        // )
                                }
                            </div>

                            <div className="iin-input">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder='Введите иин'
                                        onChange={(e) => setIIN(e.target.value)}
                                        value={iin}
                                    />
                                    <button
                                        onClick={(e) => handleSearch()}
                                    >Поиск</button>
                                </div>
                                <div>
                                    <div>
                                        <p>Имя:</p>
                                        <p>Маку</p>
                                    </div>
                                    <div>
                                        <p>Фамилия:</p>
                                        <p>Куанышбеков</p>
                                    </div>
                                    <div>
                                        <p>День рождение:</p>
                                        <p>01.01.1990г</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>

        </Layout>
    );
}

const Search_Card = ({ history }) => {
    const [infoOpen, setInfoOpen] = useState(false);
    
    const [photo, setPhoto] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const PHOTO_URL = 'http://192.168.122.101:9000/history/';
    
    useEffect(() => {
        setPhoto(`${PHOTO_URL}${history.searchedPhoto}`)
        
        const _date = history.created_at.substring(0, 10);
        const [year, month, day] = _date.split('-');
        setDate(`${day}.${month}.${year}г.`);

        const _time = history.created_at.substring(history.created_at.indexOf('T'));
        const [h, m, s] = _time.split(':');
        setTime(`${h}:${m}`);
    }, [])

    return (
        <div className="card">
            <img src={photo} alt={date} />
            <div className="info-block">
                <HiDotsVertical className='icon' onClick={(e) => setInfoOpen(prev => !prev)}/>
                {
                    infoOpen 
                        ? (
                            <div className="info">
                                <div>Дата поиска: </div>
                                <div>{date}</div>
                                <div>{time}</div>
                            </div>
                        ) 
                        : null
                }
            </div>
            {/* <div>
                <p>{date}</p>
            </div> */}
        </div>
    )
}

export default Home;