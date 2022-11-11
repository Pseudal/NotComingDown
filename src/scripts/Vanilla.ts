import { printConsole } from "isaacscript-common";

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
): void {
  if (ent.Type == 241) {
    if (EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() < 20) {
      //let rotation = EntSprite.Rotation + 90;
      if (ent.Variant == 1) {
        spawnTracer(ent, ent.SpriteRotation + 90, [0.65, 1.35], 10, 2, 0, 0);
        return;
      } else {
        spawnTracer(ent, ent.SpriteRotation + 90, [1], 10, 2, 0, 0);
        return;
      }
    }

    if (EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() > 20) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //uriel
  else if (ent.Type == 271) {
    if (ent.ToNPC().State == 9 && EntSprite.IsPlaying("Charging")) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 0);
      return;
    } else if (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")) {
      spawnTracer(ent, 90, [0.5, 1.5], 50, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() > 4) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Gabriel
  else if (ent.Type == 272) {
    if (
      ent.ToNPC().State == 9 &&
      (EntSprite.IsPlaying("Charging") ||
        EntSprite.IsPlaying("Float") ||
        EntSprite.IsPlaying("Shield"))
    ) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 50, 2, 0, 0);
      return;
    } else if (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging2")) {
      spawnTracer(ent, 90, [0.5, 1.5, 2.5, 3.5], 50, 2, 0, 0);
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
  else if (ent.Type == 43) {
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Taunt") &&
      EntSprite.GetFrame() < 20
    ) {
      if (EntSprite.FlipX == true) {
        spawnTracer(ent, 90, [4], 20, 2, 0, 0);
        return;
      } else {
        spawnTracer(ent, 90, [2], 20, 2, 0, 0);
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
  else if (ent.Type == 268) {
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Right") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [4], 50, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Left") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [2], 50, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Up") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [3], 50, 2, 0, 2);
      return;
    }
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Attack2Down") &&
      EntSprite.GetFrame() < 25 &&
      EntSprite.GetFrame() > 10
    ) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 2);
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
  else if (ent.Type == 267) {
    if (
      ent.ToNPC().State == 9 &&
      EntSprite.IsPlaying("Attack2") &&
      EntSprite.GetFrame() < 25
    ) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 0);
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
  else if (ent.Type == 61 && ent.Variant == 2) {
    if (ent.HasMortalDamage()) {
      AfterDedLaserIndicator(ent, 90, [1, 2, 3, 4], 10, 2, 0, 0);
      return;
    }
  }
  //vis
  else if (ent.Type == 39) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, 2, 0, 0);
        return;
      }
    }
    if (ent.Variant == 1) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack02Horiz") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2, 4], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        (EntSprite.IsPlaying("Attack02Up") ||
          EntSprite.IsPlaying("Attack02Down")) &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3, 1], 20, 2, 0, 0);
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
        spawnTracer(ent, 90, [1, 2, 3, 4], 20, 2, 0, 0);
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
  else if (ent.Type == 836) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, 2, 0, 2);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, 2, 0, 2);
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
  else if (ent.Type == 285) {
    if (ent.ToNPC().State == 13) return;
    if (ent.Variant == 0) {
      if (EntSprite.IsPlaying("AppearLeft") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [2], 30, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearRight") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [4], 30, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearUp") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [3], 20, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AppearDown") && EntSprite.GetFrame() > 5) {
        spawnTracer(ent, 90, [1], 20, 2, 0, 0);
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
  else if (ent.Type == 891) {
    if (ent.Variant == 1) {
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 20, 2, 0, 0);
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
  else if (ent.Type == 203) {
    if (ent.Variant == 0) {
      if (EntSprite.IsPlaying("ShootLeft") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [2], 10, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootRight") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [4], 10, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootUp") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [3], 20, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("ShootDown") && EntSprite.GetFrame() < 30) {
        spawnTracer(ent, 90, [1], 20, 2, 0, 0);
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
  else if (ent.Type == 81) {
    if(ent.Variant == 0){
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(ent, 90, [1, 2, 3, 4], 40, 2, 0, 0);
        return;
      }
    }

    if(ent.Variant == 1){
      if (EntSprite.IsPlaying("Attack2Alt")&& EntSprite.GetFrame() < 31 && EntSprite.GetFrame() > 5){
        spawnTracer(ent, 90, [1, 2, 3, 4], 40, 2, 0, 0);
      }
      if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
        spawnTracer(ent, 90, [1, 2, 3, 4,1.5, 2.5, 3.5, 4.5], 40, 2, 0, 0);
        return;
      }
    }

    if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 35 || (EntSprite.IsPlaying("Attack2Alt") && EntSprite.GetFrame() > 31)) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Blighted Ovum
  else if (ent.Type == 79 && ent.Variant == 12) {
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == false &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [4], 40, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == true &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [2], 40, 2, 0, 0);
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
  else if (ent.Type == 403 && ent.Variant == 0) {
    data.Rotate = true;
    if (EntSprite.IsPlaying("BlastStart") && EntSprite.GetFrame() <= 22) {
      let angle = (ent.Position - Isaac.GetPlayer().Position).GetAngleDegrees();
      TargetLaserIndicator(ent, angle, [0, 120, 240], 30, 2, 0, 0);
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
  else if (ent.Type == 60 && ent.Variant == 1) {
    if (ent.ToNPC().State == 8 && EntSprite.IsOverlayPlaying("ShootOverlay")) {
      let angle = (ent.Position - Isaac.GetPlayer().Position).GetAngleDegrees();
      TargetLaserIndicator(ent, angle, [180], 15, 2, 0, 0);
      return;
    }

    if (ent.ToNPC().State == 4) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  } //Reap Creep
  else if (ent.Type == 900) {
    if (EntSprite.IsPlaying("Attack3Charge") && EntSprite.GetFrame() < 23) {
      data.Ambiguous = true;
      spawnTracer(ent, 90, [1.65, 1.5, 4.5, 4.35], 40, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("Attack3BeamStart") &&
      EntSprite.GetFrame() < 23 &&
      data.Ambiguous == false
    ) {
      spawnTracer(ent, 90, [1], 40, 2, 0, 0);
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
  else if (ent.Type == 68) {
    if (ent.Variant == 1) {
      if (EntSprite.IsPlaying("AttackAlt01") && EntSprite.GetFrame() < 10) {
        spawnTracer(ent, 90, [1], 50, 2, 0, 0);
        return;
      }
      if (EntSprite.IsPlaying("AttackAlt02") && EntSprite.GetFrame() < 10) {
        spawnTracer(ent, 90, [2, 4], 70, 2, 0, 0);
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
  else if (ent.Type == 410) {
    if (ent.Variant == 0) {
      if (
        EntSprite.IsPlaying("LaserStartDown") &&
        EntSprite.GetFrame() > 26 &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [1], 30, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("LaserStartSide") &&
        EntSprite.GetFrame() > 26 &&
        ((EntSprite.FlipX == true && ent.ToNPC().State == 10) ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [2], 30, 2, 0, 0);
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
        spawnTracer(ent, 90, [4], 30, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("LaserStartUp") &&
        EntSprite.GetFrame() > 26 &&
        (ent.ToNPC().State == 10 ||
          ent.ToNPC().State == 9 ||
          ent.ToNPC().State == 11)
      ) {
        spawnTracer(ent, 90, [3], 30, 2, 0, 0);
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
  else if (ent.Type == 903) {
    if (ent.Variant == 1) {
      if (
        EntSprite.IsPlaying("AttackDown") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [1], 30, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackLeft") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [2], 30, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackRight") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [4], 30, 2, 0, 0);
        return;
      }
      if (
        EntSprite.IsPlaying("AttackDown") &&
        EntSprite.GetFrame() < 13 &&
        ent.ToNPC().State == 108
      ) {
        spawnTracer(ent, 90, [3], 30, 2, 0, 0);
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
  else if (ent.Type == 4 && ent.Variant == 15) {
    if (EntSprite.IsPlaying("Pulse")) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 0, 2, 0, 0);
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
  else if (ent.Type == 912) {
    if (
      EntSprite.IsPlaying("Transition") &&
      EntSprite.GetFrame() > 80 &&
      EntSprite.GetFrame() < 102
    ) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 0);
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
  } else if (ent.Type == 84) {
    if (EntSprite.IsPlaying("Attack02") && EntSprite.GetFrame() < 20 && ent.ToNPC().State == 9) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Attack03") && EntSprite.GetFrame() < 15 && ent.ToNPC().State == 10) {
      spawnTracer(ent, 90, [1.30, 4.70], 40, 2, 0, 0, [110, -110]);
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
    //The lamb
  } else if (ent.Type == 273) {
    if (EntSprite.IsPlaying("HeadCharge") && ent.ToNPC().State == 11) {
      spawnTracer(ent, 90, [1,2,3,4], 50, 2, 0, 0);
      return;
    }

    if (
      (EntSprite.IsPlaying("HeadShoot2Start") && EntSprite.GetFrame() > 10)
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    //Dogma
  } else if (ent.Type == 950) {
    if (EntSprite.IsPlaying("BrimstoneStartRight") && ent.ToNPC().State == 8 && EntSprite.FlipX == false) {
      spawnTracer(ent, 90, [4], 50, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("BrimstoneStartRight") && ent.ToNPC().State == 8 && EntSprite.FlipX == true) {
      spawnTracer(ent, 90, [2], 50, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("BrimstoneStartDown") && ent.ToNPC().State == 8) {
      spawnTracer(ent, 90, [1], 50, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("BrimstoneStartUp") && ent.ToNPC().State == 8) {
      spawnTracer(ent, 90, [3], 50, 2, 0, 0);
      return;
    }

    if (
      ((EntSprite.IsPlaying("BrimstoneLoopRight") || EntSprite.IsPlaying("BrimstoneLoopUp") || EntSprite.IsPlaying("BrimstoneLoopDown")))
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }//Gluttony
  else if (ent.Type == 49) {
    if (ent.Variant == 0) {
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Down") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [1], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == false &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [4], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Horiz") &&
        EntSprite.FlipX == true &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [2], 20, 2, 0, 0);
        return;
      }
      if (
        ent.ToNPC().State == 9 &&
        EntSprite.IsPlaying("Attack01Up") &&
        EntSprite.GetFrame() < 30
      ) {
        spawnTracer(ent, 90, [3], 20, 2, 0, 0);
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
          spawnTracer(ent, 90, [2, 4], 20, 2, 0, 0);
          return;
        }
        if (
          ent.ToNPC().State == 9 &&
          (EntSprite.IsPlaying("Attack02Up") ||
            EntSprite.IsPlaying("Attack02Down")) &&
          EntSprite.GetFrame() < 30
        ) {
          spawnTracer(ent, 90, [3, 1], 20, 2, 0, 0);
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
  }else if (ent.Type == 294) {
    if (ent.ToNPC().State == 9 && EntSprite.IsPlaying("Open")) {
      //let rotation = EntSprite.Rotation + 90;
        spawnTracer(ent, ent.SpriteRotation + 90, [1], 0, 2, 0, 0);
        return;
      }


    if (EntSprite.IsPlaying("Opened") && EntSprite.GetFrame() > 15){
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  //Dogma
  } else if (ent.Type == 260) {
    if(ent.SubType == 0){
      if (EntSprite.IsPlaying("LaserNoSkin") && ent.ToNPC().State == 9 && EntSprite.GetFrame() < 20) {
        spawnTracer(ent, 90, [1], 50, 2, 0, 0);
        return;
      }
    }
    if(ent.SubType == 2){
      if (EntSprite.IsPlaying("LaserNoSkin") && ent.ToNPC().State == 9 && EntSprite.GetFrame() < 20) {
        spawnTracer(ent, 90, [0.5, 1.5], 50, 2, 0, 0);
        return;
      }
    }
    if (
      ((EntSprite.IsPlaying("LaserNoSkin") && EntSprite.GetFrame() > 20))
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
}
