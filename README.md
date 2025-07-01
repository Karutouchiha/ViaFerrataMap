# Via Ferrata map

[Link to Deployed Website](https://karutouchiha.github.io/ViaFerrataMap/)

## Code description

The Leaflet code is inside the main.js and uses functions or variable names that explain what the function is doing.
The data for the ViaFerratas from OpenStreatMap is as GeoJson in the data Folder as well as for the js in the
viaferrata.js. The styling regarding the Map so map div and the legend are inside map.css. The style containes the
overall styling as well as the specific styling outside the map.

## Report

Target group: Climbers<br>
Data Source: OpenStreetMap<br>

To discern the Routes from the Map I choose the color Blue as contrast to the red and green topographic map. For the
user
to be able to discern the different routes they change color to red upon hovering it. Since very small routes could not
be displayed as paths they are shown as a circle.

The blue paths are still hard to see. The Title was not style and the Information displayed was difficult to deduce
aside form the Title.

After the initial Presentation I added a Layer for a different baseMap to better see the routes but also to make it
easyer to see travel routes to sayed climbs easier. As well as a legend that displays what the lines are as well as the
round circles. Since not everybody knows what a Via Ferrata is I added a Image to make the fact the map is about
climbing routes more clear.

Further improvements to the project would be adding Merging Circles to better show how many routes are in
an area this would also help with the difficulty in discerning the routes from the background when displaying the
topographic map. Another useful filter would be to filter by difficulty of the climbing route be it the Via Ferrata
Scale or the SAC Scale. Also Informative would be to see the time frames the Via Ferrata are Accessable.

Key Take aways from the project are that creating a map that is clear for everybody that looks at it is difficult.
