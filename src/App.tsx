import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
// import Biography from './components/Pages/Biography'
import Instruments from './components/Pages/Instruments';
import Agb from './components/Pages/Agb'
import Impressum from './components/Pages/Impressum'
import Footer from './components/Footer'
// import Projects from './components/Pages/Projects';
// import Events from './components/Pages/Events'
import { openSheetApiUrl, tableIds } from './helpers/connect';
import TableIdContext from './AppProvider';
import Home from './components/Home';

interface ISettings {
  homepageTitle: string;
  email?: string;
  emailTooltipText?: string;
  copyright?: string;
}

const App: React.FC = () => {
  const [selected, setSelected] = useState(-1);

  // Select table of next or public 
  // const tableId = tableIds.public;
  const tableId = tableIds.next;

  const [data, setData] = useState<ISettings | null>(null);

  console.log(tableId)

  useEffect(() => {
    fetch(`${openSheetApiUrl}${tableId.id}/${'settings'}`)
      .then((response) => response.json())
      .then((data) => setData(data[0]));
  }, []);

  useEffect(() => {
    // data !== null && console.log(data?.imgLeft);
  }, [data]);

  const handleClick = (index: number) => {
    setSelected(index);
  }

  return (
    <>     
      <TableIdContext.Provider value={tableId}>
        <div id="App" className="flex flex-col h-screen justify-between">
          <Nav
            selected={selected}
            handleClick={handleClick}
            homepageTitle={data?.homepageTitle}
            email={data?.email}
            emailTooltipText={data?.emailTooltipText}
          />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/biography" element={<Biography handleClick={handleClick} />} /> */}
              <Route path="/instruments" element={<Instruments />} />
              {/* <Route path="/projects" element={<Projects />} /> */}
              {/* <Route path="/events" element={<Events />} /> */}
              <Route path="/agb" element={<Agb />} />
              <Route path="/impressum" element={<Impressum />} />
              {/* <Route path="/credits" element={<Credits tableId={tableId} />} /> */}
            </Routes>
          </div>
          {/* <LinkWithLoading url="/events" text="Test" /> */}
          <Footer
            copyright={data?.copyright}
          />
        </div>
      </TableIdContext.Provider>
    </>
  )
}

export default App
