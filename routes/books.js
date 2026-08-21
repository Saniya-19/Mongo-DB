const express = require("express");
  const {books} = require("../data/books.json");
    const {users} = require("../data/users.json");
  
  const router = express.Router();



   
/**
 * ROUTE: /books
 * Method: GET
 * Description: Get books by their id
 * Access: Public
 * Parameters: None
 */

router.get("/", (req,res)=>{ 
  res.status(200).json({ 
    success: true,
    message: "Got all the Books",
    data: books
  })
});


  
/**
 * ROUTE: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued", (req, res)=>{ 
  const usersWithTheIssuedBook = users.filter((each)=>{   //...we are not use find here bcz we can use only one element by using find
    if(each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithTheIssuedBook.forEach((each)=>{ 
    const book = books.find((book)=> ( book.id ===  each.issuedBook));
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
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

});

/**
 * ROUTE: /books/:id
 * Method: GET
 * Description: Get  books by their id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", (req, res)=>{ 
  const {id} = req.params;
  const book = books.find((each)=> each.id===id);

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
});




/**
 * ROUTE: /
 * Method: POST
 * Description: Adding a new book
 * Access: Public
 * Parameters: None
 * data: id, name, author, genre, price, publisher, 
 */


router.post("/", (req, res)=>{ 
  const {data} = req.body;

  if(!data) { 
    return res.status(400).json({ 
      success: false
      ,
      message: "No Data To Add A Book",
    });
  }
  const book = books.find((each)=> each.id === data.id);
  if(book){ 
    return res.status(404).json({ 
      success: false,
      message: "Id Already Exists !!"
    })
  }
  const allBooks = {...books, data};  //if we have same keys or operator it will execute recent one in spread operator
  return res.status(201).json({ 
    success: true,
    message: "Added Book Succesfully",
    data: allBooks,
  })
});

/**
 * ROUTE: /:id
 * Method: PUT
 * Description: Updating a book By its Id
 * Access: Public
 * Parameters: id
 * data: id, name, author, genre, price, publisher, 
 */
router.put("/updateBook/:id", (req, res)=>{ 
const {id} = req.params;   //writing params bcz our data is in url 

const {data} = req.body;

const book = books.find((each) => each.id === id)

if(!book){ 
  return res.status(400).json({ 
    success: false,
    message: "Book Not Found For This ID"
  })
}

const updatedata = books.map((each)=>{ 
  if(each.id == id){ 
    return {...each, ...data}
  }
  return each;
});
return res.status(200).json({ 
  success: true,
  message: "Updated a Book By Their Id",
  data: updatedata,
});
});



  module.exports = router;