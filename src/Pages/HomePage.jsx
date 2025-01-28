import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { setCountries, setRegion, loadMore, setCurrentIndex } from '../store/countriesSlice';

function HomePage() {
  const dispatch = useDispatch();
  const { countries, visible, currentIndex, selectedRegion } = useSelector(state => state.countries);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,flag")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCountries(data));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, [dispatch]);

  const handleSelect = (selectedIndex) => {
    dispatch(setCurrentIndex(selectedIndex));
  };

  const handleNavLinkClick = () => {
    const navbarToggle = document.querySelector(".navbar-toggler");
    if (navbarToggle) {
      navbarToggle.click();
    }
  };

  const handlePrev = () => {
    dispatch(setCurrentIndex(currentIndex === 0 ? 2 : currentIndex - 1));
  };

  const handleNext = () => {
    dispatch(setCurrentIndex(currentIndex === 2 ? 0 : currentIndex + 1));
  };

  const filterByRegion = (region) => {
    dispatch(setRegion(region));
  };

  const filteredCountries = selectedRegion === "All"
    ? countries
    : countries.filter((country) => country.region === selectedRegion);

  return (
    <div className="container my-4">
      <header className="text-center mb-4 d-flex justify-content-between align-items-center">
        <h3 className="mb-3 custom-head">Countries</h3>
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className={`nav-link custom-head ${selectedRegion === "Asia" ? "active" : ""}`}
                  onClick={() => {
                    filterByRegion("Asia");
                    handleNavLinkClick();
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: selectedRegion === "Asia" ? "underline" : "none",
                  }}
                >
                  Asia
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link custom-head ${selectedRegion === "Africa" ? "active" : ""}`}
                  onClick={() => {
                    filterByRegion("Africa");
                    handleNavLinkClick();
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: selectedRegion === "Africa" ? "underline" : "none",
                  }}
                >
                  Africa
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link custom-head ${selectedRegion === "Europe" ? "active" : ""}`}
                  onClick={() => {
                    filterByRegion("Europe");
                    handleNavLinkClick();
                  }}
                  style={{
                    cursor: "pointer",
                    textDecoration: selectedRegion === "Europe" ? "underline" : "none",
                  }}
                >
                  Europe
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="text-center mb-4 d-sm-flex gap-5 justify-content-between">
        <hr style={{
          marginTop: "5px",
          color: "#3D3D3D",
          width: "100%",
          height: "3px",
          backgroundColor: "#3D3D3D",
          border: "none",
        }} />
        <h1 className="mb-3 custom-head">WELCOME</h1>
        <hr style={{
          marginTop: "45px",
          color: "#3D3D3D",
          width: "100%",
          height: "3px",
          backgroundColor: "#3D3D3D",
          border: "none",
        }} />
      </div>

      <div className="row mb-4">
        <div className="col-md-8 position-relative">
          <Carousel
            activeIndex={currentIndex}
            onSelect={handleSelect}
            controls={false}
            indicators={false}
          >
            {filteredCountries.slice(0, visible).map((country, index) => (
              <Carousel.Item key={index}>
                <div className="placeholder-slide">
                  <img
                    src={country?.flag}
                    alt={country.name}
                    className="img-fluid placeholder-sidebar"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="d-flex align-items-center justify-content-center mt-3 gap-3">
            <FaArrowLeft
              className="arrow prev cursor-pointer"
              onClick={handlePrev}
              style={{ fontSize: "24px" }}
            />
            <div className="d-flex justify-content-center align-items-center">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`}
                  onClick={() => dispatch(setCurrentIndex(index))}
                ></div>
              ))}
            </div>
            <FaArrowRight
              className="arrow next cursor-pointer"
              onClick={handleNext}
              style={{ fontSize: "24px" }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="placeholder-sidebar">
            <img
              src={filteredCountries[currentIndex]?.flag}
              alt="Featured Country Flag"
              className="img-fluid placeholder-sidebar"
            />
          </div>
        </div>
      </div>

      <div className="row">
        {filteredCountries.slice(0, visible).map((country, index) => (
          <div className="col-lg-6 col-sm-12 mb-4" key={index}>
            <Card className="h-100 d-flex flex-row">
              <Card.Img
                variant="top"
                src={country.flag}
                alt={country.name}
                className="flex-shrink-0"
                style={{ width: "150px" }}
              />
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title className="custom-title custom-head" title={country.name}>
                  {country.name}
                </Card.Title>
                <Card.Text className="custom-head">{country.region}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {visible < filteredCountries.length && (
        <div className="text-center my-4">
          <Button onClick={() => dispatch(loadMore())} variant="primary">
            Load More
          </Button>
        </div>
      )}

      <footer className="text-center mt-5">
        <div className="d-flex justify-content-center gap-3 pt-1 pb-2">
          <FaGoogle
            size={40}
            className="text-muted cursor-pointer border border-dark rounded-circle p-2"
          />
          <FaFacebook
            size={40}
            className="text-muted cursor-pointer border border-dark rounded-circle p-2"
          />
          <FaLinkedin
            size={40}
            className="text-muted cursor-pointer border border-dark rounded-circle p-2"
          />
          <FaTwitter
            size={40}
            className="text-muted cursor-pointer border border-dark rounded-circle p-2"
          />
        </div>
        <p className="mt-3 custom-font-weight">Example@email.com </p>
        <p className="custom-font-weight">&copy; 2025 ExampleDomain.com</p>
      </footer>

      <style jsx>{`
        .separator {
          margin-top: 5px;
          color: #3d3d3d;
          width: 100%;
          height: 3px;
          background-color: #3d3d3d;
          border: none;
        }

        .custom-font-weight {
          font-weight: 600;
          color: #3d3d3d;
        }

        .custom-head {
          color: #3d3d3d;
        }

        .custom-title {
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        .placeholder-sidebar {
          width: 100%;
          height: 300px;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #6c757d;
          border: 1px solid #dee2e6;
        }

        @media (max-width: 768px) {
          .placeholder-slide,
          .placeholder-sidebar {
            height: 200px;
          }
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ddd;
          margin: 0 5px;
          cursor: pointer;
        }

        .dot.active {
          background-color: #007bff;
        }

        .carousel-navigation {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          z-index: 10;
        }

        .arrow {
          cursor: pointer;
          font-size: 24px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          padding: 5px;
        }

        .arrow.prev {
          margin-left: 10px;
        }

        .arrow.next {
          margin-right: 10px;
        }

        .social-icon {
          text-muted;
          cursor: pointer;
          border: 1px solid #dee2e6;
          border-radius: 50%;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
