//loadshedding.js
var routine = new Array();
var currentFormat = "b";        //default =>24 hr
var currentGroup = "";



var sint;       //for the setInterval method
var td = new Date();
var status;     //to find the correct time of loadshedding
var previousSelected = 0;
var newSelected = 0;
var previousGroupSelect = 0;
var newGroupSelect = "";
var timeFormat = ["a","b"];
var newRoutine = new Array();

/*Sample Routine*/
routine.push("04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM"); //Group 1
routine.push("05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM"); //group2
routine.push("05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM"); //group3
routine.push("06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM"); //group4
routine.push("09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM"); //group 5
routine.push("10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM", "11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM"); //group 6
routine.push("11:00 AM - 16:00 PM", "19:30 PM - 24:00 PM", "10:00 AM - 15:00 PM", "19:00 PM - 23:00 PM", "09:00 AM - 14:00 PM", "18:00 PM - 22:00 PM", "06:00 AM - 13:00 PM", "16:00 PM - 21:00 PM", "05:00 AM - 11:00 AM", "15:00 PM - 19:30 PM", "05:00 AM - 10:00 AM", "14:00 PM - 19:00 PM", "04:00 AM - 09:00 AM", "13:00 PM - 18:00 PM"); //group 7



function initialize() {
    $(".circle").css("border","3px solid #ffca67");

    if (typeof (Storage) === "undefined") //if not compatible
    {
        alert("This app is not compatible with your phone");
        window.close();
    } else {

        if (typeof (window.localStorage.gId) == "undefined") { //for first time
                   
            window.localStorage.setItem("gId",4);
            window.localStorage.setItem("uNo",0);
            window.localStorage.setItem("format",currentFormat);
            setRoutine(routine);
            display(4);

            $(".msgBgd").show();
            $("#msg1").text("Your Loadshedding Schedule is ready! Now please select your group");

            
        } else {
            var myId = window.localStorage.getItem("gId");
            var tc = td.getDay();
            var selectDay = "d" + tc;
            currentGroup = "g" + myId;
            document.getElementById(currentGroup).style.border="3px solid #fd5427";
            document.getElementById(selectDay).style.background = "#f2f2f2";
            display(myId);
            //alert($(".rightDiv").css("height"));



        }
    }
}



function setGroup() {
    //group is set as 1,2,3,4...
    currentGroup = (newSelected==0)?window.localStorage.getItem("gId"):newSelected;

    

    window.localStorage.setItem("gId",currentGroup);

    $(".msgBgd").show();
    $("#msg1").text("Your Group is updated! Your New group is " + currentGroup);

    initialize();
}


function setFormat()
{
    window.localStorage.setItem("format",currentFormat);
    var tmf = (currentFormat == "a")?"12-Hour":"24-Hour";
    $(".msgBgd").show();
    $("#msg1").text("You have selected " + tmf + " time format!");

    initialize();

}





function display(id) {

    currentFormat = window.localStorage.getItem("format");
    var result1 = new Array();

    id="g"+id;
    var result = new Array();
    result = window.localStorage.getItem(id);
    result = result.split(";");

    var result1=changeTimeFormat(currentFormat,result);

    document.getElementById("r1").innerHTML = result1[0];
    document.getElementById("r2").innerHTML = result1[1];
    document.getElementById("r3").innerHTML = result1[2];
    document.getElementById("r4").innerHTML = result1[3];
    document.getElementById("r5").innerHTML = result1[4];
    document.getElementById("r6").innerHTML = result1[5];
    document.getElementById("r7").innerHTML = result1[6];
    document.getElementById("r8").innerHTML = result1[7];
    document.getElementById("r9").innerHTML = result1[8];
    document.getElementById("r10").innerHTML = result1[9];
    document.getElementById("r11").innerHTML = result1[10];
    document.getElementById("r12").innerHTML = result1[11];
    document.getElementById("r13").innerHTML = result1[12];
    document.getElementById("r14").innerHTML = result1[13];

    clearInterval(sint);
    var ttt = prepareTime(result);
    remainingTime(ttt);

}

function changeTimeFormat(t,rr)
{
               
    if(t=="b")
    {

        return rr;

    }
    else
    {
        newRoutine.length=0;
        for(var i=0;i<14;i++)
        {
            //brings the hour part
            var part1 = parseInt(rr[i].substr(0,2)); 
            var part2 = parseInt(rr[i].substr(11,2));

            //process if the number is greater than 12
            var newPart1=(part1>12)?part1-12:part1;
            var newPart2=(part2>12)?part2-12:part2;

            //add the padding 0 and changing into string
            newPart1=addZero(newPart1);
            newPart2=addZero(newPart2);
            part1=addZero(part1);
            part2=addZero(part2);

            //now replacing time format in the previous routine
            rr[i]=rr[i].replace(part1,newPart1);
            rr[i]=rr[i].replace(part2,newPart2);

            

            //then storing the final routine in new array
            newRoutine.push(rr[i]);

            //console.log(newRoutine);
        }

    }
    return newRoutine;
}



function prepareTime(result) {
    var dd = td.getDay();

    if (dd == "0") {
        var tt = cleanTime(0, 1, 2, result);
        return tt;
    }
    if (dd == "1") {
        tt = cleanTime(2, 3, 4, result);
        return tt;
    }
    if (dd == "2") {
        tt = cleanTime(4, 5, 6, result);
        return tt;
    }
    if (dd == "3") {
        tt = cleanTime(6, 7, 8, result);
        return tt;
    }
    if (dd == "4") {
        tt = cleanTime(8, 9, 10, result);
        return tt;
    }
    if (dd == "5") {
        tt = cleanTime(10, 11, 12, result);
        return tt;
    }
    if (dd == "6") {
        tt = cleanTime(12, 13, 0, result);
        return tt;
    }

}

