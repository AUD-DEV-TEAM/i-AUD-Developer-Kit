/**
* MX-GRID 컨트롤 메뉴 옵션
*/
export interface MenuOption{

  /**
   * 엑셀 내보내기 메뉴 사용 여부
  */
  VisibleExcel: boolean;

  /**
   * 웹(HTML) 내보내기 메뉴 사용 여부
  */
  VisibleHTML: boolean;

  /**
   * 한글 문서(HWP) 내보내기 메뉴 사용 여부
  */
  VisibleHWP: boolean;

  /**
   * PDF 내보내기 메뉴 사용 여부
  */
  VisiblePDF: boolean;

  /**
   * Word(docx) 내보내기 메뉴 사용 여부
  */
  VisibleWord: boolean;

}
