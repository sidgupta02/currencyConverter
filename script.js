// Uncommented BASE_URL
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select"); // Select element instead of button
const toCurr = document.querySelector(".to select");     // Select element instead of button
const msg = document.querySelector(".msg"); // Ensure you select the msg element

document.addEventListener("DOMContentLoaded", function() {
    const dropdowns = document.querySelectorAll(".dropdown select");

    for(let select of dropdowns) {
        for(let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if(select.name === "from" && currCode === "USD"){
                newOption.selected = "selected";
            }
            else if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
            }
            select.append(newOption);
        }

        select.addEventListener("change", (e)=>{
            updateFlag(e.target);
        });
    }

    const updateFlag = (element)=>{
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

    btn.addEventListener("click", async (e)=>{
        e.preventDefault();
        let amount = document.querySelector(".amount input");
        let amountVal = amount.value;
        if(amountVal === "" || amountVal < 1){
            amountVal = 1;
            amount.value = 1;
        }

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalAmount = amountVal * rate;
        msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    });

});
