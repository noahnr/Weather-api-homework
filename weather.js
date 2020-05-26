function search_cities() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('cities');

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}

/*var today = newDate();
document.getElementById('currentDay').innerHTML=today;*/
//calling the API
//http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&
//opacity=0.9&fill_bound=true&appid={api_key}

//35da06b1d9msh122f982a6b74fb4p1ec3e0jsn52ec06004c88




function getWeather() {
  $(".card").empty();
  var cityName = $("#cityName").val();
  /**api call
  var apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=e0039a2aa2e070d6c3a921ac5a1fd8b5";


  //forcast
  var forcastCall = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=e0039a2aa2e070d6c3a921ac5a1fd8b5"

  $.getJSON(apiCall, forcastCallback);

 function forcastCallback(weatherData) {
   
    var json = [weatherData]

      for(var i = 0; i < json.length; i++) {
        var array = json[i];

        console.log(array);
        $(".card").append("The weather in " +cityName+ " is " + array.main)
      }
     
    
  }



}*/

var key = "e0039a2aa2e070d6c3a921ac5a1fd8b5";
var city = $("#cityName").val(); // My test case was "London"
var url = "https://api.openweathermap.org/data/2.5/forecast";

$.ajax({
  url: url, //API Call
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: key,
    units: "metric",
    cnt: "40"
  },
  success: function(data) {
    console.log('Received data:', data) // For testing
    var wf = "";
    wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
    $.each(data.list, function(index, val) {
      wf += "<p>" // Opening paragraph tag
      wf += "<b>Day " + new Date(val.dt_txt).toLocaleString('en-US', {hour12: false}) + "</b>: " // Day
      wf += val.main.temp + "&degC" // Temperature
      wf += "<span> | " + val.main.humidity + "% humidity</span>";
      wf += "<span> |" + val.wind.speed + "meters/s<span>";
      wf += "<span> | " + val.weather[0].description + "</span>"; // Description

      wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
      wf += "</p>" // Closing paragraph tag


      let jsonString = val.dt_txt;

      // You should set your own timezone and options.
      console.log(new Date(jsonString).toLocaleString('en-US', {hour12: false}))
    });
    $(".card").html(wf);
  }
})


if (localStorage.getItem("history") != null) 
{
    var historyTmp = localStorage.getItem("history");
    historyTmp += cityName+" | ";
    localStorage.setItem("history",historyTmp);
}
else
{
    var historyTmp = cityName+" | ";
    localStorage.setItem("history",historyTmp);
}




if (localStorage.getItem("history") != null)
{
    var display = " "
    var historyTmp = localStorage.getItem("history");
    var oldhistoryarray = historyTmp.split('|');
    
    $('.historyCard').empty();
    for(var i =0; i<oldhistoryarray.length; i++)
    {
        display += oldhistoryarray[i] + " "
      $('.historyCard').html(display);
    }
}
};


