import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from "js-cookie";
import ip from '../../config'
import { Form } from "formik";




// هنا بدات ندي :)
export const register =createAsyncThunk("nada/register", async (payload) => {
  console.log(payload)
  try {
  
    let response= axios.post(`http://${ip}:5000/${payload.radiovalue}/register`, {
     
       name: payload.name,
       password: payload.password,
       email: payload.email
     }).then((res) => {
        
      return res.data
    })
    console.log(response)
    return response;
 
 }catch(err){
   console.log(err,"errrrr");
  
  }
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


    if (data.user === 'user') {
      AsyncStorage.setItem("user", data.userData._id)
      // const token = data.userData._id;
      // Cookies.remove("boatOwnerId");
      // Cookies.set("userId", token, { expires: 7 })
      // dispatch({ type: "user", payload: data.userData });

        return data;
    } else if (data.boatOwner === 'boatOwner') {
        AsyncStorage.setItem("boatOwner", data.boatOwnerData._id)
        return data;
      //return { data, serializedHeaders }; // Return both data and serializedHeaders
    } else {
      // alert("Login failed");
      return response;
    }
  } catch (err) {
    // alert(err);
    return response;
  }
});

export const editUserInfo= createAsyncThunk ("/editUserInfo", async(payload )=>{
console.log(payload,"paydswwwwvsaasdload")

const result = await axios.put(`http://${ip}:5000/user/editUserinfo/${payload.updatedUser.id}`,{
      name: payload.updatedUser.name,
      // address:payload.address,
      phone:payload.updatedUser.phone,
      img:payload.updatedUser.image
},{
  'Content-Type': 'image/png',

})
return result
})

// add review 
export const addReview= createAsyncThunk ("/addReview", async(payload )=>{

   const res = await axios.post(`http://${ip}:5000/user/addReview`,{
  
  boatId: payload.boatId,
  clientId:payload.clientId,
  tripId: payload.tripId,
  rating:payload.rate,
  })
  return res
  })

  // add boat 
  export const addBoat = createAsyncThunk("owner/addBoat", async (payload) => {
    console.log(payload);
    try {
      const res = await axios.post(`http://${ip}:5000/boatOwner/addBoatt`, {
        boatOwnerId: payload.id,
        name: payload.name,
        description: payload.description,
        price: payload.price,
        portName: payload.portName,
        type: payload.type,
      });
      return res.data; // Return the response data as the action payload
    } catch (error) {
      // Handle any error that occurred during the API request
      console.error("Error adding boat:", error);
    }
  });
 
  // add boat
// export const addBoat = createAsyncThunk ("boatOwner/addBoat", async(payload) => {
//   console.log(payload)
//   // const res = await axios.post(`http://${ip}:5000/boatOwner/addBoatt`,{
//   //       name: payload.name,
//   //       description: payload.description,
//   //       price: payload.price,
//   //       portName: payload.port,
//   //       type: payload.type
//   // })
//   // return res
// })

  // user cancel trip
// export const canceltrip= createAsyncThunk ("/cancelTrip", async(payload )=>{

//   let res =axios.put(`http://${ip}:5000/user/cancelTrip`,{
  
//   id: payload,


//   })
//   return res
//   })

export const canceltrip = createAsyncThunk('/canceltrip', async (payload) => {
  console.log(payload,"jjjjjj")
    const response = await axios.put(`http://${ip}:5000/user/cancelTrip`,{
      id:payload
    });
    console.log(response)
    // const data = await response.data;
    // return data;
  }
);

// Delete Boat -->> Owner
export const OwnerdeleteBoat = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
  try {

      let res = await axios.delete(`http://${ip}:5000/boatOwner/deleteBoat/${payload.id}/${payload.ownerId}`);
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
      console.log(res,"cxczxzxcczc");
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
        return res.data;
    }
    catch (err) {

    }

})
// export const getCategoryTwo = createAsyncThunk("user/category/3nileplus/boats", async (payload) => {
//     try {
//         let res = await axios.get(`http://${ip}:5000/user/category/3nileplus/boats`);
//         return res;
//     }
//     catch (err) {

//     }

// })
export const getCategoryTwo = createAsyncThunk("user/category/3nilevip/boats", async (payload) => {
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
      return res;
  }
  catch (err) {

  }

})

// get owner swvls
export const ownerSwvl = createAsyncThunk("swvl/boatOwner",async (payload)=>{
  let res = await axios.get(`http://${ip}:5000/swvl/boatowner/${payload}/swvl`)
  return res
})

