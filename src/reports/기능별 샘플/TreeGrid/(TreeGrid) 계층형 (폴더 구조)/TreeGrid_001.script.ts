import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { TreeGrid } from "@AUD_CLIENT/control/TreeGrid";
import { Tree } from "@AUD_CLIENT/control/Tree";

declare const Matrix: Matrix;

const TreeGrid: TreeGrid = Matrix.getObject("TreeGrid") as TreeGrid;
const Tree: Tree = Matrix.getObject("Tree") as Tree;

/**************************************
 * 트리컨트롤의 노드를 클릭했을때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.matrixTree.MTXTreeNode	Node (Readonly:False) : 선택된 노드
 **************************************/
const OnTreeNodeClick = function(_sender: any, args: any): void {
	if (args.Id == "Tree" && args.Node.Childs.length > 0) {
		if (args.Node.IsExpand) {
			args.Node.Collapsed(true);
		} else {
			args.Node.ExpandCollapsed();
		}
	}
};

export {
	OnTreeNodeClick
};