function cleanTime(i, j, k, data) {
    var stime1 = data[i].substr(0, 5);
    var etime1 = data[i].substr(11, 5);
    var stime2 = data[j].substr(0, 5);
    var etime2 = data[j].substr(11, 5);
    var stime3 = data[k].substr(0, 5);
    stime1 = stime1.concat(":00");
    etime1 = etime1.concat(":00");
    stime2 = stime2.concat(":00");
    etime2 = etime2.concat(":00");
    stime3 = stime3.concat(":00");
    var rData = new Array();
    rData.push(stime1, etime1, stime2, etime2, stime3);
    //03:00:00,09:00:00,12:00:00,18:00:00,10:00:00
    return rData;
}

function remainingTime(nData) {
    var d = new Date();
    var s_hrs = d.getHours();
    var s_min = d.getMinutes();
    var s_sec = d.getSeconds();

    var s_time = s_hrs + ":" + s_min + ":" + s_sec;

    var i = 0;

    var e_time = nData[i];
    //finding out the required time for calculation
    while ((Date.parse('01/01/2011 ' + s_time) >= Date.parse('01/01/2011 ' + e_time)) && i < 4) {
        i++;
        e_time = nData[i];
    }

    if (i == 4) {
        e_time = nData[4];
    }

	status=i;
	
	if(status==0||status==2||status==4)
	{
	document.getElementById("rtImage").style.background="url('light-on-gray.png')";
	}
	else
	{
	document.getElementById("rtImage").style.background="url('light-off-gray.png')";
	}
	
	
	var eh = e_time.substr(0, 2);
    var em = e_time.substr(3, 2);
    eh = parseInt(eh);
    em = parseInt(em);

	sint = setInterval(function () {
        display_rmtime(eh,em)}, 500);
	
	
}


function display_rmtime(eh,em)
{
//this function continuously displays the remaining time
var d = new Date();
    var s_hrs = d.getHours();
    var s_min = d.getMinutes();
    var s_sec = d.getSeconds();

    //Conversion
    var hd = 0;
    var md = 0;
    var sd = 0;

    if ((eh > s_hrs)) 
    {
        hd = eh - s_hrs;
        md = em - s_min;
        sd = 60 - s_sec;
        if (md < 0) {
            md = md + 60;
            hd = hd - 1;
            
        }
    } 
    else if (eh < s_hrs) 
    {
        hd = eh - s_hrs;
        md = em - s_min;
        hd = hd + 24;
        sd = 60 - s_sec;
        if (md < 0) {
            md = md + 60;
            hd = hd - 1;
            
        }
    } 
    else if (eh == s_hrs && em == s_min) 
    {
        hd = 0;
        md = 0;
        sd = 60 - s_sec;
        if(sd == 0)
        {
        initialize();
        }
    
    } 
    else if (eh == s_hrs ) 
    {
        if(em<s_min)
        {
        initialize();
        }

        if (em >= s_min) {
            md = em - s_min;
            hd = 0;
            sd = 60 - s_sec;
        }

        

    } 
    else return;

    document.getElementById("hh").innerHTML = addZero(hd);
    document.getElementById("mm").innerHTML = addZero(md);
    document.getElementById("ss").innerHTML = addZero(sd);

    
}

function addZero(inp)
    {
        var ret = new String("00" + inp).slice(-2);
        return ret;
     
    }





function setRoutine(routine) {              //rRoutine=Received updated Routine

    var itemId = new Array("g1", "g2", "g3", "g4", "g5", "g6", "g7");
    try {
        var input = new Array();
        var count = 0;
        for (var i = 0; i < 7; i++) { //group is changed
            for (var j = 0; j < 14; j++) { //counting to add 14 [0-13]numbers
                input.push(routine[count]);
                count++;
            }
            window.localStorage.setItem(itemId[i], input.join(";"));
            input.length = 0;
        }
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert("quota exceeded");
        }
    }
}






function update() {
    $(".msgBgd").show();
    $("#msg1").text("Updating...");
    
    var url = 'https://dl.dropboxusercontent.com/s/qohju6dt8caustn/routine.json';
    $.ajax({
        url: url,
        type: 'GET',
        jsonpCallback: 'apple',
        contentType: "application/json",
        dataType: 'jsonp',

        success: function (data) {
            var nRt = new Array(); //container for new routine
            var cno = window.localStorage.getItem("uNo"); //retrieving current update no
            var nno = data.updateNo;
            cno = parseInt(cno, 10);

            if (cno !== nno) //if the update number are different
            {
                window.localStorage.setItem("uNo", nno);
                for (var i = 0; i < 7; i++) {
                    nRt.push(data.routine[i].s1, data.routine[i].s2, data.routine[i].m1, data.routine[i].m2, data.routine[i].t1, data.routine[i].t2, data.routine[i].w1, data.routine[i].w2, data.routine[i].th1, data.routine[i].th2, data.routine[i].f1, data.routine[i].f2, data.routine[i].sa1, data.routine[i].sa2);
                }
                setRoutine(nRt);
                
                //if the routine is update successfully
                $(".menuBar").slideUp();
                $(".msgBgd").show();
                $("#msg1").text("Your Schedule is updated");


				initialize(); //initializing once again

            } else {
                $(".menuBar").slideUp();
                $(".msgBgd").show();
                $("#msg1").text("No new update is available");
            }

        },

        error: function (xhr, status, errorThrown) {
          $(".msgBgd").show();
           $("#msg1").text("Sorry! Could not update this time! Try again later!");
        }

    });


}