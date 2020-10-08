// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weatherJ, air;
      try{
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      // const api_url = `weather?lat=${lat}&lon=${lon}&appid=fa3cdbf3f883777e03c93398395d360e`;
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weatherJ = json.weather;
      air = json.air_quality.results[0].measurements[1];
      console.log(json);
      document.getElementById('summary').textContent = weatherJ.weather[0].main;
      document.getElementById('temp').textContent = weatherJ.main.temp;
      document.getElementById('aq_parameter').textContent = air.parameter;
      document.getElementById('aq_value').textContent = air.value;
      document.getElementById('aq_units').textContent = air.unit;
      document.getElementById('aq_date').textContent = air.lastUpdated;

      }catch(error){
        // console.log('wrong')
        console.error(error);
        air = {value: -1 }
        document.getElementById('aq_value').textContent = 'NO READING';
      }
      const data = {lat, lon, weatherJ, air };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);

    });

} else {
  console.log('geolocation not available');
}