export const fireSwvl = createAsyncThunk("swvl/AddTrip", async (payload)=>{
  console.log(payload)
  let res = await axios.post(`http://${ip}:5000/swvl/AddTrip`,{
  boatId:payload.boatId,
  time:payload.time,
  port:payload.port,
  targetPlace:payload.targetPlace,
  date:payload.date,
  priceForTrip:payload.priceForTrip
  })
})
export const getOwnerBoats = createAsyncThunk("boatOwner/getAllBoats", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllBoats/${payload}`);
         console.log(res , "jkhdjkfhkhdasklhfaklhkldhaklfhlafgajkdgsfjkdagsjk")
        return res;
    }
    catch (err) {

    }

})

export const getOwnerPreviousTrips = createAsyncThunk("boatOwner/Boats", async (payload) => {
  
    
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllFinishedTrips/${payload}`);
        return res;
    
    

})
export const getOwnerRequests = createAsyncThunk("boatOwner/reqss", async (payload) => {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllPendingTrips/${payload}`);
        return res;
  

})
export const getOwnerCurrentTrips = createAsyncThunk("boatOwner/Boats/current", async (payload) => {
  
    try {
  
        let res = await axios.get(`http://${ip}:5000/boatOwner/getAllCurrentTrips/${payload}`);

        return res;
    }
    catch (err) {

    }

})
export const SwvlDetails = createAsyncThunk("boatOwner/swvlDetail", async (payload) => {
  
  
  try {

      let res = await axios.get(`http://localhost:5000/swvl/swvlTrip/${payload}`);

      return res.data;
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

    }

})


// هنا بدات فاطمة 
export const addTrip = createAsyncThunk("fatma/addTrip", async (payload) => {
 
  const dateOnly=[...payload.date.toString().split(" ")[1]," ",...payload.date.toString().split(" ")[2]," ",...payload.date.toString().split(" ")[3]].join("")
 const timeOnly=payload.startTime.toString().split("T")[1].split(" ")[4]
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
 
 
console.log(payload,"timetimetime")
  const response = await axios.post(`http://${ip}:5000/user/addTrip/${payload.boatId}/${payload.clientId}`, {
    date: payload.date, 
    startTime:payload.time,
    hours:payload.hours,
  });
  const data = response.data; 
  return data;
});

// bookswvl 
export const bookSwvl = createAsyncThunk("user/bookswvl",async(payload)=>{
  console.log(payload)
  const res =await axios.post(`http://${ip}:5000/swvl/userBooking`,{
    swvlId:payload.swvlId,
    userId:payload.userId,
    numberOfSeats:payload.numberOfSeats,
  })
  console.log(res,"test")
  return res 
})

// get swvl by id
export const getSwvlById = createAsyncThunk("swvl/get",async(payload)=>{
  console.log(payload,"ljflkjsldjflsdjfska")
  const res = await axios.get(`http://${ip}:5000/swvl/swvlTrip/${payload}`)
  console.log(res,"lkrjdgldfjlsjlfgd")
  return res
})


// Boat Owner Edit Info 
export const ownerUpdateInfo= createAsyncThunk ("/editOwnerInfo", async(payload )=>{

  let res = await axios.put(`http://${ip}:5000/boatOwner/update/${payload.boatOwnerId}`,{
  
  name: payload.name,
  phone: payload.phone,
  })
  
  return res
  })

  // owner accept trip
  export const ownerAcceptTrip= createAsyncThunk ("/boatOwner/acceptt",async(payload)=>{
    console.log(payload)
    const respone = await axios.put(`http://${ip}:5000/boatOwner/acceptTrip`,{
      id:payload
    })
  })
