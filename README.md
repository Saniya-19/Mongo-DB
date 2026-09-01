# Mongo-DB

## Non-RElational DB

## Relation => Tables
## Rows => Tuples
## Column => Attributes

irctc_fln(1k train infos)
1 train haeading towards to goa = > 1k train all(file system)

irctc_db(1k train infos)
1 train heading towards to goa => 1 train only (database)

Data >> Json(csv)format >> schemaless


MVC Arch => Controllers
>> M: Model(it depicts the structure of MongoDb collections)
>> v: View (wrt to frontend(reactJs))
>> c: Controllers(brain or logical part of a route)
       >>books.Controllers.js
       >>users.Controllers.js 

       Schema >>
       id: String
       name: String
       age: Number
       Gender: char || varchar(15)

model>>
id: 123
name: dewtown
age: 23
gender: 'F'

Foreing key:
>> Referential Intrgrity

users Table                      Books Table
issuedBook:2(foreing key here)   issuedBook:2(primary key)

