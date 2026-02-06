## 1. 개요
TreeGrid의 계층 구조를 이용하여 폴더 구조를 조회합니다.

## 2. 화면 구성
| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| TreeGrid | TreeGrid | 폴더 구조 조회 |
| Tree | Tree | 폴더 구조 조회 |

## 3. Data Source

DB Connection : **MTXRPTY**

| Data Source | 테이블 | 바인딩 컨트롤 |
| --- | --- | --- |
| Tree | MTX_FOLDER, MTX_REPORT | TreeGrid, Tree |

## 4. 주요 기능
| 기능 | 설명 |
| --- | --- |
| ParentField | DataSource 중 부모 필드 |
| ChildField | DataSource 중 자식 필드 |
| CheckField | 데이터 조회 시 자동 선택 여부 설정 |
| ImageField | Tree 아이콘 이미지가 저장되어 있는 필드명 |