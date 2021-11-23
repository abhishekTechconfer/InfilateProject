import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardItem from './CardItem'
import List from './List/List'
import Map from './map/Map'
import Hero from '../pages/Hero'
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';  
import PropTypes from 'prop-types';  
import { getPlacesData } from '../api/api'
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios'
import useStyles2 from './styles'
import './style.css'


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
            background: "white"
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
            background: "white"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: "none"

            },
            '&:hover fieldset': {
                border: "none"

            },
            '&.Mui-focused fieldset': {
                border: "none"

            },
        },
    },
})(TextField);

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);



const useStyles = makeStyles((theme) => ({
    box: {
        height: "max-content",
        display: "flex",
        justifyContent:'center',
        // flexDirection: "column",
        justifyContent:'center',
        paddingTop: "140px",
        paddingLeft: "20px",
        paddingBottom: "20px",
        // border: "1px solid black"
    },

    box2: {
        paddingTop: "40px",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        paddingLeft: "20px",
        background: "#f3f3f3",
    },

    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        height: 200,
        justifyContent: "space-around",
        align: "center",
        display: "flex",
    },
    padding: {
        padding: 5,
        justifyContent: 'space-around',
        fontWeight: 'bold',
        borderRadius: "8px",
        color: "#424b5a",
        background:"#fff",
        border:'1px solid #6495ed',
        
        '&:hover': {
            backgroundColor: '#6495ed',
            color: 'white',
            
        },
        '&:focus': {
            outline:'none'
        },
    },
    morefilters: {
        padding: 5,
        fontWeight: "bold",
        borderRadius: "15px",
        color: "#424b5a"
    },

    rating: {
        fontSize: "17px"
    },
    containerclass: {
        background: "#fce4ec",
        borderRadius: "25px",
        marginTop: "30px",
        // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        height: 120,

    },

    textfieldColor: {
        color: 'black',
        ':focus': {
            color: "black"
        },
        focused: "black"
    }

}
))

function Search() {
    const [tab, setTab] = React.useState(1);
    const [places,setPlaces] = React.useState([])
    const [org,setOrg] = React.useState([])
    const [coordinates,setCoordinates] = React.useState({})
    const [bounds,setBounds] = React.useState({})
    const [searchResult,setSearchResult] = useState([])
    const [searchFilters,setSearchFilters] = useState([])
    const [childClicked,setChildClicked] = React.useState(null)
    const [isLoading,setIsLoading] = React.useState(false)
    const [type, setType] = React.useState('restaurants')
    const [rating, setRating] = React.useState('')
    const [autocomplete,setAutoComplete] = React.useState(null)
    const matches = useMediaQuery('(max-width:710px)');

    const onLoad = (autoC) => {setAutoComplete(autoC)}
    const onPlaceChanged =()=> {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({lat,lng})
    }

    const toggleTab = (index) => {
        setTab(index)
    }
    const classes = useStyles();
    const classes2 = useStyles2();
    React.useEffect(()=> {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } })=>{
        setCoordinates({lat:latitude, lng: longitude })
        })
    },[])


    React.useEffect(() => {
        axios({
            method:'POST',
            url:'http://infilate.com/backend/public/api/app/organisation/list',
        }).then(res => {
            setOrg(res.data.Data)
        }).catch(e => console.log(e)
        ) 
    },[])         

    
    // React.useEffect(()=> {
    //     setIsLoading(true)
    //     // console.log(coordinates.lat)
    //     axios({
    //         method:'POST',
    //         url:'http://infilate.com/backend/public/api/app/organisation/list',
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(e => console.log(e)
    //     )
    //     getPlacesData(bounds.sw, bounds.ne).then((data)=> {
            
    //         setPlaces(data)
    //         setIsLoading(false)
    //     })
    // },[bounds])


    // let url='https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAb080HceD21mYcPce8sUyS0guj5bYxSGU'

    // React.useEffect(()=> {
    //     setIsLoading(true)
    //     // console.log(coordinates,bounds)
    //     getPlacesData(bounds.sw,bounds.ne).then((data)=>{
            
    //         setPlaces(data)
    //         setIsLoading(false)
    //     })
    // },[coordinates,bounds])

    // console.log(places)



    return (
        <div>
            <Box
                component="div"
                mx={0} //margin
                className={` ${classes.box} ${classes.insideBox}`}
                display='flex'
                justifyContent='center'
            >
            <div style={{  }} className="form-hero"  >
            <div className="form-cont" 
            // onFocus={handleBlur} 
            // onBlur={handleBlur}
            >
    
              <div className="category">
                <ul className="category-item">
                  <li className="category-list">
                    <a className={tab===1 ? "tabs active" :"tabs"} onClick={() => { toggleTab(1) }} >Tools</a>
                    <a className={tab===2 ? "tabs active" :"tabs"} onClick={() => { toggleTab('Institute') }}   >Institute</a>
                    <a className={tab===3 ? "tabs active" :"tabs"} onClick={() => { toggleTab('Agency') }} >Agency</a>
                  </li>
                </ul>
              </div>

              <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "0 15px 15px 15px", boxShadow: "2px 4px 16px #888888" }}>
               
                <div class="col-12" style={{display: "flex",flexDirection: "column",position:'relative',width:'126%'}}>
                  {/* <label class="visually-hidden" for="inlineFormInputGroupUsername"></label> */}
                 
                  <div className="flex-item" style={{ height: "50px", borderRadius: "20px" }}>
                    <input  
                    // onKeyUp={myFunction} 
                    style={{ width: `${matches == true ? '142px' : '402px'}`, height: "50px", borderRadius: "0 0 0 20px", outline: "none" }} type="text" id="inlineFormInputGroupUsername" placeholder="What you looking for" />
                  </div>

                  <div 
                //   onMouseEnter={handleMouse} 
                //   onMouseLeave={handleMouse} 
                  className="search_result_container2" 
                //   style={themeStyles}
                  >
                   
                   <p id="shh" style={{fontSize:'20px',color:'rgb(246, 136, 32)',paddingLeft:'5px',fontFamily:'Hind Siliguri'}}> Webinars</p>
                  {
                      searchResult && searchResult.filter((v,i)=>v.type=='Webinars').map((item,index)=>
                     
                      <>
                        <p 
                        // onClick={()=>handleClick(item)} 
                        style={{fontSize:'15px',paddingLeft:'8px',fontFamily:'Hind Siliguri',cursor:'pointer'}} 
                        key={index}>{item.name}</p> 
                      </>
                      )}    

                <p id="shh" style={{fontSize:'20px',color:'rgb(246, 136, 32)',paddingLeft:'5px',fontFamily:'Hind Siliguri'}}>Coupons</p>
                  {
                     searchResult && searchResult.filter((v,i) => v.type=='Coupons').map((item,index) => 
                     <>
                        <p 
                        // onClick={()=>handleClick(item)} 
                        style={{fontSize:'15px',paddingLeft:'8px',fontFamily:'Hind Siliguri',cursor:'pointer'}} 
                        key={index}>{item.name}</p> 
                   </>
                     )}

