import { ModCallback } from "isaac-typescript-definitions";
//import { printConsole } from "isaacscript-common";

import * as json from "json";
import { IRFconfig } from "./scripts/Config"
import { FFCompatibility } from "./scripts/FiendFolio";
import { SwampyCompatibility } from "./scripts/Swampy";
import { RevCompatibility } from "./scripts/Rev";
import { VanillaElseIfHell } from "./scripts/Vanilla"
import {IHateDelirium} from "./scripts/DeliriumHell"
import {ModConfig} from "./scripts/modConfigMenu"
import { printConsole } from "isaacscript-common";
interface DangerData {
  Danger: int | undefined;
  ZoneLink: unknown | undefined;
  IndicatorBrim: Entity[];
  Rotate: false;
  ambiguous: false
}

let ActiveEnemy = [] as Entity[];
let ActiveZone = [] as Entity[];
let SpecialActiveLaser = [] as Entity[];
declare const ModConfigMenu: unknown | undefined;
//Compatibility
declare const BetterMonsters: unknown | undefined;
declare const FiendFolio: unknown | undefined;
declare const SWAMPY: unknown | undefined;
declare const REVEL: unknown | undefined;

let debugEntity : Entity | undefined;
let debugSprite : Sprite | undefined;
let debugData : unknown | undefined;
let time = 0


main();

function Timer(){
  time++;
  //printConsole(`${time}`)
}

function debugComing (ent, sprite, data){
  if((ent.Type !== 406 && ent.Variant !== 1) &&  ent.Type !== 293){
    if(ent){
      debugEntity = ent
    }
    if(sprite){
      debugSprite = sprite
    }
    if(data){
      debugData = data
    }
  }

}

function LaserIndicator(ent, angle, mult: any[], position, r?, g?, b?, positionX?: any[]) {
  let data = ent.GetData() as DangerData;
  if(!positionX)
    positionX = [0,0,0,0,0,0,0,0]

  if(data.Danger == 1){
    for (let index = 0; index < data.IndicatorBrim.length; index++) {
      const indicator = data.IndicatorBrim[index];
      indicator.Position = Vector(ent.Position.X - positionX[index], ent.Position.Y - position)
      indicator.Color = Color.Lerp(indicator.Color,Color(r,g,b,2),0.2)
    }
    return;
  }
  else{
    let i = 0
    data.IndicatorBrim = [] as Entity[]
    for (let index = 0; index < mult.length; index++) {
      // let indicator = Isaac.Spawn(7, 7, 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
      let indicator = Isaac.Spawn(7, 7 , 0, Vector(ent.Position.X - positionX[index], ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
      // indicator.TearFlags = bitFlags(TearFlag.HOMING)
      indicator.Angle = angle * mult[index];
      indicator.Color = Color(r-1,g,b,0)
      //indicator.Parent = ent
      data.IndicatorBrim.push(indicator)
    }
    data.Danger = 1;
  }

}

function TargetLaserIndicator(ent, angle, mult: any[], position, r?, g?, b?) {
  let data = ent.GetData() as DangerData;
    if(data.Danger == 1){
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(ent.Position.X, ent.Position.Y - position)
        if(data.Rotate == true)
          indicator.Angle = angle + mult[index];
        indicator.Color = Color.Lerp(indicator.Color,Color(r,g,b,2),0.2)
      }
      return;
    }
    else{
      let i = 0
      data.IndicatorBrim = [] as Entity[]
      for (let index = 0; index < mult.length; index++) {
        // let indicator = Isaac.Spawn(7, 7, 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
        let indicator = Isaac.Spawn(7, 7 , 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
        // indicator.TearFlags = bitFlags(TearFlag.HOMING)
        indicator.Angle = angle + mult[index];
        indicator.Color = Color(r-1,g,b,0)
        //indicator.Parent = ent
        data.IndicatorBrim.push(indicator)
      }
      data.Danger = 1;
    }
}

function RemoveLaserIndicator(ent) {
  let data = ent.GetData() as DangerData;
  data.IndicatorBrim.forEach(indicator => {
    indicator.Remove()
  });
}

function AfterDedLaserIndicator(ent, angle, mult: any[], position) {
  let data = ent.GetData() as DangerData;
  if(data.Danger !== 1){
    data.IndicatorBrim = [] as Entity[]
    for (let index = 0; index < mult.length; index++) {
      let indicator = Isaac.Spawn(7, 7, 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
      // indicator.TearFlags = bitFlags(TearFlag.HOMING)
      indicator.Angle = angle * mult[index];
      indicator.Color = Color(1,0.0,0.0,0)
      indicator.Timeout = 20
      //indicator.Parent = ent
      data.IndicatorBrim.push(indicator)
    }
    data.Danger = 1;
  }
  if(data.Danger == 1){
    let nextTime = time + 10;
    for (let index = time; index < nextTime; index++) {
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(ent.Position.X, ent.Position.Y - position)
        indicator.Color = Color.Lerp(indicator.Color,Color(2,0.0,0.0,1),0.2)
      }
    }
  }
}

function postRender(){
  ActiveEnemy.forEach(ent => {
    let data = ent.GetData() as unknown as DangerData;
    let EntSprite = ent.GetSprite()
    debugComing(ent, EntSprite, data)
    if(ent.IsDead() || ent.Exists() == false){
      if(data.IndicatorBrim){
        RemoveLaserIndicator(ent)
      }
    }

    VanillaElseIfHell(ent, EntSprite, data, IRFconfig, LaserIndicator, RemoveLaserIndicator, AfterDedLaserIndicator, TargetLaserIndicator)
  });
  //! security
}


function postUpdate(){
  let entities = Isaac.GetRoomEntities();
  let enemy = [] as Entity[];
  if(entities.length === 0){
  //  DebugText = "no entity"
  } else {
    entities.forEach(ent => {
    if(ent.IsActiveEnemy(true) || (ent.Type == 4 && ent.Variant == 15)){
      //printConsole(`${ent}`)
      enemy.push(ent);
    }
  });
}
  ActiveEnemy = enemy;
}

//! clean data
function cleaner(){
  if(ActiveEnemy){
    //printConsole(`trigger enemy`)
    ActiveEnemy = []
  }
  if(ActiveZone){
    //printConsole(`trigger zone`)
    ActiveZone = []
  }
  time = 0
}


function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod("Not Coming Down!", 1);

  //! MOD CONFIG MENU
  //steal on another mod, idk how it's work
  function postGameStarted() {
    if (mod.HasData()) {
      const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
        string,
        any
      >;

      for (const [k, v] of pairs(loadedFromSave)) {
        IRFconfig[k] = v;
      }
    }
  }

  function preGameExit() {
    mod.SaveData(json.encode(IRFconfig));
  }


  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit)
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  if(ModConfigMenu !== undefined) {
      ModConfig(IRFconfig);
  }
  //! END MOD CONFIG MENU

  mod.AddCallback(ModCallback.POST_NEW_ROOM, cleaner)
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, cleaner)
  mod.AddCallback(ModCallback.POST_UPDATE, postRender);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate)
  mod.AddCallback(ModCallback.POST_UPDATE, Timer)
  mod.AddCallback(ModCallback.POST_RENDER, debugTextCOming)
}


