import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useSearch } from "../../context/searchContext";
import mockPhoto from "./1000.jpg";
import { FiUpload } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { useAuth } from '../../context/authContext';

import homePageMock from './mockData';
import history_mock_1 from './history_mock_1.jpeg'
import history_mock_2 from './history_mock_2.jpeg'
import history_mock_3 from './history_mock_3.jpeg'
import history_mock_4 from './history_mock_4.jpg'
import mock from './mockResponse';

function Home() {
  const searchContext = useSearch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [iin, setIIN] = useState('');
  const { auth_user_id, token, devMode } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // Add state for searching
  const [history, setHistory] = useState(null);

  const handleSearch = () => {
    setSearching(true); // Set searching to true when search starts
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
        setSearching(false); // Set searching to false when search is complete
        navigate('/search/result');
      }).catch((error) => {
        console.log(error);
        setSearching(false); // Set searching to false if an error occurs

        if (devMode) {
          searchContext.setLastRequest(mock);
          navigate('/search/result');
        }
      });
    }

    search();
  }

  useEffect(() => {
    console.log(homePageMock.history);

    if (!devMode) {
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
      
    } else {
      devModeHome();
    }
  }, [])

  const devModeHome = async () => {
    await new Promise(r => setTimeout(r, 2000));
    setHistory(homePageMock.history);
    setLoading(false);
  }

  return (
    <Layout>
      <div className="home-page">
        <div className="container">
          <div className="recent-search">
            <div className="title">Недавние запросы</div>
            <div className="cards ">
              {
                !loading
                  ? (<>
                    <Search_Card history={history[0]} />
                    <Search_Card history={history[1]} />
                    <Search_Card history={history[2]} />
                  </>) : (<>
                    <div><span>...Loading</span></div>
                    <div><span>...Loading</span></div>
                    <div><span>...Loading</span></div>
                  </>)
              }
            </div>
          </div>

          <div className="search-input">
            <div className="file-input">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  console.log("File");
                  setFile(e.target.files[0]);
                }}
              />
              <div>
                {file === null ? (
                  <FiUpload className="icon" />
                ) : (
                  <FaCheckCircle className="icon check-icon" />
                )}
                <p>
                  {file === null
                    ? "Загрузите или выберите изображение для поиска"
                    : "Изображение выбрано "}
                </p>
              </div>
            </div>

            <div className="iin-input">
              <div>
                <input
                  type="text"
                  placeholder="Введите иин"
                  onChange={(e) => setIIN(e.target.value)}
                  value={iin}
                />
                <button onClick={(e) => handleSearch()}>
                  {searching ? "Поиск..." : "Поиск"}
                </button>
              </div>
              {/* <div>
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
              </div> */}
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
  const cardRef = useRef(null);

  const { devMode } = useAuth();
  const mockImages = [history_mock_1, history_mock_2, history_mock_3, history_mock_4];

  const PHOTO_URL = 'http://192.168.122.101:9000/history/';

  useEffect(() => {
    console.log(history);

    if (devMode) {
      setPhoto(mockImages[Math.floor(Math.random() * mockImages.length)]);
    } else {
      setPhoto(`${PHOTO_URL}${history.searchedPhoto}`);
    }

    const _date = history.created_at.substring(0, 10);
    const [year, month, day] = _date.split('-');
    setDate(`${day}.${month}.${year}г.`);

    const _time = history.created_at.substring(history.created_at.indexOf('T') + 1);
    const [h, m, s] = _time.split(':');
    setTime(`${h}:${m}`);
  }, [history, devMode, mockImages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="card" ref={cardRef}>
      <img src={photo} alt={date} />
      <div className="info-block">
        <HiDotsVertical className="icon" onClick={() => setInfoOpen(prev => !prev)} />
        {infoOpen && (
          <div className="info">
            <div>Дата поиска: </div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
