// variables used to store html elemtents
let tform = document.getElementById("ticket-form");
let tChoices = document.getElementById("ticket-choice");
let extraOpt = document.getElementById("food-token");
let durationList = document.getElementById("duration");
let headCount = document.getElementById("no-of-tickets");
let totalTable = document.getElementById("myTableTotal")
let placeOrderbtn = document.getElementById("place-order");
let okbtn = document.getElementById("okbtn");
let billArea = document.getElementById("message-bill");
let addFav = document.getElementById("addFav");
let ordFav = document.getElementById("ordFav")
let favOk = document.getElementById("favok");
let loyalBtn = document.getElementById("chk-loyalty");
let promtBox = document.getElementById("bill-box");


// Variable definition used 
let totfooodtokens;
let tPrice;
let oOrder;
let totalPeople;
let durationValue;
let durationPrice;
let totalCost;
let count = 1;
let durationText;
let sumCurrent;
let ticketDes;
let overallHead;
let loyaltyPoints;
let getLoyalPoints;
let getoverallHead;

// total cost and current cost are set to zero

window.addEventListener("load",function(){

    totalCost = 0;
    sumCurrent = 0;

    if (localStorage.getItem('loyaltypoints')>0){
        overallHead = parseInt(localStorage.getItem("heads") )
    }
    else{
        overallHead = 0
    }
    
})

// Displays the instantaneous changes of the current order when the type of ticket choice is changed

tChoices.addEventListener("change",function(){
    getVariables();
    disableFields()
    nullvalidation()

    sumCurrent = currentSum()

    document.getElementById("display-cost").innerHTML = `${sumCurrent}`

    durationList.options.selectedIndex=0;
       
})

// Displays the instantaneous changes of the current order when number of tickets is changed or typed

headCount.addEventListener("input",function(){
    getVariables();

   nullvalidation()

    sumCurrent = currentSum()  
    
})

// Displays the instantaneous changes of the current order when duration drop downlist is changed

durationList.addEventListener("change",function(){
    getVariables();

    nullvalidation()

    sumCurrent = currentSum()

})

// Displays the instantaneous changes of the current order when number of food token is changed is changed or typed

extraOpt.addEventListener("input",function(){
    
    
    getVariables();

    nullvalidation()
    
    sumCurrent = currentSum() 
})

// Displays the number of ticket typeof,number of food totfooodtokens,extra duration and all ticket details to the user and the cost of the current order is added to the overall order
tform.addEventListener("submit",function(event){

    placeOrderbtn.style.display="block"
    document.getElementById("no-order").style.display="none"
    getVariables();
    durationText = durationList.options[durationList.selectedIndex].text;
    ticketDes = tChoices.options[tChoices.selectedIndex].text;
    sumCurrent = currentSum()
    totalCost = sumCurrent + totalCost
    overallHead = overallHead + totalPeople


    let table = document.getElementById("myTable");
    let row = table.insertRow(count);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `${count}. You Have Purchased ${totalPeople} <br> (${durationText}) ${ticketDes} tickets(<b>${totfooodtokens} food tokens</b>)`;
    cell2.innerHTML = `LKR ${sumCurrent}/=`;
    count ++;
    console.log(totalCost)

    document.getElementById("total-display").innerText="Overall Cost"
    document.getElementById("total-bill").innerText=`LKR ${totalCost}/=`
    totalTable.style.display="table"

    document.getElementById("display-eprice").innerHTML=`-`
    document.getElementById("display-dprice").innerHTML=`-`
    document.getElementById("display-nticket").innerHTML=`-`
    document.getElementById("display-cost").innerHTML = `-`
    document.getElementById("display-tprice").innerHTML=`-`

    durationList.options.selectedIndex=0;
    durationList.disabled  = true
    extraOpt.disabled = true
    tChoices.options.selectedIndex=0;
    headCount.value = "";
    extraOpt.checked = false
    extraOpt.value=0;

})

// the final total cost of the overall order is displayed to the user 
placeOrderbtn.addEventListener("click",function(event){
    event.preventDefault();
    promtBox.classList.add("bill-box");
    billArea.innerHTML=`<h2>Thank you for your purchase</h2>The Totol Bill is <b>${totalCost}`
    okbtn.style.display="block"


    document.getElementById("display-eprice").innerHTML=`-`
    document.getElementById("display-dprice").innerHTML=`-`
    document.getElementById("display-nticket").innerHTML=`-`
    document.getElementById("display-cost").innerHTML = `-`
    document.getElementById("display-tprice").innerHTML=`-`

    document.body.style.animationName="change"
})

//the OK button in the prompt message when the Place order button is clicked and it refreshes the page
okbtn.addEventListener("click",function(){
    location.reload();
})



// THe add to favourite button which saves the users current order in the local storage
addFav.addEventListener("click",function(event){
    event.preventDefault();
    
    sumCurrent = currentSum()
    durationText = durationList.options[durationList.selectedIndex].text;
    ticketDes = tChoices.options[tChoices.selectedIndex].text;

    
    // this avoids user saving undefined and invalid orders
    if (isNaN(sumCurrent) || sumCurrent==0){
        document.getElementById("add-ord-fav").style.display="block";
    document.getElementById("fav-resp").innerHTML=`Please add a <b>valid order</b>`

    }
    else{
    document.getElementById("add-ord-fav").style.display="block";
    document.getElementById("fav-resp").innerHTML=`Your order has been saved as a favourite`

    let FavOrder = {ticketprice:tPrice,numberoftickets:totalPeople,extradurationprice:durationPrice,extraheads:totfooodtokens,currentsum:sumCurrent,durationinfo:durationText,ticketinfo:ticketDes,totheads:overallHead}
    localStorage.setItem('favorder',JSON.stringify(FavOrder));
    }

    
})



