import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout";
import "./style.scss";
import { HiDotsVertical } from "react-icons/hi";
import mockPhoto from "../home/1000.jpg";
import { MdRepeatOn } from "react-icons/md";

const HistoryPage  = () => {
    //Мына жерин жазып тастайсынго атакто уже уйге ухожу 
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="history-page">
        <div className="container">
          <div className="prev-requests">
            <div className="title">История запросов</div>
            <div className="cards">
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />

              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
              <Search_Card photo={mockPhoto} date={"25.04.24"} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const Search_Card = ({ photo, date }) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();
  const handleRepeatSearch = () => {

    navigate("/search/result");
  };
  return (
    <div className="card">
      <img src={photo} alt={date} />
      <div className="info-block">
        <HiDotsVertical
          className="hiDotsicon"
          onClick={(e) => setInfoOpen((prev) => !prev)}
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
        <MdRepeatOn
          className="repeatIcon"
          onClick={(e) => handleRepeatSearch()}
        />
      </div>
      {/* <div>
                <p>{date}</p>
            </div> */}
    </div>
  );
};
export default HistoryPage ;
