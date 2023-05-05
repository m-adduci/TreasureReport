require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/widgets/FeatureTable",
  "esri/widgets/LayerList",
  "esri/core/watchUtils",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
  "dojo/dom-construct",
  "dojo/dom",
  "dojo/on",
  "esri/core/watchUtils",
  "esri/widgets/Editor",
  "esri/widgets/Editor/CreateWorkflow",
  "esri/widgets/Editor/UpdateWorkflow",
  "esri/widgets/Locate",
  "esri/widgets/FeatureForm",
  "esri/widgets/FeatureTemplates",
  "dojo/dom-class",
  "esri/widgets/Popup",
  "esri/PopupTemplate",
  "esri/widgets/Home",
  "dojo/json",
  "esri/widgets/Legend",
  "esri/geometry/geometryEngine",
  "esri/tasks/QueryTask",
  "dojo/_base/array",
  


  
], function(esriConfig, Map, MapView, FeatureLayer, Search, QueryTask, Query, FeatureTable, LayerList, watchUtils, Expand,
BasemapGallery, domConstruct, dom, on, watchUtils, Editor, CreateWorkflow, UpdateWorkflow, Locate, FeatureForm, FeatureTemplates, domClass, Popup, PopupTemplate, Home, Legend, geometryEngine, QueryTask, arrayUtils) {

esriConfig.apiKey = "AAPKbd17414641f84139af043c11b03c88eamFCGTb4e5J64QrVkSbvKl7lwiAeqhZTS3MXMKoL-UtLeZL2AnlCJ9rCoyIm-mC6y";


//creating base map
const map = new Map({
 basemap: "dark-gray-vector",


 
});

//creating map view
const view = new MapView({
 container: "viewDiv",
 map: map,
 center: [-2.43, 52.9], // longitude, latitude for England and Wales 53.100920, -2.041264
 zoom: 6

}
);



var homeBtn = new Home({
  view: view
});



//Create Roman city and settlement icon
const romancitiesandsettlementspointsRenderer = {
"type": "simple",
"symbol": {
  "type": "picture-marker",
  "url": "img/roman-settlements.png",
  "width": "24px",
  "height": "24px"
}
}
// Define a pop-up for roman city and settlement Points
const popupRomancitiesandsettlementspoints = {
"title": "<b>Roman Settlement<b>",
"content": "Name: {NAME}<br><b></b> Source: {SOURCE}<br><b></b>Link: {PLEIADESURL}"
}
//Roman city and settlement label feature layer (points)
const romancitiesandsettlementsLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/18",
  renderer: romancitiesandsettlementspointsRenderer,
  outFields: ["FULL_ADDRE","CITY","STATE","ZIP"],
  popupTemplate: popupRomancitiesandsettlementspoints
});

map.add(romancitiesandsettlementsLayer);





//Create Medieval city and settlement icon
const medievalcitiesandsettlementspointsRenderer = {
  "type": "simple",
  "symbol": {
    "type": "picture-marker",
    "url": "img/medieval-settlements.png",
    "width": "24px",
    "height": "24px"
  }
  }
  // Define a pop-up for medieval city and settlement Points
  const popupMedievalcitiesandsettlementspoints = {
  "title": "<b>Medieval Settlement<b>",
  "content": "Name: {CITYNAME}<br><b></b> Time Period: {PERIOD}"
  }
  //Medieval city and settlement label feature layer (points)
  const medievalcitiesandsettlementsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/22",
    renderer: medievalcitiesandsettlementspointsRenderer,
    outFields: ["FULL_ADDRE","CITY","STATE","ZIP"],
    popupTemplate: popupMedievalcitiesandsettlementspoints
  });
  
  map.add(medievalcitiesandsettlementsLayer);

/* only use for single symbol
//create incident icon
const incidentRenderer = {
  "type": "simple",
  "symbol": {
    "type": "picture-marker",
    "url": "img/redleaf.png",
    "width": "12px",
    "height": "12px"
  }
}
*/ 

