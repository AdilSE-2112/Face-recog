import React, { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../context/searchContext';
import Layout from '../../components/layout';

import './style.scss';

import mockPhoto from './mock photo.png';
import mock from './mockResponse';

import { FaAnglesRight } from "react-icons/fa6";

function Result() {
    const { iin, file } = useSearch();

    const [isLoading, setLoading] = useState(true);
    const [imageURL, setImageURL] = useState(null);

    const [canvas, setCanvas] = useState(null);
    const canvasRef = useRef(null);
    const [ctx, setCTX] = useState(null);
    const [circles, setCircles] = useState([]);
    const [img, setImage] = useState(null);

    const [currentSubject, setCurrentSubject] = useState(null);
    const [hoverSubject, setHoverSubject] = useState(null);

    const [mouseXpos, setMouseXpos] = useState(null);
    const [mouseYpos, setMouseYpos] = useState(null);

    const [results, setResults] = useState(null);

    const canvasWidth = 700;
    const canvasHeight = 500;  

    const [mainInfo, setMainInfo] = useState({
        first_name: 'Madiyar',
        last_name: 'Kuanyshbekov',
        middle_name: 'Erkebulanuly',
        iin: '020131550302',
        birth_date: '01.01.1990',
        old_address: '111',
        address: '111',
        phone: '+123'
    });

    useEffect(() => {
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d');
        setCTX(ctx);
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
        setImage(img);
    
        img.onload = () => {
            setResults(mock);
    
            const aspectRatio = img.width / img.height;
            const maxWidth = canvas.parentElement.offsetWidth; // Get parent width
            const maxHeight = 400;
    
            let newWidth = maxWidth;
            let newHeight = newWidth / aspectRatio;
    
            if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = newHeight * aspectRatio;
            }
    
            canvas.width = newWidth;
            canvas.height = newHeight;
    
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
            redrawCanvas();
        }
    }, [isLoading, file, results, currentSubject, mouseXpos, mouseYpos]);

    const redrawCanvas = () => {
        if (ctx === null) return;
        const canvas = canvasRef.current;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
        // Original image dimensions
        const originalWidth = img.width;
        const originalHeight = img.height;
    
        // Displayed canvas dimensions
        const displayedWidth = canvas.width;
        const displayedHeight = canvas.height;
    
        // Scale factors
        const scaleX = originalWidth / displayedWidth;
        const scaleY = originalHeight / displayedHeight;
    
        // Draw circle
        mock.faces.map(({ bbox, milvus_results }, index) => {
            const x_min = bbox[0];
            const x_max = bbox[0] + bbox[2];
            const y_min = bbox[1];
            const y_max = bbox[1] + bbox[3];
        
            // Scale the coordinates
            const scaledX = x_min / scaleX;
            const scaledY = y_min / scaleY;
            const scaledWidth = (x_max - x_min) / scaleX;
            const scaledHeight = (y_max - y_min) / scaleY;
            const scaledRadius = Math.min(scaledWidth, scaledHeight) / 2;
        
            // Calculate the center of the scaled circle
            const scaledCenterX = scaledX + scaledWidth / 2;
            const scaledCenterY = scaledY + scaledHeight / 2;
        
            ctx.beginPath();
            ctx.arc(scaledCenterX, scaledCenterY, scaledRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        })
    };
    

    const mouseMove = (event) => {
        const canvas = canvasRef.current;

        redrawCanvas();
    }

    const mouseClick = (event) => {
        const canvas = canvasRef.current;

        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left); // Adjust for scaling
        const mouseY = (event.clientY - rect.top);   // Adjust for scaling

        circles.forEach(circle => {
            if (
                Math.sqrt((mouseX - circle.centerX) ** 2 + (mouseY - circle.centerY) ** 2) <= circle.radius
            ) {
                handleCircleClick(circle.subject);
            }
        });
    }

    const handleCircleMouseMove = (subject) => {
        redrawCanvas();
    };

    const handleCircleMouseOut = () => {
        const canvas = canvasRef.current;

        canvas.style.cursor = 'default';
        redrawCanvas();
    };

    const handleCircleClick = (subject) => {
        redrawCanvas();
    };

    return ( 
        <Layout>
            <div className='result-page'>
                <div className="container">

                    <div className="main-result-block">
                        <div className="canvas">
                            {/* {imageURL && <img src={imageURL} alt="" />} */}
                            <canvas ref={canvasRef} alt="img" />
                        </div>
                        <div className="info">
                            <div className="photo">
                                <img src={mockPhoto} alt="Udostak" />
                            </div>
                            <div>
                                <div>Имя: <span>{mainInfo.first_name}</span></div>
                                <div>Фамилия: <span>{mainInfo.last_name}</span></div>
                                <div>Отчество: <span>{mainInfo.middle_name}</span></div>
                                <div>ИИН: <span>{mainInfo.iin}</span></div>
                                <div>День рождания: <span>{mainInfo.birth_date}</span></div>
                                <div>Старая прописка: <span>{mainInfo.old_address}</span></div>
                                <div>Прописка: <span>{mainInfo.address}</span></div>
                                <div>Номер телефона  :<span>{mainInfo.phone}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="additional-result-block">
                        <h3 className="title">Схожие люди</h3>
                        <div className="cards">
                            <SimilarCard />
                            <SimilarCard />т 
                            <SimilarCard />
                        </div>
                    </div>
                </div>                
            </div>
        </Layout>
    );
}

const SimilarCard = ({
    data = {
        full_name:'Мадияр Куанышбеков Еркебуланулы',
        iin: '020131550302',
        image: mockPhoto
    }
}) => {

    return (
        <div className="card">
            <div className="photo">
                <img src={data.image} />
                
            </div>
            <div className="info-block">
                <div className="info">
                    <div>{data.full_name}</div>
                    <div>{data.iin}</div>
                </div>
                <div className="actions">
                    <FaAnglesRight />
                </div>
            </div>
        </div>
    )
}

export default Result;
