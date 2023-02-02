const backblazeChart = document.getElementById("backblazeChart");
const bunnyChart = document.getElementById("bunnyChart");
const scalewayChart = document.getElementById("scalewayChart");
const vultrChart = document.getElementById("vultrChart");

const backblazeCost = document.getElementById("backblazeCost");
const bunnyCost = document.getElementById("bunnyCost");
const scalewayCost = document.getElementById("scalewayCost");
const vultrCost = document.getElementById("vultrCost");

const maxCost = 74;
let currentStorageValue = 0, currentTransferValue = 0; 

//-------------bunnyForm-------------
const bunnyForm = document.getElementById("bunnyForm");

let bunnyMode = 'hdd';

bunnyForm.addEventListener('click', (e)=>{
   bunnyMode = e.target.value;
   storageUpdate(currentStorageValue);
   transferUpdate(currentTransferValue);
});
//-------------bunnyForm END-------------

//-------------scalewayForm-------------
const scalewayForm = document.getElementById("scalewayForm");

let scalewayMode = 'multy';

scalewayForm.addEventListener('click', (e)=>{
    scalewayMode = e.target.value;
    storageUpdate(currentStorageValue);
    transferUpdate(currentTransferValue);
});
//-------------scalewayForm END------------

class BackblazeProt{
    storageCost = 0;
    transferCost = 0; 

    setStorageCost(value) {
        this.storageCost = (value * 0.005);
    }

    setTransferCost(value) {
        this.transferCost = (value * 0.01)
    }
    getCost(){
        if(this.storageCost + this.transferCost <=7 && this.storageCost + this.transferCost != 0) return 7 + '.00';
        else return (this.storageCost + this.transferCost).toFixed(2);
        
    }
    getChartWidth(){
        return 1+(this.getCost() * 100)/maxCost;
    }
}

class BunnyProt{
    storageCost = 0;
    transferCost = 0; 

    setStorageCost(value) {
        if(bunnyMode === 'hdd'){
            this.storageCost = (value * 0.01);
        }else{
            this.storageCost = (value * 0.02);
        }
        
    }
    setTransferCost(value) {
        this.transferCost = (value * 0.01);
    }
    getCost(){
        if(this.storageCost + this.transferCost >=10) return 10 + '.00';
            else return (this.storageCost + this.transferCost).toFixed(2);
    }
    getChartWidth(){
        return 1+(this.getCost() * 100)/maxCost;
    }
}

class ScalewayProt{
    storageCost = 0;
    transferCost = 0; 

    setStorageCost(value) {
        if(scalewayMode === 'multy'){
            if(value <= 75) this.storageCost = 0;
                else this.storageCost = (value * 0.06);
        }else{
            if(value <= 75) this.storageCost = 0;
                else this.storageCost = (value * 0.03);
        }
        
    }
    setTransferCost(value) {
        if(value <= 75) this.transferCost = 0;
                else this.transferCost = (value * 0.02);
    }
    getCost(){
        return (this.storageCost + this.transferCost).toFixed(2);
    }
    getChartWidth(){
        return 1+(this.getCost() * 100)/maxCost;
    }
}

class VultrProt{
    storageCost = 0;
    transferCost = 0; 

    setStorageCost(value) {
        this.storageCost = (value * 0.01);
    }

    setTransferCost(value) {
        this.transferCost = (value * 0.01)
    }

    getCost(){
        if(this.storageCost + this.transferCost <=5 && this.storageCost + this.transferCost != 0) return 5 + '.00';
            else return (this.storageCost + this.transferCost).toFixed(2);
        
    }

    getChartWidth(){
        return 1+(this.getCost() * 100)/maxCost;
    }
}

const Backblaze = new BackblazeProt;
const Bunny = new BunnyProt;
const Scaleway = new ScalewayProt;
const Vultr = new VultrProt;


