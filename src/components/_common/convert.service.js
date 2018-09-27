export default {
    Dateformat: function(datetime, format) {
        var args = {
            "M+": datetime.getMonth() + 1,
            "d+": datetime.getDate(),
            "h+": datetime.getHours(),
            "m+": datetime.getMinutes(),
            "s+": datetime.getSeconds(),
            "q+": Math.floor((datetime.getMonth() + 3) / 3), //quarter
            "S": datetime.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }

        return format;
    }
}