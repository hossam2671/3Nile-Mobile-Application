import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 
import Cookies from "js-cookie";
// 
import { useNavigate } from 'react-router-dom';
import { date } from "yup";


// هنا بدات ندي :)
export const register =createAsyncThunk("nada/register", async (payload) => {
console.log(payload)
axios.post(`http://localhost:5000/${payload.radiovalue}/register`, {
  
    name: payload.name,
    password: payload.password,
    email: payload.email
  }).then(res => {
   
    console.log(res);
    return res;
  })
})

export const login = createAsyncThunk("allUser/login", async (payload,{ getState, dispatch }) => {
   try{
  const response= await axios.post('http://localhost:5000/login', {
        password: payload.password,
        email: payload.email
    })
    const data = response.data;
   
        
      if(data.user==='user'){
        
        const token = data.userData._id;
        Cookies.remove("boatOwnerId");
        Cookies.set("userId", token, { expires: 7 })
        dispatch({ type: "user", payload: data.userData });

            return response;
      }
      else if(data.boatOwner==='boatOwner'){
        const token =data.boatOwnerData._id;
        Cookies.remove("userId");
        Cookies.set("boatOwnerId", token, { expires: 7 });
        dispatch({ type: "owner", payload: data.boatOwnerData });

            return response;
      }
        else{
             alert("Login failed");

               return false;
        }


      }catch (err) {
        alert(err);
        return false;
    }
     
})

export const editUserInfo= createAsyncThunk ("/editUserInfo", async(payload )=>{
console.log(payload,"Payload")
console.log(payload.img)
// console.log(payload.userData._id)
axios.put(`http://localhost:5000/user/editUserinfo/${payload.id}`,{

name: payload.name,
address:payload.address,
phone: payload.phone,
img:payload.img,
},{
  headers:{
    'Content-Type':'multipart/form-data' 
  } 
}).then(res => {
  console.log(res);
})
})

// add review 
export const addReview= createAsyncThunk ("/addReview", async(payload )=>{
  console.log(payload,"Payload")

   const res = axios.post(`http://localhost:5000/user/addReview`,{
  
  boatId: payload.boatId,
  clientId:payload.clientId,
  tripId: payload.tripId,
  rating:payload.rate,
  })
  return res
  })


  // user cancel trip
export const canceltrip= createAsyncThunk ("/cancelTrip", async(payload )=>{
  console.log(payload,"Payload")

  let res =axios.put(`http://localhost:5000/user/cancelTrip`,{
  
  id: payload,


  })
  return res
  })

// Delete Boat -->> Owner
export const OwnerdeleteBoat = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
  try {

      let res = await axios.delete(`http://localhost:5000/boatOwner/deleteBoat/${payload.id}/${payload.ownerId}`);
      console.log(res.data,"DATA AFTER");
      return res.data;
  }
  catch (err) {

  }

})

// get user pending trips
export const pendingTrips = createAsyncThunk("user/pendingTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/pending/${payload.id}`);
      return res;
  }
  catch (err) {
  }

})

// get user accepted trips
export const acceptedTrips = createAsyncThunk("user/acceptedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/accepted/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// get user finished trips
export const finishedTrips = createAsyncThunk("user/finishedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://localhost:5000/user/userTrips/finished/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// hossam بدا هنا البشمهندس
export const getAllBoats = createAsyncThunk("user/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/boats');
        return res;
    }
    catch (err) {

    }

})
export const getCategoryOne = createAsyncThunk("user/category/3nile/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nile/boats');
        console.log(res.data , "3nile")
       
        return res.data;
    }
    catch (err) {

    }

})
export const getCategoryTwo = createAsyncThunk("user/category/3nileplus/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nileplus/boats');
        console.log(res.data , "3nilePlus")
        return res;
    }
    catch (err) {

    }

})
export const getCategoryThree = createAsyncThunk("user/category/3nilevip/boats", async (payload) => {
    try {
        let res = await axios.get('http://localhost:5000/user/category/3nilevip/boats');
        return res;
    }
    catch (err) {

    }

})
export const getOwnerBoats = createAsyncThunk("boatOwner/Boats", async (payload) => {
  console.log(payload);
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllBoats/${payload}`);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerPreviousTrips = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllFinishedTrips/${payload}`);
        console.log(res);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerRequests = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllPendingTrips/${payload}`);
        console.log(res);

        return res;
    }
    catch (err) {

    }

})
export const getOwnerCurrentTrips = createAsyncThunk("boatOwner/Boats/current", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://localhost:5000/boatOwner/getAllCurrentTrips/${payload}`);
        console.log(res);

        return res;
    }
    catch (err) {

    }

})