// owner cancel trip
  export const ownerCancelTrip= createAsyncThunk ("/boatOwner/cancell",async(payload)=>{
    console.log(payload)
    const respone = await axios.put(`http://${ip}:5000/boatOwner/cancelTrip`,{
      id:payload
    })
  })
  // owner finish trip
  export const ownerFinishTrip= createAsyncThunk ("/boatOwner/finishTrip",async(payload)=>{
    console.log(payload)
    const respone = await axios.put(`http://${ip}:5000/boatOwner/finishTrip`,{
      id:payload
    })
  })

  // edit user image
  // export const updateImage = createAsyncThunk ("boatOwner/editImage" , async(payload)=>{
  // const formData = new FormData();
  // formData.append('img', payload.img);
  // console.log(formData,"l;kas;lf;lsa;lf")
  //   console.log(payload,"jjjjjjjjjjjjjjjjj")
  //   const res = await axios.put(`http://${ip}:5000/boatOwner/editImage/${payload.id}`,formData)
  //   return res.data
  // })


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
      radioButtonValue:"",boatOwner:null,anyUser:null,ownerBoats:[],swvlRecit:null,
      seatReserved:0,
      filteredData:null,
      notify:false
      
    },


    

    reducers:{
      seatResearv(state,action){
state.seatReserved=action.payload
console.log(state.seatReserved)
      },

      notify(state,action){
        console.log("ay7aga");
        console.log(action.payload,"notiiii");
        state.notify = action.payload
      },
      search(state, action) {
        const searchQuery = action.payload.toLowerCase(); 
        const filteredSwvl = state.swvl.filter((item) =>
          item.targetPlace.toLowerCase().includes(searchQuery)
        );
      
        state.filteredswvl = filteredSwvl;
      
        if (searchQuery === "") {
          state.filteredswvl = [...state.swvl];
        }
      },

      filterTaps(state, action) {
        console.log(action.payload,"actiondsdas");
        let filtered = [...state.categoryOne];
        let filteredByPort = [...state.categoryOne];
      
        if (action.payload.port.length !== 0) {
          if(action.payload.port!=="all"){


            filteredByPort = filteredByPort.filter(obj => action.payload.port.includes(obj.portName));
            console.log(filteredByPort.length+1,"fillll")
          }else
          filteredByPort = [...state.categoryOne];
        }
      
        state.filteredData = filteredByPort;
        state.filteredcategoryOne = filteredByPort;
    
      },
      filterTaps2(state, action) {
        console.log(action.payload,"actionaaaaadsdas");
        let filtered = [...state.categoryTwo];
        let filteredByPort = [...state.categoryTwo];
      
        if (action.payload.port.length !== 0) {
          if(action.payload.port!=="all"){


            filteredByPort = filteredByPort.filter(obj => action.payload.port.includes(obj.portName));
            console.log(filteredByPort.length+1,"fillll")
          }else
          filteredByPort = [...state.categoryOne];
        }
        
        state.filteredcategoryTwo = filteredByPort;
        state.filteredData = filteredByPort;
    
      },
      filterTaps3(state, action) {
        // state.categoryThree=state.filteredswvl
        let data =  [... state.filteredcategoryThree]
        let originalData =  [... state.filteredcategoryThree]
        console.log(action.payload,"actionaaaaadsdas");
        let filteredByPort = [...data];

        if (action.payload.port.length !== 0) {
          if(action.payload.port!=="all"){
            console.log(filteredByPort[0],"ddddddddddt")

            filteredByPort = filteredByPort.filter(obj => action.payload.port.includes(obj.port));
            console.log(filteredByPort.length,"fillll")
          }else
          filteredByPort = [...originalData];
        }
        
        state.filteredswvl = filteredByPort;
        state.filteredData = filteredByPort;
    
      },
     
        // filter cat one
      filter(state, action) {
        // console.log(action.payload);
        let filtered = [...state.categoryOne];
        let filteredByPort = [...state.categoryOne];
      
        console.log(action.payload,"pay");
        console.log(filtered,"fil");
      
        if (action.payload.type.length !== 0) {
          filtered = filteredByPort.filter(obj => action.payload.type.includes(obj.type));
        } else {
          filtered = [...filteredByPort];
        }
      
        if (action.payload.price !== undefined) {
          filtered = filtered.filter(obj => obj.price < action.payload.price);
        }
        if (action.payload.numberOfpeople !== undefined) {
          filtered = filtered.filter(obj => obj.numberOfpeople < action.payload.numberOfpeople);
        }
      
        state.filteredcategoryOne = filtered;
    
      },
    
      
       // filter cat two
       filter2(state, action) {
        let filtered = [...state.categoryTwo];
        let filteredByPort = [...state.categoryTwo];
        console.log(action.payload,"cat2");
        console.log(filtered,"2222222222");
      
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
        if (action.payload.numberOfpeople !== undefined) {
          filtered = filtered.filter(obj => obj.numberOfpeople < action.payload.numberOfpeople);
        }
      
        state.filteredcategoryTwo = filtered;
    
      },
      
      logoutt(state,action){
        state.user = null
        state.boatOwner = null
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
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile");
              } else if (action.payload === 2) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nileplus");
              } else if (action.payload === 3) {
                state.categoryboats = state.boats.filter(boat => boat.category === "3nile vip");
              } else {
              }
            } 
          }
    },
    // 
    extraReducers: {
      [editUserInfo.fulfilled]:(state,action) =>{
          state.user = action.payload.data
      },
       [ register.fulfilled]:(state,action)=>{
        
       },
       [login.pending]:(state,action)=>{
        state.err=true;
      
      
       } ,
       [login.fulfilled]: (state, action) => {
         if(action.payload.boatOwner){
            state.boatOwner=action.payload.boatOwnerData
          }
          else{
            state.user=action.payload.userData
        }
        // state.anyUser = action.payload;
      
        // if(state.anyUser.data.user){
        //   state.user=state.anyUser.data
        // }else{
        // }
  
    },
    [getOwnerBoats.fulfilled]:(state,action)=>{
      //  console.log(action.payload.data,"ojdsfjajlj;ljdf;laj;lfja;ld;kljf;klajf;kla;lj;la;sflaj;lsdajhj")
      state.ownerBoats =action.payload.data
    },
    [getOwnerRequests.fulfilled]:(state,action)=>{
   console.log(action.payload,"hjfghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      state.ownerRequestsTrips =action.payload
      // console.log(state.ownerRequestsTrips , "lkjldjlfdjlfgfsjdkfljlsdfjklsdjfklsjkldfjljlsdfklkldfjlsdfljldkfkljlsdlsjldkf")
     
    },
    [getOwnerPreviousTrips.fulfilled]:(state,action)=>{
      // console.log(action.payload,"hjfghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")

      state.ownerPreviousTrips =action.payload
     
    },
    [addTrip.fulfilled]:(state,action)=>{
    },
    [getOwnerCurrentTrips.fulfilled]:(state,action)=>{
   
      state.ownerCurrentTrips =action.payload
     
    },
    [SwvlDetails.fulfilled]:(state,action)=>{ 
      state.ownerSwvlTrip =action.payload
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
        // [getCategoryThree.fulfilled]: (state, action) => {
            
            
        //    state.categoryThree = action.payload.data;
        //    state.filteredcategoryThree = action.payload.data
        // },
        [getSwvl.fulfilled]:(state,action) =>{
          state.swvl = action.payload.data;
          state.filteredswvl = action.payload.data;
          state.filteredcategoryThree = action.payload.data
        },
// /////////////////////////////////////////////////////////
        [finishedTrips.fulfilled]:(state,action) => {
          state.finished = action.payload.data
        },
        [acceptedTrips.fulfilled]:(state,action) => {
          state.accepted = action.payload.data
        },
        [pendingTrips.fulfilled]:(state,action) => {
          state.pending = action.payload.data
        },
        [addReview.fulfilled]:(state,action) => {
        },
        [canceltrip.fulfilled]:(state,action) => {{
        }
      },
        // Get Categories End


// book swvl start 


[bookSwvl.fulfilled]:(state,action) => {
  state.swvlRecit = action.payload.data
  console.log(state.swvlRecit,"swvlRecit")
  state.seatReserved = 0
},


//  book swvl end
        // Owner Edit Info

       


        [bookTrip.fulfilled]: (state, action) => {

       },
       [addBoat.fulfilled]: (state, action) => {
        console.log("first")
      },
       [ownerAcceptTrip.fulfilled]: (state, action) => {
        console.log("first")
      },
       [ownerCancelTrip.fulfilled]: (state, action) => {
        console.log("first")
      },
       [ownerFinishTrip.fulfilled]: (state, action) => {
        console.log("first")
      },
       [ownerUpdateInfo.fulfilled]: (state, action) => {
         state.boatOwner = action.payload.data;
      },
      //  [updateImage.fulfilled]: (state, action) => {
      //     console.log("first")
      // },
       [fireSwvl.fulfilled]: (state, action) => {
          console.log("first")
      },
       [ownerSwvl.fulfilled]: (state, action) => {
          console.log("first")
      },
       [getSwvlById.fulfilled]: (state, action) => {
          console.log("first")
      },
    }
    
})


export const { getcategoryboats,add ,change , changeTypeOne , changeTypeTwo , changeTypeThree ,changeTwo , changeThree , changePeopleOne , changePeopleTwo , changePeopleThree, changePortOne , changePortTwo , changePortThree , logoutt , filter , filter2 ,filterTaps,filterTaps2,filterTaps3, search,seatResearv,notify} = UserSlice.actions;

export default UserSlice.reducer;



