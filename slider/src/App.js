import React, {useState, useEffect} from "react";
import {FiChevronRight, FiChevronLeft} from "react-icons/fi";
import {FaQuoteRight} from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  //can have multiple useEffect

  //prevent the list overflow
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  //set timer to change slider automatically
  useEffect(() => {
    let slider = setTimeout(() => {
      setIndex(index + 1);
    }, 3000);
    //click will create multiple intervals, make the slider keep changing
    //without clearInterval the slider will keep changing if click multiple time
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const {id, image, name, title, quote} = person;
          //setting dynamic position class
          let position = "nextSlide";

          //will show the 1st person as default, because index = 0
          if (index === personIndex) {
            position = "activeSlide";
          }

          // show the previous person (index-1)
          //if index=0, show the last person in the data list
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
