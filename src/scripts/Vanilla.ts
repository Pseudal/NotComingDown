import { printConsole } from "isaacscript-common";
let frailbaseset = 0
let frailbase = 0

declare const BetterMonsters: unknown | undefined;

//! todo 883 886.0 60.1 403
//* spawnTracer(ent, 90, [3], 20, 2, 0, 2) entity/ mainly used for creep/ multiplicator and number of tracer : 1 down, 2 left, 3 right, 4 up/ Y position/ rest is RGB
export function VanillaElseIfHell(
  ent,
  EntSprite,
  data,
  IRFconfig,
  spawnTracer,
  RemoveLaserIndicator,
  AfterDedLaserIndicator,
  TargetLaserIndicator,
  time
): void {
  //printConsole(EntSprite.GetFilename())
  if (ent.Type == 241 && IRFconfig.RageCreep) {
    //spider creep
    if (EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() < 20) {
      if (ent.Variant == 1) {
        if (ent.SpriteRotation == 0 || 180)
          spawnTracer(
            ent, //Send the actual entity
            ent.SpriteRotation + 90, //degrees, base adds 90°, used in specific cases
            [0.65, 1.35], //Multiplier and number of lasers. Here will do (90° + sprite rotation) * 0.65 and 1.35 for the second tracer.
            10, //height of the tracer, here will make Y-10
            false, //Used for the option "real hitbox" if true and option active, the laser will have zero in Y
            2, //R
            0, //G
            0, //b
          );
        //there is another option that is used for the X position, very rarely used, see satan
        else
          spawnTracer(
            ent,
            ent.SpriteRotation + 90,
            [0.65, 1.35],
            10,
            false,
            2,
            0,
            0,
          );
        return;
      } else {
        if (ent.SpriteRotation == 0 || 180) {
          spawnTracer(ent, ent.SpriteRotation + 90, [1], 10, false, 2, 0, 0);
        } else {
          spawnTracer(ent, ent.SpriteRotation + 90, [1], 10, false, 2, 0, 0);
        }
        return;
      }
    }

    if (EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() > 20) {
      if (data.IndicatorBrim) {
        data.Danger = 0; //to avoid spawn 2 lasers at the same place, data.danger is set to 1 after spawn of the tracer. this indicates that a new laser can spawn
        RemoveLaserIndicator(ent); //Removes the effect
        return;
      }
    }
  } //uriel
  else if (ent.Type == 271 && IRFconfig.Uriel) {
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
  } //Gabriel
  else if (ent.Type == 272 && IRFconfig.Gabriel) {
    if (
      ent.ToNPC().State == 9 &&
      (EntSprite.IsPlaying("Charging") ||
        EntSprite.IsPlaying("Float") ||
        EntSprite.IsPlaying("Shield"))
    ) {
      if (BetterMonsters !== undefined && ent.Variant == 1)
        spawnTracer(ent, 90, [1, 2, 3, 4], 50, false, 2, 2, 2);
      else spawnTracer(ent, 90, [1, 2, 3, 4], 50, true, 2, 2, 2);
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
  } //monstro ii
  else if (ent.Type == 43 && ent.Variant == 0 && IRFconfig.Monstro) {
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Taunt") &&
      EntSprite.GetFrame() < 20
    ) {
      if (EntSprite.FlipX == true) {
        spawnTracer(ent, 90, [4], 20, false, 2, 0, 0);
        return;
      } else {
        spawnTracer(ent, 90, [2], 20, false, 2, 0, 0);
        return;
      }
    }

    if (EntSprite.IsPlaying("Taunt") && EntSprite.GetFrame() > 20) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Adversary
  else if (ent.Type == 268 && IRFconfig.Adversary) {
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Right") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [4], 50, false, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Left") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [2], 50, false, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Up") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [3], 50, false, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Down") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 2);
      return;
    }
    if (
      (EntSprite.IsPlaying("Attack2Right") ||
        EntSprite.IsPlaying("Attack2Left") ||
        EntSprite.IsPlaying("Attack2Up") ||
        EntSprite.IsPlaying("Attack2Down")) &&
      EntSprite.GetFrame() > 25
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  //Dark one
  else if (ent.Type == 267 && IRFconfig.DarkOne) {
    if (
      ent.ToNPC().State == 9 &&
      EntSprite.IsPlaying("Attack2") &&
      EntSprite.GetFrame() < 25
    ) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 25) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  //Soul sucker
  else if (ent.Type == 61 && ent.Variant == 2 && IRFconfig.SoulSucker) {
    if (ent.HasMortalDamage()) {
      AfterDedLaserIndicator(ent, 90, [1, 2, 3, 4], 10, false, 2, 0, 0);
      return;
    }
  }
  //vis
  else if (ent.Type == 39 && IRFconfig.Vis) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, false, 2, 0, 0);
        return;
      }
    }
    if (ent.Variant == 1) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack02Horiz") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2, 4], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        (EntSprite.IsPlaying("Attack02Up") ||
          EntSprite.IsPlaying("Attack02Down")) &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3, 1], 20, false, 2, 0, 0);
        return;
      }
    }
    if (ent.Variant == 3) {
      if (
        ent.ToNPC().State == 9 &&
        (EntSprite.IsPlaying("Attack04Up") ||
          EntSprite.IsPlaying("Attack04Down") ||
          EntSprite.IsPlaying("Attack04Horiz")) &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 20, false, 2, 0, 0);
        return;
      }
    }

    if (
      (EntSprite.IsPlaying("Attack01Up") ||
        EntSprite.IsPlaying("Attack01Horiz") ||
        EntSprite.IsPlaying("Attack01Down") ||
        EntSprite.IsPlaying("Attack02Down") ||
        EntSprite.IsPlaying("Attack02Up") ||
        EntSprite.IsPlaying("Attack02Horiz") ||
        EntSprite.IsPlaying("Attack04Down") ||
        EntSprite.IsPlaying("Attack04Up") ||
        EntSprite.IsPlaying("Attack04Horiz")) &&
      EntSprite.GetFrame() > 30
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //vis versa
  else if (ent.Type == 836 && IRFconfig.Vis) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, false, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, false, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, false, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, false, 2, 0, 2);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("Attack01Up") ||
        EntSprite.IsPlaying("Attack01Horiz") ||
        EntSprite.IsPlaying("Attack01Down")) &&
      EntSprite.GetFrame() > 30
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //red ghost
  else if (ent.Type == 285 && IRFconfig.RedGhost) {
    if (ent.ToNPC().State == 13) return;
    if (ent.Variant == 0) {
      if (EntSprite.IsPlaying("AppearLeft") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [2], 30, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearRight") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [4], 30, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearUp") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [3], 20, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearDown") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [1], 20, false, 2, 0, 0);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("ShootLeft") ||
        EntSprite.IsPlaying("ShootRight") ||
        EntSprite.IsPlaying("ShootUp") ||
        EntSprite.IsPlaying("ShootDown")) &&
      EntSprite.GetFrame() > 20
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Goat
  else if (ent.Type == 891 && IRFconfig.Goat) {
    if(ent.SubType == 41){return}
    if (ent.Variant == 1) {
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 20, false, 2, 0, 0);
        return;
      }
    }
    if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 35) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //brimstone head
  else if (ent.Type == 203 && IRFconfig.BrimstoneHead) {
    if (ent.Variant == 0) {
      if (EntSprite.IsPlaying("ShootLeft") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [2], 10, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootRight") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [4], 10, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootUp") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [3], 20, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootDown") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [1], 20, false, 2, 0, 0);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("ShootLeft") ||
        EntSprite.IsPlaying("ShootRight") ||
        EntSprite.IsPlaying("ShootUp") ||
        EntSprite.IsPlaying("ShootDown")) &&
      EntSprite.GetFrame() > 30
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //The fallen & krampus... well, i do my best for krampus, idk how to predict the direction
  else if (ent.Type == 81 && IRFconfig.Krampus) {
    if (ent.Variant == 0) {
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 40, false, 2, 0, 0);
        return;
      }
    }

    if (ent.Variant == 1) {
      if (
        EntSprite.IsPlaying("Attack2Alt") &&
        EntSprite.GetFrame() < 31 &&
        EntSprite.GetFrame() > 5
      ) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 40, false, 2, 0, 0);
      }
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(
          ent,
          90,
          [1, 2, 3, 4, 1.5, 2.5, 3.5, 4.5],
          40,
          false,
          2,
          0,
          0,
        );
        return;
      }
    }

    if (
      (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 35) ||
      (EntSprite.IsPlaying("Attack2Alt") && EntSprite.GetFrame() > 31)
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Blighted Ovum
  else if (
    ent.Type == 79 &&
    ent.Variant == 12 &&
    IRFconfig.BlightedOvum &&
    BetterMonsters == undefined
  ) {
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == false &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [4], 40, false, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == true &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [2], 40, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Attack01") && EntSprite.GetFrame() > 35) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //funcking forsaken
  else if (
    ent.Type == 403 &&
    ent.Variant == 0 &&
    IRFconfig.Forsaken &&
    BetterMonsters == undefined
  ) {
    data.Rotate = true;
    if (EntSprite.IsPlaying("BlastStart") && EntSprite.GetFrame() <= 22) {
      let angle = (
        ent.Position - ent.ToNPC().GetPlayerTarget().Position
      ).GetAngleDegrees();
      TargetLaserIndicator(
        ent,
        [angle, angle, angle],
        [0, 120, 240],
        30,
        false,
        2,
        0,
        0,
      );
      return;
    }

    if (
      (EntSprite.IsPlaying("BlastStart") && EntSprite.GetFrame() >= 23) ||
      EntSprite.IsPlaying("Blasting")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  //eye need fix
  else if (ent.Type == 60 && IRFconfig.BloodEye) {
    if(ent.Variant == 1){
      if ((ent.ToNPC().State == 8 && EntSprite.IsOverlayPlaying("ShootOverlay"))) {
        let angle = (
          ent.Position - ent.ToNPC().GetPlayerTarget().Position
        ).GetAngleDegrees();
        TargetLaserIndicator(ent, [angle], [180], 15, false, 2, 0, 0);
        return;
      }

      if (ent.ToNPC().State == 4) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
    else if(ent.Variant == 0){
      if ((EntSprite.IsPlaying("Shoot")) && EntSprite.GetFrame() <= 10) {
        let angle = (
          ent.Position - ent.ToNPC().GetPlayerTarget().Position
        ).GetAngleDegrees();
        TargetLaserIndicator(ent, [angle], [180], 5, false, 2, 0, 0);
        return;
      }

      if (EntSprite.IsPlaying("Shoot") && EntSprite.GetFrame() >= 11) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
  }
   //Reap Creep
  else if (ent.Type == 900 && IRFconfig.ReapCreep) {
    if (EntSprite.IsPlaying("Attack3Charge") && EntSprite.GetFrame() < 23) {
      data.Ambiguous = true;
      data.Mega = false;
      spawnTracer(ent, 90, [1.65, 1.5, 4.5, 4.35], 40, false, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("Attack3BeamStart") && EntSprite.GetFrame() < 23) {
      data.Ambiguous == false;
      data.Mega = true;
      spawnTracer(ent, 90, [1], 40, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Attack3BeamStart") && EntSprite.GetFrame() > 23) {
      if (data.IndicatorBrim) {
        data.Ambiguous = false;
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Bloat
  else if (ent.Type == 68 && IRFconfig.Bloat) {
    if (ent.Variant == 1) {
      if (EntSprite.IsPlaying("AttackAlt01") && EntSprite.GetFrame() < 10) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AttackAlt02") && EntSprite.GetFrame() < 10) {
        spawnTracer(ent, 90, [2, 4], 70, false, 2, 0, 0);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("AttackAlt01") ||
        EntSprite.IsPlaying("AttackAlt02")) &&
      EntSprite.GetFrame() > 10
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Sister's
  else if (ent.Type == 410 && IRFconfig.Sister) {
    if (ent.Variant == 0) {
      data.Mega = true;
      if (
        EntSprite.IsPlaying("LaserStartDown") &&
        EntSprite.GetFrame() > 26 &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [1], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("LaserStartSide") &&
        EntSprite.GetFrame() > 26 &&
        EntSprite.FlipX == true &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [2], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("LaserStartSide") &&
        EntSprite.GetFrame() > 26 &&
        EntSprite.FlipX == false &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [4], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("LaserStartUp") &&
        EntSprite.GetFrame() > 26 &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [3], 30, false, 2, 0, 0);
        return;
      }
    }
    if (
      EntSprite.IsPlaying("LaserLoopDown") ||
      EntSprite.IsPlaying("LaserLoopUp") ||
      EntSprite.IsPlaying("LaserLoopSide")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //visage
  else if (ent.Type == 903 && IRFconfig.Visage) {
    if (ent.Variant == 1) {
      if (
        EntSprite.IsPlaying("AttackDown") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [1], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackLeft") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [2], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackRight") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [4], 30, false, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackDown") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [3], 30, false, 2, 0, 0);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("AttackDown") ||
        EntSprite.IsPlaying("AttackLeft") ||
        EntSprite.IsPlaying("AttackRight") ||
        EntSprite.IsPlaying("AttackDown")) &&
      EntSprite.GetFrame() > 13 &&
      ent.ToNPC().State == 108
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  //BrimBomb
  else if (ent.Type == 4 && ent.Variant == 15 && IRFconfig.BrimBomb) {
    if (EntSprite.IsPlaying("Pulse")) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 0, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Explode")) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Mother
  else if (ent.Type == 912 && IRFconfig.Mother) {
    data.Mega = true;
    if (
      EntSprite.IsPlaying("Transition") &&
      EntSprite.GetFrame() > 80 &&
      EntSprite.GetFrame() < 102
    ) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Transition") && EntSprite.GetFrame() > 102) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    //Satan
  } else if (ent.Type == 84 && IRFconfig.Satan) {
    if (BetterMonsters !== undefined) {
      if (
        EntSprite.IsPlaying("Attack02") &&
        EntSprite.GetFrame() < 20 &&
        ent.ToNPC().State == 9
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }

      if (
        EntSprite.IsPlaying("Attack03") &&
        EntSprite.GetFrame() >= 5 &&
        EntSprite.GetFrame() <= 20 &&
        ent.ToNPC().State == 13
      ) {
        let angle = (
          Vector(ent.Position.X + 100, ent.Position.Y) -
          Vector(
            ent.ToNPC().GetPlayerTarget().Position.X,
            ent.ToNPC().GetPlayerTarget().Position.Y + 30,
          )
        ).GetAngleDegrees();
        let angle2 = (
          Vector(ent.Position.X - 100, ent.Position.Y) -
          Vector(
            ent.ToNPC().GetPlayerTarget().Position.X,
            ent.ToNPC().GetPlayerTarget().Position.Y + 30,
          )
        ).GetAngleDegrees();
        TargetLaserIndicator(
          ent,
          [angle2, angle],
          [180, 180],
          40,
          false,
          2,
          0,
          0,
          [100, -100],
        );
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack02") && EntSprite.GetFrame() > 20) ||
        (EntSprite.IsPlaying("Attack03") && EntSprite.GetFrame() > 15)
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    } else {
      if (
        EntSprite.IsPlaying("Attack02") &&
        EntSprite.GetFrame() < 20 &&
        ent.ToNPC().State == 9
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }

      if (
        EntSprite.IsPlaying("Attack03") &&
        EntSprite.GetFrame() < 15 &&
        ent.ToNPC().State == 10
      ) {
        spawnTracer(ent, 90, [1.3, 4.7], 40, false, 2, 0, 0, [110, -110]);
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack02") && EntSprite.GetFrame() > 20) ||
        (EntSprite.IsPlaying("Attack03") && EntSprite.GetFrame() > 15)
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
    //The lamb
  } else if (ent.Type == 273 && IRFconfig.TheLamb) {
    if (EntSprite.IsPlaying("HeadCharge") && ent.ToNPC().State == 11) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 50, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("HeadShoot2Start") && EntSprite.GetFrame() > 10) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    //Dogma
  } else if (ent.Type == 950 && IRFconfig.Dogma) {
    if (
      EntSprite.IsPlaying("BrimstoneStartRight") &&
      ent.ToNPC().State == 8 &&
      EntSprite.FlipX == false
    ) {
      spawnTracer(ent, 90, [4], 45, false, 2, 2, 2);
      return;
    }
    if (
      EntSprite.IsPlaying("BrimstoneStartRight") &&
      ent.ToNPC().State == 8 &&
      EntSprite.FlipX == true
    ) {
      spawnTracer(ent, 90, [2], 45, false, 2, 2, 2);
      return;
    }
    if (EntSprite.IsPlaying("BrimstoneStartDown") && ent.ToNPC().State == 8) {
      spawnTracer(ent, 90, [1], 45, false, 2, 2, 2);
      return;
    }
    if (EntSprite.IsPlaying("BrimstoneStartUp") && ent.ToNPC().State == 8) {
      spawnTracer(ent, 90, [3], 45, false, 2, 2, 2);
      return;
    }

    if (
      EntSprite.IsPlaying("BrimstoneLoopRight") ||
      EntSprite.IsPlaying("BrimstoneLoopUp") ||
      EntSprite.IsPlaying("BrimstoneLoopDown")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Gluttony
  else if (ent.Type == 49 && IRFconfig.Gluttony) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, false, 2, 0, 0);
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack01Up") ||
          EntSprite.IsPlaying("Attack01Horiz") ||
          EntSprite.IsPlaying("Attack01Down")) &&
        EntSprite.GetFrame() > 30
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
    if (ent.Variant == 1) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack02Horiz") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2, 4], 20, false, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        (EntSprite.IsPlaying("Attack02Up") ||
          EntSprite.IsPlaying("Attack02Down")) &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3, 1], 20, false, 2, 0, 0);
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack02Up") ||
          EntSprite.IsPlaying("Attack02Horiz") ||
          EntSprite.IsPlaying("Attack02Down")) &&
        EntSprite.GetFrame() > 30
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
    //Greddier door
  } else if (ent.Type == 294 && IRFconfig.UltraGreed) {
    if (ent.ToNPC().State == 9 && EntSprite.IsPlaying("Open")) {
      //let rotation = EntSprite.Rotation + 90;
      spawnTracer(ent, ent.SpriteRotation + 90, [1], 0, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Opened") && EntSprite.GetFrame() > 15) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    //haunt
  } else if (ent.Type == 260 && IRFconfig.Haunt) {
    if (ent.SubType == 0) {
      if (
        EntSprite.IsPlaying("LaserNoSkin") &&
        ent.ToNPC().State == 9 &&
        EntSprite.GetFrame() < 20
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }
    }
    if (ent.SubType == 2) {
      if (
        EntSprite.IsPlaying("LaserNoSkin") &&
        ent.ToNPC().State == 9 &&
        EntSprite.GetFrame() < 20
      ) {
        spawnTracer(ent, 90, [0.5, 1.5], 50, false, 2, 0, 0);
        return;
      }
    }
    if (EntSprite.IsPlaying("LaserNoSkin") && EntSprite.GetFrame() > 20) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //alt mom
  else if (ent.Type == 45 && IRFconfig.Mom) {
    if (
      EntSprite.IsPlaying("EyeLaser") &&
      EntSprite.GetFrame() < 45 &&
      EntSprite.GetFrame() > 20
    ) {
      //let rotation = EntSprite.Rotation + 90;
      spawnTracer(ent, ent.SpriteRotation + 90, [1], 0, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("EyeLaser") && EntSprite.GetFrame() > 45) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //MegaSatan
  else if (ent.Type == 274 && IRFconfig.MegaSatan) {
    data.Mega = true;
    if (EntSprite.IsPlaying("Charging") && ent.ToNPC().State == 8) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Shoot2Loop") || EntSprite.IsPlaying("Shoot1")) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } else if (ent.Type == 951 && IRFconfig.TheBeast) {
    data.Mega = true;
    if (EntSprite.IsPlaying("SuckEnd") && EntSprite.GetFrame() > 18) {
      spawnTracer(ent, 90, [2], 0, false, 3, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("BlastLoop") || EntSprite.IsFinished("SuckEnd")) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  if(ent.Type == 52 && IRFconfig.Pride){
    if (EntSprite.IsPlaying("Attack01") && EntSprite.GetFrame() < 18) {
      spawnTracer(ent, 90, [1.5,2.5,3.5,4.5], 40, false, 3, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("Attack01") && EntSprite.GetFrame() > 18) {
      data.Danger = 0;
      RemoveLaserIndicator(ent)
      return;
    }
  }
  if(ent.Type == 62 && ent.Variant == 2){
    // printConsole(`${EntSprite.GetOverlayAnimation()}`)
    // printConsole(`${EntSprite.GetAnimation()}  ${EntSprite.GetFrame()}`)
    // printConsole(`${ent.ToNPC().State}`)
    if(ent.ToNPC().State == 8 && EntSprite.IsPlaying("Attack3Charge") && EntSprite.GetFrame() < 20){
      let angle = (
        ent.Position - ent.ToNPC().GetPlayerTarget().Position
      ).GetAngleDegrees();
      TargetLaserIndicator(ent, [angle], [180], 60, false, 2, 0, 0);
      return;
    }
    if(ent.ToNPC().State == 10){
      printConsole(`${ent.ToNPC().V1} ${ent.ToNPC().V2}`)
      if(frailbaseset == 0 && ent.ToNPC().V2 !== 0){
        printConsole(`trigger1`)
        frailbase = ent.ToNPC().V2
        frailbaseset = 1
      }
      if(frailbaseset == 1 && ent.ToNPC().V2 !== frailbase){
        printConsole(`trigger2`)
        frailbase = ent.ToNPC().V2
        frailbaseset = 2
      }
      if(frailbaseset == 2 && ent.ToNPC().V2 !== frailbase){
        printConsole(`trigger3`)
        frailbase = ent.ToNPC().V2
        frailbaseset = 3
      }
      if(frailbaseset == 3 && ent.ToNPC().V2 !== frailbase){
        printConsole(`trigger4`)
        frailbase = ent.ToNPC().V2
        frailbaseset = 4
      }
      if(frailbaseset == 4){
        printConsole(`trigger5`)
        let angle = (
          ent.Position - ent.ToNPC().GetPlayerTarget().Position
        ).GetAngleDegrees();
        TargetLaserIndicator(ent, [angle], [180], 60, false, 2, 0, 0);
        return;
      }
      // if(frailbase !== ent.ToNPC().V2 && frailbaseset == 1){
      //   spawnTracer(ent, ent.ToNPC().V2, [1], 40, false, 3, 0, 0);
      // }


      // if(EntSprite.IsPlaying("Attack3ShootDown")|| EntSprite.IsPlaying("Attack3ShootUp") || EntSprite.IsPlaying("Attack3ShootLeft") || EntSprite.IsPlaying("Attack3ShootRight") || EntSprite.IsPlaying("Attack3ShootUpLeft") || EntSprite.IsPlaying("Attack3ShootUpRight") || EntSprite.IsPlaying("Attack3ShootDownLeft") || EntSprite.IsPlaying("Attack3ShootDownRight")){
      //   data.Rotate = true
      //   let angle = (
      //     ent.Position - ent.ToNPC().GetPlayerTarget().Position
      //   ).GetAngleDegrees();
      //   TargetLaserIndicator(ent, [angle], [180], 60, false, 2, 0, 0);
      //   return;
      // }
      // if(EntSprite.IsPlaying("HeadWiggle")|| EntSprite.IsPlaying("HeadWiggleUp") || EntSprite.IsPlaying("HeadWiggleLeft") || EntSprite.IsPlaying("HeadWiggleRight") || EntSprite.IsPlaying("HeadWiggleDownLeft") || EntSprite.IsPlaying("HeadWiggleDownRight") || EntSprite.IsPlaying("HeadWiggleUpLeft") || EntSprite.IsPlaying("HeadWiggleUpRight")){
      //   data.Danger = 0;
      //   RemoveLaserIndicator(ent)
      //   return;
      // }
    }
    if(ent.ToNPC().State == 8 && EntSprite.IsPlaying("Attack3Charge") && EntSprite.GetFrame() > 20){
      data.Danger = 0;
      RemoveLaserIndicator(ent)
      return;
    }
  }
}
