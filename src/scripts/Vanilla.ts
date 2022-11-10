import { printConsole } from "isaacscript-common";
declare const BetterMonsters: unknown | undefined;
//! todo 883 886.0 60.1
//* spawnTracer(ent, 90, [3], 20, 2, 0, 2) entity/ mainly used for creep/ multiplicator and number of tracer : 1 down, 2 left, 3 right, 4 up/ Y position/ rest is RGB
export function VanillaElseIfHell(ent, EntSprite, data, IRFconfig, spawnTracer, RemoveLaserIndicator, AfterDedLaserIndicator):void {
if (ent.Type == 241){

    if(EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() < 20){
    //let rotation = EntSprite.Rotation + 90;
      if(ent.Variant == 1)
        spawnTracer(ent, ent.SpriteRotation+90, [0.65, 1.35], 10, 2, 0, 0)
      else
        spawnTracer(ent, ent.SpriteRotation+90, [1], 10, 2, 0, 0)
      printConsole("trigger")

    }

    if(EntSprite.IsPlaying("Attack") && EntSprite.GetFrame() > 20){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }

    }
  }//uriel
  else if (ent.Type == 271){

    if(ent.ToNPC().State == 9 && EntSprite.IsPlaying("Charging")){
    //let rotation = EntSprite.Rotation + 90;
      spawnTracer(ent, 90, [1], 50, 2, 0, 0)
    }else if(ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")){
      spawnTracer(ent, 90, [0.50, 1.50], 50, 2, 0, 0)
    }

    if(EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() > 4){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }
    }
  }//Gabriel
  else if (ent.Type == 272){


    if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Charging") || EntSprite.IsPlaying("Float") || EntSprite.IsPlaying("Shield"))){
    //let rotation = EntSprite.Rotation + 90;
      spawnTracer(ent, 90, [1, 2, 3, 4], 50, 2, 0, 0)
    }else if(ent.ToNPC().State == 10 && (EntSprite.IsPlaying("Charging2"))){
      spawnTracer(ent, 90, [0.50, 1.50, 2.50, 3.50], 50, 2, 0, 0)
    }

    if(EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() > 4){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }

    }
  }//monstro ii
  else if (ent.Type == 43){


    if(ent.ToNPC().State == 8 && (EntSprite.IsPlaying("Taunt") && EntSprite.GetFrame() < 20)){
      if(EntSprite.FlipX == true)
        spawnTracer(ent, 90, [4], 20, 2, 0, 0)
      else
        spawnTracer(ent, 90, [2], 20, 2, 0, 0)
    }

    if(EntSprite.IsPlaying("Taunt") && EntSprite.GetFrame() > 20){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }

    }
  }//Adversary
  else if (ent.Type == 268){


    if(ent.ToNPC().State == 8 && (EntSprite.IsPlaying("Attack2Right") && EntSprite.GetFrame() < 25 && EntSprite.GetFrame() > 10))
        spawnTracer(ent, 90, [4], 50, 2, 0, 2)
    if(ent.ToNPC().State == 8 && (EntSprite.IsPlaying("Attack2Left") && EntSprite.GetFrame() < 25 && EntSprite.GetFrame() >10))
        spawnTracer(ent, 90, [2], 50, 2, 0, 2)
    if(ent.ToNPC().State == 8 && (EntSprite.IsPlaying("Attack2Up") && EntSprite.GetFrame() < 25 && EntSprite.GetFrame() > 10))
        spawnTracer(ent, 90, [3], 50, 2, 0, 2)
    if(ent.ToNPC().State == 8 && (EntSprite.IsPlaying("Attack2Down") && EntSprite.GetFrame() < 25 && EntSprite.GetFrame() > 10))
        spawnTracer(ent, 90, [1], 50, 2, 0, 2)

    if((EntSprite.IsPlaying("Attack2Right") || EntSprite.IsPlaying("Attack2Left")|| EntSprite.IsPlaying("Attack2Up")|| EntSprite.IsPlaying("Attack2Down")) && EntSprite.GetFrame() > 25){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }

    }
  }
  //Adversary
  else if (ent.Type == 267){
    if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 25))
        spawnTracer(ent, 90, [1], 50, 2, 0, 0)

    if((EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 25)){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }

    }
  }
  //Soul sucker
  else if (ent.Type == 61 && ent.Variant == 2){
    if(ent.HasMortalDamage ())
      AfterDedLaserIndicator(ent, 90, [1, 2, 3, 4], 10, 2, 0, 0)
  }
  //Adversary
  else if (ent.Type == 39){
    if(ent.Variant == 0){
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Down") && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [1], 20, 2, 0, 0)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Horiz") && EntSprite.FlipX == false && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [4], 20, 2, 0, 0)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Horiz") && EntSprite.FlipX == true && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [2], 20, 2, 0, 0)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Up") && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [3], 20, 2, 0, 0)
    }
    if(ent.Variant == 1){
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack02Horiz")) && EntSprite.GetFrame() < 30)
      spawnTracer(ent, 90, [2, 4], 20, 2, 0, 0)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack02Up") || EntSprite.IsPlaying("Attack02Down")) && EntSprite.GetFrame() < 30)
        spawnTracer(ent, 90, [3, 1], 20, 2, 0, 0)
    }
    if(ent.Variant == 3){
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack04Up") || EntSprite.IsPlaying("Attack04Down") ||EntSprite.IsPlaying("Attack04Horiz")) && EntSprite.GetFrame() < 30)
        spawnTracer(ent, 90, [1,2,3,4], 20, 2, 0, 0)
    }

    if((EntSprite.IsPlaying("Attack01Up") || EntSprite.IsPlaying("Attack01Horiz")|| EntSprite.IsPlaying("Attack01Down")|| EntSprite.IsPlaying("Attack02Down")|| EntSprite.IsPlaying("Attack02Up")|| EntSprite.IsPlaying("Attack02Horiz")|| EntSprite.IsPlaying("Attack04Down")|| EntSprite.IsPlaying("Attack04Up")|| EntSprite.IsPlaying("Attack04Horiz")) && EntSprite.GetFrame() > 30){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }
    }

  }//vis versa
  else if (ent.Type == 836){
    if(ent.Variant == 0){
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Down") && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [1], 20, 2, 0, 2)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Horiz") && EntSprite.FlipX == false && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [4], 20, 2, 0, 2)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Horiz") && EntSprite.FlipX == true && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [2], 20, 2, 0, 2)
      if(ent.ToNPC().State == 9 && (EntSprite.IsPlaying("Attack01Up") && EntSprite.GetFrame() < 30))
        spawnTracer(ent, 90, [3], 20, 2, 0, 2)
    }
    if((EntSprite.IsPlaying("Attack01Up") || EntSprite.IsPlaying("Attack01Horiz")|| EntSprite.IsPlaying("Attack01Down")) && EntSprite.GetFrame() > 30){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }
    }
  }//red ghost
    else if (ent.Type == 285){
      if(ent.ToNPC().State == 13)
        return;
    if(ent.Variant == 0){
      if((EntSprite.IsPlaying("AppearLeft") && EntSprite.GetFrame() > 5))
        spawnTracer(ent, 90, [2], 30, 2, 0, 0)
      if((EntSprite.IsPlaying("AppearRight") && EntSprite.GetFrame() > 5))
        spawnTracer(ent, 90, [4], 30, 2, 0, 0)
      if((EntSprite.IsPlaying("AppearUp") && EntSprite.GetFrame() > 5))
        spawnTracer(ent, 90, [3], 20, 2, 0, 0)
      if((EntSprite.IsPlaying("AppearDown") && EntSprite.GetFrame() > 5))
        spawnTracer(ent, 90, [1], 20, 2, 0, 0)
    }
    if((EntSprite.IsPlaying("ShootLeft") || EntSprite.IsPlaying("ShootRight")|| EntSprite.IsPlaying("ShootUp")|| EntSprite.IsPlaying("ShootDown")) && EntSprite.GetFrame() > 20){
      if(data.IndicatorBrim){
        data.Danger = 0;
        RemoveLaserIndicator(ent)
      }
    }
  }//Goat
  else if (ent.Type == 891){
  if(ent.Variant == 1){
    if((EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35))
      spawnTracer(ent, 90, [1,2,3,4], 20, 2, 0, 0)
  }
  if((EntSprite.IsPlaying("Attack2")) && EntSprite.GetFrame() > 35){
    if(data.IndicatorBrim){
      data.Danger = 0;
      RemoveLaserIndicator(ent)
    }
  }
}//brimstone head
else if (ent.Type == 203){
if(ent.Variant == 0){
  if((EntSprite.IsPlaying("ShootLeft") && EntSprite.GetFrame() < 30))
    spawnTracer(ent, 90, [2], 10, 2, 0, 0)
  if((EntSprite.IsPlaying("ShootRight") && EntSprite.GetFrame() < 30))
    spawnTracer(ent, 90, [4], 10, 2, 0, 0)
  if((EntSprite.IsPlaying("ShootUp") && EntSprite.GetFrame() < 30))
    spawnTracer(ent, 90, [3], 20, 2, 0, 0)
  if((EntSprite.IsPlaying("ShootDown") && EntSprite.GetFrame() < 30))
    spawnTracer(ent, 90, [1], 20, 2, 0, 0)
}
if((EntSprite.IsPlaying("ShootLeft") || EntSprite.IsPlaying("ShootRight")|| EntSprite.IsPlaying("ShootUp")|| EntSprite.IsPlaying("ShootDown")) && EntSprite.GetFrame() > 30){
  if(data.IndicatorBrim){
    data.Danger = 0;
    RemoveLaserIndicator(ent)
  }
}
}
}
