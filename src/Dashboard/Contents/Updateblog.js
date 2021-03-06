import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MUImultiSelect from '../MUImultiSelect/MultipleSelectChip'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid';
import axios from 'axios'
import TextField from "@material-ui/core/TextField";
import './styles.css'
import { userLogoutRequest } from "redux/UserloginlogoutSlice";
import { useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import UpdateblogbBasicSelect from '../MUIBasicSelect/UpdateblogBasicSelect'
import { alpha, styled } from '@mui/material/styles';
import { typeOf } from "react-read-more-read-less";



const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    marginBottom:'10px',
    '& fieldset': {
      borderColor: '#1976d2',
      height:'60px',
      
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});


function Updateblog() {
    const selector = useSelector((state) => (state));
    const dispatch = useDispatch()
    const { id } = useParams()
    const [categoryArray, setCategoryArray] = React.useState([]);
    const [blogDetail, setBlogDetail] = React.useState([])
    const [addData,setData] = React.useState('')
    const { handleSubmit, reset, control, register,setValue, getValues } = useForm({
      defaultValues:{
        category_ids:categoryArray,
        description:'',
      }
    });
   
    React.useEffect(() => {

      axios({
        method:'POST',
        url:`http://infilate.com/backend/public/api/corporate/blog/blog-detail/${id}`,
        headers: {
            "token":selector.userLoginLogout.token,
        },

    })
      .then(function (response) {

        // console.log(response);
        setBlogDetail(response.data.Data)
        setValue('title',response.data.Data[0].title)
        setValue('title1',response.data.Data[0].title1)
        setValue('title2',response.data.Data[0].title2)
        setData(response.data.Data[0].description)
        setValue('category_ids',response.data.Data[0].title)
        // setValue('media',response.data.Data[0].title)
        setValue('category_name',response.data.Data[0].category_name)
      })
      .catch(function (err) {
        console.log(err)
        dispatch(userLogoutRequest())
        // setErrors('error')
        // console.log(err+' user already registered');
      });  
    },[])   

    console.log(blogDetail)


    // React.useEffect(() => {

    //     setValue("category_ids",categoryArray)


    // },[categoryArray])
  
    const auth= (formData)=>{

        axios({
            method:'POST',
            url:`http://infilate.com/backend/public/api/corporate/blog/update/${id}`,
            headers: {
                "token":selector.userLoginLogout.token,
                "Content-Type":"multipart/form-data"
            },
        
            data:formData,
          

        })
          .then(function (response) {
            //handle success
            if(response){
              alert('successfully added')
              
            }
            console.log(response);
            // window.location.href='http://my.infilate.com/Login'
          })
          .catch(function (err) {
            //handle error
            alert('Token is invalid, Please relogin '+err)
            console.log(err)
            dispatch(userLogoutRequest())
            // setErrors('error')
            // console.log(err+' user already registered');
          });
    
    
      }


    const handleChange = (e,editor) => {
          const data = editor.getData()
          setData(data)
          setValue("description",data)
    }

    const onSubmit = (data) => {
      let categories = [];
      data.category_ids.filter(category => {
        categories.push(`"${category}"`)
      });


      const formData = new FormData()
      formData.append("title",data.title)
      formData.append("title1",data.title1)
      formData.append("title2",data.title2)
      formData.append("description",data.description)
      formData.append("category_ids",`[${categories}]`)
      if(data.media == undefined){
      formData.append("media",'text')  
      }
      else {
      formData.append("media",data.media)
      }
      
      formData.append("category_name",data.category_name)
        auth(formData)
        console.log(data)
        // console.log(formData.entries())

    }

    return (
      <div style={{display:'flex',justifyContent:'center', paddingTop:'160px'}}>

       
        <Grid item md={9} xs={12} >
        <form style={{display:'flex',flexDirection:'column'}} onSubmit={handleSubmit(onSubmit)}>
        <p style={{fontSize:'30px',color:'#ffc704',textAlign:'center',paddingBottom:'15px'}}> update blog </p>

        
          
        <Controller
          name="title"
          control={control}
          rules={{required:'field is required'}}
          render={({ field: { onChange, value }, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
            <CssTextField
            onChange={onChange} 
            value={value} 
            label={"Title"}  
            variant="outlined" 
            size = 'small' 
            helperText={formState.errors.title?.message}
            error={formState.errors.title}
            />
          )}
        />

        <Controller
          name="title1"
          control={control}
          rules={{required:'field is required'}}
          render={({ field: { onChange, value }, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
            <CssTextField
            onChange={onChange} 
            value={value} 
            label={"Title 1"}  
            variant="outlined" 
            size = 'small' 
            helperText={formState.errors.title1?.message}
            error={formState.errors.title1}
            />
          )}
        />

<Controller
          name="title2"
          control={control}
          rules={{required:'field is required'}}
          render={({ field: { onChange, value }, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
            <CssTextField 
            onChange={onChange} 
            value={value} 
            label={"Title 2"}  
            variant="outlined" 
            size = 'small' 
            helperText={formState.errors.title2?.message}
            error={formState.errors.title2}
            />
          )}
        />

<Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
      >

<Grid item md={4} sm={4}>
<Controller
          name="category_ids"
          control={control}
          // rules={{required:'field is required'}}
          render={({ field, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
          <MUImultiSelect type={'addblog'} Blogfield={field} /> 
          )}
        />
</Grid>


<Grid item md={4} sm={4}>
<Controller
          name="category_name"
          control={control}
          // rules={{required:'field is required'}}
          render={({ field, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
          <UpdateblogbBasicSelect setValue={setValue} getValues={getValues('category_name')} /> 
          )}
        />
        </Grid>
  
  </Stack>




<Controller
          name="description"
          control={control}
          rules={{required:'field is required'}}
          render={({ field, formState }) => (
            // <TextField id="outlined-basic" label="Outlined"  />
            <div className='changeToDefault_blog'>
            <CKEditor data={addData} editor = { ClassicEditor } 
            // data={addData} 
            onChange={handleChange} />
            </div>       
          )}
        />

             

        <Controller
          name="media"
          control={control}
          render={({ field: { onChange, value } }) => (
             <> 
             <img src={`http://infilate.com/backend/public/images/${blogDetail[0]?.media}`} alt=''  style={{width:'100px', height:'100px'}} />
            <label for="myfile">Select an Image:</label>
            <input type="file" onChange={(e) => onChange(e.target.files[0])} />
             </>
          )}
        />

        <Button type='submit'>Submit</Button>
        {/* <Button onClick={() => reset()} variant={"outlined"}>Reset</Button> */}
      </form>
      </Grid>


      </div>
    )
}




export default Updateblog
