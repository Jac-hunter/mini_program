window.flag3 = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        Story2:{        //设置场景节点
            default:null,
            type:cc.Sprite
        },

        target:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.square3Pos = cc.v2(125,-295);  //记录节点的原始位置
        this.node.setPosition(this.square3Pos.x,this.square3Pos.y);
        this.node.on("touchstart",this.touchStart,this);
        this.node.on("touchmove",this.touchMove,this);
        this.node.on("touchend",this.touchEnd,this);
    },
    touchStart(event){

        let touchPos = event.getLocation();
        let posInNode = this.worldConvertLocalPoint(this.node,touchPos);
        let target = this.node.getContentSize();
        let rect = cc.rect(0,0,target.width,target.height);
        if(rect.contains(posInNode)){
            this.touchTile = this.node;
        }

        cc.log(posInNode);
        // cc.log(event.getLocation());
    },
    touchMove(event){

        if(this.touchTile){
            this.touchTile.setPosition(this.touchTile.x+event.getDelta().x,this.touchTile.y+event.getDelta().y)
        }
    },
    touchEnd(){

        let touchPos = this.touchTile.convertToWorldSpaceAR(cc.v2(0,0));
        let posInNode = this.worldConvertLocalPoint(this.Story2,touchPos);
        let target = this.Story2.getContentSize();
        let rect = cc.rect(0,0,target.width,target.height);
        if(rect.contains(posInNode)){

            window.flag3 = 1;

        }else{
            window.flag3 = 0;
            cc.log('--------goBack');
            let action = cc.moveTo(0.3,this.square3Pos);
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
    start () {

    },


    //克隆节点：cc.instantiate()
    cloneNode:function () {
        let node = cc.instantiate(this.target);
        let parentNode = cc.find("Canvas/Main Camera/main");
        parentNode.addChild(node);
        node.setPosition(125,-295);
    }
    // update (dt) {},
});
