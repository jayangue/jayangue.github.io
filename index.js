
 

var main_page = (function(){var f = {};

    f.current_page = 1;
    f.option_data = [];
    f.data_firstname = "";
    f.data_lastname = "";
    f.data_section = "";

    f.answers = ["",
                "a", "d"," c", "d", "c",
                "b" , "a", "d", "a", "a",
                "c", "b", "b", "c"," a",
                "b", "d"," c", "c", "a",
                "d", "c", "a", "c", "c",
                "c", "a", "a"," b", "c",
                "a", "d", "b", "a", "b",
                "a", "b", "b", "d", "d", 
                "a", "c", "a", "d", "d", 
                "d", "b"," d", "c", "d" ];



    f.initialize = function(){


        var LocalStorage = window.localStorage;
        var LOCAL_STORAGE_DATA = LocalStorage.getItem("g9_exam");
        var LOCAL_STORAGE_DATA_PARSED = JSON.parse(LOCAL_STORAGE_DATA);

        if(LOCAL_STORAGE_DATA_PARSED != null){
            main_page.data_firstname = LOCAL_STORAGE_DATA_PARSED[0][1];
            main_page.data_lastname = LOCAL_STORAGE_DATA_PARSED[1][1];
            main_page.data_section = LOCAL_STORAGE_DATA_PARSED[2][1];
            main_page.current_page = LOCAL_STORAGE_DATA_PARSED[3][1];
            main_page.option_data = LOCAL_STORAGE_DATA_PARSED[4][1];
        }else {
            for(var c = 1; c <= 50; c++){
                main_page.option_data[c]="";
            };
        };
        
        jayui.dcl(jayui.main_area);
        
        //Create DIVS
        jayui.des("DIV","main_div_1",jayui.main_area);
        jayui.des("DIV","main_div_2",jayui.main_area);
        jayui.des("DIV","main_div_3",jayui.main_area);
        jayui.des("DIV","main_div_4",jayui.main_area);
        jayui.des("DIV","main_div_5",jayui.main_area);
        jayui.des("DIV","main_div_6",jayui.main_area);

        //Title
        jayui.dec("P","main_div_title","FILIPINO GRADE 9 EXAM","main_div_1");

        //Personal Info
        jayui.dec("TXT","personal_info_firstname","FIRST NAME: ","main_div_2");
        jayui.dat("personal_info_firstname","class","personalinfos");
        jayui.des("INPUT","personal_info_firstname_input","main_div_2");
        jayui.dsv("personal_info_firstname_input",main_page.data_firstname);
        
        jayui.dec("TXT","personal_info_lastname","LAST NAME: ","main_div_2");
        jayui.dat("personal_info_lastname","class","personalinfos");
        jayui.des("INPUT","personal_info_lastname_input","main_div_2");
        jayui.dsv("personal_info_lastname_input",main_page.data_lastname);
        
        jayui.dec("TXT","personal_info_section","SECTION: ","main_div_2");
        jayui.dat("personal_info_section","class","personalinfos");
        jayui.des("INPUT","personal_info_section_input","main_div_2");
        jayui.dsv("personal_info_section_input",main_page.data_section);



        //Picture
        jayui.def("IMG","main_div_image","","main_div_3","onclick","");
        jayui.dat("main_div_image","src","Pictures/g9_exam_1.png");
        (function(){ 
            function update_image_size(){
                requestAnimationFrame(update_image_size);
                var w = parseInt(window.innerWidth);
                var h = parseInt(window.innerHeight);
                if(w >= 600){
                    h = h * 0.50;
                }else{
                    h = h * 0.80;
                };
                jayui.dst("main_div_image","width",parseInt(window.innerWidth).toString().concat("px"));
                jayui.dst("main_div_image","height",h.toString().concat("px"));
            };
            update_image_size();
        }());

        //Options Divs
        main_run();

        //PREV NEXT
        jayui.def("BUTTON","main_div_next","PREV","main_div_5","onclick","main_page.prev_page();");
        jayui.def("BUTTON","main_div_prev","NEXT","main_div_5","onclick","main_page.next_page();");

        //FINISH
        jayui.def("BUTTON","main_div_finish","FINISH EXAM","main_div_6","onclick","finish_exam.initialize();");

        function save_data(){

            try{
                jayui.dgi("personal_info_firstname_input");
                main_page.data_firstname = jayui.dgv("personal_info_firstname_input");
                main_page.data_lastname = jayui.dgv("personal_info_lastname_input");
                main_page.data_section = jayui.dgv("personal_info_section_input");

                var main_data = [
                                    ["first_name",main_page.data_firstname],
                                    ["last_name",main_page.data_lastname],
                                    ["data_section",main_page.data_section],
                                    ["current_page",main_page.current_page],
                                    ["option_data",main_page.option_data]
                                ];
                var main_data_stored = JSON.stringify(main_data);
                LocalStorage.setItem("g9_exam",main_data_stored);
               //console.log(main_data_stored);
            }catch(e){
               
            };
            
        };

        var main_page_checker = setInterval(function(){
            
            //This part is for checking
            try{
                jayui.dgi("personal_info_firstname_input");
                save_data();
            }catch(e){
                clearInterval(main_page_checker);
            };

        },100);
    
    };

    f.next_page = function(){

	    if(main_page.current_page < 25){
		    main_page.current_page++;
		    main_run();
	    }else if(main_page.current_page >= 25){
		    main_page.current_page = 1;
		    main_run();
	    };
	
	
    };

    f.prev_page = function(){
	
	 if(main_page.current_page >= 2){
		 main_page.current_page--;
		 main_run();
	 }else if(main_page.current_page <=  1){
		 main_page.current_page = 25;
		 main_run();
	 }
    };

    
    function main_run(){
    	jayui.dat("main_div_image","src","PICTURES/g9_exam_"+main_page.current_page+".png");
	    
	    var num_set = main_page.current_page * 2;
	    var start_num = num_set - 1;
	    var end_num = num_set;
        jayui.dcl("main_div_4");
        
        //Options Divs
        for(var n = 0; n <= 5; n++){
            jayui.des("DIV","main_div_optionset_"+n,"main_div_4");
            jayui.dat("main_div_optionset_"+n,"class","optionset_divs");
        };
    
        var option_title = ["","A.) ","B.) ","C.) ","D.) "];
        var option_values = ["","a","b","c","d"];

        for(var i1 = start_num; i1 <= end_num; i1++){
            jayui.des("DIV","main_div_optionset_"+i1,"main_div_4");
            jayui.dat("main_div_optionset_"+i1,"class","optionsets");
            jayui.dec("TXT","option_number_set_"+i1,i1+".) ","main_div_optionset_"+i1);
            jayui.dat("option_number_set_"+i1,"class","option_number_sets");
               

            for(var i2 = 1; i2 <= 4; i2++){
                jayui.dec("TXT","main_div_answertitle_"+i1+"_option_"+i2,option_title[i2],"main_div_optionset_"+i1);
                jayui.dat("main_div_answertitle_"+i1+"_option_"+i2,"class","answertitles");
                jayui.def("INPUT","main_div_answer_"+i1+"_option_"+i2,"","main_div_optionset_"+i1,"onclick","main_page.main_option_clicked("+i1+","+i2+");");
                jayui.dat("main_div_answer_"+i1+"_option_"+i2,"type","radio");
                jayui.dat("main_div_answer_"+i1+"_option_"+i2,"name","option_answer_number_set_"+i1);
                jayui.dat("main_div_answer_"+i1+"_option_"+i2,"value","a");
            };

            var target_value = main_page.option_data[i1];
            var option_index = option_values.indexOf(target_value);

            if(option_index != 0){
                jayui.dat("main_div_answer_"+i1+"_option_"+option_index,"checked");
            };

        };

    };

    f.main_option_clicked = function(num,option){
        var option_values = ["","a","b","c","d"];
        main_page.option_data[num] = option_values[option];
    }

return f;}());
