import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tw from "twin.macro";
import "./SimplePrimary.css"
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { ReactComponent as QuoteIconBase } from "images/quotes-l.svg"
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg"
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg"
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Axios from "axios"
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from "axios";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from "react-slick";






const useStyles = makeStyles((theme) => ({
  root: {
    
     
        flexBasis:'unset',
        maxWidth: '18.66667%',
        marginLeft:'10px'
 
  },


  root2: {
    
    maxWidth: '85%',
    marginLeft:'30px'

},

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginTop:'18px'
  },

  style2:{
    '& .eWkQlm ':{
      maxWidth:'1336px'
    },
  },

  button: {
    borderRadius: "25px",
    fontSize: "1rem",
    fontWeight: "bold",
    height: "inherit",
    background: "white",
    color: "#243e63",
    boxShadow: "none",
    border: "none",
    transition: "transform .2s",
    '&:hover': {
        background: "white",
        color:"#243e63",
        webkitTransform: "scale(1.1)", /* Safari 3-8 */
        transform: "scale(1.1)",
        boxShadow: "none",

    },
    '&:focus': {
        outline:'none'
    }
},

  
}));



const PrimaryBackgroundContainer = tw(Container)`-mx-8 px-8 bg-primary-900 text-gray-100`;

const HeadingContainer = tw.div``;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 mb-4`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto text-center text-gray-300`;

const TestimonialsSlider = styled(Slider)`
  ${tw`flex mt-16 mx-auto max-w-xs sm:max-w-xl lg:max-w-4xl text-left bg-gray-100 rounded-lg text-gray-900`}
  .slick-track {
    ${tw`flex!`}
  }
  .slick-slide {
    ${tw`h-auto`}
  }
  .slick-slide > div {
    ${tw`h-full`}
  }
`;
const Testimonial = tw.div`px-6 py-12 sm:px-20 sm:py-16 focus:outline-none flex! flex-col justify-between h-full`
const QuoteContainer = tw.div`relative`
const QuoteIcon = tw(QuoteIconBase)`absolute opacity-15 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-primary-500`
const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`
const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`
const CustomerImage = tw.img`w-16 h-16 rounded-full`
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex flex-col`
const CustomerName = tw.span`text-lg font-semibold`
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`
const ControlsContainer = tw.div`sm:ml-auto flex`
const ControlButton = styled.button`
  ${tw`text-gray-600 hover:text-primary-700 focus:outline-none transition-colors duration-300 ml-4 first:ml-0 sm:first:ml-4 mt-4 sm:mt-0`}
  .icon {
    ${tw`fill-current w-6`}
  }
`;



export default ({
  subheading = "",
  heading = "Latest  Blogs",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
}) => {
  const [sliderRef, setSliderRef] = useState(null)
  const history = useHistory();
  const [blogData,setBlogData]=useState([])
  const classes = useStyles();
  const three = useMediaQuery('(max-width:950px)');
  const two = useMediaQuery('(max-width:600px)')
  const one = useMediaQuery('(max-width:399px)')
  const last = useMediaQuery('(min-width:951px)')
  // const setting = {
  //   dots: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow:`${matches == true ? '3' : '4'}`,
  //   slidesToScroll: 3,
  //   autoplay: false,
  //   autoplaySpeed: 4000,
  //   cssEase: "linear"
  // }





  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: one && 1 || two && 2 || three && 3 || last && 4,
    slidesToScroll: 1
  };


  async function fetchData() {


  }

  const matches2 = useMediaQuery('(max-width:1280px)');
  const matches1 = useMediaQuery('(min-width:1024px)')

React.useEffect(() => {

  let cancel
  Axios('http://infilate.com/backend/public/api/app/blog/blog-list', {
      method: 'POST',
      // cancelToken: new axios.CancelToken(c=>cancel=c)
    }).then(res=> {
        setBlogData(res.data.Data)
        // console.log(res)
      })
    .catch(e=> {
      console.log(e)
    })   
    
},[]);

console.log(blogData)
 
const handleCardClick=(item)=>{
  history.push(`/BlogDetail/${item.id}`,{Post:item});
}
  return (
    <Grid container style={matches1 ? {padding : "2rem 6rem", maxWidth : "1440px", margin : "2rem auto",display:'flex',justifyContent:'center'} : {padding : "0rem 1rem",}}>

      <div style={{display:'flex',justifyContent:'space-between',width:'inherit'}}>
    <h1 style = {{fontSize : "2rem", fontWeight : "700", marginBottom : "1.5rem"}}>Latest Blogs</h1>


    <div className = "home-coupons-view">
            <Link to = "/Mainblog">View all blogs</Link>
          </div>
    {/* <Button  variant="contained" color="primary" size="small" className={classes.button}>
        <Link to='/Mainblog'> View all blogs</Link>
        </Button>  */}
        </div>

      <Grid item container style={{display:'flex',alignItems:'baseline'}}>


        {/* <Grid className={classes.root2}  item xs={10}>
          <hr style={{paddingTop:'6px',borderTopWidth: '2.5px',borderColor:'#b4adad',opacity:'73%'}}/>
        </Grid> */}
        </Grid>
        
   

        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
        </HeadingContainer>
      


        <div className="card-head"> 
        <Slider {...settings} style={{width:'100%'}}>

        {
              blogData?.map((item,index) => 
                
                <div class="card" key={index} onClick = {() => handleCardClick(item)}>
                  <p style={{ fontSize: `${two ? '12px' : '16px'}`, 
                  fontWeight: "600", lineHeight: "33px", marginLeft: "5px" }} class="title">{item.title}</p>
          <img style={{ width: "100%", borderRadius: "4px", objectFit:'cover' }} src={`http://infilate.com/backend/public/images/${item.media}`} onError = {(e) => e.target.src = "/Assets/Images/blog.png"} />

                  <p style={{ fontSize: `${two ? '12px' : '16px'}`, fontWeight: "600", paddingTop: "10px" }}>{item.title1}</p>

                </div>
              )}
        {/* <p> saala </p>
        <p> saala </p>
        <p> saala </p>
        <p> saala </p>
        <p> saala </p>
        <p> saala </p> */}
        </Slider>
        
          {/* <Slider {...setting} style={{ width: "100%"}}  >
            {
              blogData?.map((item,index) => 
                
                <div class="card" key={index} onClick = {() => handleCardClick(item)}>
                  <p style={{ fontSize: `${matches == true ? '11px' : '16px'}`, 
                  fontWeight: "600", lineHeight: "33px", marginLeft: "5px" }} class="title">{item.title}</p>
          <img style={{ width: "100%", borderRadius: "4px" }} src={`http://infilate.com/backend/public/images/${item.image}`} onError = {(e) => e.target.src = "/Assets/Images/blog.png"} />

                  <p style={{ fontSize: "18px", fontWeight: "600", paddingTop: "10px" }}>{item.title1}</p>

                </div>
              )}
          </Slider> */}
        </div>

        <Grid style={{display: "flex", justifyContent:'center'}} item xs={12}>
             
          </Grid>    
        
    </Grid>
  );
};
