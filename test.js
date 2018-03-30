const info = require('./fields');


//mg.insertOne('User',data)


//set1.push(100);

// console.log(info.keys)
for (let item in info) {
  console.log(item+":"+info[item]);
  // expected output: 42
  // expected output: 13
}

// console.log(info);
//mg.update('User',{'_id':'13818180000'},{'$set':{'favorite':set1}});


(async()=>{
	try{
		
		console.log();
	}catch(e){
			console.log(e)
		}
})()