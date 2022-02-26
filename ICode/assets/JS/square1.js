window.flag1 = 0;
window.judgeContainSquare1 = 0;
let self = this;
cc.Class({
    extends: cc.Component,

    properties: {
        Story1: {        //设置场景节点
            default: null,
            type: cc.Node
        },
        people: {
            default: null,
            type: cc.Node
        },
        sheep: {
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.square1Pos = cc.v2(-125, -295);  //记录节点的原始位置
        // this.square1Pos = cc.v2(0, 0);
        this.origin = this.node.convertToWorldSpace(cc.v2(0, 0));
        // 建立以当前节点为原点的世界坐标系，origin保存人的坐标
        this.node.setPosition(this.square1Pos.x, this.square1Pos.y);  //this.node为square1节点
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
    },
    touchStart(event) {
        let touchPos = event.getLocation();
        let posInNode = this.worldConvertLocalPoint(this.node, touchPos);
        let target = this.node.getContentSize();
        let rect = cc.rect(0, 0, target.width, target.height);
        if (rect.contains(posInNode)) {
            this.touchTile = this.node;
        }
        // this.cloneNode();
        this.node.clone = this.cloneNode();
        let big = cc.scaleTo(0.05, 6 / 5);
        let small = cc.scaleTo(0.05, 1);
        let seq = cc.sequence(big, small);
        this.node.clone.runAction(seq);
        let arrow = cc.find("Canvas/Main Camera/main/arrow");
        if (arrow) {
            console.log("1111");
        }
        arrow.getComponent(cc.Animation).play("arrow");
        this.node.clone.runAction(cc.sequence(big, small));
        // if (window.judgeContainSquare1 === 0) {
        //     this.node.clone.runAction(seq);
        // }

        // this.node.runAction(seq);
        // cc.log(posInNode);
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

        let correctValue = cc.v2(this.Story1.width * 2 / 5 - this.origin.x - this.node.width / 2 - 125, this.Story1.height / 3 - this.origin.y - this.node.height / 2 - 295);
        // 人物锚点坐标

        if (rect.contains(posInNode)) {
            window.flag1 = 1;
            window.judgeContainSquare1 = 1;
            let targetPos = this.Story1.convertToWorldSpace(cc.v2(correctValue));
            // 把人物锚点坐标转化为世界坐标
            let action = cc.moveTo(0.3, targetPos);
            this.touchTile.runAction(action);
            if (window.flag1 === 1 && window.flag2 === 1) {
                let barrier = cc.find("Canvas/Main Camera/main/Story1/barrier");
                barrier.opacity = 0;
                let sheep = cc.find("Canvas/Main Camera/main/square2");
                let hide = cc.fadeOut(0.1);
                this.node.runAction(hide);
                sheep.opacity = 0;
                // console.log(this.sheep.getParent().name);
                // console.log(sheep.name);
                // self.sheep.runAction(hide);
                console.log(this);
                this.Story1.getComponent(cc.Animation).play("story1");
            }
        } else {
            this.flag1 = 0;
            window.judgeContainSquare1 = 0;
            cc.log('--------goBack');
            let action = cc.moveTo(0.3, this.square1Pos);
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
        let node = cc.instantiate(this.people);
        let parentNode = cc.find("Canvas/Main Camera/main");
        parentNode.addChild(node);
        node.setPosition(-125, -295);
        return node;
    },

    start() {

    },



    // update (dt) {},
});
