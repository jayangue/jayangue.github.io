var finish_exam = (function(){var f = {};


    f.initialize = function(){

        jayui.dcl(jayui.main_area);

        //Create Div
        jayui.des("DIV","main_div",jayui.main_area);
        jayui.dec("P","main_div_title","Your score was not recorded. Please report this problem to Jay C. Angue through Facebook.","main_div");
        

        //FINISH
        jayui.def("BUTTON","main_div_finish","BACK TO EXAM","main_div","onclick","main_page.initialize();");



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
        var section = LOCAL_STORAGE_DATA_PARSED[2][1];
        var main_score = score;

        axios.post('https://sheetdb.io/api/v1/gijdt883lbdsg',{
            "data": {"firstname": firstname, "lastname": lastname,"section":section,"score":main_score}
        }).then( response => {
            jayui.dgi("main_div_title","Thank you for taking the exam. Your score was succesfully recorded.");
        });

    
    };


return f;}());
