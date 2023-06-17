import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from "js-cookie";
import ip from '../../config'




// هنا بدات ندي :)
export const register =createAsyncThunk("nada/register", async (payload) => {
console.log(payload)
axios.post(`http://${ip}:5000/${payload.radiovalue}/register`, {
  
    name: payload.name,
    password: payload.password,
    email: payload.email
  }).then(res => {
   
    console.log(res);
    return res;
  })
})

export const login = createAsyncThunk("allUser/login", async (payload) => {
  try {
    const response = await axios.post(`http://${ip}:5000/login`, {
      password: payload.password,
      email: payload.email
    });

    const { data, headers } = response; // Extract data and headers from the response

    // Serialize the headers object
    const serializedHeaders = JSON.stringify(headers);

    // console.log(data);

    if (data.user === 'user') {
      // console.log(data.userData);
      AsyncStorage.setItem("user", data.userData._id)
      // const token = data.userData._id;
      // Cookies.remove("boatOwnerId");
      // Cookies.set("userId", token, { expires: 7 })
      // dispatch({ type: "user", payload: data.userData });

        return data;
    } else if (data.boatOwner === 'boatOwner') {
      // console.log(data)
        AsyncStorage.setItem("boatOwner", data.boatOwnerData._id)
        return data;
      //return { data, serializedHeaders }; // Return both data and serializedHeaders
    } else {
      alert("Login failed");
      return false;
    }
  } catch (err) {
    alert(err);
    return false;
  }
});

export const editUserInfo= createAsyncThunk ("/editUserInfo", async(payload )=>{
// console.log(payload,"Payload")
console.log(payload,"payload")
// console.log(payload.userData._id)
const result =   axios.put(`http://${ip}:5000/user/editUserinfo/${payload.updatedUser.id}`,{
for
},{
  headers:{
    'Content-Type':'multipart/form-data' 
  } 
})
return result


})

// add review 
export const addReview= createAsyncThunk ("/addReview", async(payload )=>{
  console.log(payload,"Payload")

   const res = axios.post(`http://${ip}:5000/user/addReview`,{
  
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

  let res =axios.put(`http://${ip}:5000/user/cancelTrip`,{
  
  id: payload,


  })
  return res
  })

// Delete Boat -->> Owner
export const OwnerdeleteBoat = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
  try {

      let res = await axios.delete(`http://${ip}:5000/boatOwner/deleteBoat/${payload.id}/${payload.ownerId}`);
      console.log(res.data,"DATA AFTER");
      return res.data;
  }
  catch (err) {

  }

})

// get user pending trips
export const pendingTrips = createAsyncThunk("user/pendingTrips", async (payload) => {
  try {
      let res = await axios.get(`http://${ip}:5000/user/userTrips/pending/${payload.id}`);
      return res;
  }
  catch (err) {
  }

})

// get user accepted trips
export const acceptedTrips = createAsyncThunk("user/acceptedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://${ip}:5000/user/userTrips/accepted/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// get user finished trips
export const finishedTrips = createAsyncThunk("user/finishedTrips", async (payload) => {
  try {
      let res = await axios.get(`http://${ip}:5000/user/userTrips/finished/${payload.id}`);
      return res;
  }
  catch (err) {
  }
})

// hossam بدا هنا البشمهندس
export const getAllBoats = createAsyncThunk("user/boats", async (payload) => {
    try {
        let res = await axios.get(`http://${ip}:5000/user/boats`);
        return res;
    }
    catch (err) {

    }

})
export const getCategoryOne = createAsyncThunk("user/category/3nile/boats", async (payload) => {

    try {
        let res = await axios.get(`http://${ip}:5000/user/category/3nile/boats`);
        // console.log(res.data , "3nile")
          console.log(ip)
        return res.data;
    }
    catch (err) {

    }

})
export const getCategoryTwo = createAsyncThunk("user/category/3nileplus/boats", async (payload) => {
    try {
        let res = await axios.get(`http://${ip}:5000/user/category/3nileplus/boats`);
        // console.log(res.data , "3nilePlus")
        return res;
    }
    catch (err) {

    }

})
export const getCategoryThree = createAsyncThunk("user/category/3nilevip/boats", async (payload) => {
    try {
        let res = await axios.get(`http://${ip}:5000/user/category/3nilevip/boats`);
        return res;
    }
    catch (err) {

    }

})
export const getSwvl = createAsyncThunk("swvl/swvlTrips", async (payload) => {
  try {
      let res = await axios.get(`http://${ip}:5000/swvl/swvlTrips`);
      console.log(res)
      return res;
  }
  catch (err) {

  }

})
export const getOwnerBoats = createAsyncThunk("boatOwner/Boats", async (payload) => {
  // console.log(payload);
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllBoats/${payload}`);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerPreviousTrips = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllFinishedTrips/${payload}`);
        // console.log(res);
        return res;
    }
    catch (err) {

    }

})
export const getOwnerRequests = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllPendingTrips/${payload}`);
        // console.log(res);

        return res;
    }
    catch (err) {

    }

})
export const getOwnerCurrentTrips = createAsyncThunk("boatOwner/Boats/current", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllCurrentTrips/${payload}`);
        // console.log(res);

        return res;
    }
    catch (err) {

    }

})

