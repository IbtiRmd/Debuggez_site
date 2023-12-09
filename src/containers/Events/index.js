import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";




const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
  //   (event, index) => {
  //     if (
  //       (currentPage - 1) * PER_PAGE <= index &&
  //       PER_PAGE * currentPage > index
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  // );
  /* - - - - - - - - - - */
  /* Sert à traiter des événements filtrés et paginés */
  const filteredEvents = (
    type
      ? (data?.events || []).filter((event) => event.type === type)
      : data?.events || []
  ).slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  /* - - - - - - - - - - */

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  console.log(typeList);

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((element) => (
              <Modal key={element.id} Content={<ModalEvent event={element} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={element.cover}
                    title={element.title}
                    date={new Date(element.date)}
                    label={element.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;