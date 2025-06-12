/**
* GlobalConfig 정보를 제공합니다.
*/
export interface GlobalConfig{

  /**
   * 컨텍스트Root
  */
   readonly CONTEXT_PATH: string;

  /**
   * DataSet.maf 경로
  */
   readonly MATRIX_DATASET_MAF: string;

  /**
   * Download.maf 경로
  */
   readonly MATRIX_DWN_URL: string;

  /**
   * Studio.maf 경로
  */
   readonly MATRIX_STUDIO_MAF: string;

  /**
   * Protocol(HTTP,HTTPS)
  */
   readonly PROTOCOL: string;

}
