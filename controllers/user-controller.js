const { UserModel, BookModel } = require("../models");



// router.get("/", (req, res)=> { 
//   res.status(200).json({ 
//    success: true,
//    data: users,
//   });
// });
exports.getAllUsers = async(req, res)=> { 
  const users = await userModel.find();

  if(users.lengh == 0){ 
    return res.status(404).json({ 
      success: false,
      message: "No Users Found In The DB",
    });
  }
  res.status(200).json({
    success: true,
    message: "Thse are the user info: ",
    data: users,
  });
};


// router.get("/:id", (req,res) => { 
//   const {id} = req.params;
//   //const id = req.params.id;
//   // 
  
//   const user = users.find((each)=>each.id === id)
//   if(!user){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "User Doesn't Exist !!"
//     });
//   }
//   return res.status(200).json({    ///we can start with else as well
//     success: true,
//     message: "User Found",
//     data: user,
//   });
// });

exports.getSingleUserById = async(req, res)=>{ 
 const {id} = req.params;

 const user = await UserModel.findById(id);
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

};




// router.post("/", (req,res)=>{ 
//   const{id, name, surname, email, subscriptionType, subscriptionDate} =req.body
    
//   const user = users.find((each) =>each.id===id);
//   if(user){ 
//    return res.status(404).json({ 
//     success: false,
//     message: "user with the ID Exists"
//    });
//   }
//   users.push({ 
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });
//   return res.status(201).json({ 
//     success: true,
//     message: "User added successfully",
//     data: users,
//   });
// });
exports.createNewUser = async(req, res)=>{ 
  const{id, name, surname, email, subscriptionType, subscriptionDate} =req.body;
}


// router.put("/:id", (req,res)=>{ 
//    const {id} = req.params;
//    const {data} = req.body;

//   const user = users.find((each)=>each.id === id)
//   if(!user){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "User Doesn't Exist !!"
//     });
//   }
//   const updateUserData = users.map((each)=>{ 
//     if(each.id===id){ 
//       return{
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({ 
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData
//   });
// });

exports. updateUserData = async(req, res)=>{ 
  const {id} = req.params;
   const {data} = req.body;

   const updatedUserData = await userModel.findoneAndupdate(
    {_id:id},
    {$set: { 
      ...data,
    }},
    {new: true}
  );
   return res.status(200).json({ 
    success: true,
    message: "User Updated !!",
    data: updatedUserData,
  });

};









// router.delete("/:id", (req,res)=>{ 
//   const {id} = req.params;

//   const user = users.find((each)=>each.id === id)
//   if(!user){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "User Doesn't Exist !!"
//     });
//   }
//  const index = users.indexOf(user);
//  users.splice(index, 1)

//  return res.status(200).json({ 
//   sucess:true,
//   message: "Deleted user...",
//   data: users
//  })

// });
exports.deleteUser = async (req, res)=>{ 
  const {id} = req.params;
  const user = await UserModel.deleteOne({_id:id});

     if(!user){ 
    return res.status(404).json({ 
      success: false,
      message: "User Doesn't Exist !!"
    });
  }
  return res.status(200).json({ 
  sucess:true,
  message: "Deleted user...",
  data: users,
 });

};

