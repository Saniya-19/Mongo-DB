//Data Transfer Object - Book

class IssuedBook{ 
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issueddate;
    returnDate;


//whenevre we create obj, the constructor gets involved = parameterized constructor
constructor (user){    //constructor dont have any written type....in js there is no need to write class name (if we add IssuedBook before user then it causes error) 
  this._id = user.issuedBook._id;
  this.name= user.issuedBook.name;
  this.genre = user.issuedBook.genre;
  this.price = user.issuedBook.price;
  this.publisher = user.issuedBook.publisher;
  this.issuedBy = user.issuedBy;
  this.issueddate = user.issuedDate;
  this.returnDate = user.returnDate;
  
}
}


//var ref = new IssuedBook(userObj);


module.exports = IssuedBook;