 const express = require("express");
  const { users } = require("../data/users.json");
 const router = express.Router();

  

  
/**
 * ROUTE: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res)=> { 
  res.status(200).json({ 
   success: true,
   data: users,
  });
});




router.get("/:id", (req,res) => { 
  const {id} = req.params;
  //const id = req.params.id;
  // 
  
  const user = users.find((each)=>each.id === id)
  if(!user){ 
    return res.status(404).json({ 
      success: false,
      message: "User Doesn't Exist !!"
    });
  }
  return res.status(200).json({    ///we can start with else as well
    success: true,
    message: "User Found",
    data: user,
  });
});
/**
 * ROUTE: /
 * Method: POST
 * Description: creating a new user
 * Access: Public
 * Parameters: none
 */

router.post("/", (req,res)=>{ 
  const{id, name, surname, email, subscriptionType, subscriptionDate} =req.body
    
  const user = users.find((each) =>each.id===id);
  if(user){ 
   return res.status(404).json({ 
    success: false,
    message: "user with the ID Exists"
   });
  }
  users.push({ 
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({ 
    success: true,
    message: "User added successfully",
    data: users,
  });
});

/**
 * ROUTE: /:id
 * Method: PUT
 * Description: updating a user by their id
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", (req,res)=>{ 
   const {id} = req.params;
   const {data} = req.body;

  const user = users.find((each)=>each.id === id)
  if(!user){ 
    return res.status(404).json({ 
      success: false,
      message: "User Doesn't Exist !!"
    });
  }
  const updateUserData = users.map((each)=>{ 
    if(each.id===id){ 
      return{
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({ 
    success: true,
    message: "User Updated !!",
    data: updateUserData
  });
});

/**
 * ROUTE: /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", (req,res)=>{ 
  const {id} = req.params;

  const user = users.find((each)=>each.id === id)
  if(!user){ 
    return res.status(404).json({ 
      success: false,
      message: "User Doesn't Exist !!"
    });
  }
 const index = users.indexOf(user);
 users.splice(index, 1)

 return res.status(200).json({ 
  sucess:true,
  message: "Deleted user...",
  data: users
 })

});

/**
 * ROUTE: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user subscription Details
 * Access: Public
 * Parameters: id
 */

router.get("/subscription-details/:id", (req, res)=>{ 
  
  const {id} = req.params;
  const user = users.find((each)=>each.id == id);

  if(!user){ 
    return res.status(404).json({ 
      success: false,
      message: "User with the ID didn't Exist"
    })
  }
  const getDateInDays = (date ="")=>{
    let data;
    if(date == ""){ 
       data = new Date();
    }else{ 
      data = new Date(date);
    }
    let days = Math.floor(data / (1000*60*60*24));
    return days;

  };

const subscriptionType = (data) => {
  if (user.subscriptionType === "Basic") {
    data = data + 90;
  } else if (user.subscriptionType === "Standard") {
    data = data + 180;
  } else if (user.subscriptionType === "Premium") {
    data = data + 365;
  }

  return data;
};

 //jan 1 1970 UTC
 let returnDate = getDateInDays(user.returnDate);
 let currentDate = getDateInDays();
 let subscriptionDate = getDateInDays(user.subscriptionDate);
 let subscriptionExpiration = subscriptionType(subscriptionDate);
// console.log("returnDate:", returnDate);
// console.log("currentDate:", currentDate);
// console.log("subscriptionDate:", subscriptionDate);
// console.log("subscriptionExpiration:", subscriptionExpiration);

 const data = { 
  ...user,
  isSubscriptionExpired : subscriptionExpiration <= currentDate ,
  daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
  fine:
   returnDate < currentDate
    ? subscriptionExpiration <= currentDate 
    ? 100 
    : 50 
    : 0,
 };
 return res.status(200).json({ 
  success: true,
  message : "Subscription detail for the user is: ",
  data,
 });

});

 module.exports = router;








 