//-----------------------------------------------------in quest

var skillPositionX = [50,150,250,375,475,535,700,800,900];
var skillPositionY = 567;
var skillTargetX = [325,625,925];
var skillTargetY = 425;
var clothSkillX = [900,987,1075];
var clothSkillY = 317;
var enemyPositionX = [580,340,115];
var enemyPositionY = 42;
var currentStagePosition = [860,12,25,25];

var cardPositionX = [125,400,625,900,1175];
var cardPositionY = 517;
var ultPositionX = [400,625,900];
var ultPositionY = 125;

var spaceUltPositionX = [900,600,300];
var spaceUltPositionY = 450;
var spaceUltColor = 2;
var colorName = ["紅","藍","綠"];
//----------------------------------------------Battle main page
function useSkill(player,skill,target){
    if(!isScriptRunning){
        return;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    console.log("使用技能 從者 "+(player+1)+", 技能 "+(skill+1)+", 目標 "+(target+1));
    if(target == undefined || target < 0){
        target = 0;
    }
    tapScale(skillPositionX[player*3+skill],skillPositionY);
    sleep(1000);
    if(!isScriptRunning){
        return;
    }
    if(isBattleServantDialog()){        
        console.log("使用技能-無此技能");
        //skill null
        tapScale(1050,85);
    }
    else if(isBattleSkillFailedDialog()){
        //skill can not use
        console.log("使用技能-條件未達成，無法使用");
        tapScale(640,555);
    }
    else if(isBattleSkillDetailDialog()){
        //need confirm or in cd
        console.log("使用技能-確認畫面");
        tapScale(850,425);
        sleep(1000);
        if(isBattleSkillDetailDialog()){
            //in cd
            console.log("使用技能-技能無法使用");
            tapScale(400,425);
            return;
        }
    }

    if(!isScriptRunning){
        return;
    }if(isBattleSkillSpaceDialog()){
        if(spaceUltColor == undefined || spaceUltColor < 0 || spaceUltColor > 2){
            console.log("reset color "+spaceUltColor);
            spaceUltColor = 2;
        }
        console.log("使用技能-宇宙伊斯塔寶具顏色 "+colorName[spaceUltColor]);
        tapScale(spaceUltPositionX[spaceUltColor],spaceUltPositionY);
    }else if(isBattleSkillTargetDialog()){
            console.log("使用技能-選擇目標");
            selectSkillTarget(target);
    }else{
        console.log("使用技能-技能動畫中");
    }
}

function selectSkillTarget(player){
    if(!isScriptRunning){
        return;
    }
    for(var checkTarget = 0;checkTarget<3;checkTarget++){
        sleep(1000);
        if(!isBattleSkillTargetDialog()){
            return;
        }
        switch(checkTarget){
            case 0:
                console.log("選擇技能目標 "+(player+1));
                tapScale(skillTargetX[player],skillTargetY);
                break;
            case 1:
                console.log("從者不足三人，再次選擇");
                var offset = 150;
                if(player == 2){
                    offset = -150;
                }
                tapScale(skillTargetX[player]+offset,skillTargetY);
                break;
            case 2:
                console.log("從者僅剩一人，再次選擇");
                tapScale(skillTargetX[1],skillTargetY);
                break;
        }
    }
}

function useClothesSkill(skill,target1,target2){
    if(!isScriptRunning){
        return;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    console.log("使用衣服技能 "+(skill+1));
    tapScale(1200,317);
    sleep(1000);
    tapScale(clothSkillX[skill],clothSkillY);
    sleep(1000);
    if(isBattleSkillDetailDialog()){
        console.log("使用衣服技能-確認畫面");
        tapScale(850,425);
        sleep(500);
        if(isBattleSkillDetailDialog()){
            //in cd
            console.log("使用衣服技能-技能無法使用");
            tapScale(400,425);
            sleep(1000);
            tapScale(1200,317);
            return;
        }        
    }
    if(isBattleSkillTargetDialog()){
        if(target1 == undefined || target1 < 0){
            target1 = 0;
        }
        console.log("使用衣服技能-選擇目標");
        selectSkillTarget(target1);
    }else if(target1!=undefined && target2 !=undefined && target2 >= 0 && skill == 2){
        console.log("使用衣服技能-選擇換人目標");
        changePlayer(target1,target2);
    }
    sleep(1000);    
    if(isBattleServantDialog()){
        //skill null
        tapScale(1050,85);
        return;
    }
}

function selectEnemy(enemy){
    if(!isScriptRunning){
        return;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    console.log("選擇敵人 "+(enemy+1));
    tapScale(enemyPositionX[enemy],enemyPositionY);
}

function changePlayer(target1,target2){
    if(!isScriptRunning){
        return;
    }
    console.log("交換從者 "+(target1+1) +","+(target2+1));
    tapScale(138 +(200*target1),368);
    sleep(300);
    tapScale(138 +(200*target2),368);
    sleep(300);
    tapScale(650,630);
}

//-------------------------------------------------------Battle card apge
function startAttack(){ 
    if(!isScriptRunning){
        return;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    tapScale(1125,558);
    sleep(5000);
}

function selectCard(card){
    if(!isScriptRunning){
        return;
    }
    tapScale(cardPositionX[card],cardPositionY);
    sleep(500);
}

function useUlt(player){
    if(!isScriptRunning){
        return;
    }
    console.log("選擇寶具 從者"+(player+1));
    tapScale(ultPositionX[player],ultPositionY);
    sleep(1000);
    if(isBattleUltFailedDialog()){
        tapScale(640,440);
        sleep(500);
    }
}

//---------------------------------------------Battle next
function waitUntilPlayerCanMove(){
    //double check
    while(isScriptRunning){
        if(isBattleMainPage()){
            sleep(500);
            if(isBattleMainPage()){
                return true;
            }
        }
        sleep(500);
    }
    return false;
}

function waitUntilPlayerCanMoveOrFinish(){
    //double check
    while(isScriptRunning){
        if(isBattleMainPage()){
            sleep(1000);
            if(isBattleMainPage()){
                return true;
            }
        }
        if(isFinishBondPage()){
            return false;
        }
        if(isBattleStageFailedDialog()){
            sleep(1000);
            if(isBattleStageFailedDialog()){
                return false;
            }
        }
        sleep(1000);
    }
    return false;
}

function getCurrentStage(){
    var screenshot = getScreenshotResize();
    var crop = cropImage(screenshot,currentStagePosition[0],currentStagePosition[1],currentStagePosition[2],currentStagePosition[3]);
    var score = [];
    for(var i=0;i<3;i++){
        var stageImage = openImage(imagePath+"stage"+i+".png");
        score[i] = getIdentityScore(crop,stageImage);
        releaseImage(stageImage);
    }
    releaseImage(crop);
    releaseImage(screenshot);
    var result;
    if(score[0]>=score[1] && score[0]>=score[2]){
        result = 0;
    }else if(score[1]>=score[0] && score[1]>score[2]){
        result = 1;
    }else{
        result = 2;
    }
    return result;
}

function finishQuest(){
    while(isScriptRunning){
        if(isMainPage()){
            sleep(3000);
            return;
        }else if(isStageRestart()){
            sleep(1000);
            return;
        }
        tapScale(230,30);
        sleep(1500);
        if(isFinishDropDialoge() || isFinishNext()){
            tapScale(1100,660);
            sleep(1500);           
        } else if(isAddFriendPage()){
            tapScale(325,600);
            sleep(1500);
        } else if(isItemPage()){
            sleep(1000);
            if(isMainPage()){
                return;
            }
            sleep(2000);
            if(isItemPage()){
                sleep(1000);
                if(isMainPage()){
                    sleep(3000);
                    return;
                }
                tapScale(45,40);
                sleep(1500);
            }
        }
    }
}

function setSpaceUltColor(color){    
    spaceUltColor = color;
    console.log("設定宇宙伊斯塔寶具顏色 - "+colorName[spaceUltColor]);
}

loadApiCnt++;
console.log("Load in stage api finish");