//Adding icon types for treasure features
var treasureRenderer = {
type: "unique-value",  // autocasts as new UniqueValueRenderer()
legendOptions: {
  title: "Treasure Type"
},
field: "TreasureType",  // values returned by this function will
                   // be used to render features by type
uniqueValueInfos: [
  {
    value: "Coins: Precious Metal Object",  // features labeled as "Low"
    label: "Precious Metal (Coins)",
    symbol: {
      "type": "picture-marker",
      "url": "img/moneybag_GBP.png",
      "width": "10px",
      "height": "10px"
    }
  }, {
    value: "Precious Metal: Non-Coin Object",  // features labeled as "Medium"
    label: "Precious Metal (Non-Coin)",
    symbol: {
      "type": "picture-marker",
      "url": "img/precious_noncoin.png",
      "width": "12px",
      "height": "12px"
    }
  }, {
    value: "Treasure Trove: Precious Metal Objects",  // features labeled as "Medium"
    label: "Treasure Trove of Precious Metal",
    symbol: {
      "type": "picture-marker",
      "url": "img/treasure_trove.png",
      "width": "10px",
      "height": "10px"
    }
  }, {
    value: "Non-Precious Metal: Prehistoric Object",  // features labeled as "High"
    label: "Prehistoric Object (Non-Precious Metal)",
    symbol: {
      "type": "picture-marker",
      "url": "img/non_precious.png",
      "width": "14px",
      "height": "14px"
    }
  }
]
};

    // Define a pop-up for Treasure
    const popupTreasures = {
      "title": "<b>Treasure Find<b>",
      "content": "<b>Quantity:</b> {Quantity}<br><b>Type:</b> {TreasureType}"
    }

  const treasureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/1",
      renderer: treasureRenderer,
      outFields: ["OBJECTID","TreasureType","Quantity"],
      popupTemplate: popupTreasures
    });

treasureLayer.visible = true;
map.add(treasureLayer);

// Symbol for Roman Roads
const romanroadSym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#DC9456",
  width: "16px",
  style: "solid"
};
// Symbol for Minor Roads
const minorroadSym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#8B4513",
  width: "12px",
  style: "solid"
};
//Create road types
const romanroadsRenderer = {
  type: "unique-value",
  legendOptions: {
          title: "Road Type"
        },
  defaultSymbol: romanroadSym,
  defaultLabel: "combination",
  field: "CLASS",
  uniqueValueInfos: [
    {
      value: "Roman Road", // Major Roman Roads
      symbol: romanroadSym,
      label: "Major Roman Road"
    },

    {
      value: "Minor Road", // Minor Roman Roads
      symbol: minorroadSym,
      label: "Minor Roman Road"
    }
  ]
};
  // Define a pop-up for Roman Road Lines
  const popupRomanroads = {
  title: "<b>Roman Roads<b>",
  content: "Road Class: {CLASS}<br><b></b>Length: {length_km} KM"
  }
  //Roman Road label feature layer (lines)
  const romanroadsLayer = new FeatureLayer({
    url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/13",
    renderer: romanroadsRenderer,
    outFields: ["CLASS","length_km"],
    popupTemplate: popupRomanroads
  });
  
  map.add(romanroadsLayer);

//Adding icon types for Roman Roads features

// Define a pop-up for Treasure Finds Chart Summary
const popupAreas = {
  title: "Treasure Find Summary (Counts) in {nuts315nm}<br><b><br><b>Precious Metal (Coins): {PrecMetCoin}<br><b>Precious Metal (Non-Coin): {PrecMetNonCoin}<br><b>Treasure Troves of Precious Metal:{TreasureTrovePrecMet}<br><b>Prehistoric Object (Non-Precious Metal):{NonPrecMetPreHist}<br><b><br><b>Treasure Find Summary Statistics (%)",
  content: [{
    type: "media",
     mediaInfos: [{
      type: "pie-chart", //Pie Chart Type
       size: 6, //Size of chart
       

       caption: "", //Pie Chart Caption (optional)
       value: {
         fields: [ "PrecMetNonCoin","PrecMetCoin","NonPrecMetPreHist","TreasureTrovePrecMet" ], //Displays treasure finds as a percentage for each District boundary
         normalizeField: null,
         }
       }]
   }]
 }

 view.popup.dockEnabled = true
 view.popup.collapseEnabled = false
 view.popup.dockOptions = {
  breakpoint: false,
  buttonEnabled: true,
  position: 'bottom-right'
}

const areasRenderer = {
  type: "simple",
  symbol: {
    type: "simple-fill",
    size: 6,
    color: "#2c34a0",
    outline: {
      color: [45,60,100,0],
      width: "1px"
    }
  }
};

//school district feature layer (polygons)
const areasLayer = new FeatureLayer({
  url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/3",
  renderer: areasRenderer,
  opacity: 0.2,
  outFields: ["nuts315nm","RomanCount","MedievalCount"],
  popupTemplate: popupAreas
});

map.add(areasLayer, 0);



//Location Widget
const locate = new Locate({
  view: view,
  useHeadingEnabled: false,
  goToOverride: function(view, options) {
    options.target.scale = 1500;
    return view.goTo(options.target);
  }
});

