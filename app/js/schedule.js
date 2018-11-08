'use strict';
(function ($) {
    $.fn.schedule = function(options){
        
        var d = new Date();
        var current_year = d.getFullYear();
        var current_month = d.getMonth();
        var current_time = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "";
        
        function february(year){
            var days;
            if(year % 4 === 0){
                days = 29;
            } else {
                days = 28;
            }
            return days;
        }
        var f = february(current_year);
        
        var sat = new Array();
        var sun = new Array();
        
        var months = {
            0: {name: "Январь", short: "01", days: 31},
            1: {name: "Февраль", short: "02", days: f},
            2: {name: "Март", short: "03", days: 31},
            3: {name: "Апрель", short: "04", days: 30},
            4: {name: "Май", short: "05", days: 31},
            5: {name: "Июнь", short: "06", days: 30},
            6: {name: "Июль", short: "07", days: 31},
            7: {name: "Август", short: "08", days: 31},
            8: {name: "Сентябрь", short: "09", days: 30},
            9: {name: "Октябрь", short: "10", days: 31},
            10: {name: "Ноябрь", short: "11", days: 30},
            11: {name: "Декабрь", short: "12", days: 31},
        };
        
        for(var i=1; i<=months[current_month]['days']; i++){
            var newDate = new Date(d.getFullYear(),d.getMonth(),i)
            if(newDate.getDay()==0){
                sat.push(i);
            }
            if(newDate.getDay()==6){
                sun.push(i);
            }

        }

        var settings = $.extend({
            month: months[current_month]['name'],
            days: months[current_month]['days'],
            names: ["John Doe", "Wilson", "Mr. Proper"],
            holidays: [],
            data: [],
            modal: "myModal"
        }, options);
        
        /*function fillModal(){
            for(var i = 0; i < settings.data.length; i++){
                
            }
        }*/
        
        var output = function(){
 
            var thead = "<tr><th>"+settings.month+"</th>", tbody, cells, cell_amount, cell_block, isLate, dayFor, content, title, enter, out, enterCheck, outCheck, styleOfEye, enterModal, outModal;
            
            var dataParse = {
                getLate: function(surname, day){
                    var log;
                    for(var key = 0; key < settings.data.length; key++){
                        if(settings.data[key].username === surname && settings.data[key].day === day){
                            log = settings.data[key].late;
                        }
                    }
                    return log;
                },
//                logtype: function(surname, day, log){
//                    var log;
//                     for(var key = 0; key < settings.data.length; key++){
//                        if(settings.data[key].username === surname && settings.data[key].day === day && settings.data[key].log_type == log){
//                            log = settings.data[key].log_type;
//                        }
//                    }
//                    return log;
//                },
                getEnter: function(surname, day){
                    var log; 
                    for(var key = 0; key < settings.data.length; key++){
                        if(settings.data[key].username === surname && settings.data[key].day === day && settings.data[key].time < "12:00:00"){
                            log = settings.data[key].time;
                            break;
                        }
                    }
                    return log;
                },
                getOut: function(surname, day){
                    var log; 
                    for(var key = 0; key < settings.data.length; key++){
                        if(settings.data[key].username === surname && settings.data[key].day === day && settings.data[key].time > "15:00:00"){
                            log = settings.data[key].time;
                            break;
                        }
                    }
                    return log;
                }
            };
            
            for (var i=1; i<=settings.days; i++){
                if(sat.indexOf(i) != -1 || sun.indexOf(i) != -1){
                    thead+="<th style='background:#E494BB'>"+i+"</th>";
                } else {
                    thead+="<th>"+i+"</th>";
                }
                cells+= "<td></td>";
                cell_amount = i;
            }
            thead+="</tr>";
            //console.log('parse', dataParse.getLate('Пукин В.В.', "04"));
            for(var n = 0; n<settings.names.length; n++){
                for(var c = 1; c <=cell_amount; c++){
                    dayFor = ""+c+"";
                    
                    enterCheck = dataParse.getEnter(settings.names[n], dayFor);
                    outCheck = dataParse.getOut(settings.names[n], dayFor);
                   
                    
                    if(enterCheck == undefined){
                        enterModal = 'Не задано';
                        enter = "<p>Приход не задан</p>";
                    } else {
                        enterModal = enterCheck;
                        enter = "<p>Приход в "+enterModal+"</p>";
                    }
                    
                    if(outCheck == undefined){
                        styleOfEye = "success";
                        out = "";
                        outModal = 'Не задано';
                    } else {
                        styleOfEye = "getOut";
                        out = "<p>Уход в "+outCheck+"</p>";
                        outModal = outCheck;
                    }
                    
                    title = enter+out;
                    isLate = dataParse.getLate(settings.names[n], dayFor);
                    
                    if(isLate == 1){
                        
                        cell_block+='<td class="danger name-data"><span data-toggle="modal" data-target="#'+settings.modal+'"><a href="#" data-toggle="tooltip" data-html="true" class="info" data-placement="right" title="'+title+'" data-info="'+enterModal+', '+outModal+', '+dayFor+', '+months[current_month].short+', '+current_year+'"><i class="fa fa-user-times"></i></a></span></td>';
                        
                    } else if (isLate == undefined){
                        cell_block+='<td></td>';
                        
                    } else {
                        
                        cell_block+='<td class="'+styleOfEye+' name-data"><span data-toggle="modal" data-target="#'+settings.modal+'" data-info="'+enterModal+', '+outModal+', '+dayFor+', '+months[current_month].short+', '+current_year+'"><a href="#" data-toggle="tooltip" data-html="true" class="info" data-placement="right" title="'+title+'"><i class="fa fa-user-o"></i></a></span></td>';
                    }
                    
                }
                tbody+="<tr><td>"+settings.names[n]+"</td>"+cell_block+"</tr>";
                cell_block = "";
            }
            
            content = "<tbody>"+thead+tbody+"</tbody>";
            
            return content;
        }
        
        return this.html(output);
    };
}(jQuery));