import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const App = () => {
  const targetWord = "BITESYS";
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [randomLetters, setRandomLetters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showFeedbackModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const getRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const targetLetters = "BITESYS";
    const weightedPool = [...targetLetters.repeat(10), ...letters];
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    dots: false,
  };

  useEffect(() => {
    const letters = Array.from({ length: 50 }, getRandomLetter);
    setRandomLetters(letters);
  }, []);

  const handleLetterClick = (letter) => {
    const newSelectedLetters = [...selectedLetters, letter];
    const currentIndex = newSelectedLetters.length - 1;

    if (newSelectedLetters[currentIndex] === targetWord[currentIndex]) {
      setSelectedLetters(newSelectedLetters);
      if (newSelectedLetters.length === targetWord.length) {
        showFeedbackModal(
          "Bravo! You've spelled 'bITeSys' correctly! If you liked this, please induct Akash into the club🍺"
        );
        resetGame();
      }
    } else {
      showFeedbackModal("Oops! Incorrect letter, start again.");
      resetGame();
    }
  };

  const resetGame = () => {
    setSelectedLetters([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div className="logos-container">
        <img src="/iims-logo.png" alt="IIM Shillong Logo" className="logo" />
        <img src="/bITeSys_Logo.png" alt="bITeSys Logo" className="logo" />
      </div>

      <h1>Spell the Word: BITESYS</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Selected Letters: {selectedLetters.join("")}</h2>
      </div>

      <Slider {...settings}>
        {randomLetters.map((letter, index) => (
          <div
            key={index}
            onClick={() => handleLetterClick(letter)}
            className="carousel-item"
          >
            {letter}
          </div>
        ))}
      </Slider>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="footer">Made with ❤️ by Akash</div>
    </div>
  );
};

export default App;
