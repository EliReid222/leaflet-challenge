# leaflet-challenge
Summary Description
This project presents a dynamic visualization of earthquake data leveraging the power of Leaflet.js, D3.js, and HTML/CSS technologies. The application seamlessly retrieves real-time earthquake data from the USGS API and renders it on an interactive map. Each earthquake is represented by a circle, its size indicating the magnitude and its color denoting the depth. To assist users in understanding the significance of each element on the map, a comprehensive legend has been integrated, providing clear interpretations of the data's visual cues. Dive into this experience to explore earthquake patterns from the past 7 days and gain insights into their magnitudes and depths. 

Implementation Details

Data Fetching: Earthquake data is fetched from the USGS API (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson).
Visualization: Leaflet.js is used to create the map, and D3.js is used to bind earthquake data to circle elements.
Legend Design: The legend is created dynamically based on depth ranges and corresponding colors.

Features

Popup Details: Clicking on a circle displays earthquake details in a popup, including magnitude, location, and date.
Animation: Circle animations enhance the user experience when the map is loaded.
Custom Styling: Map tiles, circle colors, and legend styles are customized for a visually appealing interface.