// Get Boat Data In Boat Description Page 

export const getBoatData = createAsyncThunk("getBoat", async (payload) => {
    try {
        let Data = await axios.get(`http://localhost:5000/user/boat/${payload}`);
      
        return Data.data;
    }
    catch (err) {
        console.log("eeeee");
        console.log(err)

    }

})


// هنا بدات فاطمة 
export const addTrip = createAsyncThunk("fatma/addTrip", async (payload) => {
 
  console.log(payload)
  const dateOnly=[...payload.date.toString().split(" ")[1]," ",...payload.date.toString().split(" ")[2]," ",...payload.date.toString().split(" ")[3]].join("")
 console.log(dateOnly)
 const timeOnly=payload.startTime.toString().split("T")[1].split(" ")[4]
 console.log(payload.startTime)
  const response = await axios.post(`http://localhost:5000/user/addTrip/${payload.boatId}/${payload.id}`, {
    date: dateOnly, 
    startTime:timeOnly,
    hours:payload.hours,
  });
  const data = response.data; 
  return data;
});

// Boat Owner Edit Info 
export const ownerUpdateInfo= createAsyncThunk ("/editOwnerInfo", async(payload )=>{
  let owner;
  console.log(payload,"Payload")
  console.log(payload.img)
  // console.log(payload.userData._id)
  await axios.put(`http://localhost:5000/boatOwner/updateData/${payload.boatOwnerId}`,{
  
  name: payload.name,
  address:payload.address,
  phone: payload.phone,
  img:payload.img,
  },{
    headers:{
      'Content-Type':'multipart/form-data' 
    } 
  }).then(res => {
    owner=  res.data
    console.log(owner);
    
   
  })
  return owner
  })


