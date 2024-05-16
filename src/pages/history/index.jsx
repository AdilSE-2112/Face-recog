import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/searchContext";
import Layout from "../../components/layout";
import "./style.scss";
import { HiDotsVertical } from "react-icons/hi";
import mockPhoto from "../home/1000.jpg";
import { MdRepeatOn } from "react-icons/md";


const HistoryPage = () => {
  const searchContext = useSearch();
  const navigate = useNavigate();

  const handleRepeatSearch = (file, iin) => {
    searchContext.setFile(file);
    searchContext.setIIN(iin);
    navigate("/search/result");
  };

  return (
    <Layout>
      <div className="history-page">
        <div className="container">
          <div className="prev-requests">
            <div className="title">История запросов</div>
            <div className="cards">
              {[...Array(8)].map((_, index) => (
                <SearchCard
                  key={index}
                  photo={mockPhoto}
                  date={"25.04.24"}
                  onRepeatSearch={handleRepeatSearch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SearchCard = ({ photo, date, onRepeatSearch }) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleRepeatSearchClick = () => {
    const mockIIN = "123456789012"; 
    // console.log("File:", mockPhoto);
    console.log("IIN:", mockIIN);
    onRepeatSearch(mockPhoto, mockIIN);
  };

  return (
    <div className="card">
      <img src={photo} alt={date} />
      <div className="info-block">
        <HiDotsVertical
          className="hiDotsicon"
          onClick={() => setInfoOpen((prev) => !prev)}
        />
        {infoOpen ? (
          <div className="info">
            <div>Дата поиска: </div>
            <div>12.01.2012г</div>
            <div>18:32</div>
          </div>
        ) : null}
      </div>
      <div className="repeat-block">
        <MdRepeatOn className="repeatIcon" onClick={handleRepeatSearchClick} />
      </div>
    </div>
  );
};

export default HistoryPage;
