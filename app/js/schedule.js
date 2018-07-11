(function ($) {
    $.fn.schedule = function(options){
        
        var d = new Date();
        var current_year = d.getFullYear();
        var current_month = d.getMonth();
        
        var february = function(year){
            var days;
            if(year % 4 === 0){
                days = 29;
            } else {
                days = 28;
            }
            return days;
        }
        var f = february(current_year);
        
        var months = {
            0: {name: "Январь", days: 31},
            1: {name: "Февраль", days: f},
            2: {name: "Март", days: 31},
            3: {name: "Апрель", days: 30},
            4: {name: "Май", days: 31},
            5: {name: "Июнь", days: 30},
            6: {name: "Июль", days: 31},
            7: {name: "Август", days: 31},
            8: {name: "Сентябрь", days: 30},
            9: {name: "Октябрь", days: 31},
            10: {name: "Ноябрь", days: 30},
            11: {name: "Декабрь", days: 31},
        };
        
        var settings = $.extend({
            month: months[current_month]['name'],
            days: months[current_month]['days'],
            names: ["Kekan", "Pukan", "Syogun"],
            holidays: [1,2,3,7]
        }, options);
        
        var output = function(){
            var thead = "<tr><th>"+settings.month+"</th>", tbody, rows, holiday, content, day;
            for (var i=1; i<settings.days; i++){
                if($.inArray(i, settings.holidays) !== -1){
                    holiday = i;
                    thead+='<th class="info">'+holiday+'</th>';
                } else {
                    day = i+1;
                    thead+="<th>"+day+"</th>";
                }
                rows+='<td><a href="#" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-play"></span></td>';
            }
            thead+="</tr>";
            for (var name=0; name<settings.names.length; name++){
                tbody+="<tr><td>"+settings.names[name]+"</td>"+rows+"</tr>";
            }
            content = "<tbody>"+thead+tbody+"</tbody>";
            return content;
        }
        
        return this.html(output());
    };
}(jQuery));