function storageUpdate(value){
    currentStorageValue = value;
    const storageValue = document.getElementById("storageValue");
    storageValue.innerText = value + 'GB';

    //--------------Backblaze-----------
    Backblaze.setStorageCost(Number(value));
    backblazeChart.style.width = Backblaze.getChartWidth() + '%';
    backblazeCost.innerText = Backblaze.getCost() +'$';
    //--------------Backblaze END-----------

    //--------------Bunny-----------
    Bunny.setStorageCost(Number(value));
    bunnyChart.style.width = Bunny.getChartWidth() + '%';
    bunnyCost.innerText = Bunny.getCost() + '$';
    //--------------Bunny END-----------

    //--------------Scaleway-----------
    Scaleway.setStorageCost(Number(value));
    scalewayChart.style.width = Scaleway.getChartWidth() + '%';
    scalewayCost.innerText = Scaleway.getCost() + '$';
    //--------------Scaleway END-----------

    //--------------Vultr---------------
    Vultr.setStorageCost(Number(value));
    vultrChart.style.width = Vultr.getChartWidth() + '%';
    vultrCost.innerText = Vultr.getCost() + '$';
    //--------------Vultr END---------------

    getLowestPrice();
}

function transferUpdate(value){
    currentTransferValue = value;
    const storageValue = document.getElementById("transferValue");
    storageValue.innerText = value + 'GB';
    //--------------Backblaze-----------
    Backblaze.setTransferCost(Number(value));
    backblazeChart.style.width = Backblaze.getChartWidth() + '%';
    backblazeCost.innerText = Backblaze.getCost() +'$';
    //--------------Backblaze END-----------

    //--------------Bunny-----------
    Bunny.setTransferCost(Number(value));
    bunnyChart.style.width = Bunny.getChartWidth() + '%';
    bunnyCost.innerText = Bunny.getCost() + '$';
    
    //--------------Bunny END-----------

    //--------------Scaleway-----------
    Scaleway.setTransferCost(Number(value));
    scalewayChart.style.width = Scaleway.getChartWidth() + '%';
    scalewayCost.innerText = Scaleway.getCost() + '$';
    //--------------Scaleway END-----------

    //--------------Vultr---------------
    Vultr.setTransferCost(Number(value));
    vultrChart.style.width = Vultr.getChartWidth() + '%';
    vultrCost.innerText = Vultr.getCost() + '$';
    //--------------Vultr END---------------

    getLowestPrice()
}

function getLowestPrice(){
    let backblazePrice = Backblaze.getCost(),
    bunnyPrice = Bunny.getCost(),
    scalewayPrice = Scaleway.getCost(),
    vultrPrice = Vultr.getCost();

    backblazeChart.style.background = '#999'
    bunnyChart.style.background = '#999'
    scalewayChart.style.background = '#999'
    vultrChart.style.background = '#999'

    let cheapest = Math.min(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice);

    if(currentStorageValue != 0 || currentTransferValue != 0){
        
        switch(cheapest){
            case Number(backblazePrice): 
                backblazeChart.style.background = 'linear-gradient(90deg, rgba(226,6,38,1) 0%, rgba(135,6,27,1) 100%)';
                break;
            case Number(bunnyPrice): 
                bunnyChart.style.background = 'linear-gradient(85.19deg,#ff2a64 -133.27%,#ffaf48 105.93%)';
                break;
            case Number(scalewayPrice):
                scalewayChart.style.background = 'rgb(79, 5, 153)';
                break;
            case Number(vultrPrice):
                vultrChart.style.background = 'linear-gradient(90deg,#021048,#1e38a3)';
                break;
        }
    }
    
}

//sliderStorage.addEventListener('input', valueUpdate(sliderStorage.value))

//linear-gradient(90deg, rgba(226,6,38,1) 0%, rgba(135,6,27,1) 100%)
//linear-gradient(85.19deg,#ff2a64 -133.27%,#ffaf48 105.93%)
//rgb(79, 5, 153)
//linear-gradient(90deg,#021048,#1e38a3);