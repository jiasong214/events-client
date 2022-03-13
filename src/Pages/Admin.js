import React, { useState } from 'react';
import EventsListNarrow from '../Components/EventsListNarrow';
import RoomsList from '../Components/roomsList';
import '../style/admin.scss';

const Admin = () => {
  // TODO: tab 하지 말고 router로 바꾸기 (outlet 사용)
  const [tab, setTab] = useState("events");

  const swapTab = (targetTab) => {
    setTab(targetTab)
  }

  return (
    <section className="admin">
      <div className="tab">
        <div>
          <button 
            onClick={() => swapTab("events")}
            className={tab === "events" ? "active" : ""}
          >
            Events
          </button>
          <button 
            onClick={() => swapTab("rooms")}
            className={tab === "rooms" ? "active" : ""}
          >
            Rooms
          </button>
        </div>
      </div>

      {
        tab === "events"
        ?
        <EventsListNarrow />
        :
        <RoomsList />
      }

    </section>
  )
};

export default Admin;