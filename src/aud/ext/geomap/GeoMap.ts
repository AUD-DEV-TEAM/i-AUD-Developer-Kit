import { DefaultMapStyle } from "../../../aud/ext/geomap/DefaultMapStyle";
import { HighlightStyle } from "../../../aud/ext/geomap/HighlightStyle";
import { Tooltip } from "../../../aud/ext/geomap/Tooltip";
import { Line } from "../../../aud/ext/geomap/Line";
import { Marker } from "../../../aud/ext/geomap/Marker";
/**
* GeoMap 컴포넌트
*/
export interface GeoMap{

  /**
   * Map의 기본 style 객체
  */
  DefaultMapStyle: DefaultMapStyle;

  /**
   * Map의 모든 Feature객체 정보
  */
  Features: object[];

  /**
   * feature mouseover시의 하이라이트 기능의 style 객체
  */
  HighlightStyle: HighlightStyle;

  /**
   * Map의 source
  */
  Source: object;

  /**
   * Tooltip 객체
  */
  Tooltip: Tooltip;

  /** 
   * Map의 모든 layer의 source가 refresh, 즉 초기화됩니다.
   *
  */
  Clear(): void;

  /** 
   * feature 정보가 존재하는 featureCollection 타입의 GeoJSON을 전달받아 Map이 Load됩니다.
   *
  * @param GeoJSON feature 정보가 존재하는 featureCollection 타입의 GeoJSON
  */
  LoadMap(GeoJSON: object[]): void;

  /** 
   * Map의 style 속성, feature의 style 속성값 변경 후 해당 Method를 실행하면 변경된 값에 맞게 Map의 Layer가 change됩니다.
   *
  */
  Update(): void;

  /** 
   * 매개 변수 locations 정보에 맞는 위치에 Line을 생성하고, 해당 Line 객체를 반환합니다.
   *
  * @param locations line 꼭짓점에 해당하는 위도,경도 지리정보가 담긴 Array (eg.[['127.0448', '37.5038'],['126.9602', '37.5788']])
  */
  addLine(locations: object[]): Line;

  /** 
   * 매개 변수 markerInfos정보에 맞는 위치에 Marker를 생성하고, 해당 Marker 객체를 반환합니다.
   *
  * @param markerInfos 마커 위치에 해당하는 지리정보와 사용자 지정 ID가 담긴 Array (eg.[{'name' : '세방빌딩', 'id' : 'ID_AA', 'lonLat': ['127.0448', '37.5038']},{'name' : '경복궁', 'id' : 'ID_BB', 'lonLat': ['126.9602', '37.5788']}])
  */
  addMarker(markerInfos: object[]): Marker;

  /** 
   * 지도 위의 특정 feature 위에 마우스를 올리면 해당 위치에 Tooltip을 생성하고 Tooltip객체를 반환합니다. Tooltip에는 feature의 'label' 정보가 표시됩니다.
   *
  */
  createTooltip(): Tooltip;

  /**
   * @event 
   *
   * Map의 어떠한 Feature를 click시 발생합니다.
해당 Feature 객체를 전달받습니다.
   *
   * @param args
   *
  */
  OnFeatureClick : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * feature 객체
    */
    feature: any
  }
  ) => void;


  /**
   * @event 
   *
   * Map의 어떠한 Feature를 mouseover시 발생합니다.
해당 Feature 객체를 전달받습니다. 단, feature가 없는 경우, undefined를 전달합니다.
   *
   * @param args
   *
  */
  OnFeatureMouseOut : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * feature 객체
    */
    feature: any
  }
  ) => void;


  /**
   * @event 
   *
   * Map의 어떠한 Feature를 mouseover시 발생합니다.
해당 Feature 객체를 전달받습니다.
   *
   * @param args
   *
  */
  OnFeatureMouseOver : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * feature 객체
    */
    feature: any
  }
  ) => void;


  /**
   * @event 
   *
   * Map의 Feature와 Marker 객체 외를 클릭할 때 발생합니다.
   *
   * @param args
   *
  */
  OnMapClick : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * [longitude, latitude]
    */
    coordinate: Array<any>
  }
  ) => void;


  /**
   * @event 
   *
   * LoadMap이 끝난 후, 즉 Map이 load되고 나서 발생합니다.
   *
   * @param args
   *
  */
  OnMapLoaded : (sender : GeoMap
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * Map에 Marker가 존재하고 해당 Marker를 click시 발생합니다.
해당 Marker 객체와 아래 Layer의 Feature 객체를 전달받습니다.
   *
   * @param args
   *
  */
  OnMarkerClick : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * marker 객체

    */
    marker: any
    /**
     * feature 객체 또는 undefined
    */
    feature: any
  }
  ) => void;


  /**
   * @event 
   *
   * Map에 Marker가 존재하고 해당 Marker 에 마우스아웃시 발생합니다.
   *
   * @param args
   *
  */
  OnMarkerMouseOut : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * marker 객체
    */
    marker: any
    /**
     * feature 객체 또는 undefined
    */
    feature: any
  }
  ) => void;


  /**
   * @event 
   *
   * Map에 Marker가 존재하고 해당 Marker를 mouseover시 발생합니다.
해당 Marker 객체를 전달받습니다.
   *
   * @param args
   *
  */
  OnMarkerMouseOver : (sender : GeoMap
  , args : { 
    /**
     * {X: offsetX, Y: offsetY}
    */
    point: object
    /**
     * marker 객체
    */
    marker: any
    /**
     * feature 객체 또는 undefined
    */
    feature: any
  }
  ) => void;


}
