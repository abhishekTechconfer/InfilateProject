import React from 'react'
import { Grid,Card,CardMedia,CardContent,CardHeader,CardActions,Avatar,Typography,Divider,Chip,Box,Container } from '@material-ui/core';
import { makeStyles,useTheme, } from '@material-ui/core/styles';
// import BackgroundAsImage from './page-title-bg-1.jpg';
// import aboutimg from './about-img-3.jpg';
// import sampleimg from './team-2.jpg'
import './contactus.css'
import axios from 'axios' 



function Contact() {

    const [data,setData] = React.useState([])
    let content = ''
    
    React.useEffect(() => {
        let cancel
        axios({
          method: 'POST',
          url: 'http://infilate.com/backend/public/api/app/footer/contact-us',
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setData(res.data.Data)
         
        }).catch(e => {
          if (axios.isCancel(e)) return
        })
        return () => cancel()
      }, [])


      console.log(data)

    return (
        <div style={{paddingTop:'160px'}}>
             <Box>
            <Container maxWidth className="page-title-area2" 
            style={{display:'flex',justifyContent:'center',backgroundImage:`url(http://infilate.com/backend/public${data && data.banner && data.banner[0].image})`}}>
                <div classname="_container">
                    <p style={{color:'white',fontSize:'55px'}}>Contact</p>
                    <Grid item style={{display:'flex',justifyContent:'center'}}>
                    <p style={{color:'white',fontSize:'18px'}}>Home / </p>
                    <p style={{color:'white',fontSize:'18px',color:'#f68820'}}>&nbsp;Contact</p>
                    </Grid>
                    </div>
                </Container>


                
                
                <Box mt={10} display='flex' justifyContent='center'>
                <Grid container spacing={5} md={6} > 
                   
                <Grid item md={8}>
                <p style={{fontSize:'40px',color:'#30296c',fontWeight:'700'}}>Drop us a line</p>
                    </Grid>

                    <Grid item md={6}>
                    
                    <input type="text" name="name"  className="form-controlpa" required="" data-error="Please enter your name" placeholder="Name">
                    </input>
                    <br/>
                    <br/>
           
                    <input type="text" name="name"  className="form-controlpa" required="" data-error="Please enter your name" placeholder="Email Address">
                    </input>     
                    </Grid>

                    <Grid item md={6}>
                    <input type="text" name="name"  className="form-controlpa" required="" data-error="Please enter your name" placeholder="Your Phone">
                    </input>
                    <br/>
                    <br/>
                 
                    <input type="text" name="name"  className="form-controlpa" required="" data-error="Please enter your name" placeholder="Subject">
                    </input>     
                    </Grid>

                    <Grid item md={12}>
                    <textarea style={{height:'168px'}} type="text" name="name"  className="form-controlpa" required="" data-error="Please enter your name" placeholder="Message">
                    </textarea>
                    </Grid>

                    <Grid item md={12}>
                    <button type="submit" class="default-btn" >
                        <span>Send message</span>
                        </button>
                    </Grid>

                </Grid>

            
                {data && data.right_section && data.right_section.map((v,i) => 
                <Grid style={{paddingLeft:'84px',paddingTop:'20px'}} key={i} item>
                <p style={{color:'#f68820',display:'block',marginBottom:'5px'}}>{v.text_1}</p>
                <p style={{fontSize:'40px',marginBottom:'30px',color:'#30296c',fontWeight:'700'}} >{v.text_2}</p>
                <div className='changeToDefault3'>
                <div dangerouslySetInnerHTML={{__html:v.description_1}} />
                </div>
                </Grid>                
                )}

               
         

                </Box>


                <div className='map-area' style={{marginTop:'126px'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51502.37783677806!2d-115.24877995271797!3d36.21765914577005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8eaf574293f1b%3A0x8e720e5b03149745!2sLas%20Vegas%2C%20NV%2089108%2C%20USA!5e0!3m2!1sen!2sbd!4v1614418501725!5m2!1sen!2sbd"></iframe>
                </div>
                </Box>
        </div>
    )
}

export default Contact
