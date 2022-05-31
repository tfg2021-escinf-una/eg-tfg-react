import { Button } from '@mui/material'
import type * as CSS from 'csstype'
import {data} from './news_info'
import Carousel from 'react-material-ui-carousel'


const vaccinesInfoContainerStyle: CSS.Properties = {
//backgroundColor: '#EB920E',
  width: '100%',
  height: '40%'
}
const carouselContainerStyle: CSS.Properties = {
  height: '60%',
  width: '100%',
 // backgroundColor: 'yellowgreen',
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
  return (
    <div style={mainContainerStyle}>
      <div style={carouselContainerStyle}>
        <Carousel height={'500px'}>
          {
            data.news.map((news, i) => <div key={i} style={carouselCardStyle}>
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
      <div style={vaccinesInfoContainerStyle}></div>
    </div>
  )
}

