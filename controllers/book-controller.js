const { UserModel, BookModel } = require("../models");
const issuedBook = require("../dtos/book-dto.js");

exports.getAllBooks =async(req, res) => {
    const books = await BookModel.find();

    if(books.length === 0){ 
        return res.status(404).json({ 
            success: false,
            message: "No Book Found"
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    });
};


// router.get("/:id", (req, res)=>{ 
//   const {id} = req.params;
//   const book = books.find((each)=> each.id===id);

//   if(!book){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "Book not found",
//     });
//   }
//   return res.status(200).json({ 
//     success: true,
//     message: "found The Book By their Id",
//     data: book,
//   });
// });

exports.getSingleBookById = async(req, res) => {
    const {id}= req.params;
    const book = await BookModel.findById(id);

     if(!book){ 
     return res.status(404).json({ 
      success: false,
      message: "Book not found",
     });
       }
return res.status(200).json({ 
    success: true,
    message: "found The Book By their Id",
    data: book,
   });

};

// router.get("/issued", (req, res)=>{ 
//   const usersWithTheIssuedBook = users.filter((each)=>{   //...we are not use find here bcz we can use only one element by using find
//     if(each.issuedBook) return each;
//   });
//   const issuedBooks = [];
//   usersWithTheIssuedBook.forEach((each)=>{ 
//     const book = books.find((book)=> ( book.id ===  each.issuedBook));
//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
//   });
//   if(issuedBooks.length===0){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "No Book Have Been Issued Yet...!!",
//     })
//   }
//   return res.status(200).json({ 
//     success: true,
//     message: "Users with the Issued Books...!!",
//     data: issuedBooks,
//   });

// });

exports.getAllIssuedBooks = async(req, res) => { 
const users = await UserModel.find({
    issuedBook: {$exists: true}
}).populate("issuedBook");

//Data Transfer Object (DTO)

const issuedBooks = users.map((each) => new IssuedBook(each));

   if(issuedBooks.length===0){ 
     return res.status(404).json({ 
      success: false,
       message: "No Book Have Been Issued Yet...!!",
    })
  }
   return res.status(200).json({ 
     success: true,
     message: "Users with the Issued Books...!!",
     data: issuedBooks,
   });

};



// router.post("/", (req, res)=>{ 
//   const {data} = req.body;

//   if(!data) { 
//     return res.status(400).json({ 
//       success: false
//       ,
//       message: "No Data To Add A Book",
//     });
//   }
//   const book = books.find((each)=> each.id === data.id);
//   if(book){ 
//     return res.status(404).json({ 
//       success: false,
//       message: "Id Already Exists !!"
//     })
//   }
//   const allBooks = {...books, data};  //if we have same keys or operator it will execute recent one in spread operator
//   return res.status(201).json({ 
//     success: true,
//     message: "Added Book Succesfully",
//     data: allBooks,
//   })
// });
exports.addNewBook = async (req, res) =>{ 
   const {data} = req.body;

   if(!data) { 
    return res.status(400).json({ 
        success: false,
        message: "No Data To Add A Book",
    });
   }
   await BookModel.create(data);
   const allBooks = await BookModel.find();

   return res.status(201).json({ 
    success: true,
    message: "Added Book Successfully",
    data: allBooks,
   });  
}

// router.put("/updateBook/:id", (req, res)=>{ 
// const {id} = req.params;   //writing params bcz our data is in url 

// const {data} = req.body;

// const book = books.find((each) => each.id === id)

// if(!book){ 
//   return res.status(400).json({ 
//     success: false,
//     message: "Book Not Found For This ID"
//   })
// }

// const updatedata = books.map((each)=>{ 
//   if(each.id == id){ 
//     return {...each, ...data}
//   }
//   return each;
// });
// return res.status(200).json({ 
//   success: true,
//   message: "Updated a Book By Their Id",
//   data: updatedata,
// });
// });
exports.updateBookById = async(req, res) =>{ 
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id,
    }, data,{ 
        new: true,
    }
);
  return res.status(200).json({ 
    success: true,
    messgae: "Updated a Book By their Id",
    data: updatedBook,
  });

};





