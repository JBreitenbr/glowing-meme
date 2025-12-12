const svg = d3.select("#worldmap");
const width = +svg.attr("width");
const height = +svg.attr("height");
let toolTip=d3.select("#tooltip");
const projection = d3.geoNaturalEarth1()
      .translate([width / 2.35, height / 3])
      .scale(90);

let arr=
[{"id":1,"country":"Australien","city":"Perth","lon":115.86,"lat":-31.95,"population":2169190,"tz":"Australia/Perth"},
 {"id":2,"country":"Indonesien","city":"Jakarta","lon":106.85,"lat":-6.21,"population":11634100,"tz":"Asia/Jakarta"},
{"id":3,"country":"Myanmar","city":"Mandalay","lon":96.05,"lat":21.85,"population":1594300,"tz":"Asia/Rangoon"},
{"id":4,"country":"Kasachstan","city":"Almaty","lon":76.93,"lat":43.25,"population":2042040,"tz":"Asia/Almaty"},
{"id":5,"country":"Iran","city":"Isfahan","lon":51.67,"lat":32.65,"population":2327990,"tz":"Asia/Tehran"},
{"id":6,"country":"Israel","city":"Haifa","lon":34.99,"lat":32.79,"population":1199980,"tz":"Asia/Hebron"},
{"id":7,"country":"Bosnien","city":"Sarajevo","lon":18.41,"lat":43.85,"population":348404,"tz":"Europe/Sarajevo"},
{"id":8,"country":"Österreich","city":"Graz","lon":15.45,"lat":47.07,"population":305314,"tz":"Europe/Vienna"},
{"id":9,"country":"England","city":"Brighton", "lon":-0.17,"lat":50.83,"population":290885,"tz":"Europe/London"},
{"id":10,"country":"Spanien","city":"Granada","lon":-3.61,"lat":37.19,"population":234325,"tz":"Europe/Madrid"},
{"id":11,"country":"Algerien","city":"Algier","lon":3.22,"lat":36.68,"population":2364230,"tz":"Africa/Algiers"},
{"id":12,"country":"Mauretanien","city":"Nouakchott","lon":-15.98,"lat":18.09,"population":1612940,"tz":"Africa/Nouakchott"},
{"id":13,"country":"Burkina Faso","city":"Ouagadougou","lon":-1.53,"lat":12.37,"population":3520820,"tz":"Africa/Ouagadougou"},
{"id":14,"country":"Republik Kongo","city":"Brazzaville","lon":15.28,"lat":-4.27,"population":2813480,"tz":"Africa/Brazzaville"},
{"id":15,"country":"Brasilien","city":"Rio de Janeiro","lon":-43.17,"lat":-22.91,"population":6775561,"tz":"America/Sao_Paulo"},
{"id":16,"country":"Chile","city":"Valparaíso", "lon":-71.63,"lat":-33.03,"population":1024430,"tz":"America/Santiago"},
{"id":17,"country":"Kolumbien","city":"Medellín","lon":-75.56,"lat":6.25,"population":4172810,"tz":"America/Bogota"},
{"id":18,"country":"El Salvador","city":"San Salvador","lon":-89.20,"lat":13.72,"population":1132420,"tz":"America/El_Salvador"},
{"id":19,"country":"USA","city":"Santa Fe","lon":-105.94,"lat":35.69,"population":91254,"tz":"America/Los_Angeles"}];
    const path = d3.geoPath().projection(projection);

    // Daten laden (TopoJSON -> GeoJSON)
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;

        svg.append("g")
          .selectAll("path")
          .data(countries)
          .join("path")
          .attr("d", path)
          .attr("fill", "#d9c9a3")   // sandiges Land
          .attr("stroke", "#333") // dezente Grenzen
          .attr("stroke-width", 0.5);   
      let mouseover=(d,i)=>{
     toolTip.style("visibility","visible").style("top",event.pageY-30+"px").style("left",width/2+20+"px").html("Land: "+i["country"]+"<br>"+"Stadt: "+i["city"]+"<br>"+"Einwohner: "+i["population"]+"<br><br>"+"Datum : "+new Date().toLocaleDateString('de-DE',{timeZone:i["tz"]})+"<br>"+"Uhrzeit: "+new Date().toLocaleTimeString('de-DE',{timeZone:i["tz"]}));
      }
        svg.selectAll("circle").data(arr).enter().append("circle").attr("cx",(item)=>projection([item["lon"],item["lat"]])[0]).attr("cy",(item)=>projection([item["lon"],item["lat"]])[1]).attr("r",2).attr("fill","#714342").attr("stroke","#000").attr("opacity",0.7).attr("stroke-width",0.5).on("mouseover",mouseover).on("mouseleave",()=>{toolTip.style("visibility","hidden")});
      })
      .catch(err => {
        console.error("Fehler beim Laden der Weltkarte:", err);
      });
