const minidiv= document.querySelectorAll(".miniDiv")
var twoD_Array=[];
const playerX= document.querySelector("#playerX");
const playerO= document.querySelector("#playerO");
var player_X_Name="X"
var player_O_Name="O"
var firstPlayer="";
var firtClick=0;
// var ResetArray=[];
var data=[1,1,0,0,0,1,1,0,1];

ResetArray()
function ResetArray(){
    var index=0;
for(i=0;i<3;i++){
    twoD_Array[i]=[]
    // ResetArray[i]=[]
    for(j=0;j<3;j++){
        // ResetArray[i][j]=data[index];
        twoD_Array[i][j]=data[index];
        index++;        
    }
}
}

// ResetArray=twoD_Array;
console.log(twoD_Array)
// console.log(ResetArray)
// winner()
var winnerPlayer=false;
var winnerPath="";
var winnerstring="";
function winner(){
    //for checking horizontal line i.e 00 01 02 or 10 11 12 or 20 21 22
   for(row=0;row<twoD_Array.length;row++){
    for(col=0;col<twoD_Array.length;col++){
        winnerstring+=twoD_Array[row][col]
    }
    if(winnerstring[0]!==winnerstring[1]||winnerstring[1]!=winnerstring[2]){
        winnerstring=""
    }
    else{
        // alert(winnerstring[0],"is thw winner")
        winnerPath=`${row}_0/${row}_1/${row}_2`;
        winnerPlayer=true;
        return true;
    }
   }
   winnerstring="";
    //for checking vertical line i.e 00 10 20 or 01 11 21 or 02 12 22
   for(row=0;row<twoD_Array.length;row++){
    for(col=0;col<twoD_Array.length;col++){
        winnerstring+=twoD_Array[col][row]
    }
    if(winnerstring[0]!==winnerstring[1]||winnerstring[1]!=winnerstring[2]){
        winnerstring=""
    }
    else{
        // alert(winnerstring[0],"is thw winner")
        winnerPath=`0_${row}/1_${row}/2_${row}`;
        winnerPlayer=true;
        return true;
    }
   }
   winnerstring="";
   //for checking diagonal starting from upper left
   if(twoD_Array[0][0]==twoD_Array[1][1]&&twoD_Array[2][2]==twoD_Array[1][1]){
    winnerstring+=twoD_Array[0][0]+twoD_Array[1][1]+twoD_Array[2][2];
    // alert(twoD_Array[0][0],"is thw winner")
    winnerPath=`0_0/1_1/2_2`
    winnerPlayer=true;
    return true;
   }
   //for checking diagonal starting from bottom left
   else if(twoD_Array[2][0]==twoD_Array[1][1]&&twoD_Array[0][2]==twoD_Array[1][1]){
    winnerstring+=twoD_Array[2][0]+twoD_Array[1][1]+twoD_Array[0][2];
    winnerPath=`2_0/1_1/0_2`
    // alert(twoD_Array[2][0],"is thw winner")
    winnerPlayer=true;
    return true;
   }
   var draw=0;
   twoD_Array.forEach((element,i)=>{
    // console.log(element,i)
    element.forEach(innerElement=>{
        if(innerElement==0||innerElement==1){
            draw++;
        }
    })
   })
    if(draw==0){
    winnerPlayer=false;
        return "draw";
    }   
}
var count=0;
document.querySelector(".Main_div").addEventListener("click",(event)=>{
    id=event.target.id
    console.log(id)
    var elements=id.split("_")
    if((twoD_Array[elements[0]][elements[1]]==0||twoD_Array[elements[0]][elements[1]]==1)&&winnerPlayer==false){
        if(count==0){
            event.target.innerHTML="X"
            twoD_Array[elements[0]][elements[1]]="X"
            count=1;
            firtClick==0?firstPlayer="X":firstPlayer=firstPlayer;
            firtClick=1;
        }else{
            event.target.innerHTML="O"
            twoD_Array[elements[0]][elements[1]]="O"
            count=0;
            firtClick==0?firstPlayer="O":firstPlayer=firstPlayer;
            firtClick=1;
        }
        var result=winner()
        if(result){
            if(result=="draw"){
            document.querySelector("#WinnerText").innerHTML=`Draw!!`;
            minidiv.forEach(element => {
                element.style.backgroundColor="Red";
                // element.style.color="white";
            });
            }else{
            winnerstring[0]=="X"?document.querySelector("#x-increment").innerHTML= +document.querySelector("#x-increment").innerHTML+1:document.querySelector("#o-increment").innerHTML= +document.querySelector("#o-increment").innerHTML+1;
            winnerPath=winnerPath.split("/")
            winnerstring[0]=="X"?document.querySelector("#WinnerText").innerHTML=`The winner is ${player_X_Name} !!`:document.querySelector("#WinnerText").innerHTML=`The winner is ${player_O_Name} !!`;
            // document.querySelector("#WinnerText").innerHTML=`The winner is ${winnerstring[0]}!!`

            for(let i=0;i<=2;i++){
                document.getElementById(`${winnerPath[i]}`).style.backgroundColor="cyan"
                document.getElementById(`${winnerPath[i]}`).style.color="purple"
            }
            // document.getElementById(`${winnerPath[0]}`).style.backgroundColor="cyan"
            // document.getElementById(`${winnerPath[0]}`).style.color="purple"
            // document.getElementById(`${winnerPath[1]}`).style.backgroundColor="cyan"
            // document.getElementById(`${winnerPath[1]}`).style.color="purple"
            // document.getElementById(`${winnerPath[2]}`).style.backgroundColor="cyan"
            // document.getElementById(`${winnerPath[2]}`).style.color="purple"
            }
            
            setTimeout(()=>{
                firstPlayer=="X"?count=1:count=0;
                Reset()
            },2000)
        }
    }
})

document.querySelector("#Reset").addEventListener("click",()=>{
    firstPlayer=="X"?count=0:count=1;
    Reset()
})
document.querySelector("#Restart").addEventListener("click",()=>{
    window.location.reload()
})

function Reset(){
    // document.querySelectorAll(".miniDiv").style.backgroundColor="";
    winnerPlayer=false;
    winnerPath="";
    winnerstring="";
    firstPlayer=""
    firtClick=0;
    ResetArray()
    // twoD_Array=ResetArray;
    document.querySelector("#WinnerText").innerHTML="Lets see who wins?"
//    count=0;
   minidiv.forEach(element => {
        element.innerHTML=""
        element.style.backgroundColor="";
    });
}

document.querySelector("#buttonHandle").addEventListener("click",(event)=>{
    // alert(event.target.value)
 if(event.target.value==="Continue"){
    if(playerX.value!="" && playerO.value!=""){
    event.preventDefault()
        document.querySelector("#xPlayerName").innerText=playerX.value;
        document.querySelector("#oPlayerName").innerText=playerO.value;

        player_X_Name=playerX.value;
        player_O_Name=playerO.value;

        document.querySelector(".Tic-Tac-Toe").style.display="block"
        document.querySelector(".form_div").style.display="none"

    }
 }else{
        document.querySelector(".Tic-Tac-Toe").style.display="block"
        document.querySelector(".form_div").style.display="none"
 }
})
