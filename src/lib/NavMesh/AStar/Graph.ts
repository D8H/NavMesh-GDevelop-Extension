import GridNode from "./GridNode";

    /**
     * A graph memory structure
     */
     export default abstract class Graph<NodeType extends GridNode> {
        nodes: Array<NodeType>;
        dirtyNodes: Array<NodeType> = [];
        diagonal: boolean;
  
        /**
         * A graph memory structure
         * @param {Array} gridIn 2D array of input weights
         * @param {Object} [options]
         * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
         */
        constructor(nodes: Array<NodeType>, options?: { diagonal?: boolean }) {
          options = options || {};
          this.nodes = nodes;
          this.diagonal = !!options.diagonal;
          this.init();
        }
  
        init() {
          this.dirtyNodes = [];
          for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clean();
          }
        }
  
        cleanDirty() {
          for (var i = 0; i < this.dirtyNodes.length; i++) {
            this.dirtyNodes[i].clean();
          }
          this.dirtyNodes = [];
        }
  
        markDirty(node: NodeType) {
          this.dirtyNodes.push(node);
        }
  
        abstract neighbors(node: NodeType): NodeType[];
      }