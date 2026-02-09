import { SparklineGroupEx } from "./SparklineGroupEx";

/**
* 엑셀의 Sparkline 객체에 대한 접근을 제공합니다.
*/
export interface SparklineGroupCollectionEx{

  /**
   * 모든 SparkLine 객체를 제거합니다.
  */
  Clear(): void;

  /**
   * SparkLine 객체를 생성하는 작업은 JSON 모델을 기준으로 합니다.
  */
  Create(json:string): SparklineGroupEx;

  /**
   * 특정 위치에 있는 SparkLine 객체를 제거합니다.
  */
  Remove(idx:number): void;

  /**
   * 특정 위치에 있는 SparkLine 객체의 내용을 수정합니다.
  */
  Update(idx:number, json:string): SparklineGroupEx;

}
