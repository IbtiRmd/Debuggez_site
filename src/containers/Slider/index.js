import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>

    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const slide = data?.focus?.length;

  const nextCard = () => {
    setTimeout(
       () => setIndex(index < slide - 1 ? index + 1 : 0),
     5000
     );
      }




    // setIndex(
      // (prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0)
      // ajout du -1 pour ne pas boucler une fois dans le vide */
    // ); 
  // };*/
  useEffect(() => {
    

    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evt, radioIdx) => (
                <input
                  // key={`${event.id}`}
                  key={evt.id}
                  type="radio"
                  name="radio-button"
                  // checked={idx === radioIdx}
                  checked={index === radioIdx}
                 // onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;