const UserSlice = createSlice({
    name: 'user',
    initialState: {
        boats: [],categoryOne : [],categoryTwo : [],categoryThree : [],boatDetails:{},
        loading: false
        ,error: null,
       err:false,
        user:null
    
      ,ownerBoatsNum:null,pending:[],finished:[],accepted:[]
      ,filteredcategoryOne : [] ,filteredcategoryTwo : [],
        filteredcategoryThree : [],
      radioButtonValue:"",boatOwner:null,anyUser:null,ownerBoats:[]
    },


    

    reducers:{
      logoutt(state,action){
        Cookies.remove("userId");

        state.user = null
        console.log(state.user)
      },
       // change price for category one
       change(state, action) {      
         let filtered = state.categoryOne.filter((item) => {
           return item.price <= action.payload[1] && item.price >= action.payload[0];
          });
          state.filteredcategoryOne = [...filtered]
        },

        // change price for category two
        changeTwo(state, action) {
          let filtered = state.categoryTwo.filter((item) => {
            return item.price <= action.payload[1] && item.price >= action.payload[0];
          });
          state.filteredcategoryTwo = [...filtered]    
        },
        
        
        // change price for category three
      changeThree(state, action) {
        let filtered = state.categoryThree.filter((item) => {
          return item.price <= action.payload[1] && item.price >= action.payload[0];
        });
        state.filteredcategoryThree = [...filtered]
      },


      //change type for category one
      changeTypeOne(state, action) {
        let newarr = state.categoryOne.filter((item) => item.type == action.payload);
        state.filteredcategoryOne = [...newarr];
      },
      
      
      //change type for category two
      changeTypeTwo(state, action) {
        let newarr = state.categoryTwo.filter((item) => item.type == action.payload);
        state.filteredcategoryTwo = [...newarr];
      },
      
      
      //change type for category three
      changeTypeThree(state, action) {
        let newarr = state.categoryThree.filter((item) => item.type == action.payload);
        state.filteredcategoryThree = [...newarr];
      },
      
      
      //change number of people for category one
      changePeopleOne(state, action) {
        let filtered = state.categoryOne.filter((item) => {
          return item.numberOfPeople <= action.payload[1] && item.numberOfPeople >= action.payload[0];
        });
        state.filteredcategoryOne = [...filtered] 
      },
      
      
      //change number of people for category two
      changePeopleTwo(state, action) {
        let filtered = state.categoryTwo.filter((item) => {
          return item.numberOfPeople <= action.payload[1] && item.numberOfPeople >= action.payload[0];
        });
        state.filteredcategoryTwo = [...filtered] 
      },
      
      
      //change number of people for category three
      changePeopleThree(state, action) {
        let filtered = state.categoryThree.filter((item) => {
          return item.numberOfPeople <= action.payload[1] && item.numberOfPeople >= action.payload[0];
        });
        state.filteredcategoryThree = [...filtered] 
      },
      
      
      //change PORT for category one
      changePortOne(state, action) {
        let x = state.categoryOne
        let newarr = x.filter((item) => item.portName == action.payload);
        state.filteredcategoryOne = [...newarr];
      },
      
      
      //change PORT for category two
      changePortTwo(state, action) {
        let x = state.categoryTwo
        let newarr = x.filter((item) => item.portName == action.payload);
        state.filteredcategoryTwo = [...newarr];
      },
      
      
      //change PORT for category three
      changePortThree(state, action) {
        let x = state.categoryThree
        let newarr = x.filter((item) => item.portName == action.payload);
       state.filteredcategoryThree = [...newarr];
      },


        getcategoryboats(state, action) {          
            if (state.boats && state.boats.length > 0) {
              if (action.payload == 1) {
                console.log("hhh");
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile");
                console.log(state.categoryboats);
              } else if (action.payload === 2) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nileplus");
              } else if (action.payload === 3) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile vip");
              } else {
                console.log("hi");
              }
            } else {
              console.log("No boats available");
            }
          }
    },
    // 
    extraReducers: {
       [ register.fulfilled]:(state,action)=>{
        console.log("fulfilled")
        
       },
       [login.pending]:(state,action)=>{
        state.err=true;
      
      
       } ,
       [login.fulfilled]: (state, action) => {
         
        state.anyUser = action.payload;
      
        if(state.anyUser.data.user){
          state.user=state.anyUser.data
        }else{
          state.boatOwner=state.anyUser.data
        }
  
    },
    [getOwnerBoats.fulfilled]:(state,action)=>{
     
      state.ownerBoats =action.payload
    
    },
    [getOwnerRequests.fulfilled]:(state,action)=>{
   
      state.ownerBoats =action.payload
     
    },
    [getOwnerPreviousTrips.fulfilled]:(state,action)=>{
   
      state.ownerBoats =action.payload
     
    },
    [addTrip.fulfilled]:(state,action)=>{
      console.log("done")
    },
    [getOwnerCurrentTrips.fulfilled]:(state,action)=>{
   
      state.ownerBoats =action.payload
     
    },
  

 
      
        // Get Boat Data Start
        [getBoatData.pending]: (state) => {
           
            state.loading = true;
           },     
        [getBoatData.fulfilled]: (state, action) => {
            state.loading = false;
            
            state.boatDetails = action.payload;
        },
        [getBoatData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          },
        //   Get Boat Data End



              // Get Categories Start
        [getCategoryOne.fulfilled]: (state, action) => {
            // console.log(action.payload);
            
           
            state.categoryOne = action.payload;
            state.filteredcategoryOne = action.payload
        },
        [getCategoryOne.rejected]: (state, action) => {
        
            
            // state.categoryOne = action.payload;
        },
        
        [getCategoryTwo.fulfilled]: (state, action) => {
          
       
            state.categoryTwo = action.payload.data;
            state.filteredcategoryTwo = action.payload.data
            
        },
        [getCategoryThree.fulfilled]: (state, action) => {
            
            
           state.categoryThree = action.payload.data;
           state.filteredcategoryThree = action.payload.data
        },
// /////////////////////////////////////////////////////////
        [finishedTrips.fulfilled]:(state,action) => {
          state.finished = action.payload.data
          console.log(state.finished)
        },
        [acceptedTrips.fulfilled]:(state,action) => {
          state.accepted = action.payload.data
        },
        [pendingTrips.fulfilled]:(state,action) => {
          state.pending = action.payload.data
        },
        [addReview.fulfilled]:(state,action) => {
          console.log("fulfilled")
        },
        [canceltrip.fulfilled]:(state,action) => {{
          console.log('fulfilled')
          console.log(action.payload)
        }
      },
        // Get Categories End



        // Owner Edit Info

        [ownerUpdateInfo.fulfilled]: (state, action) => {
          console.log( state.boatOwner,"Old");
            console.log(action.payload);
          state.boatOwner = action.payload;
          // console.log( state.boatOwner,"Gold");
       },
    }
    
})


export const { getcategoryboats,add ,change , changeTypeOne , changeTypeTwo , changeTypeThree ,changeTwo , changeThree , changePeopleOne , changePeopleTwo , changePeopleThree, changePortOne , changePortTwo , changePortThree , logoutt} = UserSlice.actions;

export default UserSlice.reducer;



