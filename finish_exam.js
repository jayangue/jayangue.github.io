var finish_exam = (function(){var f = {};


    f.initialize = function(){

        jayui.dcl(jayui.main_area);

        var LocalStorage = window.localStorage;
        var LOCAL_STORAGE_DATA = LocalStorage.getItem("g9_exam");
        var LOCAL_STORAGE_DATA_PARSED = JSON.parse(LOCAL_STORAGE_DATA);

        var option_data = LOCAL_STORAGE_DATA_PARSED[4][1];
        var score = 0;

        for(var i = 1; i <= option_data.length;i++){

            if(option_data[i] === main_page.answers[i]){
                score++;
            };

        };

        var firstname = LOCAL_STORAGE_DATA_PARSED[0][1];
        var lastname = LOCAL_STORAGE_DATA_PARSED[1][1];

        var code  = [];
        code[0] = firstname[0];
        code[1] = firstname[1];
        code[2] = firstname[2];
        code[3] = lastname[0];
        code[4] = lastname[1];
        code[5] = lastname[2];
        
        if(score <= 9){
            code[6] = "0";
            code[7] = score.toString();
        }else if(score >= 10){
            var numstring = score.toString();
            code[6] = numstring[0];
            code[7] = numstring[1];
        };
        
       
        for(var i2 = 0; i2 <= code.length -1;i2++){
            try{
                code[i2] = code[i2].toLowerCase();
            }catch(e){
                code[i2] = "-";
            };
        };
        
        var alphabet = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m",
                        "q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m",
                        "q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];

        var hash_code = [];
        for(var i3 = 0; i3 <= code.length - 3;i3++){
            var code_index = alphabet.indexOf(code[i3]);
            var code_hash = code_index + i3 + 2;
            hash_code[i3] = alphabet[code_hash];
        };
        var code1index = alphabet.indexOf(code[0]);
        code1hash = code1index + 2;
        console.log(alphabet[code1hash]);



        //Create Div
        jayui.des("DIV","main_div",jayui.main_area);

        jayui.dec("P","main_div_title","Send the code below to Sir Jay C. Angue at Facebook.","main_div");
        jayui.dec("P","main_div_code",jayfunc.combine_text(code),"main_div");

        //FINISH
        jayui.def("BUTTON","main_div_finish","BACK TO EXAM","main_div","onclick","main_page.initialize();");

    
    };


return f;}());
