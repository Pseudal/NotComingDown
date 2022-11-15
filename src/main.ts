import { ModCallback } from "isaac-typescript-definitions";
//import { printConsole } from "isaacscript-common";

import * as json from "json";
import { IRFconfig } from "./scripts/Config";
import { ModConfig } from "./scripts/modConfigMenu";
import { VanillaElseIfHell } from "./scripts/Vanilla";
interface DangerData {
  Danger: int | undefined;
  IndicatorBrim: Entity[];
  Mega: unknown | false;
  Rotate: unknown | false;
  ambiguous: unknown | false;
}

let ActiveEnemy = [] as Entity[];
declare const ModConfigMenu: unknown | undefined;
//Compatibility
// declare const FiendFolio: unknown | undefined;
// declare const SWAMPY: unknown | undefined;
// declare const REVEL: unknown | undefined;

main();

let time = 0;
function Timer() {
  time++;
}

function LaserIndicator(
  ent,
  angle,
  mult: any[],
  position,
  weirdHitbox,
  r?,
  g?,
  b?,
  positionX?: any[],
) {
  let data = ent.GetData() as DangerData;
  if (!positionX) positionX = [0, 0, 0, 0, 0, 0, 0, 0];
  if(IRFconfig.Hitbox == true && weirdHitbox == true)position = 0;

  if (IRFconfig.Laser == true) {
    if (data.Danger == 1) {
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(
          ent.Position.X - positionX[index],
          ent.Position.Y - position,
        );
        indicator.Color = Color.Lerp(indicator.Color, Color(r, g, b, 2), 0.2);
      }
      return;
    } else {
      let i = 0;
      data.IndicatorBrim = [] as Entity[];
      for (let index = 0; index < mult.length; index++) {
        let indicator = Isaac.Spawn(
          7,
          7,
          0,
          Vector(ent.Position.X - positionX[index], ent.Position.Y - position),
          Vector(0, 0).Rotated(0),
          undefined,
        ).ToLaser();
        if(IRFconfig.Hitbox == true && weirdHitbox == true){indicator.RenderZOffset = -6999;}
        // indicator.TearFlags = bitFlags(TearFlag.HOMING)
        indicator.Angle = angle * mult[index];
        indicator.Color = Color(r - 1, g, b, 0);
        data.IndicatorBrim.push(indicator);
      }
      data.Danger = 1;
    }
  } else {
    if (data.Danger == 1) {
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(
          ent.Position.X - positionX[index],
          ent.Position.Y - (position - 20),
        );
      }
      return;
    } else {
      let i = 0;
      data.IndicatorBrim = [] as Entity[];
      for (let index = 0; index < mult.length; index++) {
        // let indicator = Isaac.Spawn(7, 7, 0, Vector(ent.Position.X, ent.Position.Y - position),  Vector(0,0).Rotated(0), undefined).ToLaser();
        let indicator = Isaac.Spawn(
          1000,
          198,
          0,
          Vector(10, 10).Rotated(angle * mult[index]),
          Vector(0.001, 0),
          ent,
        ).ToEffect();
        if(IRFconfig.Hitbox == true && weirdHitbox == true){indicator.RenderZOffset = -6999;}
        indicator.Timeout = 30;
        indicator.LifeSpan = 30;
        if (data.Mega == true) {
          indicator.SpriteScale = Vector(10, 10);
        } else {
          indicator.SpriteScale = Vector(1, 1);
        }

        indicator.Position = Vector(
          ent.Position.X - positionX[index],
          ent.Position.Y - (position - 20),
        );

        // indicator.FollowParent(ent)
        indicator.TargetPosition = Vector(1, 0).Rotated(angle * mult[index]);
        indicator.Color = Color(r, g, b, 0.5);
        indicator.Update();
        data.IndicatorBrim.push(indicator);
      }
      data.Danger = 1;
    }
  }
}

