import {Component, HostListener, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {RegionService} from '../../servises/region.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: L.Map;
  layers: Array<any> = [];
  options = {
    layers: [
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {maxZoom: 18, minZoom: 13})
    ],
    center: L.latLng(48.50835977515098 , 32.26547241210938),
    zoom: 13
  };
  polygonMarkersOnly: Array<any> = [];
  schoolData: Array<any>;
  mapRouting;
  showEnrollmentModal = false;

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.getMapData();
  }

  getMapData() {
    this.regionService.getRegionsData().then(data => {
      for (const item of (data as any)) {
        this.layers.push(L.marker(item.school[0].location, this.markerIcon()).bindPopup(this.noteSchoolPopup(item.school[0])));
        this.layers.push(L.polygon(item.layer, {color: item.color, weight: 1}));
      }
      this.polygonMarkersOnly =  this.layers;
      this.schoolData = data;
    });
  }

  noteSchoolPopup(data) {
    return `<div class="school-wrap">`
            + `<img src="assets/example.jpeg" alt="#"><em>${data.addressStreet}</em><a href="${data.link}" target="_blank">${data.link}</a>`
            + `<div>${data.fullName}</div><button class="school-button">Подати Заяву</button>` +
           `</div>`;
  }

  markerIcon(school =  true) {
    return {icon: L.icon({
                iconSize: school ? [ 25, 41 ] : [ 41, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: school ? 'assets/marker-icon.png' : 'assets/user-marker.png',
                shadowUrl: 'assets/marker-shadow.png'
                }
            )};
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.setMaxBounds([[48.61838518688487, 32.43885040283204], [48.39798098726997, 32.09243774414063]]);
  }

  changeView(location) {
    this.map.setView(new L.LatLng(location.y, location.x), 15, {animate: true, duration: 1});
    this.layers = [...this.polygonMarkersOnly, L.marker([location.y, location.x], this.markerIcon(false))];
    const pointLayer = this.schoolData.find( item => this.checkPolygonHavePoint([location.y, location.x], item.layer));
    if (pointLayer) {
      if (!!this.mapRouting) {
        this.map.removeControl(this.mapRouting);
      }

      this.mapRouting = L.Routing.control({
        lineOptions: {styles: [{color: '#242c81', weight: 7}]},
        fitSelectedRoutes: false,
        show: true,
        waypoints: [
          L.latLng(location.y, location.x),
          L.latLng(pointLayer.school[0].location[0] , pointLayer.school[0].location[1])
        ]
      });

      this.mapRouting.addTo(this.map);
    }
  }

  @HostListener('mouseover', ['$event']) onHover(e) {
    if (e.target.classList[0] === 'leaflet-interactive') {
      e.target.classList.add('active');
      e.target.onmouseout = () => {
        e.target.classList.remove('active');
      };
    }
    if (e.target.classList[0] === 'leaflet-interactive') {
      e.target.classList.add('active');
      e.target.onmouseout = () => {
        e.target.classList.remove('active');
      };
    }
  }
  @HostListener('click', ['$event']) openModal(e) {
    if (e.target.classList[0] === 'school-button') {
     this.showEnrollmentModal = true;
    }
  }

  checkPolygonHavePoint(point, vs) {
    const x = point[0];
    const y = point[1];

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0]; const yi = vs[i][1];
      const xj = vs[j][0]; const yj = vs[j][1];

      const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) { inside = !inside; }
    }

    return inside;
  }
}
