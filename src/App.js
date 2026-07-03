import React from 'react';
import {useEffect} from 'react';
import Home from './Home';

import adampurAirport from './AdampurAirport';
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
import agattiAirport from './AgattiAirport';
import agraAirport from './AgraAirport';
import akolaAirport from './AkolaAirport';
import prayagrajAirport from './PrayagrajAirport';
import aligarhAirport from './AligarhAirport';
import amritsarAirport from './AmritsarAirport';
import aurangabadAirport from './AurangabadAirport';
import ayodhyaAirport from './AyodhyaAirport';
import azamgarhAirport from './AzamgarhAirport';
import bareillyAirport from './BareillyAirport';
import behlaAirport from './BehlaAirport';
import belgaumAirport from './BelgaumAirport';
import bhatindaAirport from './BhatindaAirport';
import bhavnagarAirport from './BhavnagarAirport';
import bhujAirport from './BhujAirport';
import bikanerAirport from './BikanerAirport';
import chitrakootAirport from './ChitrakootAirport';
import coochbeharAirport from './CoochbeharAirport';
import cuddapahAirport from './CuddapahAirport';
import datiaAirport from './DatiaAirport';
import darbhangaAirport from './DarbhangaAirport';
import dehradunAirport from './DehradunAirport';
import deogharAirport from './DeogharAirport';
import dibrugarhAirport from './DibrugarhAirport';
import dimapurAirport from './DimapurAirport';
import diuAirport from './DiuAirport';
import gayaAirport from './GayaAirport';
import gondiaAirport from './GondiaAirport';
import gorakhpurAirport from './GorakhpurAirport';
import gulbargaAirport from './GulbargaAirport';
import gwaliorAirport from './GwaliorAirport';
import hindonAirport from './HindonAirport';
import hirasarAirport from './HirasarAirport';
import hollongiAirport from './HollongiAirport';
import hubliAirport from './HubliAirport';
import begumpetAirport from './BegumpetAirport';
import imphalAirport from './ImphalAirport';
import jabalpurAirport from './JabalpurAirport';
import jaisalmerAirport from './JaisalmerAirport';
import jalgaonAirport from './JalgaonAirport';
import jammuAirport from './JammuAirport';
import jamnagarAirport from './JamnagarAirport';
import jharsugudaAirport from './JharsugudaAirport';
import jodhpurAirport from './JodhpurAirport';
import jorhatAirport from './JorhatAirport';
import kandlaAirport from './KandlaAirport';
import kangraAirport from './KangraAirport';
import kanpurAirport from './KanpurAirport';
import keshodAirport from './KeshodAirport';
import khajurahoAirport from './KhajurahoAirport';
import kushinagarAirport from './KushinagarAirport';
import kishangarhAirport from './KishangarhAirport';
import kolhapurAirport from './KolhapurAirport';
import kotaAirport from './KotaAirport';
import kulluAirport from './KulluAirport';
import lehAirport from './LehAirport';
import lilabariAirport from './LilabariAirport';
import meerutAirport from './MeerutAirport';
import moradabadAirport from './MoradabadAirport';
import mysoreAirport from './MysoreAirport';
import pantnagarAirport from './PantnagarAirport';
import pathankotAirport from './PathankotAirport';
import pakyongAirport from './PakyongAirport';
import pondicherryAirport from './PondicherryAirport';
import porbandarAirport from './PorbandarAirport';
import portblairAirport from './PortblairAirport';
import rajahmundryAirport from './RajahmundryAirport';
import rupsiAirport from './RupsiAirport';
import safdarjungAirport from './SafdarjungAirport';
import salemAirport from './SalemAirport';
import satnaAirport from './SatnaAirport';
import shillongAirport from './ShillongAirport';
import shimlaAirport from './ShimlaAirport';
import sholapurAirport from './SholapurAirport';
import shravastiAirport from './ShravastiAirport';
import silcharAirport from './SilcharAirport';
import suratAirport from './SuratAirport';
import tezpurAirport from './TezpurAirport';
import tezuAirport from './TezuAirport';
import tirupatiAirport from './TirupatiAirport';
import tuticorinAirport from './TuticorinAirport';
import udaipurAirport from './UdaipurAirport';
import vadodaraAirport from './VadodaraAirport';
import vijaywadaAirport from './VijaywadaAirport';
import rewaAirport from './RewaAirport';
import purneaAirport from './PurneaAirport';
import halwaraAirport from './HalwaraAirport';

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
      <Route path='/adampurAirport' Component={adampurAirport}/>
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
      <Route path='/agattiAirport' Component={agattiAirport}/>
