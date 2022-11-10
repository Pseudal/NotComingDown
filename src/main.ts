import { EffectVariant, ModCallback, TearFlag } from "isaac-typescript-definitions";
//import { printConsole } from "isaacscript-common";

import * as json from "json";
import { IRFconfig } from "./scripts/Config"
import { FFCompatibility } from "./scripts/FiendFolio";
import { SwampyCompatibility } from "./scripts/Swampy";
import { RevCompatibility } from "./scripts/Rev";
import { VanillaElseIfHell } from "./scripts/Vanilla"
import {IHateDelirium} from "./scripts/DeliriumHell"
import {ModConfig} from "./scripts/modConfigMenu"
import { addFlag, bitFlags, printConsole } from "isaacscript-common";
interface DangerData {
  Danger: int | undefined;
  ZoneLink: unknown | undefined;
  IndicatorBrim: Entity[];
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
  printConsole(`${time}`)
}

function debugComing (ent, sprite, data){
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
function debugTextCOming(){
  if(IRFconfig.Debug == false){
    if(debugEntity !== undefined){
      Isaac.RenderText(`entity type : ${debugEntity.Type}, variant : ${debugEntity.Variant}, health : ${debugEntity.HitPoints}`, 50, 30, 255, 255, 255, 255)
      Isaac.RenderText(`entity position : ${debugEntity.Position} colision : ${debugEntity.GridCollisionClass}`, 50, 40, 255, 255, 255, 255)
      Isaac.RenderText(`npc state : ${debugEntity.ToNPC().State} v1 : ${debugEntity.ToNPC().V1}`, 50, 50, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity `, 50, 30, 255, 255, 255, 255)
    }
    if(debugSprite !== undefined){
      Isaac.RenderText(`Playing : ${debugSprite.GetAnimation()}, frame : ${debugSprite.GetFrame()}, rotation : ${debugSprite.Rotation}`, 50, 80, 255, 255, 255, 255)
      Isaac.RenderText(`FlipX : ${debugSprite.FlipX}, FlipY : ${debugSprite.FlipY}`, 50, 90, 255, 255, 255, 255)
    }else{
      Isaac.RenderText(`No entity playing`, 50, 80, 255, 255, 255, 255)
    }
  }
}

function LaserIndicator(ent, angle, mult: any[], position, r?, g?, b?) {
  let data = ent.GetData() as DangerData;

    if(data.Danger == 1){
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(ent.Position.X, ent.Position.Y - position)
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
        indicator.Angle = angle * mult[index];
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

    VanillaElseIfHell(ent, EntSprite, data, IRFconfig, LaserIndicator, RemoveLaserIndicator, AfterDedLaserIndicator)
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
    if(ent.IsActiveEnemy(true)){
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