// Get Boat Data In Boat Description Page 

export const getBoatData = createAsyncThunk("getBoat", async (payload) => {
    try {
        let Data = await axios.get(`http://${ip}:5000/user/boat/${payload}`);
      
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
  const response = await axios.post(`http://${ip}:5000/user/addTrip/${payload.boatId}/${payload.id}`, {
    date: dateOnly, 
    startTime:timeOnly,
    hours:payload.hours,
  });
  const data = response.data; 
  return data;
});

// BookTrip
export const bookTrip = createAsyncThunk("user/bookTrip", async (payload) => {
 
  console.log(payload)

  const response = await axios.post(`http://${ip}:5000/user/addTrip/${payload.boatId}/${payload.clientId}`, {
    date: payload.date, 
    startTime:`${payload.time.hours}:${payload.time.minutes}`,
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
  await axios.put(`http://${ip}:5000/boatOwner/updateData/${payload.boatOwnerId}`,{
  
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
        user:null,filteredswvl:[],swvl:[]
    
      ,ownerBoatsNum:null,pending:[],finished:[],accepted:[]
      ,filteredcategoryOne : [] ,filteredcategoryTwo : [],
        filteredcategoryThree : [],
      radioButtonValue:"",boatOwner:null,anyUser:null,ownerBoats:[],

      ip:"192.168.220.1"
    },


    

    reducers:{
      search(state, action) {
        const searchQuery = action.payload.toLowerCase(); 
        const filteredSwvl = state.swvl.filter((item) =>
          item.targetPlace.toLowerCase().includes(searchQuery)
        );
      
        state.filteredswvl = filteredSwvl;
        console.log(state.filteredswvl);
      
        if (searchQuery === "") {
          state.filteredswvl = [...state.swvl];
        }
      },
        // filter cat one
      filter(state, action) {
        // console.log(action.payload);
        let filtered = [...state.categoryOne];
        let filteredByPort = [...state.categoryOne];
      
        if (action.payload.port.length !== 0) {
          filteredByPort = filteredByPort.filter(obj => action.payload.port.includes(obj.portName));
        }
      
        if (action.payload.type.length !== 0) {
          filtered = filteredByPort.filter(obj => action.payload.type.includes(obj.type));
        } else {
          filtered = [...filteredByPort];
        }
      
        if (action.payload.price !== undefined) {
          filtered = filtered.filter(obj => obj.price < action.payload.price);
        }
        if (action.payload.numOfPeople !== undefined) {
          filtered = filtered.filter(obj => obj.numberOfpeople < action.payload.numOfPeople);
        }
      
        state.filteredcategoryOne = filtered;
    
      },
       // filter cat two
       filter2(state, action) {
        // console.log(action.payload);
        let filtered = [...state.categoryTwo];
        let filteredByPort = [...state.categoryTwo];
      
        if (action.payload.port.length !== 0) {
          filteredByPort = filteredByPort.filter(obj => action.payload.port.includes(obj.portName));
        }
      
        if (action.payload.type.length !== 0) {
          filtered = filteredByPort.filter(obj => action.payload.type.includes(obj.type));
        } else {
          filtered = [...filteredByPort];
        }
      
        if (action.payload.price !== undefined) {
          filtered = filtered.filter(obj => obj.price < action.payload.price);
        }
        if (action.payload.numOfPeople !== undefined) {
          filtered = filtered.filter(obj => obj.numberOfpeople < action.payload.numOfPeople);
        }
      
        state.filteredcategoryTwo = filtered;
    
      },
      
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
      [editUserInfo.fulfilled]:(state,action) =>{
          state.user = action.payload.data
      },
       [ register.fulfilled]:(state,action)=>{
        console.log("fulfilled")
        console.log("first")
        
       },
       [login.pending]:(state,action)=>{
        state.err=true;
      
      
       } ,
       [login.fulfilled]: (state, action) => {
          console.log(action.payload.boatOwner)
         if(action.payload.boatOwner){
            state.boatOwner=action.payload.boatOwnerData
            console.log(state.boatOwner)
          }
          else{
            state.user=action.payload.userData
             console.log(state.user)
        }
        // state.anyUser = action.payload;
      
        // if(state.anyUser.data.user){
        //   state.user=state.anyUser.data
        // }else{
        // }
  
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
             console.log(action.payload);
            
           
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
        [getSwvl.fulfilled]:(state,action) =>{
          state.swvl = action.payload.data;
          state.filteredswvl = action.payload.data;
           console.log(state.swvl , "ghfdfdh")
          // state.filteredcategoryThree = action.payload.data
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


        [bookTrip.fulfilled]: (state, action) => {
          console.log("Old");
          // console.log( state.boatOwner,"Gold");
       },
    }
    
})


export const { getcategoryboats,add ,change , changeTypeOne , changeTypeTwo , changeTypeThree ,changeTwo , changeThree , changePeopleOne , changePeopleTwo , changePeopleThree, changePortOne , changePortTwo , changePortThree , logoutt , filter , filter2 , search} = UserSlice.actions;

export default UserSlice.reducer;



