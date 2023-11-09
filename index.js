const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefnition = protoLoader.loadSync("./todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefnition);

let todoService = protoDescriptor.TodoService;

const client = new todoService("localhost:50051",grpc.credentials.createInsecure())

client.listTodos({},(err,todos)=>{
	if (!err){
		client.createTodo({id:5,title:"Fifth Todo",content:"This is the content od 5Th Todo"},(err,todos)=> {
			if(!err){
				console.log("New Todo Created")
				client.listTodos({},(err,todos)=> {
					if(!err){
						console.log("After Insertuon",todos)
					}

				})
			}
		})
	}
})