<Route path='/agraAirport' Component={agraAirport}/>
<Route path='/akolaAirport' Component={akolaAirport}/>
<Route path='/prayagrajAirport' Component={prayagrajAirport}/>
<Route path='/aligarhAirport' Component={aligarhAirport}/>
<Route path='/amritsarAirport' Component={amritsarAirport}/>
<Route path='/aurangabadAirport' Component={aurangabadAirport}/>
<Route path='/ayodhyaAirport' Component={ayodhyaAirport}/>
<Route path='/azamgarhAirport' Component={azamgarhAirport}/>
<Route path='/bareillyAirport' Component={bareillyAirport}/>
<Route path='/behlaAirport' Component={behlaAirport}/>
<Route path='/belgaumAirport' Component={belgaumAirport}/>
<Route path='/bhatindaAirport' Component={bhatindaAirport}/>
<Route path='/bhavnagarAirport' Component={bhavnagarAirport}/>
<Route path='/bhujAirport' Component={bhujAirport}/>
<Route path='/bikanerAirport' Component={bikanerAirport}/>
<Route path='/chitrakootAirport' Component={chitrakootAirport}/>
<Route path='/coochbeharAirport' Component={coochbeharAirport}/>
<Route path='/cuddapahAirport' Component={cuddapahAirport}/>
<Route path='/datiaAirport' Component={datiaAirport}/>
<Route path='/darbhangaAirport' Component={darbhangaAirport}/>
<Route path='/dehradunAirport' Component={dehradunAirport}/>
<Route path='/deogharAirport' Component={deogharAirport}/>
<Route path='/dibrugarhAirport' Component={dibrugarhAirport}/>
<Route path='/dimapurAirport' Component={dimapurAirport}/>
<Route path='/diuAirport' Component={diuAirport}/>
<Route path='/gayaAirport' Component={gayaAirport}/>
<Route path='/gondiaAirport' Component={gondiaAirport}/>
<Route path='/gorakhpurAirport' Component={gorakhpurAirport}/>
<Route path='/gulbargaAirport' Component={gulbargaAirport}/>
<Route path='/gwaliorAirport' Component={gwaliorAirport}/>
<Route path='/hindonAirport' Component={hindonAirport}/>
<Route path='/hirasarAirport' Component={hirasarAirport}/>
<Route path='/hollongiAirport' Component={hollongiAirport}/>
<Route path='/hubliAirport' Component={hubliAirport}/>
<Route path='/begumpetAirport' Component={begumpetAirport}/>
<Route path='/imphalAirport' Component={imphalAirport}/>
<Route path='/jabalpurAirport' Component={jabalpurAirport}/>
<Route path='/jaisalmerAirport' Component={jaisalmerAirport}/>
<Route path='/jalgaonAirport' Component={jalgaonAirport}/>
<Route path='/jammuAirport' Component={jammuAirport}/>
<Route path='/jamnagarAirport' Component={jamnagarAirport}/>
<Route path='/jharsugudaAirport' Component={jharsugudaAirport}/>
<Route path='/jodhpurAirport' Component={jodhpurAirport}/>
<Route path='/jorhatAirport' Component={jorhatAirport}/>
<Route path='/kandlaAirport' Component={kandlaAirport}/>
<Route path='/kangraAirport' Component={kangraAirport}/>
<Route path='/kanpurAirport' Component={kanpurAirport}/>
<Route path='/keshodAirport' Component={keshodAirport}/>
<Route path='/khajurahoAirport' Component={khajurahoAirport}/>
<Route path='/kushinagarAirport' Component={kushinagarAirport}/>
<Route path='/kishangarhAirport' Component={kishangarhAirport}/>
<Route path='/kolhapurAirport' Component={kolhapurAirport}/>
<Route path='/kotaAirport' Component={kotaAirport}/>
<Route path='/kulluAirport' Component={kulluAirport}/>
<Route path='/lehAirport' Component={lehAirport}/>
<Route path='/lilabariAirport' Component={lilabariAirport}/>
<Route path='/meerutAirport' Component={meerutAirport}/>
<Route path='/moradabadAirport' Component={moradabadAirport}/>
<Route path='/mysoreAirport' Component={mysoreAirport}/>
<Route path='/pantnagarAirport' Component={pantnagarAirport}/>
<Route path='/pathankotAirport' Component={pathankotAirport}/>
<Route path='/pakyongAirport' Component={pakyongAirport}/>
<Route path='/pondicherryAirport' Component={pondicherryAirport}/>
<Route path='/porbandarAirport' Component={porbandarAirport}/>
<Route path='/portblairAirport' Component={portblairAirport}/>
<Route path='/rajahmundryAirport' Component={rajahmundryAirport}/>
<Route path='/rupsiAirport' Component={rupsiAirport}/>
<Route path='/safdarjungAirport' Component={safdarjungAirport}/>
<Route path='/salemAirport' Component={salemAirport}/>
<Route path='/satnaAirport' Component={satnaAirport}/>
<Route path='/shillongAirport' Component={shillongAirport}/>
<Route path='/shimlaAirport' Component={shimlaAirport}/>
<Route path='/sholapurAirport' Component={sholapurAirport}/>
<Route path='/shravastiAirport' Component={shravastiAirport}/>
<Route path='/silcharAirport' Component={silcharAirport}/>
<Route path='/suratAirport' Component={suratAirport}/>
<Route path='/tezpurAirport' Component={tezpurAirport}/>
<Route path='/tezuAirport' Component={tezuAirport}/>
<Route path='/tirupatiAirport' Component={tirupatiAirport}/>
<Route path='/tuticorinAirport' Component={tuticorinAirport}/>
<Route path='/udaipurAirport' Component={udaipurAirport}/>
<Route path='/vadodaraAirport' Component={vadodaraAirport}/>
<Route path='/vijaywadaAirport' Component={vijaywadaAirport}/>
<Route path='/rewaAirport' Component={rewaAirport}/>
<Route path='/purneaAirport' Component={purneaAirport}/>
<Route path='/halwaraAirport' Component={halwaraAirport}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
