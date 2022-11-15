import { printConsole } from "isaacscript-common";

declare const BetterMonsters: unknown | undefined;

//! I hate Delirium
export function IHateDelirium(
  ent,
  EntSprite,
  data,
  IRFconfig,
  spawnTracer,
  RemoveLaserIndicator,
  AfterDedLaserIndicator,
  TargetLaserIndicator,
):void {
  //leaper
  if (ent.Type == 412 && IRFconfig.Delirium){
    printConsole(EntSprite.GetFilename())
      if (//DarkOne
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack2") &&
        EntSprite.GetFrame() < 25 &&
        EntSprite.GetFilename() == "gfx/267.000 Dark One.anm2"
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }

      //Uriel
      if(EntSprite.GetFilename() == "MGgfx/271.000_angel.anm2"){
        if ((EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 25) || EntSprite.IsFinished("Attack2")) {
          if (data.IndicatorBrim) {
            data.Danger = 0;
            RemoveLaserIndicator(ent);
            return;
          }
        }
        if (ent.ToNPC().State == 9 && EntSprite.IsPlaying("Charging")) {
          spawnTracer(ent, 90, [1], 50, false, 2, 2, 2);
          return;
        }
        if (BetterMonsters == undefined || ent.Variant == 0) {
          if (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")) {
            spawnTracer(ent, 90, [0.5, 1.5], 50, true, 2, 2, 2);
            return;
          }
        } else {
          if (
            (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")) ||
            (ent.ToNPC().State == 12 &&
              EntSprite.IsPlaying("LaserShot") &&
              EntSprite.GetFrame() <= 5 &&
              ent.Variant == 1)
          ) {
            data.Rotate = true;
            let angle = (
              ent.Position -
              Vector(
                ent.ToNPC().GetPlayerTarget().Position.X,
                ent.ToNPC().GetPlayerTarget().Position.Y + 30,
              )
            ).GetAngleDegrees(); //this is used to calculate the angle between isaac and the entity, technically, where will the entity shoot
            TargetLaserIndicator(
              //Target is a little different than the basic function.
              ent,
              [angle, angle], //the angle is put here instead of the basic 90°, becomes a table
              [215, 145], //A bit different than the multiplier, but works the same way. Manages the number of lasers and changes the angle. for example, if the laser is to be directed at isaac, the value should be 180. to give an image, https://imgur.com/QddRjUG
              40,
              false,
              1,
              1,
              1,
            );
          }
        }
        if (EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() >= 5) {
          if (data.IndicatorBrim) {
            data.Danger = 0;
            RemoveLaserIndicator(ent);
            return;
          }
        }
      }

      //Gabriel
    if(EntSprite.GetFilename() == "MGgfx/272.000_angel2.anm2"){

        if (
          ent.ToNPC().State == 9 &&
          (EntSprite.IsPlaying("Charging") ||
            EntSprite.IsPlaying("Float") ||
            EntSprite.IsPlaying("Shield"))
        ) {
          if(BetterMonsters !== undefined && ent.Variant == 1)
            spawnTracer(ent, 90, [1, 2, 3, 4], 50, false, 2, 2, 2);
          else
            spawnTracer(ent, 90, [1, 2, 3, 4], 50, true, 2, 2, 2);
          return;
        } else if (
          ent.ToNPC().State == 10 &&
          EntSprite.IsPlaying("Charging2") &&
          (BetterMonsters == undefined || ent.Variant == 0)
        ) {
          spawnTracer(ent, 90, [0.5, 1.5, 2.5, 3.5], 50, true, 2, 2, 2);
          return;
        }

        if (EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() > 4) {
          if (data.IndicatorBrim) {
            data.Danger = 0;
            RemoveLaserIndicator(ent);
            return;
          }
        }
      }
    }
}
