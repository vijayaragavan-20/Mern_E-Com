import React, { useState, useEffect } from "react";
import "./Hero.css";
// import img1 from "../Assets/img1.png";
import img2 from "../Assets/watchremove.png";
import img9 from "../Assets/img2.png";
import img3 from "../Assets/img3.png";
import img6 from "../Assets/camera.png";
import img4 from "../Assets/img4.png";
import img7 from "../Assets/hp_laptop-.png";
import img5 from "../Assets/Sony_Headphones___Earbuds-removebg-preview.png";
import img8 from "../Assets/img6.png";

const data = [
  // { id: 1, image: img1, title: "Airpod GHTK" },
  { id: 2, image: img2, title: "Android Watch" },
  { id: 3, image: img3, title: "Airpod Max" },
  { id: 7, image: img7, title: "Hp laptop" },
  { id: 4, image: img4, title: "Airpod V2" },
  { id: 5, image: img5, title: "Airpod S" },
  { id: 6, image: img6, title: "Sony Camera" },
  { id: 8, image: img8, title: "Airpod Ultra" },
  { id: 9, image: img9, title: "Airpod Ultra" },
];

const Hero = () => {
  const [items, setItems] = useState(data);
  const [animation, setAnimation] = useState("");

  const handleNext = () => {
    setAnimation("next");
    setTimeout(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setAnimation("");
    }, 800); // This delay matches the transition duration
  };

  const handlePrev = () => {
    setAnimation("prev");
    setTimeout(() => {
      setItems((prev) => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
      setAnimation("");
    }, 800); // This delay matches the transition duration
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="nav-buttons">
        <button onClick={handlePrev} className="nav-btn">←</button>
        <button onClick={handleNext} className="nav-btn">→</button>
      </div>
      <div className={`list ${animation}`}>
        {items.map((item) => (
          <div className="item" key={item.id}>
            <div className="img-container">
              <img src={item.image} alt={`Item ${item.id}`} />
            </div>
            <div className="introduce">
              <div className="title">NEW.....!</div>
              <div className="topic">Arrivals</div>
              <div className="des">PURCHASE YOUR PRODUCT...</div>
              
            </div>
           

          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