/*
// New FeatureForm and set its layer to Crayfish Burrows FeatureLayer.
const featureForm = new FeatureForm({
  container: "formDiv",
  layer: incidentLayer,
  fieldConfig: [
    {
      name: "IncidentType",
      label: "Incident Type"
    },
    {
      name: "Severity",
      label: "Severity1"
    }
  ],
});

// Listen to the feature form's submit event.
// Update feature attributes shown in the form.
//for add features "Add" adds the feature, for update feature "Update" updates the feature
featureForm.on("submit", function() {
  if (editFeature) {
    // Grab updated attributes from the form.
    const updated = featureForm.getValues();

    // Loop through updated attributes and assign
    // the updated values to feature attributes.
    Object.keys(updated).forEach(function(name) {
      editFeature.attributes[name] = updated[name];
    });

    // Setup the applyEdits parameter with updates.
    const edits = {
      updateFeatures: [editFeature]
    };
    applyEditsToIncidents(edits);
    document.getElementById("viewDiv").style.cursor = "auto";
  }
});
*/

//create editor panel
const editor = new Editor({
  view: view,
  label: "Treasure",
  allowedWorkflows: ["create", "update"],
  layerInfos: [{
    view: view,
    layer: treasureLayer,
    fieldConfig: [
      {
        name: "TreasureType",
        label: "Treasure Type"
      },
      {
        name: "Quantity",
        label: "Quantity"
      }],
    enabled: true, // default is true, set to false to disable editing functionality
    addEnabled: true, // default is true, set to false to disable the ability to add a new feature
    updateEnabled: true, // default is true, set to false to disable the ability to edit an existing feature
    deleteEnabled: true // default is true, set to false to disable the ability to delete features
  },
  {
    view: view,
    layer: medievalcitiesandsettlementsLayer,
    enabled: false, // default is true, set to false to disable editing functionality
    addEnabled: false, // default is true, set to false to disable the ability to add a new feature
    updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
    deleteEnabled: false // default is true, set to false to disable the ability to delete features
  },
  {
    view: view,
    layer: romancitiesandsettlementsLayer,
    enabled: false, // default is true, set to false to disable editing functionality
    addEnabled: false, // default is true, set to false to disable the ability to add a new feature
    updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
    deleteEnabled: false // default is true, set to false to disable the ability to delete features
  },
  {
    view: view,
    layer: romanroadsLayer,
    enabled: false, // default is true, set to false to disable editing functionality
    addEnabled: false, // default is true, set to false to disable the ability to add a new feature
    updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
    deleteEnabled: false // default is true, set to false to disable the ability to delete features
  },
  {
    view: view,
    layer: areasLayer,
    enabled: false, // default is true, set to false to disable editing functionality
    addEnabled: false, // default is true, set to false to disable the ability to add a new feature
    updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
    deleteEnabled: false // default is true, set to false to disable the ability to delete features
  }
]
});

//Treasure Find Editor Widget Functionality that allows for user submitted data
editor.viewModel.watch('state', function(state){
  if(state === 'ready'){
    setTimeout(function(){
      document.getElementsByClassName('esri-editor__title esri-heading')[0].innerHTML = 'Treasure Discovery';
      var actions = document.getElementsByClassName("esri-editor__feature-list-name");
      Array.from(actions).forEach(function(ele){
        if(ele.innerHTML==='Add feature'){
          ele.innerHTML = 'Report New Treasure Find';
        }
        if(ele.innerHTML==='Edit feature'){
          ele.innerHTML = 'Modify or Delete Treasure Find';
        
        }
      });
    }, 50);
  }
});

//Creates node for Treasure Reporting Guide/help panel
var node = domConstruct.create("div", {
  className: "myPanel",
  innerHTML: "<b>Treasure Reporting Guide</b><br>" +
  '<a class="none" href="https://www.coronersociety.org.uk/" target="_blank"><img class="NPD" src="img/logo.png" alt="NPD" style="width:111px;height:42px;"></a>' +
  "<p>Thank you for utilizing the England and Wales Treasure Reporting Portal. This tool offers the ability to locate and document treasure finds in an interactive map, while also providing an intuitive way to contact your local Coroner.</p></b>" +
  '<a class="none" href="https://finds.org.uk/treasure/advice/summary" target="_blank"><img class="NPD" src="img/leaf4.png" alt="Prairie Crayfish" style="width:64px;height:64px;"></a></b>' +
  '<a class="none" href="https://www.coronersociety.org.uk/coroners/" target="_blank"><img class="NPD" src="img/icons8-graph-report-64.png" alt="NPD" style="width:64px;height:64px;"></a>' +
  "<p>The above Treasure Definition Guide provides a guide for determining the 4 basic types of objects classified as treasure. </b></b> The Legacy Coroner Search page link provides a backup method for contacting your local Coroner in the event that the website is under maintenance</p></b>"
});

const purpose = new Expand({
 expandIconClass: "esri-icon-description",
 view: view,
 expanded: false,
 expandTooltip: "Application Purpose",
 content: node
});