function debugTextCOming(){
  if(IRFconfig.Debug == true){
    if(debugEntity !== undefined){
      Isaac.RenderText(`entity type : ${debugEntity.Type}, variant : ${debugEntity.Variant}, health : ${debugEntity.HitPoints}`, 50, 20, 255, 255, 255, 255)
      Isaac.RenderText(`entity position : ${debugEntity.Position} colision : ${debugEntity.GridCollisionClass}`, 50, 30, 255, 255, 255, 255)
      Isaac.RenderText(`npc state : ${debugEntity.ToNPC().State}, StateFrame : ${debugEntity.ToNPC().StateFrame}}`, 50, 40, 255, 255, 255, 255)
      Isaac.RenderText(`Target : ${debugEntity.Target} TargetPos : ${debugEntity.TargetPosition}}`, 50, 50, 255, 255, 255, 255)
      Isaac.RenderText(`angle calcul : ${ (debugEntity.Position - Isaac.GetPlayer().Position).GetAngleDegrees()}`, 50, 60, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity `, 50, 20, 255, 255, 255, 255)
    }
    if(debugSprite !== undefined){
      Isaac.RenderText(`Playing : ${debugSprite.GetAnimation()}, frame : ${debugSprite.GetFrame()}, rotation : ${debugSprite.Rotation}`, 50, 70, 255, 255, 255, 255)
      Isaac.RenderText(`FlipX : ${debugSprite.FlipX}, FlipY : ${debugSprite.FlipY}`, 50, 80, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity playing`, 50, 70, 255, 255, 255, 255)
    }
    if(debugEntity !== undefined){
      let npc = debugEntity.ToNPC().State
      if(npc == 1){Isaac.RenderText(`State 1 true`, 50, 90, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 1 false`, 50, 90, 255, 255, 255, 255)}}
      if(npc == 2){Isaac.RenderText(`State 2 true`, 50, 100, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 2 false`, 50, 100, 255, 255, 255, 255)}}
      if(npc == 3){Isaac.RenderText(`State 3 true`, 50, 110, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 3 false`, 50, 110, 255, 255, 255, 255)}}
      if(npc == 4){Isaac.RenderText(`State 4 true`, 50, 120, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 4 false`, 50, 120, 255, 255, 255, 255)}}
      if(npc == 5){Isaac.RenderText(`State 5 true`, 50, 130, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 5 false`, 50, 130, 255, 255, 255, 255)}}
      if(npc == 6){Isaac.RenderText(`State 6 true`, 50, 140, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 6 false`, 50, 140, 255, 255, 255, 255)}}
      if(npc == 7){Isaac.RenderText(`State 7 true`, 50, 150, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 7 false`, 50, 150, 255, 255, 255, 255)}}
      if(npc == 8){Isaac.RenderText(`State 8 true`, 50, 160, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 8 false`, 50, 160, 255, 255, 255, 255)}}
      if(npc == 9){Isaac.RenderText(`State 9 true`, 50, 170, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 9 false`, 50, 170, 255, 255, 255, 255)}}
      if(npc == 10){Isaac.RenderText(`State 10 true`, 50, 180, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 10 false`, 50, 180, 255, 255, 255, 255)}}
      if(npc == 11){Isaac.RenderText(`State 11 true`, 50, 190, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 11 false`, 50, 190, 255, 255, 255, 255)}}
      if(npc == 12){Isaac.RenderText(`State 12 true`, 50, 200, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 12 false`, 50, 200, 255, 255, 255, 255)}}
      if(npc == 13){Isaac.RenderText(`State 13 true`, 50, 210, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 13 false`, 50, 210, 255, 255, 255, 255)}}
      if(npc == 14){Isaac.RenderText(`State 14 true`, 50, 220, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 14 false`, 50, 220, 255, 255, 255, 255)}}
      if(npc == 15){Isaac.RenderText(`State 15 true`, 50, 230, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 15 false`, 50, 230, 255, 255, 255, 255)}}
      if(npc == 16){Isaac.RenderText(`State 16 true`, 50, 240, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 16 false`, 50, 240, 255, 255, 255, 255)}}
      if(npc == 17){Isaac.RenderText(`State 17 true`, 50, 250, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 17 false`, 50, 250, 255, 255, 255, 255)}}
      if(npc == 18){Isaac.RenderText(`State 18 true`, 50, 260, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 18 false`, 50, 260, 255, 255, 255, 255)}}
      // if(npc == 19){Isaac.RenderText(`State 1 true`, 50, 90, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 1 false`, 50, 90, 255, 255, 255, 255)}}
      // if(npc == 20){Isaac.RenderText(`State 1 true`, 50, 90, 255, 255, 255, 255)} else {{Isaac.RenderText(`State 1 false`, 50, 90, 255, 255, 255, 255)}}
    }else{
      Isaac.RenderText(`State`, 50, 90, 255, 255, 255, 255)
    }
  }
}








