const { UserModel, BookModel } = require("../models");

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
