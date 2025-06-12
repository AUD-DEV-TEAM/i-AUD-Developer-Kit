
export interface DataRow{

    /**
     * 특정 컬럼이 Lock인지 여부를 반환 합니다.
     * @param dataColumnIndex OlapField의 DataColumnIndex
     */
    IsLockColumn(dataColumnIndex:number): boolean;
    /**
     * 특정 컬럼의 값을 반환 합니다.
     * Measure 필드의 값만 허용 합니다.
     * @param dataColumnIndex OlapField의 DataColumnIndex
     */
    getNumber(dataColumnIndex:number): number;

    /**
     * 특정 컬럼의 값을 설정합니다.
     * @param dataColumnIndex 
     * @param columnValue 
     */
    setNumber(dataColumnIndex:number, columnValue:number):void;
 
    /**
     * 특정 필드의 값을 가져옵니다.(Dimension 필드)
     * @param dataColumnIndex OlapField의 DataColumnIndex
     */ 
	getString(idataColumnIndex:number):string;
    /**
     * 특정 디멘전 값을 가져옵니다.(Dimension 필드)
     * @param columnName 
     */
	getString(columnName:string):string;
    
    /**
     * 특정 필드의 값을 가져옵니다.(Dimension 필드)
     * @param dataColumnIndex OlapField의 DataColumnIndex
     */ 
	setString(idataColumnIndex:number, text:string):void;
    /**
     * 특정 디멘전 값을 가져옵니다.(Dimension 필드)
     * @param columnName 
     */
	setString(columnName:string, text:string):void;
    
}