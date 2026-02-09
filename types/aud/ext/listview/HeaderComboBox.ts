/**
* ListViewItem ComboBox Header
*/
export interface HeaderComboBox{

  /**
   * ComboBox 모든 아이템
  */
  Items: boolean;

  /**
   * ComboBox 선택 된 아이템
  */
   readonly SelectedItem: string;

  /**
   * header 사용 여부
  */
  Visible: boolean;

}
