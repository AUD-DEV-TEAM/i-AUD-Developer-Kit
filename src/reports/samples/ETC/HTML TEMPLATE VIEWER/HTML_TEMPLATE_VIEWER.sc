{
  "ReportInfo": {
    "ReportCode": "HTML_TEMPLATE_VIEWER",
    "FolderCode": "FLD529700487588439380E5CCBE9AAF54FB",
    "SavePath": "FLD529700487588439380E5CCBE9AAF54FB/HTML_TEMPLATE_VIEWER.sc",
    "ReportName": "HTML TEMPLATE VIEWER",
    "Writer": "yglee",
    "WriteDate": "2025-07-17 16:03:17",
    "Editor": "yglee",
    "EditDate": "2025-07-17 16:03:17",
    "TabPosition": 0,
    "UseLayout": false,
    "UsePersonalConditions": true,
    "DocumentVersion": "3.0.0.0",
    "RefreshType": 0
  },
  "DataSources": {
    "Datas": [
      {
        "Id": "DS58F5D3831652419C8B35CF8DCC7AF8BA",
        "Name": "Data1",
        "UseMeta": "False",
        "UseCache": "False",
        "ConnectionCode": "MTXRPTY",
        "Encrypted": "True",
        "DSType": 2,
        "SQL": "2iGGjJZ19KF6TFw+/UaH+xtkspl8S/vYbehH2u7OLnrCsR1eQtF44seQek037B0bGnp60jhzloyoWBmllthLYJjh5QkZ8N0xtPtskZqO7se8s3aoLzprqGkxq8XkaDfmtEZ9gUHRT2/7tDcTD2AdHPp/3jtOV+Laf0Oi48A7VEDdG2OCLXpcEohUv6EJ/yiSBRgki7XV+sq4XKmimdwtxSfMKVMW+NDVanyXf1Jg4eVenj7bx7Jfz6Hf5SeahYfE+sav4pL7oiuT8LESgEa7yV9mXeVUwBSOAQIk5CzFQu12KgcAoiTBVcYwDosCcleifdkd58MbmX2NnIT2FRpUnAIdj6LhSED+QJnr20M22dfmg9CyrMavrpJkZwdsMCYe",
        "Params": [],
        "Columns": [
          {
            "Name": "ID",
            "Type": "Numeric"
          },
          {
            "Name": "품명",
            "Type": "String"
          },
          {
            "Name": "평형",
            "Type": "String"
          },
          {
            "Name": "구분",
            "Type": "String"
          },
          {
            "Name": "제조사",
            "Type": "String"
          },
          {
            "Name": "최소판매가",
            "Type": "Numeric"
          },
          {
            "Name": "최대판매가",
            "Type": "Numeric"
          }
        ]
      },
      {
        "Id": "DS1CA3D056F0F94B38A07DEDC852FE9570",
        "Name": "Data2",
        "UseMeta": "False",
        "UseCache": "False",
        "ConnectionCode": "MTXRPTY",
        "Encrypted": "True",
        "DSType": 2,
        "SQL": "OgeP/iNuBLqnWHiecvbNxwiOI9QS4H45/gj7waFu5I/AgDnqfcMunnRG0um6sNjZ",
        "Params": [],
        "Columns": [
          {
            "Name": "OPTION_CODE",
            "Type": "String"
          }
        ]
      }
    ]
  },
  "ScriptText": "/*****************************\r\n *\r\n *****************************/\r\nvar TemplateBinder = /** @class */ (function () {\r\n    function TemplateBinder() {\r\n    }\r\n    TemplateBinder.prototype.addCss = function (cssText) {\r\n        this.mStyle = document.createElement('style');\r\n        this.mStyle.textContent = cssText;\r\n        if (this.mGroup) {\r\n            parent.document.head.appendChild(this.mStyle);\r\n        }\r\n        else if (this.mWebView) {\r\n            var doc = this.mWebView.getDocument();\r\n            doc.head.appendChild(this.mStyle);\r\n        }\r\n    };\r\n    TemplateBinder.prototype.removeCss = function () {\r\n        if (this.mStyle) {\r\n            if (this.mGroup) {\r\n                parent.document.head.removeChild(this.mStyle);\r\n            }\r\n            else if (this.mWebView) {\r\n                var doc = this.mWebView.getDocument();\r\n                if (doc.head.childNodes) {\r\n                    for (var i = doc.head.childNodes.length - 1; i >= 0; i--) {\r\n                        if (doc.head.childNodes[i].tagName == \"STYLE\") {\r\n                            doc.head.removeChild(doc.head.childNodes[i]);\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    };\r\n    /**\r\n     * CSS 설정\r\n     * @param text\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.CSS = function (text) {\r\n        this.mcssText = text;\r\n        return this;\r\n    };\r\n    /**\r\n     * HTML 템플릿\r\n     * @param text\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.HTML = function (text) {\r\n        this.mHtmlText = text;\r\n        return this;\r\n    };\r\n    TemplateBinder.prototype.MODEL = function (model) {\r\n        this.Model = model;\r\n        return this;\r\n    };\r\n    TemplateBinder.prototype.NotifyOnChangeModel = function () {\r\n        if (this.OnChangeModel) {\r\n            this.OnChangeModel(this.Model);\r\n        }\r\n    };\r\n    /**\r\n     * 그리드\r\n     * @param grid\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.GRID = function (grid) {\r\n        var _this = this;\r\n        this.mGrid = grid;\r\n        this.mGrid.OnDataBindEnd = function (sender, args) {\r\n            var table = sender.getDataTable();\r\n            _this.Model = _this.tableToJSON(table);\r\n            _this.NotifyOnChangeModel();\r\n            _this.Build();\r\n        };\r\n        return this;\r\n    };\r\n    /**\r\n     * Browser\r\n     * @param grid\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.WEB_VIEW = function (webView) {\r\n        this.mWebView = webView;\r\n        if (this.mWebView) {\r\n            this.mWebView.Refresh();\r\n        }\r\n        return this;\r\n    };\r\n    /**\r\n     * 그룹\r\n     * @param group\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.GROUP = function (group) {\r\n        this.mGroup = group;\r\n        return this;\r\n    };\r\n    /**\r\n     *\r\n     * @param rows\r\n     */\r\n    TemplateBinder.prototype.Build = function () {\r\n        var _this_1 = this;\r\n        var _this = this;\r\n        if (!this.Model) {\r\n            return;\r\n        }\r\n        this.removeCss();\r\n        if (this.mcssText) {\r\n            this.addCss(this.mcssText);\r\n        }\r\n        var parser = new DOMParser();\r\n        var parsedDocument = parser.parseFromString(this.mHtmlText, 'text/html');\r\n        var fragment = document.createDocumentFragment();\r\n        Array.from(parsedDocument.body.children).forEach(function (child) {\r\n            fragment.appendChild(child);\r\n            _this.parseNode(child, fragment, _this_1.Model);\r\n        });\r\n        if (this.mGroup) {\r\n            // 그룹에 넣기\r\n            while (this.mGroup.Element.firstElementChild) {\r\n                this.mGroup.Element.removeChild(this.mGroup.Element.firstElementChild);\r\n            }\r\n            this.mGroup.Element.appendChild(fragment);\r\n        }\r\n        else if (this.mWebView) {\r\n            var doc = this.mWebView.getDocument();\r\n            while (doc.body.firstChild) {\r\n                doc.body.removeChild(doc.body.firstChild);\r\n            }\r\n            doc.body.appendChild(fragment);\r\n        }\r\n    };\r\n    /**\r\n     * DataTable를 JSON 형태로 가공합니다.\r\n     * @param table\r\n     * @returns\r\n     */\r\n    TemplateBinder.prototype.tableToJSON = function (table) {\r\n        var colNames = table.GetColumnNames();\r\n        var rows = [];\r\n        table.Rows.forEach(function (row) {\r\n            var rowData = {};\r\n            colNames.forEach(function (name) {\r\n                rowData[name] = row.GetValue(name);\r\n            });\r\n            rows.push(rowData);\r\n        });\r\n        return {\r\n            \"Rows\": rows,\r\n            \"Columns\": colNames\r\n        };\r\n    };\r\n    TemplateBinder.prototype.parseNode = function (node, pNode, data) {\r\n        var _this = this;\r\n        var model = data;\r\n        if (node.nodeName == \"#text\" && node.textContent) {\r\n            if (node.textContent.trim().length > 0) {\r\n                node.textContent = _this.calculateFormula(node, node.textContent, model);\r\n            }\r\n        }\r\n        else {\r\n            if (this.attributeBinding(node, pNode, model)) {\r\n                if (node.hasChildNodes()) {\r\n                    var child = void 0;\r\n                    for (var i = 0, i2 = node.childNodes.length; i < i2; i++) {\r\n                        child = node.childNodes[i];\r\n                        _this.parseNode(child, node, model);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    };\r\n    TemplateBinder.prototype.attributeBinding = function (node, pNode, model) {\r\n        if (!node) {\r\n            return true;\r\n        }\r\n        if (typeof node[\"getAttributeNames\"] !== \"function\") {\r\n            return true;\r\n        }\r\n        var attributes = node.getAttributeNames();\r\n        var name;\r\n        for (var i = 0, i2 = attributes.length; i < i2; i++) {\r\n            name = attributes[i];\r\n            switch (name) {\r\n                case \"binding\":\r\n                    var childModel = this.getModel(model, node.getAttribute(name));\r\n                    pNode.removeChild(node);\r\n                    node.removeAttribute(name);\r\n                    if (childModel) {\r\n                        this.parseNodeBinding(node, pNode, childModel);\r\n                    }\r\n                    return false;\r\n                case \"binding-if\":\r\n                    //조건 값에 의해 표시 여부\r\n                    model = this.getModel(model, node.getAttribute(name));\r\n                    if (!model) {\r\n                        pNode.removeChild(node);\r\n                        return;\r\n                    }\r\n                    node.removeAttribute(name);\r\n                    break;\r\n                default:\r\n                    //속성의 값이 binding이 있는지 여부\r\n                    var attrValue = this.calculateFormula(node, node.getAttribute(name), model);\r\n                    node.setAttribute(name, attrValue);\r\n                    break;\r\n            }\r\n        }\r\n        return true;\r\n    };\r\n    TemplateBinder.prototype.parseNodeBinding = function (bindingRoot, pNode, datas) {\r\n        var _this = this;\r\n        if (Array.isArray(datas)) {\r\n            var _loop_1 = function (i, i2) {\r\n                var model = datas[i];\r\n                var nNode = bindingRoot.cloneNode(true);\r\n                pNode.appendChild(nNode);\r\n                if (this_1.attributeBinding(nNode, pNode, model)) {\r\n                    if (nNode.hasChildNodes()) {\r\n                        //노드 하위\r\n                        nNode.childNodes.forEach(function (child) {\r\n                            _this.parseNode(child, nNode, model);\r\n                        });\r\n                    }\r\n                }\r\n            };\r\n            var this_1 = this;\r\n            for (var i = 0, i2 = datas.length; i < i2; i++) {\r\n                _loop_1(i, i2);\r\n            }\r\n        }\r\n        else if (typeof datas == \"object\") {\r\n            var _loop_2 = function (key) {\r\n                var model = datas[key];\r\n                var nNode = bindingRoot.cloneNode(true);\r\n                pNode.appendChild(nNode);\r\n                if (this_2.attributeBinding(nNode, pNode, model)) {\r\n                    if (nNode.hasChildNodes()) {\r\n                        //노드 하위\r\n                        nNode.childNodes.forEach(function (child) {\r\n                            _this.parseNode(child, nNode, model);\r\n                        });\r\n                    }\r\n                }\r\n            };\r\n            var this_2 = this;\r\n            for (var key in datas) {\r\n                _loop_2(key);\r\n            }\r\n        }\r\n    };\r\n    /**\r\n     * 현재 데이터에서 특정 객체를 반환 합니다.\r\n     * @param propPath\r\n     */\r\n    TemplateBinder.prototype.getModel = function (model, propPath) {\r\n        if (propPath == \".\") {\r\n            return model;\r\n        }\r\n        if (!propPath) {\r\n            return;\r\n        }\r\n        if (propPath.startsWith(\"/\")) {\r\n            model = this.Model;\r\n            propPath = propPath.substring(1);\r\n        }\r\n        var paths = propPath.split(\".\");\r\n        var result = model;\r\n        if (result == null || typeof result == \"undefined\") {\r\n            return;\r\n        }\r\n        var key;\r\n        for (var i = 0, i2 = paths.length; i < i2; i++) {\r\n            key = paths[i].trim();\r\n            if (key.length == 0) {\r\n                return;\r\n            }\r\n            if (result.hasOwnProperty(key)) {\r\n                result = result[key];\r\n            }\r\n            else if (typeof result[key] !== \"undefined\") {\r\n                result = result[key];\r\n            }\r\n            else {\r\n                return;\r\n            }\r\n        }\r\n        return result;\r\n    };\r\n    /**\r\n     * {=model.datas} 와 같은 항목 찾기\r\n     * @param text\r\n     * @param callback\r\n     */\r\n    TemplateBinder.prototype.calculateFormula = function (node, text, data) {\r\n        if (!text) {\r\n            return null;\r\n        }\r\n        var _this = this;\r\n        if (text.indexOf(\"{=\") >= 0 && text.indexOf(\"}\") >= 0) {\r\n            var resultText_1 = \"\";\r\n            var value_1;\r\n            this.braceFormulaTokenizer(text, function (token) {\r\n                if (token.substring(0, 2) == \"{=\" && token.substring(token.length - 1) == \"}\") {\r\n                    var formula = token.substring(2, token.length - 1);\r\n                    value_1 = _this.getModel(data, formula);\r\n                    if (typeof value_1 !== \"undefined\") {\r\n                        //모델의 값이면\r\n                        if (value_1 != null) {\r\n                            resultText_1 += value_1;\r\n                        }\r\n                    }\r\n                    else {\r\n                        //수식인가?\r\n                        value_1 = _this.executeFunction(node, formula, data);\r\n                        if (value_1) {\r\n                            resultText_1 += value_1;\r\n                        }\r\n                    }\r\n                }\r\n                else {\r\n                    resultText_1 += token;\r\n                }\r\n            });\r\n            return resultText_1;\r\n        }\r\n        else {\r\n            return text;\r\n        }\r\n    };\r\n    TemplateBinder.prototype.isValidIdentifier = function (str) {\r\n        var identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;\r\n        var reservedWords = new Set([\r\n            \"break\", \"case\", \"catch\", \"class\", \"const\", \"continue\", \"debugger\", \"default\",\r\n            \"delete\", \"do\", \"else\", \"export\", \"extends\", \"finally\", \"for\", \"function\",\r\n            \"if\", \"import\", \"in\", \"instanceof\", \"new\", \"return\", \"super\", \"switch\", \"this\",\r\n            \"throw\", \"try\", \"typeof\", \"var\", \"void\", \"while\", \"with\", \"yield\", \"let\", \"static\",\r\n            \"enum\", \"await\", \"implements\", \"package\", \"protected\", \"interface\", \"private\", \"public\"\r\n        ]);\r\n        return identifierRegex.test(str) && !reservedWords.has(str);\r\n    };\r\n    TemplateBinder.prototype.executeFunction = function (node, formula, context) {\r\n        try {\r\n            var script = [];\r\n            script.push(\"var _CONTEXT_ = arguments[0];\");\r\n            if (context && typeof context === \"object\") {\r\n                for (var key in context) {\r\n                    if (!this.isValidIdentifier(key)) {\r\n                        if (typeof context[key] === \"function\") {\r\n                            //script.push(\"var \" + key + \"=\" +  context[key].toString() );\r\n                        }\r\n                        else {\r\n                            script.push(\"var \" + key + \"=  _CONTEXT_['\" + key + \"'];\");\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            script.push(\"return \" + formula + \";\");\r\n            var func = new Function(script.join(\"\\n\"));\r\n            return func(context);\r\n        }\r\n        catch (e) {\r\n            /*if(node.nodeName == \"#text\" && node.textContent){\r\n                if(node.textContent.trim().length > 0){\r\n                    node.textContent = e.message;\r\n                }\r\n            }*/\r\n            return \"N/A\";\r\n        }\r\n    };\r\n    /**\r\n     * {=model.datas} 와 같은 항목 찾는 tokenizer\r\n     * @param text\r\n     * @param callback\r\n     */\r\n    TemplateBinder.prototype.braceFormulaTokenizer = function (text, callback) {\r\n        var pos = 0;\r\n        var tmp = \"\";\r\n        var c;\r\n        var getNextChar = function () {\r\n            if (pos + 1 < text.length) {\r\n                return text.charAt(pos + 1);\r\n            }\r\n            else {\r\n                return \"\";\r\n            }\r\n        };\r\n        var readToEndBrace = function () {\r\n            var result = \"\";\r\n            while (pos < text.length) {\r\n                pos++;\r\n                c = text.charAt(pos);\r\n                if (c == \"}\") {\r\n                    return result;\r\n                }\r\n                else {\r\n                    result += c;\r\n                }\r\n            }\r\n            return result;\r\n        };\r\n        while (pos < text.length) {\r\n            c = text.charAt(pos);\r\n            switch (c) {\r\n                case '{':\r\n                    if (getNextChar() == \"=\") {\r\n                        if (tmp.length > 0) {\r\n                            callback(tmp);\r\n                        }\r\n                        tmp = \"{\" + readToEndBrace() + \"}\";\r\n                        callback(tmp);\r\n                        tmp = \"\";\r\n                    }\r\n                    else {\r\n                        tmp += \"{\";\r\n                    }\r\n                    break;\r\n                default:\r\n                    tmp += c;\r\n                    break;\r\n            }\r\n            pos++;\r\n        }\r\n        if (tmp) {\r\n            callback(tmp);\r\n        }\r\n    };\r\n    return TemplateBinder;\r\n}());\r\n/*\r\n\r\n<div style=\"width:100%;\">\r\n  <table class=\"pretty-table\">\r\n    <thead>\r\n      <tr>\r\n        <th>Code</th>\r\n        <th>Value</th>\r\n        <th>Description</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n        \r\n        <tr Binding=\"/Rows\" onclick=\"alert('{=FOLDER_CODE}');\">\r\n            <td Binding=\"/Columns\">{=FOLDER_CODE}</td>\r\n        </tr>\r\n        \r\n    </tbody>\r\n  </table>\r\n</div>\r\n\r\n*/\r\nvar tbxCSS = Matrix.getObject(\"tbxCSS\");\r\nvar tbxHTML = Matrix.getObject(\"tbxHTML\");\r\nvar tbxModel = Matrix.getObject(\"tbxModel\");\r\nvar dataView = Matrix.getObject(\"dataView\");\r\nvar webView = Matrix.getObject(\"webView\");\r\nvar btnExecute = Matrix.getObject(\"btnExecute\");\r\nvar templateViewer = new TemplateBinder().GRID(dataView).WEB_VIEW(webView);\r\ntemplateViewer.OnChangeModel = function (model) {\r\n    //tbxModel.Text = JSON.stringify(model, null, \"  \");\r\n};\r\nvar FORMAT = function (v, context) {\r\n    return v;\r\n};\r\nvar BUILD_TEMPLATE = function () {\r\n    templateViewer.CSS(tbxCSS.Text)\r\n        .HTML(tbxHTML.Text)\r\n        .Build();\r\n};\r\ntbxCSS.OnTextChange = function () {\r\n    BUILD_TEMPLATE();\r\n};\r\ntbxHTML.OnTextChange = function () {\r\n    BUILD_TEMPLATE();\r\n};\r\nbtnExecute.OnClick = function () {\r\n    var model = JSON.parse(tbxModel.Text);\r\n    model[\"GET_DATA\"] = function (row) {\r\n    };\r\n    //templateViewer.MODEL(JSON.parse(tbxModel.Text));\r\n    BUILD_TEMPLATE();\r\n};\r\nBUILD_TEMPLATE();\r\n",
  "ServerScriptText": [],
  "Forms": [
    {
      "Id": "Form298ACB9612E4D7779D4298536B3EC18A",
      "Name": "Form1",
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
          "Formula": "",
          "IsReadOnly": false,
          "MaxLength": 0,
          "MxBinding": "",
          "Value": " body {\n      font-family: 'Segoe UI', sans-serif;\n      margin: 0px;\n    }\n\n    .table-wrapper {\n      height: 300px; /* 고정 높이 설정 */\n      overflow-y: auto;\n    }\n\n    table.pretty-table {\n      width: 100%;\n      border-collapse: collapse;\n      background-color: white;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    }\n\n    table.pretty-table thead {\n      background-color: #2f80ed;\n      color: white;\n      position: sticky;\n      top: 0;\n      z-index: 1;\n    }\n\n    table.pretty-table th,\n    table.pretty-table td {\n      padding: 5px 5px;\n      text-align: left;\n    }\n\n    table.pretty-table tbody tr {\n      border-bottom: 1px solid #e0e0e0;\n    }\n\n    table.pretty-table tbody tr:hover {\n      background-color: #f1f9ff;\n    }\n\n    table.pretty-table th {\n      font-weight: 600;\n    }\n\n    table.pretty-table td {\n      color: #333;\n    }\n\n    @media (max-width: 768px) {\n      table.pretty-table th,\n      table.pretty-table td {\n        padding: 5px 5px;\n      }\n    }",
          "Text": " body {\n      font-family: 'Segoe UI', sans-serif;\n      margin: 0px;\n    }\n\n    .table-wrapper {\n      height: 300px; /* 고정 높이 설정 */\n      overflow-y: auto;\n    }\n\n    table.pretty-table {\n      width: 100%;\n      border-collapse: collapse;\n      background-color: white;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    }\n\n    table.pretty-table thead {\n      background-color: #2f80ed;\n      color: white;\n      position: sticky;\n      top: 0;\n      z-index: 1;\n    }\n\n    table.pretty-table th,\n    table.pretty-table td {\n      padding: 5px 5px;\n      text-align: left;\n    }\n\n    table.pretty-table tbody tr {\n      border-bottom: 1px solid #e0e0e0;\n    }\n\n    table.pretty-table tbody tr:hover {\n      background-color: #f1f9ff;\n    }\n\n    table.pretty-table th {\n      font-weight: 600;\n    }\n\n    table.pretty-table td {\n      color: #333;\n    }\n\n    @media (max-width: 768px) {\n      table.pretty-table th,\n      table.pretty-table td {\n        padding: 5px 5px;\n      }\n    }",
          "Type": "RichTextBox",
          "Id": "RichTextBoxE0B7068DE34D5B689207A27BFEB94987",
          "Name": "tbxCSS",
          "Position": {
            "Left": 7,
            "Top": 489,
            "Width": 334,
            "Height": 495,
            "ZIndex": 4,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": false,
              "Top": false,
              "Bottom": true,
              "Margin": "0,0,0,0",
              "HoldSize": false,
              "MinWidth": 0,
              "MinHeight": 0
            }
          },
          "Style": {
            "Type": 2,
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
              "Size": 13,
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
          "Id": "DataGridDFA7B0DE54721F7293CE85CA344D5E1B",
          "Name": "dataView",
          "Visible": true,
          "Position": {
            "Left": 1067,
            "Top": 48,
            "Width": 500,
            "Height": 333,
            "ZIndex": 5,
            "TabIndex": 0,
            "Docking": {
              "Margin": "0,0,0,0",
              "MinHeight": 0,
              "MinWidth": 0
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
          "DataSource": "DS58F5D3831652419C8B35CF8DCC7AF8BA",
          "SelectRule": 2,
          "NaNCellText": "-",
          "ColumnHeaderHeight": 28,
          "RowHeight": 24,
          "ExportCount": 1000000,
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
          "Columns": [
            {
              "Name": "FOLDER_CODE",
              "Caption": "FOLDER_CODE",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "FOLDER_NAME",
              "Caption": "FOLDER_NAME",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "FOLDER_DEPTH",
              "Caption": "FOLDER_DEPTH",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "ColumnType": 3,
              "DataType": 0,
              "HeaderPosition": "center",
              "TextPosition": "end",
              "DisplaySubTotalType": "Hidden",
              "CalcSubTotalType": "Sum"
            },
            {
              "Name": "PARENT_FOLDER_CODE",
              "Caption": "PARENT_FOLDER_CODE",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "FOLDER_SEQ",
              "Caption": "FOLDER_SEQ",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "ColumnType": 3,
              "DataType": 0,
              "HeaderPosition": "center",
              "TextPosition": "end",
              "DisplaySubTotalType": "Hidden",
              "CalcSubTotalType": "Sum"
            },
            {
              "Name": "FOLDER_PATH",
              "Caption": "FOLDER_PATH",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "OWNER_CODE",
              "Caption": "OWNER_CODE",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "FOLDER_DESC",
              "Caption": "FOLDER_DESC",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "CREATE_DATE",
              "Caption": "CREATE_DATE",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            },
            {
              "Name": "MODIFY_DATE",
              "Caption": "MODIFY_DATE",
              "Width": 100,
              "Validator": {
                "ValidateType": 8,
                "UseGuideMessage": true,
                "GuideLanguageCode": "",
                "UseErrorMessage": true,
                "ErrorLanguageCode": ""
              },
              "HeaderPosition": "center"
            }
          ],
          "UsePaging": true
        },
        {
          "Formula": "",
          "IsReadOnly": false,
          "MaxLength": 0,
          "MxBinding": "",
          "Value": "&lt;div style=\"width:100%;\"&gt;\n  &lt;table class=\"pretty-table\"&gt;\n    &lt;thead&gt;\n      &lt;tr&gt;\n        &lt;th Binding=\"Columns\"&gt;{=.}&lt;/th&gt;\n      &lt;/tr&gt;\n    &lt;/thead&gt;\n    &lt;tbody&gt;\n\t\t\n\t\t&lt;tr Binding=\"Rows\" onclick=\"alert('{=FOLDER_CODE}');\"&gt;\t\t\t\n                        \n\t\t\t&lt;td Binding=\".\"&gt;{=.} {=FORMAT()}&lt;/td&gt;\t\t\t\n\t\t&lt;/tr&gt;\n\t\t\n    &lt;/tbody&gt;\n  &lt;/table&gt;\n&lt;/div&gt;",
          "Text": "&lt;div style=\"width:100%;\"&gt;\n  &lt;table class=\"pretty-table\"&gt;\n    &lt;thead&gt;\n      &lt;tr&gt;\n        &lt;th Binding=\"Columns\"&gt;{=.}&lt;/th&gt;\n      &lt;/tr&gt;\n    &lt;/thead&gt;\n    &lt;tbody&gt;\n\t\t\n\t\t&lt;tr Binding=\"Rows\" onclick=\"alert('{=FOLDER_CODE}');\"&gt;\t\t\t\n                        \n\t\t\t&lt;td Binding=\".\"&gt;{=.} {=FORMAT()}&lt;/td&gt;\t\t\t\n\t\t&lt;/tr&gt;\n\t\t\n    &lt;/tbody&gt;\n  &lt;/table&gt;\n&lt;/div&gt;",
          "Type": "RichTextBox",
          "Id": "RichTextBoxC09B9876D796D0F8727D8E4A9570857C",
          "Name": "tbxHTML",
          "Position": {
            "Left": 348,
            "Top": 489,
            "Width": 406,
            "Height": 495,
            "ZIndex": 5,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": false,
              "Top": false,
              "Bottom": true,
              "Margin": "0,0,0,0",
              "HoldSize": false,
              "MinWidth": 0,
              "MinHeight": 0
            }
          },
          "Style": {
            "Type": 2,
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
              "Size": 13,
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
          "DataSource": "DS1CA3D056F0F94B38A07DEDC852FE9570",
          "EditValue": "SCHEMATYPE,DOUBLEARCH,NAMERULE,CONNECTPRIV,CHECK_AUTH,UPPERCASE,OLAP_DAEMON,AUTHGROUP,CREATEDT,IBIGVERSION,IBIGURL,ISTREAMURL,SQLEXEC,DISABLE_TRACE_LOG,REPORT_CATALOG_VERSION,MTX_JCM_URL,LOGIN_LIMIT_CNT,CERT_CLASS_NAME,MX_GRID_LIMIT_OF_SHEETS,MX_GRID_LIMIT_OF_COLUMNS,MX_GRID_LIMIT_OF_ROWS,HWP_EXPORT_COLUMN_LIMIT,HWP_EXPORT_ROW_LIMIT,DOCX_EXPORT_COLUMN_LIMIT,DOCX_EXPORT_ROW_LIMIT,XLSX_EXPORT_COLUMN_LIMIT,XLSX_EXPORT_ROW_LIMIT,DRM_DECRYPT_URL,FILE_UPLOAD_MAX,QUERYJOB_MONITOR,USE_MOBILE_LAYOUT,DEPLOYE_AUTH_IP,DEPLOYE_AUTH_USER,DEPLOYE_OPTION,DEPLOYE_URL,DIALOG_LANG_PROCESS_TYPE,BAK_VERSION,SCHEDULE_ADD_REPORT_CODE,SCHEDULE_MAIL_REPORT_CODE,SCHEDULE_MAIL_SERVER_SCRIPT_NAME,METACUBEURL,VALIDKEY,META_TEST_URL,TEMP_PATH,FILE_DIALOG_URL,PERMIT_ALL_SHARE_PATHS,REPORTPATH,LOGSET,USE_PRIVATE_AUTH_KEY,SCRIPT_ACCES_FOLDERS",
          "CaptionText": "(+)SCHEMATYPE",
          "InitType": 0,
          "InitValue": "",
          "RefreshType": 1,
          "IsReadOnly": false,
          "SortType": 0,
          "AutoRefresh": true,
          "AfterRefresh": "DataGrid",
          "ClearTargetData": false,
          "IsMultiSelect": true,
          "AutoChildSelect": false,
          "LeafNodeOnly": false,
          "HideCheckBox": false,
          "AutoExpandLevel": 0,
          "IndentSize": 15,
          "EmptyValue": "(null)",
          "TreeViewType": 1,
          "DialogWidth": 500,
          "DialogHeight": 320,
          "UsedSelectAllQueryParamValue": true,
          "CheckedAll": false,
          "EditableValueText": false,
          "CacheExpiryTime": 0,
          "UseSelectedAllText": false,
          "DataSourceInfo": {
            "ParentField": "",
            "ChildField": "",
            "CaptionField": "OPTION_CODE",
            "ValueField": "OPTION_CODE",
            "ImageField": "",
            "TooltipField": ""
          },
          "Type": "MultiComboBox",
          "Id": "MultiComboBoxE415DBA5DBE13E7C23F97FBD2DE33ABC",
          "Name": "VS_option_code",
          "Position": {
            "Left": 1071,
            "Top": 10,
            "Width": 120,
            "Height": 23,
            "ZIndex": 5,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": false,
              "Top": false,
              "Bottom": false,
              "Margin": "0,0,0,0",
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
              "VerticalAlignment": "middle",
              "TempFontFamily": "맑은 고딕"
            }
          }
        },
        {
          "TargetURL": "",
          "AutoRefresh": true,
          "DoRefresh": true,
          "Type": "WebContainer",
          "Id": "WebContainerBBCD69846E6CDCE7F514060D5D6B93AB",
          "Name": "webView",
          "Position": {
            "Left": 12,
            "Top": 28,
            "Width": 1036,
            "Height": 424,
            "ZIndex": 5,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": false,
              "Top": false,
              "Bottom": false,
              "Margin": "0,0,0,0",
              "HoldSize": false,
              "MinWidth": 0,
              "MinHeight": 0
            }
          },
          "Style": {
            "Type": 2,
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
              "LineType": "none",
              "Thickness": "1,1,1,1",
              "CornerRadius": "0,0,0,0"
            },
            "Font": {
              "Color": {
                "R": 0,
                "G": 0,
                "B": 0,
                "A": 1
              },
              "Size": 12,
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
          "Formula": "",
          "IsReadOnly": false,
          "MaxLength": 0,
          "MxBinding": "",
          "Value": "",
          "Text": "",
          "Type": "RichTextBox",
          "Id": "RichTextBox329A06820113C1C1C8296BF541105AD7",
          "Name": "tbxModel",
          "Position": {
            "Left": 762,
            "Top": 491,
            "Width": 975,
            "Height": 493,
            "ZIndex": 6,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": true,
              "Top": false,
              "Bottom": true,
              "Margin": "0,0,0,0",
              "HoldSize": false,
              "MinWidth": 0,
              "MinHeight": 0
            }
          },
          "Style": {
            "Type": 2,
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
              "Size": 13,
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
          "LanguageCode": "",
          "Value": "실행",
          "Cursor": "pointer",
          "MouseOver": {
            "UseYn": false,
            "BoxStyle": ""
          },
          "MouseDown": {
            "UseYn": false,
            "BoxStyle": ""
          },
          "Shadow": {
            "UseYn": false,
            "ColorR": 0,
            "ColorG": 0,
            "ColorB": 0,
            "ColorA": 1,
            "HLeng": 10,
            "VLeng": 10,
            "BlurRadius": 0,
            "SpreadRadius": 0,
            "Inset": false
          },
          "HasNewRadius": true,
          "Type": "Button",
          "Id": "Button5631340BB28CC491847D4855C403B131",
          "Name": "btnExecute",
          "Position": {
            "Left": 1096,
            "Top": 466,
            "Width": 60,
            "Height": 23,
            "ZIndex": 6,
            "TabIndex": 0,
            "Docking": {
              "Left": false,
              "Right": false,
              "Top": false,
              "Bottom": false,
              "Margin": "0,0,0,0",
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
                "R": 46,
                "G": 87,
                "B": 160,
                "A": 1
              }
            },
            "Border": {
              "Color": {
                "R": 12,
                "G": 56,
                "B": 134,
                "A": 1
              },
              "LineType": "solid",
              "Thickness": "1,1,1,1",
              "CornerRadius": "4,4,4,4"
            },
            "Font": {
              "Color": {
                "R": 255,
                "G": 255,
                "B": 255,
                "A": 1
              },
              "Size": "12",
              "Family": "inherit",
              "Bold": false,
              "Italic": false,
              "UnderLine": false,
              "HorizontalAlignment": "center",
              "VerticalAlignment": "middle",
              "TempFontFamily": "맑은 고딕"
            }
          }
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
  "PersonalConditions": {
    "list": [],
    "useAll": true
  }
}