
export interface WriteBackDataCell{
     
    /**
     * 수정하기 전값
     */
    Before:number;
    /**
     * 수정후의 값
     */
    After:number; 

    /**
     * 데이터 필드 명
     */
    Field:string;
    
}
