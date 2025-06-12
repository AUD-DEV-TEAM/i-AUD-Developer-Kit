{
  "ReportInfo": {
      "ReportCode": "REP59B0A622F67741879C104E4EDFF4B461",
      "FolderCode": "DEFAULT",
      "SavePath": "DEFAULT/REP59B0A622F67741879C104E4EDFF4B461.mtsd",
      "ReportName": "보고서 자동 생성 테스트",
      "Writer": "yglee",
      "WriteDate": "2025-04-19 16:29:33",
      "Editor": "yglee",
      "EditDate": "2025-04-19 16:29:33",
      "TabPosition": 2,
      "UseLayout": false,
      "UsePersonalConditions": false,
      "DocumentVersion": "3.0.0.0"
  },
  "DataSources": {
      "Datas": []
  },
  "ScriptText": "",
  "ServerScriptText": [ ],
  "Forms": [
      {
          "Id": "Form82CDAA9CBC6D47A397E38358439BE107",
          "Name": "Form 1",
          "Activated": true,
          "Visible": true,
          "LanguageCode": "",
          "Style": {
              "Type": 0,
              "BoxStyle": "",
              "Border": {
                  "ColorR": 204,
                  "ColorG": 204,
                  "ColorB": 204,
                  "ColorA": 1,
                  "CornerRadius": "0,0,0,0",
                  "LineType": "solid",
                  "Thickness": "1,1,1,1"
              },
              "Background": {
                  "ColorR": 255,
                  "ColorG": 255,
                  "ColorB": 255,
                  "ColorA": 1
              }
          },
          "Elements": [
              {
                  "ChildElements": [],
                  "Type": "Group",
                  "Id": "GroupE8EB36A1695D29619BE0EB589540578C",
                  "Name": "CONDITION",
                  "Position": {
                      "Left": 3,
                      "Top": 3,
                      "Width": 1219,
                      "Height": 100,
                      "ZIndex": 5,
                      "TabIndex": 0,
                      "Docking": {
                          "Left": true,
                          "Right": true,
                          "Top": true,
                          "Bottom": false,
                          "Margin": "3",
                          "HoldSize": false,
                          "MinWidth": 0,
                          "MinHeight": 0
                      }
                  },
                  "Style": {
                      "Type": 0,
                      "BoxStyle": "",
                      "Background": {
                          "Color": {
                              "R": 255,
                              "G": 255,
                              "B": 255,
                              "A": 1
                          }
                      },
                      "Border": {
                          "Color": {
                              "R": 194,
                              "G": 194,
                              "B": 197,
                              "A": 1
                          },
                          "LineType": "solid",
                          "Thickness": "1,1,1,1",
                          "CornerRadius": "0,0,0,0"
                      },
                      "Font": {
                          "Color": {
                              "R": 48,
                              "G": 48,
                              "B": 49,
                              "A": 1
                          },
                          "Size": "12",
                          "Family": "inherit",
                          "Bold": false,
                          "Italic": false,
                          "UnderLine": false,
                          "HorizontalAlignment": "left",
                          "VerticalAlignment": "top",
                          "TempFontFamily": "맑은 고딕"
                      }
                  }
              },
              {
                  "Type": "DataGrid",
                  "Id": "DataGrid3A8F233394A3305654A27577F1BFBC5F",
                  "Name": "MAIN_GRID",
                  "Visible": true,
                  "Position": {
                      "Left": 3,
                      "Top": 107,
                      "Width": 1219,
                      "Height": 586,
                      "ZIndex": 6,
                      "TabIndex": 0,
                      "Docking": {
                          "Margin": "3",
                          "MinHeight": 0,
                          "MinWidth": 0,
                          "Left": true,
                          "Right": true,
                          "Bottom": true
                      }
                  },
                  "Style": {
                      "Type": 2,
                      "Border": {
                          "Thickness": "1,1,1,1"
                      },
                      "VerticalBorder": {
                          "Thickness": 1
                      },
                      "HorizontalBorder": {
                          "Thickness": 1
                      },
                      "Background": {
                          "Color": {
                              "R": 255,
                              "G": 255,
                              "B": 255,
                              "A": 1
                          }
                      },
                      "Font": {
                          "Bold": false,
                          "Color": {
                              "R": 0,
                              "G": 0,
                              "B": 0,
                              "A": 1
                          },
                          "Family": "맑은 고딕",
                          "HorizontalAlignment": "left",
                          "Italic": false,
                          "Size": 12,
                          "UnderLine": false,
                          "VerticalAlignment": "top"
                      }
                  },
                  "CellMargin": "5,5,5,5",
                  "SelectRule": 2,
                  "NaNCellText": "-",
                  "ColumnHeaderHeight": 28,
                  "RowHeight": 24,
                  "FontFamily": "inherit",
                  "FontSize": 12,
                  "UsePPTExport": false,
                  "FrozenLineBrush": {
                      "Type": 0,
                      "Color": {
                          "R": 127,
                          "G": 127,
                          "B": 127,
                          "A": 1
                      }
                  },
                  "Columns": [],
                  "UsePaging": true
              }
          ]
      }
  ],
  "MetaDataSources": {
      "MetaDataSources": []
  },
  "EXECUTION_PLANS": [],
  "Variables": [],
  "Modules": [],
  "ResponsiveLayout": [],
  "Langs": [],
  "WorkFlowModules": [],
  "WorkFlowInfo": "",
  "schModel": {},
  "WORK_FLOW": {
        "Version": 1,
        "UseEvent": true,
        "Nodes": [
            {
                "ID": "_ROOT_",
                "Type": "Report",
                "ModuleCode": "",
                "Name": "Report",
                "Description": "",
                "Left": 70,
                "Top": 70,
                "Width": 200,
                "Height": 207,
                "ControlType": "Report",
                "Collapsed": false,
                "IsEventActive": false,
                "Deprecated": false,
                "Parameters": [
                    {
                        "ID": "OnDocumentLoadComplete",
                        "Name": "OnDocumentLoadComplete",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnLoadComplete",
                        "Name": "OnLoadComplete",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnExecuteStart",
                        "Name": "OnExecuteStart",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnRefreshComplete",
                        "Name": "OnRefreshComplete",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnActiveSheetChange",
                        "Name": "OnActiveSheetChange",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnDestroy",
                        "Name": "OnDestroy",
                        "Value": null,
                        "Description": ""
                    },
                    {
                        "ID": "OnViewerSizeChanged",
                        "Name": "OnViewerSizeChanged",
                        "Value": null,
                        "Description": ""
                    }
                ]
            },
            {
                "ID": "MOD775229530F582264D86539EC3C45C0B2",
                "Type": "Module",
                "ModuleCode": "MOD775229530F582264D86539EC3C45C0B2",
                "Name": "새마을 금고 공통",
                "Description": "",
                "Left": 390,
                "Top": 90,
                "Width": 200,
                "Height": 74,
                "ControlType": "",
                "Collapsed": false,
                "IsEventActive": false,
                "Deprecated": false,
                "Parameters": []
            }
        ],
        "Links": [
            {
                "ID": "_ROOT_.OnDocumentLoadComplete~MOD775229530F582264D86539EC3C45C0B2",
                "From": "_ROOT_",
                "To": "MOD775229530F582264D86539EC3C45C0B2",
                "Type": 0,
                "FromParam": "OnDocumentLoadComplete"
            }
        ],
        "MAP_NODES": {},
        "MAP_LINKS": {}
    }
}