//function TracerIndicator(ent, angle, mult: any[], position, r?, g?, b?, positionX?: any[]) {
  //   let data = ent.GetData() as DangerData;
  //   if(!positionX)
  //     positionX = [0,0,0,0]

  //   if(data.Danger == 1){
  //     for (let index = 0; index < data.IndicatorBrim.length; index++) {
  //       const indicator = data.IndicatorBrim[index];
  //       indicator.Position = Vector(ent.Position.X - positionX[index], ent.Position.Y - position)
  //       // indicator.Color = Color.Lerp(indicator.Color,Color(r,g,b,2),0.2)
  //     }
  //     return;
  //   }
  //   else{
  //     let i = 0
  //     data.IndicatorBrim = [] as Entity[]
  //     for (let index = 0; index < mult.length; index++) {
  //       // let indicator = Isaac.Spawn(7, 7, 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
  //       let indicator = Isaac.Spawn(1000, 198, 0, Vector(10, 0).Rotated(90*mult[index]),  Vector(0.001,0), ent).ToEffect();
  //       indicator.Timeout = 30
  //       indicator.LifeSpan = 30
  //       indicator.Position = Vector(ent.Position.X - positionX[index], ent.Position.Y - position)

  //       // indicator.FollowParent(ent)
  //       indicator.TargetPosition = Vector(1,0).Rotated(90*mult[index])
  //       // if npc.SubType == 666 then
  //       //   tracer.SpriteScale = Vector(30,30)
  //       // else
  //       //   tracer.SpriteScale = Vector(2,2)
  //       // end
  //       indicator.Color = Color(r,g,b,0.3)
  //       indicator.Update()
  //       data.IndicatorBrim.push(indicator)
  //     }
  //     data.Danger = 1;
  //   }

  // }