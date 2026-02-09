/**
* TextEditor Control
*/
export interface TextEditor{

  /** 
   * TextEditor 문서 내 모든 텍스트
   *
  */
  GetDocumentText(): string;

  /** 
   * TextEditor 문서 내 선택 된 텍스트
   *
  */
  GetSelectionText(): string;

  /** 
   * TextEditor 텍스트 적용
   *
  * @param text TextEditor에 설정 할 텍스트
  */
  SetDocumentText(text: string): void;

  /** 
   * TextEditor 문서 내 선택 된 텍스트를 다른 텍스트로 변경
   *
  * @param text TextEditor 문서 내 선택 된 텍스트에 설정 할 텍스트
  */
  SetSelectionText(text: string): void;

}
