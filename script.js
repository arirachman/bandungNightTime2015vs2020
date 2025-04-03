var viirs = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG");
var admin = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
var viirsVis = {"opacity":1,"bands":["avg_rad","avg_rad","avg_rad"],"min":0.11500000208616257,"max":29.897499084472656,"gamma":1};

var admin2 = admin
  .filter(ee.Filter.eq('ADM1_NAME', 'Jawa Barat'))
  .filter(ee.Filter.inList('ADM2_NAME', ['Kota Bandung','Kota Cimahi','Bandung']));
  
var geometry = admin2.geometry();
Map.centerObject(geometry);
Map.addLayer(geometry, {}, 'Bandung');

// Workflow:
// Load the VIIRS Nighttime Day/Night Band Composites collection
// Filter the collection to the date range
var filteredViirs = viirs
  .filter(ee.Filter.date('2015-05-01', '2020-06-30'))
  .filter(ee.Filter.bounds(geometry));

// Extract the 'avg_rad' band which represents the nighttime lights
print(filteredViirs);
var nightLight = filteredViirs.select('avg_rad');

var night2015 = nightLight.first();

var filteredViirs2020 = viirs
  .filter(ee.Filter.date('2020-06-30', '2020-07-30'))
  .select('avg_rad');

var night2020 = filteredViirs2020.first();

print(night2015);
print(night2020);

Map.centerObject(geometry);
Map.addLayer(night2015.clip(geometry), viirsVis, 'Night Time 2015')

Map.addLayer(night2020.clip(geometry), viirsVis, 'Night Time 2020')
