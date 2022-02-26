

cc.Class({
    extends: cc.Component,

    properties: {
        Story3: {
            default: null,
            type: cc.Node,
        },
        sense: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.square4Pos = cc.v2(0, 0);
        this.origin = this.node.convertToWorldSpace(xcc.v2(0, 0));
        this.node.setPosition(this.square4Pos.x, this.square4Pos.y);
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
    },

    touchStart(event) {
        let touchPos = event.getLocation();
        let posInNode = this.worldConvertLocalPoint(this.node, touchPos);
        let target = this.Story1.getContentSize();
        let rect = cc.rect(0, 0, target.width, target.height);
        if (rect.contains(posInNode)) { }
    },

    touchMove(event) {
        if (this.touchTile) {
            this.touchTile.setPosition(this.touchTile.x + event.getDelta().x, this.touchTile.y + event.getDelta().y);
        }
    },

    touchEnd(event) {
        let touchPos = this.touchTile.convertToWorldSpace(cc.v2(0, 0));
        let posInNode = this.worldConvertLocalPoint(this.Story3, touchPos);
        let target = this.Story3.getContentSize();
        let rect = cc.rect(0, 0, target.width, target.height);

        if (rect.contains(posInNode)) {
            let barrier = cc.find("Canvas/Main Camera/main/Story3/barrier");
            let show = cc.fadeIn(0.1);

        }
    },

    worldConvertLocalPoint(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    },

    start() {

    },

    // update (dt) {},
});
