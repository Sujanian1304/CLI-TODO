const { commander, program } =require("commander");
const fs =require("fs").promises;

program
  .name("cli todo")
  .description("todo task on command line")

program 
  .command("addtodo <task>")
  .description("add a todo")
  .action((task)=>{
     async function write(){
        try{
            const data= await fs.readFile("todo.json",'utf-8');
            let json=JSON.parse(data);
            let count=json.length;
            json.push({index:count+1,title:task,id:count,done:false});
            const stringdata=JSON.stringify(json);
        await fs.writeFile("todo.json",stringdata)
        console.log("added task "+task);
        }catch(err){
            console.log(err);
        }
    }
   write();
  })

program
  .command('showtodo')
  .description('show the users todo')
  .action(()=>{
    async function read(){
       try{
        const data= await fs.readFile("todo.json",'utf-8');
       const json=JSON.parse(data);
       if(json.lenght===0){
        console.log("you haven't added any task till now");
        console.log(" Index | task | id | done ");
        return;
       }
       console.log(" Index | task | id | done ");
       for(let i=0;i<json.length;i++){
          console.log(json[i].index+" "+json[i].title+" ID["+json[i].id+"] "+json[i].done);
       }
       }catch(err){
        console.log(err);
       }

     }
     read();
  })
program
  .command("markTodoDone <id>")
  .description("mark the todo done")
  .action((id)=>{
    async function write(){
        try{
            const data= await fs.readFile("todo.json",'utf-8');
           const json=JSON.parse(data);
           if(json.lenght==0){
            console.log("you haven't added any task till now");
            console.log(" Index | task | id | done ");
            return;
           }
           for(let i=0;i<json.length;i++){
             if(i==id){
                json[i].done=true;
                console.log("the todo "+json[i].title+" is done ");
             };
           }
           console.log(" Index | task | id | done ");
             for(let i=0;i<json.length;i++){
                console.log(json[i].index+" "+json[i].title+" ID["+json[i].id+"] "+json[i].done);
             }
           }catch(err){
            console.log(err);
           }
    
    }
    write();
  })
  program
   .command("deleteTodo <id>")
   .description("delete todo ")
   .action((id)=>{
    async function read(){
        try{
            const data= await fs.readFile("todo.json",'utf-8');
           const json=JSON.parse(data);
           if(json.lenght==0){
            console.log("you haven't added any task till now");
            console.log(" Index | task | id | done ");
            return;
           }
           for(let i=0;i<json.length;i++){
             if(i==id){
                console.log("the todo "+json[i].title+" will be deleted ");
                 json.splice(i,1);
             };
           }
           const stringdata=JSON.stringify(json);
           await fs.writeFile("todo.json",stringdata);
           console.log(" Index | task | id | done ");
             for(let i=0;i<json.length;i++){
                let c=i;
                json[i].index=c+1;
                json[i].id=c;
                console.log(json[i].index+" "+json[i].title+" ID["+json[i].id+"] "+json[i].done);
             }
           }catch(err){
            console.log(err);
           }
    
    }
    read();
   })
  program.parse();