import React from 'react';
import {useEffect} from 'react';
import Home from './Home';
import coimbatoreAirport from './CoimbatoreAirport';
import chennaiAirport from './ChennaiAirport';
import bhubaneshwarAirport from './BhubaneshwarAirport';
import agartalaAirport from './AgartalaAirport';
import chandigarhAirport from './ChandigarhAirport';
import kolkataAirport from './KolkataAirport';
import puneAirport from './PuneAirport';
import varanasiAirport from './VaranasiAirport';
import srinagarAirport from './SrinagarAirport';
import goaAirport from './GoaAirport';
import patnaAirport from './PatnaAirport';
import indoreAirport from './IndoreAirport';
import bagdograAirport from './BagdograAirport';
import vishakapatnamAirport from './VishakapatnamAirport';
import juhuAirport from './JuhuAirport';
import ranchiAirport from './RanchiAirport';
import raipurAirport from './RaipurAirport';
import bhopalAirport from './BhopalAirport';
import trichyAirport from './TrichyAirport';
import calicutAirport from './CalicutAirport';
import maduraiAirport from './MaduraiAirport';

import {Routes,Route,useLocation} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Navbar from './Navbar';
import './App.css';
import Footer from './Footer';



function App() {
  const {pathname} = useLocation(); 
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [pathname]);
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/kolkataAirport' Component={kolkataAirport}/>
      <Route path='/puneAirport' Component={puneAirport}/>
      <Route path='/coimbatoreAirport' Component={coimbatoreAirport}/>
      <Route path='/agartalaAirport' Component={agartalaAirport}/>
      <Route path='/chennaiAirport' Component={chennaiAirport}/>
      <Route path='/bhubaneshwarAirport' Component={bhubaneshwarAirport}/>
      <Route path='/chandigarhAirport' Component={chandigarhAirport}/>
      <Route path='/varanasiAirport' Component={varanasiAirport}/>
      <Route path='/srinagarAirport' Component={srinagarAirport}/>
      <Route path='/goaAirport' Component={goaAirport}/>
      <Route path='/patnaAirport' Component={patnaAirport}/>
      <Route path='/indoreAirport' Component={indoreAirport}/>
      <Route path='/bagdograAirport' Component={bagdograAirport}/>
      <Route path='/vishakapatnamAirport' Component={vishakapatnamAirport}/>
      <Route path='/juhuAirport' Component={juhuAirport}/>
      <Route path='/ranchiAirport' Component={ranchiAirport}/>
      <Route path='/raipurAirport' Component={raipurAirport}/>
      <Route path='/bhopalAirport' Component={bhopalAirport}/>
      <Route path='/trichyAirport' Component={trichyAirport}/>
      <Route path='/calicutAirport' Component={calicutAirport}/>
      <Route path='/maduraiAirport' Component={maduraiAirport}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
