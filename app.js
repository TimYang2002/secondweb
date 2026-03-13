function ipToInt(ip){
    return ip.split('.').reduce((acc,oct)=>(acc<<8)+parseInt(oct),0);
}

function intToIp(int){
    return [
        (int>>>24)&255,
        (int>>>16)&255,
        (int>>>8)&255,
        int&255
    ].join('.');
}

function prefixToMask(prefix){
    return (0xffffffff << (32-prefix)) >>>0;
}

function maskToPrefix(mask){
    let int = ipToInt(mask);
    return int.toString(2).split("1").length-1;
}

function calculate(){

    let ip=document.getElementById("ip").value;
    let maskInput=document.getElementById("mask").value;

    if(!ip)return;

    let ipInt=ipToInt(ip);
    let prefix;

    if(maskInput.includes("/")){
        prefix=parseInt(maskInput.replace("/",""));
    }else{
        prefix=maskToPrefix(maskInput);
    }

    let maskInt=prefixToMask(prefix);

    let network=ipInt & maskInt;
    let broadcast=network | (~maskInt>>>0);

    let first=network+1;
    let last=broadcast-1;

    document.getElementById("subnet").innerText=intToIp(maskInt);
    document.getElementById("network").innerText=intToIp(network);
    document.getElementById("broadcast").innerText=intToIp(broadcast);

    document.getElementById("range").innerText=
        intToIp(network)+" - "+intToIp(broadcast);

    document.getElementById("usable").innerText=
        intToIp(first)+" - "+intToIp(last);
}