watchUtils.whenTrueOnce(purpose, 'expanded', function(){
 on(dom.byId("btnSubmit"), 'click', function(){
   console.log("submit clicked");
 });
});

//creating basemap widget and setting its container to a div
var basemapGallery = new BasemapGallery({
 view: view,
 container: document.createElement("div")
});
//creates an expand instance and sets content properpty to DOM node of basemap gallery widget with an Esri
//icon font to represent the content inside the expand widget
var bgExpand = new Expand({
 view: view,
 content: basemapGallery,
 expandTooltip: "Change Basemap"
});
// close the expand whenever a basemap is selected
basemapGallery.watch("activeBasemap", function() {
 var mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";
 if (mobileSize) {
   bgExpand.collapse();
 }
});

// Add the expand instance to the ui
view.ui.add(bgExpand, "top-left");

//Create layer lists widget to make layers visiblie or invisible
var layerList = new LayerList({
 view: view,
 // executes for each ListItem in the LayerList
 listItemCreatedFunction: function (event) {
   // The event object contains properties of the layer in the LayerList widget.
   var item = event.item;

   if (item.title === "GEOG778 Layers - RomanCitiesandSettlements") {
     // open the list item in the LayerList
     item.open = true;
     // change the title to something more descriptive
     item.title = "Roman Settlements";
     //add legend
     item.panel = {
       content: "legend",
       open: true
     };
   }
   if (item.title === "GEOG778 Layers - MedievalTowns") {
     // open the list item in the LayerList
     item.open = true;
     // change the title to something more descriptive
     item.title = "Medieval Settlements";
     //add legend
     item.panel = {
       content: "legend",
       open: true
     };
   }
   if (item.title === "GEOG778 Layers - RomanRoads") {
     // open the list item in the LayerList
     item.open = true;
     // change the title to something more descriptive
     item.title = "Roman Roads (AD 43 to AD 410)";
     //add legend
     item.panel = {
       content: "legend",
       open: true
     };
   }
   if (item.title === "GEOG778 Layers - TreasureReport") {
     // open the list item in the LayerList
     item.open = true;
     // change the title to something more descriptive
     item.title = "Treasure Finds";
     //add legend
     item.panel = {
       content: "legend",
       open: true
     };
   }
   if (item.title === "GEOG778 Layers - Areas") {
     // open the list item in the LayerList
     item.open = true;
     // change the title to something more descriptive
     item.title = "Districts of England & Wales";
     //add legend
     item.panel = {
       content: "legend",
       open: true
     };
   }
 }
});

//adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
layerListExpand = new Expand({
 expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
 // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
 view: view,
 content: layerList,
 expandTooltip: "Layer Visibility/Layer Legend"
});

view.ui.add(layerListExpand, "top-left");

//adds expand button to map TRY TO CHANGE ICON AND WORDS OF EXPAND BOX
editorExpand = new Expand({
 expandIconClass: "esri-icon-visible",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
 // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
 view: view,
 content: editor,
 expandTooltip: "Report Treasure Find"
});

view.ui.add(editorExpand, "top-left");

//add location button to map
view.ui.add(locate, "top-left");

// Add the home button to the top left corner of the view
view.ui.add(homeBtn, "top-left");





//Pop up for District Coroner being searched
var areaSearch = new FeatureLayer({
 url:
   "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/GEOG778_Layers/FeatureServer/3",
 popupTemplate: ({
   // autocasts as new PopupTemplate()
   title: "District: {nuts315nm} </br></br>Coroner: {Coroner}, {Title} </br>Email: {Email}",
   content: [{
    type: "media",
    mediaInfos: [{
    title: "",
    caption: "You must report all finds of Treasure to the above coroner for the district in which they are found either within 14 days after the day on which you made the discovery or within 14 days after the day on which you realised the find might be treasure. Your local Finds Liaison Officer can assist you in determining whether a find constitutes potential Treasure and can report the find to the coroner on your behalf.",
    value: {
       sourceURL: "{Photo}",
       "width": "20%",
       "height": "20%"

    }
}]
  
 }]
})
});


//Search Widget Functionality Enabling Users Query Local Coroner
var searchWidget = new Search({
  view: view,
  allPlaceholder: "Enter District Name",
  sources: [
    {
      layer: areaSearch,
      searchFields: ["nuts315nm"], //District boundary feaure layer being searched
      displayField: "nuts315nm", //Display field being used
      exactMatch: false,
      outFields: ["nuts315nm","RomanCount","MedievalCount"],
      name: "District Boundaries",
      placeholder: "Search by District (e.g. 'Suffolk')"
    }
  ],
  includeDefaultSources: false

});

// Add the search widget to the top right corner of the view
view.ui.add(searchWidget, {
  position: "top-right",
  width: "50%"
});

view.ui.add(purpose, "top-right");



});

