/**
 * ExternalComponent 외부 라이브러리 글로벌 선언
 *
 * ResourceLoader가 런타임에 로드하는 외부 라이브러리의 앰비언트 타입.
 * import 없이 스크립트 모드에서 사용하기 위한 선언 파일입니다.
 */

/** ECharts 라이브러리 */
declare const echarts: any;

/** Flatpickr 날짜 선택기 */
declare function flatpickr(element: any, options: any): any;

/** Marked 마크다운 파서 */
declare const marked: {
	parse(src: string, options?: any): string;
	setOptions(options: any): void;
	[key: string]: any;
};
