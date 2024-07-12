const Bull = require('bull');
const Queue = require('bull') ; 

const queue = new Queue('myQueue' , {
	redis:{
		host :'localhost' , 
		port:6379,
	},
});


async function addJob(job){
	await queue.add(job);
	//console.log('data added to queue',job) ; 
}

async function initiate(params) {

	//console.log('params are ' , params) ; 
	await addJob(params);
}


initiate().catch(err=>{
	console.log(err) ; 
})


module.exports = {initiate} ; 