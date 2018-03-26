'use strict';

var fs = require('fs');
//var path = require('path');

var exist = function (f) {
    return new Promise(function (resolve, reject) {
        fs.access(f, function (err) {
            if(err){
				resolve(false);
			}else{
				resolve(true);	
			}
		
        });
    });
};

var md = function (dir) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(dir, function (err) {
             if(err){
				reject(err);
			}
        });
    });
};



// 读取文件列表
var ls = function (dir) {
    return new Promise(function (resolve, reject) {
        fs.readdir(dir, function (err, files) {
            resolve(files);
        });
    });
};

// 读取文件
var read =  function (f) {
    return new Promise(function (resolve, reject) {
        fs.readFile(f, function (err, data) {
			if(err){
				reject(err)
			}else{
				resolve(data);
			}
        });
    }).catch((e)=>{console.log(e)});
};

var write = function (f,d) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(f, d,function (err) {
            if(err){
				reject(err);
			}

        });
    });
};

var getPhoto = async function(img_path,_id) {
	let path=img_path+'/'+_id;
	let files=await ls(path);
	if(files){
		console.log(files)
		console.log(files[0])
		let fdata =await read(path+'/'+files[0]);
		return fdata;
	}
	
};
/*
(async()=>{
	try{
		let d= await getPhoto('img','5aa5da83b3fb4f2530e6e038');
		console.log(d.length);
	}catch(e){
			console.log(e)
		}
})()
*/
var exists = fs.accessSync;
var mds = fs.mkdirSync;
var lss = fs.readdirSync;
var reads = fs.readFileSync;
var writes = fs.writeFileSync;

module.exports = {
	'exist':exist,
	'exists':exists,
	'md':md,
	'mds':mds,
	'ls':ls,
	'lss':lss,
	'read':read,
	'reads': reads,
	'write':write,
	'writes':writes,
	'getPhoto':getPhoto
}