function TargetLaserIndicator(
  ent,
  angle: any[],
  mult: any[],
  position,
  weirdHitbox,
  r?,
  g?,
  b?,
  positionX?: any[],
) {
  let data = ent.GetData() as DangerData;
  if (!positionX) positionX = [0, 0, 0, 0, 0, 0, 0, 0];
  if(IRFconfig.Hitbox == true && weirdHitbox == true)position = 0;

  if (IRFconfig.Laser == true) {

    if (data.Danger == 1) {

      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(
          ent.Position.X - positionX[index],
          ent.Position.Y - position,
        );
        if (data.Rotate == true) indicator.Angle = angle[index] + mult[index];
        indicator.Color = Color.Lerp(indicator.Color, Color(r, g, b, 2), 0.2);
      }
      return;

    } else {

      let i = 0;
      data.IndicatorBrim = [] as Entity[];
      for (let index = 0; index < mult.length; index++) {
        let indicator = Isaac.Spawn(
          7,
          7,
          0,
          Vector(ent.Position.X - positionX[index], ent.Position.Y - position),
          Vector(0, 0).Rotated(0),
          undefined,
        ).ToLaser();
        if(IRFconfig.Hitbox == true && weirdHitbox == true){indicator.RenderZOffset = -6999;}
        indicator.Angle = angle[index] + mult[index];
        indicator.Color = Color(r - 1, g, b, 0);

        data.IndicatorBrim.push(indicator);
      }
      data.Danger = 1;
    }

  } else {

    if (data.Danger == 1) {
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        if (ent.Type == 60)
          indicator.Position = Vector(
            ent.Position.X - positionX[index],
            ent.Position.Y - position + 15,
          );
        else
          indicator.Position = Vector(
            ent.Position.X - positionX[index],
            ent.Position.Y - (position - 20),
          );
        if (data.Rotate == true){
          indicator.TargetPosition = Vector(1, 0).Rotated(
            angle[index] + mult[index],
          );}
        indicator.Color = Color.Lerp(indicator.Color, Color(r, g, b, 2), 0.2);
      }
      return;

    } else {

      data.IndicatorBrim = [] as Entity[];
      for (let index = 0; index < mult.length; index++) {
        let indicator = Isaac.Spawn(
          1000,
          198,
          0,
          Vector(10, 10).Rotated(angle[index] + mult[index]),
          Vector(0.001, 0),
          ent,
        ).ToEffect();
        if(IRFconfig.Hitbox == true && weirdHitbox == true){indicator.RenderZOffset = -6999;}
        if (ent.Type == 60)
          indicator.Position = Vector(
            ent.Position.X - positionX[index],
            ent.Position.Y - position + 15,
          );
        else
          indicator.Position = Vector(
            ent.Position.X - positionX[index],
            ent.Position.Y - (position - 20),
          );
        indicator.Timeout = 30;
        indicator.LifeSpan = 30;
        indicator.TargetPosition = Vector(1, 0).Rotated(
          angle[index] + mult[index],
        );
        indicator.Color = Color(r, g, b, 0);
        data.IndicatorBrim.push(indicator);
        indicator.Update();
      }
      data.Danger = 1;
    }
  }
}

function RemoveLaserIndicator(ent) {
  let data = ent.GetData() as DangerData;
  data.IndicatorBrim.forEach((indicator) => {
    indicator.Remove();
  });
}

function AfterDedLaserIndicator(ent, angle, mult: any[], position, vertical) {
  let data = ent.GetData() as DangerData
  if(IRFconfig.Hitbox == true && vertical == false){
    position = 0;
  }

  if (data.Danger !== 1) {
    data.IndicatorBrim = [] as Entity[];
    for (let index = 0; index < mult.length; index++) {
      let indicator = Isaac.Spawn(
        7,
        7,
        0,
        Vector(ent.Position.X, ent.Position.Y - position),
        Vector(0, 0).Rotated(0),
        undefined,
      ).ToLaser();
      if(IRFconfig.Hitbox == true && vertical == false){
          indicator.RenderZOffset = -6999;
      }
      // indicator.TearFlags = bitFlags(TearFlag.HOMING)
      indicator.Angle = angle * mult[index];
      indicator.Color = Color(1, 0.0, 0.0, 0);
      indicator.Timeout = 20;
      //indicator.Parent = ent
      data.IndicatorBrim.push(indicator);
    }
    data.Danger = 1;
  }
  if (data.Danger == 1) {
    let nextTime = time + 10;
    for (let index = time; index < nextTime; index++) {
      for (let index = 0; index < data.IndicatorBrim.length; index++) {
        const indicator = data.IndicatorBrim[index];
        indicator.Position = Vector(ent.Position.X, ent.Position.Y - position);
        indicator.Color = Color.Lerp(
          indicator.Color,
          Color(2, 0.0, 0.0, 1),
          0.2,
        );
      }
    }
  }
}

function postRender() {
  ActiveEnemy.forEach((ent) => {
    let data = ent.GetData() as unknown as DangerData;
    let EntSprite = ent.GetSprite();
    //debugComing(ent, EntSprite, data);
    if (ent.IsDead() || ent.Exists() == false) {
      if (data.IndicatorBrim) {
        RemoveLaserIndicator(ent);
      }
    }

    VanillaElseIfHell(
      ent,
      EntSprite,
      data,
      IRFconfig,
      LaserIndicator,
      RemoveLaserIndicator,
      AfterDedLaserIndicator,
      TargetLaserIndicator,
    );
  });
  //! security
}

function postUpdate() {
  let entities = Isaac.GetRoomEntities();
  let enemy = [] as Entity[];
  if (entities.length === 0) {
    //  DebugText = "no entity"
  } else {
    entities.forEach((ent) => {
      if (ent.IsActiveEnemy(true) || (ent.Type == 4 && ent.Variant == 15)) {
        //printConsole(`${ent}`)
        enemy.push(ent);
      }
    });
  }
  ActiveEnemy = enemy;
}

//! clean data
function cleaner() {
  if (ActiveEnemy) {
    //printConsole(`trigger enemy`)
    ActiveEnemy = [];
  }
  time = 0;
}

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod("Watch out, laser!", 1);

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

  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit);
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  if (ModConfigMenu !== undefined) {
    ModConfig(IRFconfig);
  }
  //! END MOD CONFIG MENU

  mod.AddCallback(ModCallback.POST_NEW_ROOM, cleaner);
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, cleaner);
  mod.AddCallback(ModCallback.POST_UPDATE, postRender);
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
  mod.AddCallback(ModCallback.POST_UPDATE, Timer);
}
