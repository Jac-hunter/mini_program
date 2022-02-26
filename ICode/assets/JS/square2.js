window.flag2 = 0;
window.judgeContainSquare2 = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        Story1: {        //设置场景节点
            default: null,
            type: cc.Node
        },
        target: {
            default: null,
            type: cc.Node,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.square2Pos = cc.v2(0, -300);  //记录节点的原始位置
        this.origin = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.node.setPosition(this.square2Pos.x, this.square2Pos.y);  //this.node为square1节点
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
        if (window.flag === 1 && window.flag2 === 1) {
            let barrier = cc.find("Canvas/Main Camera/main/Story1/barrier");
            this.target.opacity = 0;
            this.node.opacity = 0;
            barrier.opacity = 0;
        }
    },
    touchStart(event) {
        let touchPos = event.getLocation();
        let posInNode = this.worldConvertLocalPoint(this.node, touchPos);
        let target = this.node.getContentSize();
        let rect = cc.rect(0, 0, target.width, target.height);
        if (rect.contains(posInNode)) {
            this.touchTile = this.node;
        }
        this.node.clone = this.cloneNode();
        let big = cc.scaleTo(0.05, 6 / 5);
        let small = cc.scaleTo(0.05, 1);

        // cc.log(event.getLocation());
    },
    touchMove(event) {
        if (this.touchTile) {
            this.touchTile.setPosition(this.touchTile.x + event.getDelta().x, this.touchTile.y + event.getDelta().y);
        }
    },
    touchEnd() {
        let touchPos = this.touchTile.convertToWorldSpaceAR(cc.v2(0, 0));
        let posInNode = this.worldConvertLocalPoint(this.Story1, touchPos);
        let target = this.Story1.getContentSize();
        let rect = cc.rect(0, 0, target.width, target.height);

        let correctValue = cc.v2(this.Story1.width / 2 - this.origin.x - this.node.width / 2, this.Story1.height * 5 / 11 - this.origin.y - this.node.height / 2 - 300);
        if (rect.contains(posInNode)) {
            window.judgeContainSquare2 = 1;
            window.flag2 = 1;
            console.log("sheep in");
            let targetPos = this.Story1.convertToWorldSpace(cc.v2(correctValue));
            let action = cc.moveTo(0.3, targetPos);
            this.node.runAction(action);



            if (window.flag1 === 1 && window.flag2 === 1) {
                let barrier = cc.find("Canvas/Main Camera/main/Story1/barrier");
                let people = cc.find("Canvas/Main Camera/main/square1");
                barrier.opacity = 0;
                people.opacity = 0;
                this.target.opacity = 0;
                let hide = cc.fadeOut(0.1);
                this.node.runAction(hide);
                if (window.flag1 === 1) {
                    this.Story1.getComponent(cc.Animation).play("story1");
                    window.flag1 = 2;
                }

            }

        } else {
            window.judgeContainSquare2 = 0;
            window.flag2 = 0;
            cc.log('--------goBack');
            let action = cc.moveTo(0.3, this.square2Pos);
            this.touchTile.runAction(action);
        }
        this.touchTile = null;
    },
    worldConvertLocalPoint(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    },
    cloneNode: function () {
        let node = cc.instantiate(this.target);
        let parentNode = cc.find("Canvas/Main Camera/main");
        parentNode.addChild(node);
        node.setPosition(0, -300);
        return node;
    },
    start() {

    },

    // update (dt) {},
});