// retrieves all values from the user
function getVariables(){
    tPrice = parseInt(tChoices.options[tChoices.selectedIndex].value);
    totalPeople = parseInt(headCount.value)
    durationPrice = durationPriceget();
    totfooodtokens = parseInt(extraOpt.value)

}



// the order favourite button which adds the users favourite order to the overall order
ordFav.addEventListener("click",function(event){
    event.preventDefault();
    let retrivedFavorder = JSON.parse(localStorage.getItem('favorder'))
    tPrice = retrivedFavorder.ticketprice
    totalPeople = retrivedFavorder.numberoftickets
    durationPrice = retrivedFavorder.extradurationprice
    totfooodtokens = retrivedFavorder.extraheads
    sumCurrent = retrivedFavorder.currentsum
    durationText = retrivedFavorder.durationinfo
    ticketDes = retrivedFavorder.ticketinfo
    overallHead = retrivedFavorder.totheads

    placeOrderbtn.style.display="block"
    document.getElementById("no-order").style.display="none"

    let table = document.getElementById("myTable");
    let row = table.insertRow(count);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `${count}. You Have Purchased ${totalPeople} <br> (${durationText}) ${ticketDes} tickets(<b>${totfooodtokens} food tokens</b>)`;
    cell2.innerHTML = `${sumCurrent}/=`;

    totalCost = totalCost + sumCurrent
    overallHead = overallHead + totalPeople

    document.getElementById("total-display").innerText="Overall Cost"
    document.getElementById("total-bill").innerText=`${totalCost}`

    // incrementing the order number displayed in front of every order in the overall order table
    count++,

    document.getElementById("add-ord-fav").style.display="block";
    document.getElementById("fav-resp").innerHTML=`Your Favourite order has been added to the overall order`

    localStorage.removeItem('favorder');

})


favOk.addEventListener('click',function(event){
    event.preventDefault();
    document.getElementById("add-ord-fav").style.display="none"
})

// loyalty button which displays the number of loyalty points the user has achieved when clicked
loyalBtn.addEventListener("click",function(event){
    event.preventDefault();
    if (overallHead >= 3){
        loyaltyPoints = overallHead * 20
    }
    else{
        loyaltyPoints = 0
    }

    
    localStorage.setItem("heads",overallHead)
    localStorage.setItem('loyaltypoints',loyaltyPoints)
    localStorage.getItem("heads",overallHead)
    getLoyalPoints = localStorage.getItem('loyaltypoints',loyaltyPoints)

    document.getElementById("add-ord-fav").style.display="block";
    document.getElementById("fav-resp").innerHTML=`<b>${getLoyalPoints} Loyalty points<b><br> has been awarded to you`

})



// Disabling fields according to selected ticket
function disableFields(){
    if (tPrice==15000 || tChoices.value==4500 || tPrice==""){
        durationList.disabled = true
        extraOpt.disabled = true
        extraOpt.value = 0;
        durationPrice = 0;
    }
    else{
        durationList.disabled = false
        extraOpt.disabled = false
    }

}

// Returns the extra price duration cost based on ticket type and order duration

function durationPriceget(){

    durationValue = durationList.options[durationList.selectedIndex].value;
    tPrice = parseInt(tChoices.options[tChoices.selectedIndex].value);
    if(durationValue==12 &&(tPrice==5000 || tPrice==2500)){
        durationPrice = 500;
    }
    else if(durationValue==12 &&(tPrice==1000 || tPrice==500)){
        durationPrice = 250;
    }
    else if(durationValue==24 &&(tPrice==5000 || tPrice==2500)){
        durationPrice = 1000;
    }
    else if(durationValue==24 &&(tPrice==1000 || tPrice==500)){
        durationPrice = 500;
    }
    else if(durationValue==48 &&(tPrice==5000 || tPrice==2500)){
        durationPrice = 2000;
    }
    else if(durationValue==48 &&(tPrice==1000 || tPrice==500)){
        durationPrice = 1000;
    }
    else{
        durationPrice=0;
    }
    return durationPrice;
}

// this function reduces NaN type errors displayed in the current order table
function nullvalidation(){
    if(extraOpt.value==''){
        totfooodtokens=0;
    }
    if (headCount.value==''){
        totalPeople=0
    }
    if(tChoices.options[tChoices.selectedIndex].value ==''){
        tPrice=0
    }

}

// the function to calculate the cuurent order cost
function currentSum(){
    sumCurrent = (durationPrice + tPrice)*totalPeople + totfooodtokens*500

    if(isNaN(sumCurrent)){
    document.getElementById("display-nticket").innerHTML=`-`
    document.getElementById("display-tprice").innerHTML=`-`
    document.getElementById("display-dprice").innerHTML=`-`
    document.getElementById("display-cost").innerHTML = `-`
    document.getElementById("display-eprice").innerHTML=` -`

    }

    else{
    document.getElementById("display-nticket").innerHTML=`${totalPeople}`
    document.getElementById("display-tprice").innerHTML=`LKR ${tPrice}`
    document.getElementById("display-dprice").innerHTML=`LKR ${durationPrice}`
    document.getElementById("display-cost").innerHTML = `LKR ${sumCurrent}`
    document.getElementById("display-eprice").innerHTML=` ${totfooodtokens}`
    return sumCurrent
    }    
}














