/* eslint-disable no-undef */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { IUserMark } from '@features/admin/models';
import { Store } from '@ngrx/store';

import * as AdminActions from '../../store/actions/admin.actions';
import * as AdminSelectors from '../../store/selectors/admin.selector';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  private renderer = inject(Renderer2);

  private bodyClickListener?: () => void;

  options: google.maps.MapOptions = {
    mapId: 'faab40f8d46a15b8',
    zoom: 4,
  };

  nzLocations$ = this.store.select(AdminSelectors.selectGetStationLocations);

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  data$ = this.store.select(AdminSelectors.selectGetStationData);

  allStation$ = this.store.select(AdminSelectors.selectGetStations);

  loading$ = this.store.select(AdminSelectors.selectGetIsLoading);

  alert$ = this.store.select(AdminSelectors.selectGetIsAlert);

  userMark = signal<IUserMark>({
    show: false,
    lat: 0,
    lng: 0,
    city: '',
  });

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getStations());
    this.bodyClickListener = this.renderer.listen(
      document.body,
      'click',
      (event) => {
        if (!event.target.classList.contains('trash')) {
          this.store.dispatch(AdminActions.setAlertState({ isAlert: false }));
        }
      },
    );
  }

  ngOnDestroy() {
    if (this.bodyClickListener) {
      this.bodyClickListener();
    }
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      marker.advancedMarker.title,
    );
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.userMark.update((val) => ({
      ...val,
      show: true,
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    }));
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const bc = Math.abs(lng1 - lng2) * Math.cos(lat2) * 111.3;
    const ad = Math.abs(lng1 - lng2) * Math.cos(lat1) * 111.3;
    const h = Math.sqrt(
      Math.pow(Math.abs(lat1 - lat2) * 112, 2) -
        Math.pow(0.5 * Math.abs(bc - ad), 2),
    );
    const r = bc > ad ? bc : ad;
    const br = r - 0.5 * Math.abs(bc - ad);
    const result = Math.sqrt(h * h - br * br);
    return Math.round(result);
  }

  onChanged(model: IUserMark) {
    this.userMark.set({
      ...model,
    });
  }
}
