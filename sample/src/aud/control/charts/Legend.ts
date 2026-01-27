/**
* 차트의 범례 정보를 제공합니다.
*/
export interface Legend{

  /**
   * 수평 정렬(기본값:center)
  */
  Align: string;

  /**
   * 배경 색(default:undefined)
  */
  BackgroundColor: string;

  /**
   * 경계선 색
  */
  BorderColor: string;

  /**
   * 경계선 두께
  */
  BorderWidth: number;

  /**
   * 범례 간격 조정(Horizontal 의 경우)
  */
  Distance: number;

  /**
   * 활성화 여부
  */
  Enabled: boolean;

  /**
   * 범례 표시 옵션. 차트 데이터 영역과의 간섭여부.(기본값:false)
  */
  Floating: number;

  /**
   * 글자 색(default:rgb(0,0,0))
  */
  FontColor: string;

  /**
   * 배치 유형(기본값:horizontal)
  */
  Layout: string;

  /**
   * 범례 간격 조정(Vertical 의 경우)
  */
  MarginTop: number;

  /**
   * 범례 표시 순서 역방향 표시 여부
  */
  Reversed: boolean;

  /**
   * 수평 정렬(기본값:bottom)
  */
  VerticalAlign: string;

  /**
   * 오프셋 X좌표
  */
  X: number;

  /**
   * 오프셋 Y좌표
  */
  Y: number;

}
