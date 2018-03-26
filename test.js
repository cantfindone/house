const mg = require('./mg');
var mongo = require('mongodb');

var data = {"_id":'13818180000',"password":123465};

//mg.insertOne('User',data)

const set1 =  []

//set1.push(100);


for (let item of set1) {
  console.log(item);
  // expected output: 42
  // expected output: 13
}

console.log(set1);
//mg.update('User',{'_id':'13818180000'},{'$set':{'favorite':set1}});


(async()=>{
	try{
		//await mg.update('User',{'_id':'13818180000'},{'$pull':{'favorite':'5aab94f0e592f811f0159251'}});
		let user= await mg.find("User",{},1,1);
		console.log(user[0].length);
	}catch(e){
			console.log(e)
		}
})()