<p id="shh" style={{fontSize:'20px',color:'rgb(246, 136, 32)',paddingLeft:'5px',fontFamily:'Hind Siliguri'}}>Blogs</p>
                  {
                     searchResult && searchResult.filter((v,i) => v.type=="Blogs").map((item,index) => 
                     <>
                         <p 
                        //  onClick={()=>handleClick(item)} 
                        style={{fontSize:'15px',paddingLeft:'8px',fontFamily:'Hind Siliguri',cursor:'pointer'}} 
                        key={index}>{item.name}</p>
                   </>
                   )}

<p id="shh" style={{fontSize:'20px',color:'rgb(246, 136, 32)',paddingLeft:'5px',fontFamily:'Hind Siliguri'}}> Products</p>
                  {
                     searchResult && searchResult.filter((v,i) => v.type=='Products').map((item,index) => 
                     <>
                        <p 
                        // onClick={()=>handleClick(item)} 
                        style={{fontSize:'15px',paddingLeft:'8px',fontFamily:'Hind Siliguri',cursor:'pointer'}} 
                        key={index}>{item.name}</p> 
                   </>
                     )}

<p id="shh" style={{fontSize:'20px',color:'rgb(246, 136, 32)',paddingLeft:'5px',fontFamily:'Hind Siliguri'}}> Services</p>
                  {
                     searchResult && searchResult.filter((v,i) => v.type=='Services').map((item,index) => 
                     <>
                        <p 
                        // onClick={()=>handleClick(item)} 
                        style={{fontSize:'15px',paddingLeft:'8px',fontFamily:'Hind Siliguri',cursor:'pointer'}} 
                        key={index}>{item.name}</p> 
                      </>
                     )}
                    </div> 
                 
                </div>
                
                <div style={{ display: "flex", justifyContent: "center" }}>
                   <div >
    
                    <select className="select-style" id="inlineFormSelectPref" 
                    // onChange={handleSelectChange}
                    >
                      <option selected>Select...</option>
                      { 
                          searchFilters && searchFilters.map((item,index) => 
                      <option key={index} value={item.id} > { item.name } </option>   
                      ) }
                      {/* <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option> */}
                    </select>
                  </div> 
                  {/* <div >
    
                    <select className="select-style" id="inlineFormSelectPref">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                  {/* <div >
    
                    <select className="select-style" id="inlineFormSelectPref">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
    
    
    
                  <div >
                    <button  style={{ borderRadius: "10px",
                    //  width: `${matches == true ? '90px' : '160px'}`, 
                    height: "50px" }}  
                    // onClick={() => handleSearchbtn()} 
                    className="search-btn"><a>Search</a></button>
                  </div>
                </div>
              </div>
    
            </div>
          </div>

            </Box>
            
    <Grid container spacing={3} style={{width: '100%',}}>
        <Grid item xs={12} md={4}>
            <List 
            // places={places}
            places={org}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            setCoordinates={setCoordinates}
            />
            </Grid>

        <Grid item xs={12} md={8}>
            <Map 
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                // places={places}
                places={org}
                setChildClicked={setChildClicked}
            />
            </Grid>
    </Grid>
</div>
    )
}

export default Search
