import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import { useSearch } from '../../context/searchContext';

import mockPhoto from './1000.jpg';

import { FiUpload } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

function Home() {
    const searchContext = useSearch();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [iin, setIIN] = useState('');

    const handleSearch = () => {
        searchContext.setFile(file);
        searchContext.setIIN(iin);
        navigate('/search/result');
    }

    return ( 
        <Layout>

            <div className="home-page">
                    <div className="container">
                        <div className="recent-search">
                            <div className="title">Недавние запросы</div>
                            <div className="cards">
                                <Search_Card photo={mockPhoto} date={'25.04.24'} />
                                <Search_Card photo={mockPhoto} date={'25.04.24'} />
                                <Search_Card photo={mockPhoto} date={'25.04.24'} />
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

const Search_Card = ({ photo, date }) => {
    const [infoOpen, setInfoOpen] = useState(false);
    
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
                                <div>12.01.2012г</div>
                                <div>18:32</div>
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