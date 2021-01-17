var jayui = (function(){var f = {};
/********************************************************************/
//CODES FOR DOM FUNCTIONALITIES
/********************************************************************/
f.dge = function(id) {var a = document.getElementById(id); return a;};
            //dgv = getElementById.value (Get Value);
f.dgv = function(id) {var a = document.getElementById(id);if(a !== null){return a.value;}else{return "";};};
            //dsv = getElementById.value = value (Set Value)
f.dsv = function(id,myvalue) {var a = document.getElementById(id); if(a !== null){return a.value = myvalue;}else{throw new Error("Element is Null");};};
            //dgi = getElementById.innerHTML
f.dgi = function(id,value) {var a = document.getElementById(id).innerHTML = value; return a;};
            //dcl = Clear All Nodes
f.dcl = function(id) {var a = document.getElementById(id); if(a !== null) {while (a.hasChildNodes()){a.removeChild(a.firstChild);};};};
            //ddl = Delete A Node
f.ddl = function(id) {var a = document.getElementById(id); if(a !== null) {a.parentNode.removeChild(a);};};
            //des = DOM Element in Simple Form
f.des = function (type,id,attach) {var a = document.createElement(type); var c = document.getElementById(attach); a.setAttribute("id",id); c.appendChild(a);};
            //dec = DOM Element in Complex Form
f.dec = function (type,id,text,attach) {var a = document.createElement(type); var b = document.createTextNode(text); var c = document.getElementById(attach); a.setAttribute("id",id); a.appendChild(b); c.appendChild(a);};
            //def = DOM Element Complex with Functions
f.def = function (type,id,text,attach,action,func) {var a = document.createElement(type); var b = document.createTextNode(text); var c = document.getElementById(attach); a.setAttribute("id",id); a.setAttribute(action,func); a.appendChild(b); c.appendChild(a);};
            //dcv = DOM Canvas
f.dcv = function(name,attach,width,height) {jayui.us("CANVAS",name,attach);jayui.s(name,"width",width + "px");jayui.s(name,"height",height + "px");};
            //dat = DOM Attribute
f.dat = function (id,type,value) {var a = document.getElementById(id); a.setAttribute(type,value);};
            //dst
f.dst = function (elementid, theproperty, value) {
        var a = document.getElementById(elementid); 
        switch (theproperty) {
             // ADD CSS ELEMENTS HERE
            case "color": a.style.color = value; break;
            case "textAlign": a.style.textAlign = value; break;
            case "textDecoration": a.style.textDecoration = value; break;
            case "position":a.style.position = value;break;
            case "display": a.style.display = value; break;
            case "backgroundColor": a.style.backgroundColor = value; break;
            case "backgroundImage": a.style.backgroundImage = value; break;
            case "size": a.style.size = value; break;
            case "margin": a.style.margin = value; break;
            case "marginTop": a.style.marginTop = value; break;
            case "marginBottom": a.style.marginBottom = value; break;
            case "marginLeft": a.style.marginLeft = value; break;
            case "marginRight": a.style.marginRight = value; break;
            case "padding": a.style.padding = value; break;
            case "paddingTop": a.style.paddingTop = value; break;
            case "paddingBottom": a.style.paddingBottom = value; break;
            case "paddingLeft": a.style.paddingLeft = value; break;
            case "paddingRight": a.style.paddingRight = value; break;
            case "fontStyle": a.style.fontStyle = value;break;
            case "fontWeight": a.style.fontWeight = value;break;
            case "fontFamily": a.style.fontFamily = value; break;
            case "fontSize": a.style.fontSize = value; break;
            case "fontStyle": a.style.fontStyle = value; break;
            case "width": a.style.width = value; break;
            case "height": a.style.height = value; break;
            case "length": a.style.length = value; break;
            case "border": a.style.border = value; break;
            //============================
            default: console.log("property not found");
        }; 
};

/********************************************************************/
//CODES FOR SELECTION
/********************************************************************/
f.create_select = function(select_id,select_location,select_list,select_function,value_type,value_default){
    jayui.des("SELECT",select_id,select_location);
    jayui.dat(select_id,"size","1");
    jayui.dat(select_id,"onchange",select_function);
    var i = 0;
    for (;i < select_list.length;i++) {
        jayui.des("OPTION",select_id+"_option"+i,select_id);
        jayui.dat(select_id+"_option"+i,"class",select_id+"_class");
        jayui.dec("P",select_id+"_option_text"+i,select_list[i],select_id+"_option"+i);
        if(value_type === "value"){
            jayui.dat(select_id+"_option"+i,"value",select_list[i]);
        }else  if(value_type === "index"){
            jayui.dat(select_id+"_option"+i,"value",i);
        };
                
    };
    if(value_type === "index"){
        jayui.dsv(select_id,value_default);
    }else  if(value_type === "value"){
        jayui.dsv(select_id,select_list[value_default]);
    };
    
};
/********************************************************************/
//MAIN AREA
/********************************************************************/
f.main_area = "MAIN_DIV";
/********************************************************************/
//CODES FOR HEALTH/ENERGY BARS
/********************************************************************/
f.create_progress_bar = function(id,attach,w_size,h_size,color){

    jayui.des("DIV",id+"_holder",attach);
    jayui.des("DIV",id+"_bar",id+"_holder");

    jayui.dst(id+"_holder","width",w_size);
    jayui.dst(id+"_bar","width","60%");
    jayui.dst(id+"_holder","height",h_size);
    jayui.dst(id+"_bar","height","100%");
    
    jayui.dst(id+"_holder","border","solid black 1px");
    jayui.dst(id+"_bar","backgroundColor",color);

};

f.update_progress_bar = function(id,current_value,max_value){
    var percentage = current_value / max_value;
    percentage = Math.floor(percentage * 100);
    if(percentage < 0){percentage = 0};
    jayui.dst(id+"_bar","width",percentage+"%");
};

/********************************************************************/
//CODES FOR CHANGE AREA FOR TEXT AREAS
/********************************************************************/
var changeareadata = {
    windowwidth:0, windowheight:0,target:[], width_percent:[],height_percent:[],widthmin:[],heightmin:[],widthmax:[],heightmax:[]
};
var changeareaupdate_timer;
f.changearea = function(target,width_percent,height_percent,widthmin,heightmin,widthmax,heightmax) {
    var n = changeareadata.target.length;
    var contains = false;
    var i = 0;
                
    while (n--) {
        if(changeareadata.target[n] === target) {
            contains = true;
            i = n;
        };
    };
    if(contains === true) {
        changeareadata.width_percent[i] = width_percent;
        changeareadata.height_percent[i] = height_percent;
        changeareadata.widthmin[i] = widthmin;
        changeareadata.heightmin[i] = heightmin;
        changeareadata.widthmax[i] = widthmax;
        changeareadata.heightmax[i] = heightmax;
    }else if(contains === false){
        changeareadata.target.push(target);
        changeareadata.width_percent.push(width_percent);
        changeareadata.height_percent.push(height_percent);
        changeareadata.widthmin.push(widthmin);
        changeareadata.heightmin.push(heightmin);
        changeareadata.widthmax.push(widthmax);
        changeareadata.heightmax.push(heightmax);
        i = changeareadata.target.length - 1;
    };
    clearInterval(changeareaupdate_timer);
    changeareaupdate_timer = setInterval(changeareaupdate,100);
                
};
			
function changeareaupdate() {
    var w = 0;
    var h = 0;
    var getw = window.innerWidth;
    var geth = window.innerHeight;
    if (getw !== changeareadata.windowwidth || geth !== changeareadata.windowheight) {
        changeareadata.windowwidth = getw;
        changeareadata.windowheight = geth;
        var i = 0;
        for (;i < changeareadata.target.length;i++) {
            var target = jayui.dge(changeareadata.target[i]);
            if (target !== null) {
                    w = getw * changeareadata.width_percent[i];
                    h = geth * changeareadata.height_percent[i];
                   
                    
                    if(w < changeareadata.widthmin[i]){
                        w = changeareadata.widthmin[i];
                    };
                    
                    if(h < changeareadata.heightmin[i]){
                        h = changeareadata.heightmin[i];
                    };
                    
                    if(w > changeareadata.widthmax[i]){
                        w = changeareadata.widthmax[i];
                    };
                    
                    if(h > changeareadata.heightmax[i]){
                        h = changeareadata.heightmax[i];
                    };
                    
                    jayui.dst(changeareadata.target[i],"width",w + "px");
                    jayui.dst(changeareadata.target[i],"height",h + "px");
            };
                          
        };
    };
}; 

return f;}());