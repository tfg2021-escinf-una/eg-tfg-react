import { Button } from '@mui/material'
import type * as CSS from 'csstype'
import Carousel from 'react-material-ui-carousel'
import {useState, useEffect} from 'react'
import axios from 'axios'
import DataTable from './DataTable'

const vaccinesInfoContainerStyle: CSS.Properties = {
  width: '100%',
  height: '40%'
}
const carouselContainerStyle: CSS.Properties = {
  height: '60%',
  width: '100%',
}

const vaccinesTitleStyle: CSS.Properties = {
  color: 'white'
}

const carouselCardStyle: CSS.Properties = {
  backgroundColor: '#71828A',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '85%',
  marginTop: '5rem',
  borderRadius: '25px',
  overflow: 'hidden'
}

const mainContainerStyle: CSS.Properties = {
  height: '100%',
  width: '100%'
}
const imageContainerStyle: CSS.Properties = {
  width: '100%',
  height: '100%',
  display: 'inline'
}
const style1: CSS.Properties = {
  width: '50%'
}
const style2: CSS.Properties = {
  width: '50%',
  color: 'white',
  marginLeft: '1rem'

}
export const CovidNews = () => {
  const [newsData, setNewsData] = useState([{title : '', urlToImage: '', content: '' }])
  const [vaccinesData, setVaccinesData] = useState([{trimedName : '', category: '', phase: '', developerResearcher: '', funder: '' }])
  const headers = {
    'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
};
  useEffect(()=>{
     axios.get('https://covid-info-dev-tfg2021-escinf-una.cloud.okteto.net/news', {headers}).then( (res: any) =>
     setNewsData(res.data.news)).catch(err => console.log(err))
     axios.get('https://covid-info-dev-tfg2021-escinf-una.cloud.okteto.net/vaccines', {headers}).then( (res: any) =>
     setVaccinesData(res.data)).catch(err => console.log(err))
  }, [])

  return (
    <div style={mainContainerStyle}>
      <div style={carouselContainerStyle}>
        <Carousel height={'500px'}>
          {
            newsData.map((news, i) => <div key={i} style={carouselCardStyle}>
              <div style={style1}><img src={news.urlToImage} alt="" style={imageContainerStyle}></img></div>
              <div style={style2}>
                <h2>{news.title}</h2>
                <p>{news.content.split('[')[0]}</p>

                <Button className="CheckButton">
                  Check it out!
                </Button>
              </div>
            </div>)
          }
        </Carousel>
      </div>
      <div style={vaccinesInfoContainerStyle}>
        <h1 style={vaccinesTitleStyle}>Vaccines Research Info</h1>
        <DataTable data={vaccinesData} />
      </div>
    </div>
  )
}

